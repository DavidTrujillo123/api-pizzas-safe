import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Mutation(() => Ingredient)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  createIngredient(
    @Args('createIngredientInput') createIngredientInput: CreateIngredientInput,
  ) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @Query(() => [Ingredient], { name: 'ingredients' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Query(() => Ingredient, { name: 'ingredient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @Mutation(() => Ingredient)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  updateIngredient(
    @Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput,
  ) {
    return this.ingredientsService.update(
      updateIngredientInput.id,
      updateIngredientInput,
    );
  }

  @Mutation(() => Ingredient)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  removeIngredient(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.remove(id);
  }
}
