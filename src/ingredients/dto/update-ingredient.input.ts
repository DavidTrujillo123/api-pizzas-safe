import { CreateIngredientInput } from './create-ingredient.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateIngredientInput extends PartialType(CreateIngredientInput) {
  @Field(() => Int, { description: 'ID of the ingredient' })
  @IsNotEmpty()
  @IsInt()
  id: number;
}
