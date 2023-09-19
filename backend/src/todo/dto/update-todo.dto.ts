import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTodoDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  checked?: boolean;
}
