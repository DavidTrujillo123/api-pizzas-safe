import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ingredients')
@ObjectType()
export class Ingredient {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID of the ingredient' })
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'Name of the ingredient' })
  @ApiProperty({ example: 'Tomato', description: 'Name of the ingredient' })
  name: string;

  @Column({ default: 0 })
  @Field(() => Int, { description: 'Calories per serving (optional)' })
  @ApiProperty({ example: 50, description: 'Calories' })
  calories: number;
}
