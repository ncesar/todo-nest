import { Todo } from "../../layout/main";
import { DateTime } from "luxon";
import { TodoItemWrapper, TodoSingleItem } from "./styled";
import { CheckAll } from "@styled-icons/bootstrap/CheckAll";
import { PencilSquare } from "@styled-icons/bootstrap/PencilSquare";
import { Trash } from "@styled-icons/bootstrap/Trash";

type TodoItemProps = {
  items: any;
  updateTodo: (id: string, newText: string) => void;
  toggleCheck: (id: string, checked: boolean) => void;
  deleteTodo: (id: string) => void;
};

export const TodoItem = ({
  items,
  updateTodo,
  toggleCheck,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <TodoItemWrapper>
      {items?.findAll.map((todo: Todo) => (
        <TodoSingleItem
          key={todo.id}
          style={{ textDecoration: todo.checked ? "line-through" : "none" }}
        >
          {todo.text} (Created:{" "}
          {DateTime.fromISO(todo.createdDate as string).toFormat("yyyy-LL-dd")})
          <button
            className={todo.checked ? "completed" : ""}
            onClick={() => toggleCheck(todo.id, todo.checked)}
            data-cy={`todo-toggle-${todo.text}`}
          >
            <CheckAll />
          </button>
          <button
            onClick={() =>
              updateTodo(todo.id, window.prompt("Enter new todo") || "")
            }
            data-cy={`todo-update-${todo.text}`}
          >
            <PencilSquare />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            data-cy={`todo-delete-${todo.text}`}
          >
            <Trash />
          </button>
        </TodoSingleItem>
      ))}
    </TodoItemWrapper>
  );
};
