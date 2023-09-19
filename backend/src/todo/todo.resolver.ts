import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { ToggleTodoCheckDto } from './dto/toggle-todo-check.dto';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  private todos: Todo[] = [];

  @Mutation(() => Todo)
  createTodo(@Args('createTodoDto') createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Query(() => [Todo], { name: 'findAll' })
  findAllTodos(): Todo[] {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id', { type: () => String }) id: string,
    @Args('text', { type: () => String }) text: string,
  ): Todo | undefined {
    return this.todoService.update(id, text);
  }

  @Mutation(() => Boolean)
  deleteTodo(@Args('id', { type: () => String }) id: string): boolean {
    return this.todoService.remove(id);
  }

  @Mutation(() => Boolean)
  toggleTodoCheck(@Args('toggleCheckDto') toggleCheckDto: ToggleTodoCheckDto) {
    return this.todoService.toggleCheck(
      toggleCheckDto.id,
      toggleCheckDto.checked,
    );
  }
}
