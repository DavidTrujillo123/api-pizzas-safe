import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity('pizzas')
@ObjectType()
export class Pizza {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'ID of the pizza' })
  id: number;

  @Column()
  @Field({ description: 'Name of the pizza' })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @Field(() => Float, { description: 'Price of the pizza' })
  price: number;

  // Relación N:M
  @ManyToMany(() => Ingredient, { eager: true, cascade: true })
  @JoinTable()
  @Field(() => [Ingredient], {
    nullable: 'items',
    description: 'List of ingredients in the pizza',
  })
  ingredients: Ingredient[];
}
