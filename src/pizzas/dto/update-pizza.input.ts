import { CreatePizzaInput } from './create-pizza.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePizzaInput extends PartialType(CreatePizzaInput) {
  @Field(() => Int, { description: 'ID of the pizza' })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
