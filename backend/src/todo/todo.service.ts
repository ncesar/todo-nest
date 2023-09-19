import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      createdDate: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: string, text: string): Todo | undefined {
    const idx = this.todos.findIndex((todo) => todo.id === id);
    if (idx !== -1) {
      this.todos[idx].text = text;
      return this.todos[idx];
    }
    return undefined;
  }

  toggleCheck(id: string, checked: boolean): boolean {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.checked = checked;
    return true;
  }

  remove(id: string): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length < initialLength;
  }
}
