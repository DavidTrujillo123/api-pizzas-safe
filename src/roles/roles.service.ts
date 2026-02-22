import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
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
}
