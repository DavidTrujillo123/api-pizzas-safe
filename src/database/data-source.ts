import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Pizza } from '../pizzas/entities/pizza.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pizzas_db',
  synchronize: false,
  logging: true,
  entities: [Ingredient, Pizza],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  subscribers: [],
});
