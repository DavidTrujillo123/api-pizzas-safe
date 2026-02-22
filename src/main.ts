import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS Configuration from .env
  const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');
  app.enableCors({
    origin: corsOrigin === '*' ? '*' : corsOrigin.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Helmet - Security Headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: nodeEnv !== 'development',
      contentSecurityPolicy:
        nodeEnv === 'development'
          ? {
              directives: {
                defaultSrc: [`'self'`],
                styleSrc: [
                  `'self'`,
                  `'unsafe-inline'`,
                  'cdn.jsdelivr.net',
                  'fonts.googleapis.com',
                ],
                fontSrc: [`'self'`, 'fonts.gstatic.com'],
                imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
                scriptSrc: [
                  `'self'`,
                  `https: 'unsafe-inline'`,
                  `cdn.jsdelivr.net`,
                ],
              },
            }
          : undefined,
    }),
  );

  // Rate Limiting from .env
  const windowMs = configService.get<number>(
    'RATE_LIMIT_WINDOW_MS',
    15 * 60 * 1000,
  );
  const maxRequests = configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 100);

  app.use(
    rateLimit({
      windowMs: windowMs,
      max: maxRequests,
      message: 'Too many requests from this IP, please try again later.',
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Pizzas API')
    .setDescription('Pizza and Ingredients Management System')
    .setVersion('1.0')
    .addBearerAuth() // Soporte para JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  const isPlaygroundEnabled =
    configService.get<string>('GRAPHQL_PLAYGROUND', 'true') === 'true';

  console.log(`\n🚀 Server is running on port: ${port}`);
  console.log(`📍 Environment: ${nodeEnv}`);
  if (isPlaygroundEnabled) {
    console.log(`🎮 GraphQL Playground: http://localhost:${port}/graphql`);
  }
  console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs\n`);
}
bootstrap();
