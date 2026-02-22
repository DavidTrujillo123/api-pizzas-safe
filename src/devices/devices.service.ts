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

    const isLocal = cleanIp === '127.0.0.1';
    let lookupIp = cleanIp;

    // Si es local, intentamos obtener la IP pública para dar una ubicación real al usuario en desarrollo
    if (isLocal) {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data: any = await response.json();
        if (data && data.ip) {
          lookupIp = data.ip;
        }
      } catch (error) {
        console.error(
          'Error fetching public IP for localhost geolocation:',
          error.message,
        );
      }
    }

    const geo = geoip.lookup(lookupIp);
    let location = 'Unknown Location';

    if (geo) {
      location = `${geo.city || 'Unknown City'}, ${geo.country}`;
    } else if (isLocal && lookupIp === cleanIp) {
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
