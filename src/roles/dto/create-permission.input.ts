import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreatePermissionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'delete:pizzas',
    description: 'Unique name of the permission',
  })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Allow deleting pizzas from catalog',
    required: false,
  })
  description?: string;
}
