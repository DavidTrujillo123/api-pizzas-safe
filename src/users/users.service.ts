import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['role', 'role.permissions', 'devices'],
    });
    return user || undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['role', 'role.permissions', 'devices'],
    });
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role', 'role.permissions', 'devices'],
    });
    return user || undefined;
  }
}
