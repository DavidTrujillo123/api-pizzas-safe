import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { Pizza } from './entities/pizza.entity';
import { CreatePizzaInput } from './dto/create-pizza.input';
import { UpdatePizzaInput } from './dto/update-pizza.input';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Pizza)
export class PizzasResolver {
  constructor(private readonly pizzasService: PizzasService) {}

  @Mutation(() => Pizza)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  createPizza(@Args('createPizzaInput') createPizzaInput: CreatePizzaInput) {
    return this.pizzasService.create(createPizzaInput);
  }

  @Query(() => [Pizza], { name: 'pizzas' })
  findAll() {
    return this.pizzasService.findAll();
  }

  @Query(() => Pizza, { name: 'pizza' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pizzasService.findOne(id);
  }

  @Mutation(() => Pizza)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  updatePizza(@Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput) {
    return this.pizzasService.update(updatePizzaInput.id, updatePizzaInput);
  }

  @Mutation(() => Pizza)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  removePizza(@Args('id', { type: () => Int }) id: number) {
    return this.pizzasService.remove(id);
  }
}
