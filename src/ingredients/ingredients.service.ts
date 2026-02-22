import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(
    createIngredientInput: CreateIngredientInput,
  ): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(createIngredientInput);
    return this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient #${id} not found`);
    }
    return ingredient;
  }

  async update(
    id: number,
    updateIngredientInput: UpdateIngredientInput,
  ): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.preload(
      updateIngredientInput,
    );
    if (!ingredient) {
      throw new NotFoundException(`Ingredient #${id} not found`);
    }
    return this.ingredientRepository.save(ingredient);
  }

  async remove(id: number): Promise<Ingredient> {
    const ingredient = await this.findOne(id);
    return this.ingredientRepository.remove(ingredient);
  }
}
