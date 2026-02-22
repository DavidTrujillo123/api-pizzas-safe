import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreatePermissionInput } from './dto/create-permission.input';
import { CreateRoleInput } from './dto/create-role.input';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'List all roles with their users and permissions' })
  findAll() {
    return this.rolesService.findAllWithRelations();
  }

  @Post('permissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new permission' })
  createPermission(@Body() input: CreatePermissionInput) {
    return this.rolesService.createPermission(input);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Create a new role and assign permissions' })
  createRole(@Body() input: CreateRoleInput) {
    return this.rolesService.createRole(input);
  }
}
