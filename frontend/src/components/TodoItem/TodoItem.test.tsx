import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { TodoItem } from "./";

describe("TodoItem", () => {
  const mockUpdateTodo = jest.fn();
  const mockToggleCheck = jest.fn();
  const mockDeleteTodo = jest.fn();

  const sampleTodo = {
    id: "1",
    text: "Test Todo",
    checked: false,
    createdDate: new Date().toISOString(),
  };

  beforeEach(() => {
    render(
      <TodoItem
        items={{ findAll: [sampleTodo] }}
        updateTodo={mockUpdateTodo}
        toggleCheck={mockToggleCheck}
        deleteTodo={mockDeleteTodo}
      />,
    );
  });

  test("toggles the todo item", () => {
    const toggleButton = screen.getByTestId(`todo-toggle-${sampleTodo.text}`);
    fireEvent.click(toggleButton);
    expect(mockToggleCheck).toHaveBeenCalledWith(
      sampleTodo.id,
      sampleTodo.checked,
    );
  });

  test("updates the todo item", () => {
    const updateButton = screen.getByTestId(`todo-update-${sampleTodo.text}`);
    const updatedText = "Updated Todo";

    // Mocking the window.prompt
    window.prompt = jest.fn().mockReturnValue(updatedText);

    fireEvent.click(updateButton);
    expect(mockUpdateTodo).toHaveBeenCalledWith(sampleTodo.id, updatedText);
  });

  test("deletes the todo item", () => {
    const deleteButton = screen.getByTestId(`todo-delete-${sampleTodo.text}`);

    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith(sampleTodo.id);
  });
});
