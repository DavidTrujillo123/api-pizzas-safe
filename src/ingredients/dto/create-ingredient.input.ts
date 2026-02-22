import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

@InputType()
export class CreateIngredientInput {
  @Field({ description: 'Name of the ingredient' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int, { nullable: true, description: 'Calories per serving' })
  @IsOptional()
  @IsInt()
  @Min(0)
  calories?: number;
}
