import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { CreateRoleInput } from './dto/create-role.input';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAllWithRelations() {
    return this.rolesRepository.find({
      relations: ['users', 'permissions'],
    });
  }

  async findByName(name: string) {
    return this.rolesRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });
  }

  async createPermission(input: CreatePermissionInput) {
    const permission = this.permissionRepository.create(input);
    return this.permissionRepository.save(permission);
  }

  async createRole(input: CreateRoleInput) {
    const { name, permissionIds } = input;
    const permissions = permissionIds?.length
      ? await this.permissionRepository.findBy({ id: In(permissionIds) })
      : [];

    if (permissionIds?.length && permissions.length !== permissionIds.length) {
      throw new NotFoundException('Some permissions were not found');
    }

    const role = this.rolesRepository.create({
      name,
      permissions,
    });

    return this.rolesRepository.save(role);
  }
}
