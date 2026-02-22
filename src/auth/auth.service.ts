import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Simularemos un usuario por simplicidad como se acordó en el plan
  private readonly mockUser = {
    id: 1,
    username: 'admin',
    // Password 'admin123' hasheado
    password: '$2b$10$X7vQW9M7vQW9M7vQW9M7vOuQ2uB3vR.W3vR.W3vR.W3vR.W3vR.W.',
  };

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, pass: string) {
    // Validar contra el mockUser
    // Por simplicidad en este paso, si es admin/admin123 permitimos (en un app real iría a BDD)
    if (username !== 'admin' || pass !== 'admin123') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: this.mockUser.username, sub: this.mockUser.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d', // Refresh token dura más
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          'refreshSecret',
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

      const newPayload = { username: payload.username, sub: payload.sub };
      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
