import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteTodoDto {
  @Field()
  id: string;
}
