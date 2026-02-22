import { AppDataSource } from '../data-source';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Pizza } from '../../pizzas/entities/pizza.entity';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../roles/entities/permission.entity';
import { User } from '../../users/entities/user.entity';

async function seed() {
  await AppDataSource.initialize();
  console.log('DataSource initialized for seeding...');

  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const pizzaRepository = AppDataSource.getRepository(Pizza);
  const roleRepository = AppDataSource.getRepository(Role);
  const permissionRepository = AppDataSource.getRepository(Permission);
  const userRepository = AppDataSource.getRepository(User);

  // 1. Limpiar tablas
  await AppDataSource.query('TRUNCATE TABLE "users" CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "role_permissions" CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "permissions" CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "roles" CASCADE');
  await AppDataSource.query(
    'TRUNCATE TABLE "pizzas_ingredients_ingredients" CASCADE',
  );
  await AppDataSource.query('TRUNCATE TABLE "ingredients" CASCADE');
  await AppDataSource.query('TRUNCATE TABLE "pizzas" CASCADE');

  console.log('Tables cleared.');

  // 2. Crear Permisos
  const readPerm = permissionRepository.create({
    name: 'read:all',
    description: 'Permiso de solo lectura',
  });
  const writePerm = permissionRepository.create({
    name: 'write:all',
    description: 'Permiso de escritura total',
  });
  await permissionRepository.save([readPerm, writePerm]);
  console.log('Permissions seeded.');

  // 3. Crear Roles
  const adminRole = roleRepository.create({
    name: 'Admin',
    permissions: [readPerm, writePerm],
  });
  const userRole = roleRepository.create({
    name: 'User',
    permissions: [readPerm],
  });
  await roleRepository.save([adminRole, userRole]);
  console.log('Roles seeded.');

  // 4. Crear Usuarios
  const adminUser = userRepository.create({
    username: 'admin',
    password: 'admin123', // En producción usar hash
    role: adminRole,
  });
  const standardUser = userRepository.create({
    username: 'user',
    password: 'user123',
    role: userRole,
  });
  await userRepository.save([adminUser, standardUser]);
  console.log('Users seeded.');

  // 5. Crear Ingredientes
  const tomato = ingredientRepository.create({ name: 'Tomate', calories: 20 });
  const mozzarella = ingredientRepository.create({
    name: 'Mozzarella',
    calories: 280,
  });
  const pepperoni = ingredientRepository.create({
    name: 'Pepperoni',
    calories: 490,
  });
  const mushrooms = ingredientRepository.create({
    name: 'Champiñones',
    calories: 22,
  });
  const basil = ingredientRepository.create({ name: 'Albahaca', calories: 5 });
  const ham = ingredientRepository.create({ name: 'Jamón', calories: 150 });
  const pineapple = ingredientRepository.create({ name: 'Piña', calories: 50 });

  await ingredientRepository.save([
    tomato,
    mozzarella,
    pepperoni,
    mushrooms,
    basil,
    ham,
    pineapple,
  ]);
  console.log('Ingredients seeded.');

  // 6. Crear Pizzas
  const margarita = pizzaRepository.create({
    name: 'Margarita',
    price: 10.5,
    ingredients: [tomato, mozzarella, basil],
  });
  const pepperoniPizza = pizzaRepository.create({
    name: 'Pepperoni Classica',
    price: 12.99,
    ingredients: [tomato, mozzarella, pepperoni],
  });
  const hawaiian = pizzaRepository.create({
    name: 'Hawaiana',
    price: 11.5,
    ingredients: [tomato, mozzarella, ham, pineapple],
  });
  const veggie = pizzaRepository.create({
    name: 'Vegetariana',
    price: 13.0,
    ingredients: [tomato, mozzarella, mushrooms, basil],
  });

  await pizzaRepository.save([margarita, pepperoniPizza, hawaiian, veggie]);
  console.log('Pizzas seeded.');

  await AppDataSource.destroy();
  console.log('Seeding completed successfully!');
}

seed().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
