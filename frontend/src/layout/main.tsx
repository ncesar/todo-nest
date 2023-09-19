import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DateTime } from "luxon";
import { useQuery, useMutation, gql } from "@apollo/client";
import { TodoMainContainer, TodoWrapper } from "./styled";
import { TodoForm } from "../components/TodoForm";
import { TodoItem } from "../components/TodoItem";
import { Header } from "../components/Header";

export interface Todo {
  id: string;
  text: string;
  checked: boolean;
  createdDate: string | null;
}

const schema = yup.object().shape({
  todoText: yup.string().required("Todo text is required"),
});

const GET_TODOS = gql`
  query GetTodos {
    findAll {
      id
      text
      checked
      createdDate
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo(
    $text: String!
    $checked: Boolean!
    $createdDate: String!
  ) {
    createTodo(
      createTodoDto: {
        text: $text
        checked: $checked
        createdDate: $createdDate
      }
    ) {
      id
      text
      checked
      createdDate
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $text: String!) {
    updateTodo(id: $id, text: $text) {
      id
      text
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodoCheck($id: String!, $checked: Boolean!) {
    toggleTodoCheck(toggleCheckDto: { id: $id, checked: $checked })
  }
`;

export default function Main() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [createTodoMutation] = useMutation(CREATE_TODO);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const addTodo = (data: { todoText: string }): void => {
    createTodoMutation({
      variables: {
        text: data.todoText,
        checked: false,
        createdDate: DateTime.now().toISO(),
      },
      update: (cache, { data: { createTodo } }) => {
        const existingTodos: any = cache.readQuery({
          query: GET_TODOS,
        });
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            findAll: [...existingTodos.findAll, createTodo],
          },
        });
      },
    });
    reset();
  };

  const [updateTodoMutation] = useMutation(UPDATE_TODO);
  const [deleteTodoMutation] = useMutation(DELETE_TODO);
  const [toggleTodoMutation] = useMutation(TOGGLE_TODO);

  const updateTodo = (id: string, newText: string): void => {
    updateTodoMutation({
      variables: {
        id,
        text: newText,
      },
    });
  };

  const deleteTodo = (id: string): void => {
    deleteTodoMutation({
      variables: { id },
      update: (cache) => {
        const existingTodos: any = cache.readQuery({ query: GET_TODOS });
        const newTodos = existingTodos.findAll.filter(
          (todo: Todo) => todo.id !== id,
        );
        cache.writeQuery({
          query: GET_TODOS,
          data: { findAll: newTodos },
        });
      },
    });
  };

  const toggleCheck = (id: string, checked: boolean): void => {
    toggleTodoMutation({
      variables: { id, checked: !checked },
      update: (cache) => {
        const existingTodos: any = cache.readQuery({ query: GET_TODOS });
        const newTodos = existingTodos.findAll.map((todo: Todo) =>
          todo.id === id ? { ...todo, checked: !checked } : todo,
        );
        cache.writeQuery({
          query: GET_TODOS,
          data: { findAll: newTodos },
        });
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TodoWrapper>
      <TodoMainContainer>
        <Header />
        <TodoForm
          handleSubmit={handleSubmit}
          addTodo={addTodo}
          control={control}
        />
        <TodoItem
          items={data}
          updateTodo={updateTodo}
          toggleCheck={toggleCheck}
          deleteTodo={deleteTodo}
        />
      </TodoMainContainer>
    </TodoWrapper>
  );
}
