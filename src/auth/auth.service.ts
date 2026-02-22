import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private devicesService: DevicesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, pass: string, ip: string, userAgent: string) {
    const user = await this.usersService.findByUsername(username);

    // En producción usaríamos bcrypt.compare(pass, user.password)
    // Por simplicidad y consistencia con el seeder que haré con texto plano o pass conocido:
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role.name, // Inyectamos el nombre del rol en el JWT
    };

    // Tracking del Dispositivo de Ingreso
    await this.devicesService.logDevice(user, ip, userAgent);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') as any,
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
      }),
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'refreshSecret',
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) throw new UnauthorizedException();

      const newPayload = {
        username: user.username,
        sub: user.id,
        role: user.role.name,
      };

      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
