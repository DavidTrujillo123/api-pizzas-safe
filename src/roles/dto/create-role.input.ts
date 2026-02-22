import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Editor', description: 'Name of the role' })
  name: string;

  @Field(() => [Int], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({
    type: [Number],
    example: [1, 2],
    description: 'List of Permission IDs',
    required: false,
  })
  permissionIds?: number[];
}
