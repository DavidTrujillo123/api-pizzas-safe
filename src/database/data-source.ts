import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Pizza } from '../pizzas/entities/pizza.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../roles/entities/permission.entity';
import { Device } from '../devices/entities/device.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: true,
  entities: [Ingredient, Pizza, User, Role, Permission, Device],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  subscribers: [],
});
