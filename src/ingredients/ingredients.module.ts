import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  providers: [IngredientsResolver, IngredientsService],
  exports: [IngredientsService], // Exported for pizzas module
})
export class IngredientsModule {}
