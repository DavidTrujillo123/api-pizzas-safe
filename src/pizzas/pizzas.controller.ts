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
import { PizzasService } from './pizzas.service';
import { CreatePizzaInput } from './dto/create-pizza.input';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pizza' })
  @ApiResponse({
    status: 201,
    description: 'The pizza has been successfully created.',
    type: Pizza,
  })
  create(@Body() createPizzaInput: CreatePizzaInput) {
    return this.pizzasService.create(createPizzaInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pizzas' })
  @ApiResponse({
    status: 200,
    description: 'Return all pizzas.',
    type: [Pizza],
  })
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pizza by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a single pizza.',
    type: Pizza,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pizzasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pizza' })
  @ApiResponse({
    status: 200,
    description: 'The pizza has been successfully updated.',
    type: Pizza,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ) {
    return this.pizzasService.update(id, { ...updatePizzaDto, id } as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pizza' })
  @ApiResponse({
    status: 200,
    description: 'The pizza has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pizzasService.remove(id);
  }
}
