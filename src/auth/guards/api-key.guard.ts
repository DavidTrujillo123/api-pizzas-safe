import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
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
