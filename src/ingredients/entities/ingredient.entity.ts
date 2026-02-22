import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ingredients')
@ObjectType()
export class Ingredient {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID of the ingredient' })
  id: number;

  @Column()
  @Field({ description: 'Name of the ingredient' })
  name: string;

  @Column({ default: 0 })
  @Field(() => Int, { description: 'Calories per serving (optional)' })
  calories: number;
}
