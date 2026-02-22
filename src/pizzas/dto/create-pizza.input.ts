import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
} from 'class-validator';

@InputType()
export class CreatePizzaInput {
  @Field({ description: 'Name of the pizza' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Float, { description: 'Price of the pizza' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => [Int], { nullable: true, description: 'Ids of the ingredients' })
  @IsOptional()
  @IsArray()
  ingredientIds?: number[];
}
