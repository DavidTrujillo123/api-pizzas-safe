import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreatePizzaInput {
  @Field({ description: 'Name of the pizza' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Veggie', description: 'The name of the pizza' })
  name: string;

  @Field(() => Float, { description: 'Price of the pizza' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 15.99, description: 'The price' })
  price: number;

  @Field(() => [Int], { nullable: true, description: 'Ids of the ingredients' })
  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: [1, 2],
    description: 'Array of ingredient IDs',
    required: false,
  })
  ingredientIds?: number[];
}
