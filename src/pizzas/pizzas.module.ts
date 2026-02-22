import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasResolver } from './pizzas.resolver';
import { PizzasController } from './pizzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Ingredient]), IngredientsModule],
  controllers: [PizzasController],
  providers: [PizzasResolver, PizzasService],
})
export class PizzasModule {}
