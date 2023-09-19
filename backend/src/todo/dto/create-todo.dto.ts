import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  text: string;

  @Field()
  checked: boolean;

  @Field({ nullable: true })
  createdDate?: string;
}
