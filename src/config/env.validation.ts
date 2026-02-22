import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

// Load initial environment to have access to process.env before Nest starts fully
config();

const REQUIRED_ENVS = [
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'API_KEY',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
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
