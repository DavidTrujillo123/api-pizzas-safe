import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async logDevice(
    user: User,
    ipAddress: string,
    deviceType: string,
  ): Promise<Device> {
    const newDevice = this.deviceRepository.create({
      user,
      ipAddress,
      deviceType,
    });

    return await this.deviceRepository.save(newDevice);
  }
}
