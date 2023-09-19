import { Control, Controller } from "react-hook-form";
import { TodoFormWrapper } from "./styled";

type TodoProps = {
  handleSubmit: (fn: any) => (e: any) => void;
  addTodo: (data: { todoText: string }) => void;
  control: Control<
    {
      todoText: string;
    },
    any
  >;
};

export const TodoForm = ({ handleSubmit, addTodo, control }: TodoProps) => {
  return (
    <TodoFormWrapper onSubmit={handleSubmit(addTodo)}>
      <Controller
        name="todoText"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} placeholder="Enter todo" data-cy="add-todo-input" />
        )}
      />
      <button type="submit" data-cy="add-todo-submit">
        Add
      </button>
    </TodoFormWrapper>
  );
};
