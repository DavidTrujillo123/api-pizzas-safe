import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PizzasService } from './pizzas.service';
import { Pizza } from './entities/pizza.entity';
import { CreatePizzaInput } from './dto/create-pizza.input';
import { UpdatePizzaInput } from './dto/update-pizza.input';

@Resolver(() => Pizza)
export class PizzasResolver {
  constructor(private readonly pizzasService: PizzasService) {}

  @Mutation(() => Pizza)
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
  updatePizza(@Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput) {
    return this.pizzasService.update(updatePizzaInput.id, updatePizzaInput);
  }

  @Mutation(() => Pizza)
  removePizza(@Args('id', { type: () => Int }) id: number) {
    return this.pizzasService.remove(id);
  }
}
