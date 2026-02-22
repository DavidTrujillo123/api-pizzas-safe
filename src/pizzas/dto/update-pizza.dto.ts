import { PartialType } from '@nestjs/swagger';
import { CreatePizzaInput } from './create-pizza.input';

export class UpdatePizzaDto extends PartialType(CreatePizzaInput) {}
