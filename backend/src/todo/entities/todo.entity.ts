// todo/dto/entities/todo.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field({ nullable: true })
  id?: string;

  @Field()
  text: string;

  @Field()
  checked: boolean;

  @Field({ nullable: true })
  createdDate?: string;
}
