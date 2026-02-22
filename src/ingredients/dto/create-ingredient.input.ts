import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateIngredientInput {
  @Field({ description: 'Name of the ingredient' })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Cheese', description: 'Name of the ingredient' })
  name: string;

  @Field(() => Int, { nullable: true, description: 'Calories per serving' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ example: 100, description: 'Calories', required: false })
  calories?: number;
}
