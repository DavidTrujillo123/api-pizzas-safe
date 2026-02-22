import { PartialType } from '@nestjs/swagger';
import { CreateIngredientInput } from './create-ingredient.input';

export class UpdateIngredientDto extends PartialType(CreateIngredientInput) {}
