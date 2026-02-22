import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreatePermissionInput } from './dto/create-permission.input';
import { CreateRoleInput } from './dto/create-role.input';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role], { name: 'roles' })
  @UseGuards(RolesGuard)
  @Roles('Admin')
  findAll() {
    return this.rolesService.findAllWithRelations();
  }

  @Mutation(() => Permission)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  createPermission(@Args('input') input: CreatePermissionInput) {
    return this.rolesService.createPermission(input);
  }

  @Mutation(() => Role)
  @UseGuards(RolesGuard)
  @Roles('Admin')
  createRole(@Args('input') input: CreateRoleInput) {
    return this.rolesService.createRole(input);
  }
}
