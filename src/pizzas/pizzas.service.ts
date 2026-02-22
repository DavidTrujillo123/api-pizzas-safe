import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePizzaInput } from './dto/create-pizza.input';
import { UpdatePizzaInput } from './dto/update-pizza.input';
import { Pizza } from './entities/pizza.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createPizzaInput: CreatePizzaInput): Promise<Pizza> {
    const { ingredientIds, ...pizzaData } = createPizzaInput;

    // Buscar ingredientes si se pasan IDs
    let ingredients: Ingredient[] = [];
    if (ingredientIds && ingredientIds.length > 0) {
      // Usar In operator o recorrer. Por simplicidad recorrer o Promise.all:
      ingredients = await Promise.all(
        ingredientIds.map(async (id) => {
          const ing = await this.ingredientRepository.findOne({
            where: { id },
          });
          if (!ing) throw new NotFoundException(`Ingredient #${id} not found`);
          return ing;
        }),
      );
    }

    const pizza = this.pizzaRepository.create({
      ...pizzaData,
      ingredients,
    });

    return this.pizzaRepository.save(pizza);
  }

  async findAll(): Promise<Pizza[]> {
    return this.pizzaRepository.find({ relations: ['ingredients'] });
  }

  async findOne(id: number): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    if (!pizza) {
      throw new NotFoundException(`Pizza #${id} not found`);
    }
    return pizza;
  }

  async update(id: number, updatePizzaInput: UpdatePizzaInput): Promise<Pizza> {
    const { ingredientIds, ...pizzaData } = updatePizzaInput;

    const pizza = await this.pizzaRepository.preload(pizzaData);

    if (!pizza) {
      throw new NotFoundException(`Pizza #${id} not found`);
    }

    if (ingredientIds !== undefined) {
      const ingredients = await Promise.all(
        ingredientIds.map(async (ingId) => {
          const ing = await this.ingredientRepository.findOne({
            where: { id: ingId },
          });
          if (!ing)
            throw new NotFoundException(`Ingredient #${ingId} not found`);
          return ing;
        }),
      );
      pizza.ingredients = ingredients;
    }

    return this.pizzaRepository.save(pizza);
  }

  async remove(id: number): Promise<Pizza> {
    const pizza = await this.findOne(id);
    return this.pizzaRepository.remove(pizza);
  }
}
