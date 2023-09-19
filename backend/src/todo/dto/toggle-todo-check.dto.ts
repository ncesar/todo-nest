import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ToggleTodoCheckDto {
  @Field()
  id: string;

  @Field()
  checked: boolean;
}
