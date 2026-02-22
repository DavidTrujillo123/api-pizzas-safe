import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as geoip from 'geoip-lite';
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
    // Normalizar IP (en local ::1 o ::ffff:127.0.0.1)
    const cleanIp = ipAddress.includes('::ffff:')
      ? ipAddress.split('::ffff:')[1]
      : ipAddress === '::1'
        ? '127.0.0.1'
        : ipAddress;

    const geo = geoip.lookup(cleanIp);
    let location = 'Unknown Location';

    if (geo) {
      location = `${geo.city || 'Unknown City'}, ${geo.country}`;
    } else if (cleanIp === '127.0.0.1') {
      location = 'Localhost';
    }

    const newDevice = this.deviceRepository.create({
      user,
      ipAddress: cleanIp,
      deviceType,
      location,
    });

    return await this.deviceRepository.save(newDevice);
  }
}
