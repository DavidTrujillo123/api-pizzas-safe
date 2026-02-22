import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

// Load initial environment to have access to process.env before Nest starts fully
config();

const REQUIRED_ENVS = [
  'PORT',
  'NODE_ENV',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'CORS_ORIGIN',
  'CORS_METHODS',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS',
  'API_KEY',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'JWT_ACCESS_EXPIRES_IN',
  'JWT_REFRESH_EXPIRES_IN',
  'GRAPHQL_PLAYGROUND',
];

export function validateEnvironmentVars(): void {
  const logger = new Logger('EnvValidation');
  const missingEnvs: string[] = [];

  for (const envVar of REQUIRED_ENVS) {
    if (!process.env[envVar]) {
      missingEnvs.push(envVar);
    }
  }

  if (missingEnvs.length > 0) {
    logger.error(
      `Startup aborted. Missing required environment variables:\n -> ${missingEnvs.join(', ')}\n Please configure them in the .env file.`,
    );
    process.exit(1);
  }
}
