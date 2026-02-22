import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiResponse({
    status: 201,
    description: 'The ingredient has been successfully created.',
    type: Ingredient,
  })
  create(@Body() createIngredientInput: CreateIngredientInput) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ingredients' })
  @ApiResponse({
    status: 200,
    description: 'Return all ingredients.',
    type: [Ingredient],
  })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ingredient by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a single ingredient.',
    type: Ingredient,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient' })
  @ApiResponse({
    status: 200,
    description: 'The ingredient has been successfully updated.',
    type: Ingredient,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, {
      ...updateIngredientDto,
      id,
    } as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingredient' })
  @ApiResponse({
    status: 200,
    description: 'The ingredient has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.remove(id);
  }
}
