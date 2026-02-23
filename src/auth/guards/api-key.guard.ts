import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const apiKey = this.configService.get<string>('API_KEY');
    let request;

    if (context.getType<string>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
    } else {
      request = context.switchToHttp().getRequest();
    }

    let providedApiKey = request.headers['x-api-key'];

    // Algunas peticiones pueden enviarlo en mayúsculas dependiendo del cliente
    if (!providedApiKey) {
      providedApiKey = request.headers['X-API-KEY'];
    }

    if (!providedApiKey || providedApiKey !== apiKey) {
      throw new UnauthorizedException('Invalid or missing API Key (X-API-KEY)');
    }

    return true;
  }
}
