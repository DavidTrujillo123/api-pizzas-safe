import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientsResolver, IngredientsService],
  exports: [IngredientsService], // Exported for pizzas module
})
export class IngredientsModule {}
