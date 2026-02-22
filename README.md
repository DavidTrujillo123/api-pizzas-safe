# 🍕 Pizzas & Ingredients GraphQL API

API robusta construida con **NestJS**, **GraphQL** (Code First) y **TypeORM** para la gestión de un catálogo de pizzas e ingredientes, con un enfoque fuerte en **seguridad** y **escalabilidad**.

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) v11
- **API:** [GraphQL](https://graphql.org/) (Apollo Server)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/) v15
- **ORM:** [TypeORM](https://typeorm.io/)
- **Seguridad:** Helmet, Express Rate Limit, class-validator
- **Contenedores:** Docker & Docker Compose
- **Gestor de Paquetes:** pnpm

## 🚀 Características Principales

- **GraphQL API:** Consultas y mutaciones completas para Pizzas e Ingredientes con validación integrada.
- **Relación N:M:** Gestión avanzada de ingredientes por pizza mediante tablas intermedias automáticas en TypeORM.
- **Seguridad:**
  - **Helmet:** Cabeceras de seguridad configuradas (ajustadas para permitir GraphQL Playground).
  - **Rate Limiting:** Máximo 100 peticiones cada 15 minutos por IP.
  - **CORS:** Configurado para acceso externo seguro.
- **Documentación:**
  - **Swagger UI:** `/api/docs` para una visión global de la API (útil para integración híbrida).
  - **GraphQL Playground:** `/graphql` para pruebas interactivas de esquemas.
- **Base de Datos:**
  - **Migraciones:** Gestión profesional de cambios en el esquema.
  - **Seeders:** Datos iniciales listos para poblar el catálogo local.

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/)
- [Docker Desktop](https://www.docker.com/)

## 🏁 Inicio Rápido

1. **Levantar la Infraestructura (Docker):**
   La base de datos PostgreSQL se levanta en el puerto **5431** para evitar conflictos.

   ```bash
   docker-compose up -d
   ```

### Configuración Centralizada (.env)

El proyecto se gestiona íntegramente desde el archivo `.env`. Puedes configurar:

- **Base de Datos:** Host, puerto (5431), credenciales.
- **Seguridad:**
  - `CORS_ORIGIN`: Dominios permitidos (ej. `http://localhost:4200`).
  - `RATE_LIMIT_WINDOW_MS`: Ventana de tiempo para límites.
  - `RATE_LIMIT_MAX_REQUESTS`: Peticiones máximas por IP.
- **Entorno:** `NODE_ENV` (development/production).
- **GraphQL:** `GRAPHQL_PLAYGROUND` (true/false) para habilitar la interfaz de pruebas.

2. **Instalar Dependencias:**

   ```bash
   cd backend
   pnpm install
   ```

3. **Configurar Base de Datos:**
   Asegúrate de que las tablas existan y tengan datos de ejemplo:

   ```bash
   # Ejecutar migraciones
   pnpm migration:run

   # Poblar con datos iniciales (Margarita, Pepperoni, Hawaiana, etc.)
   pnpm seed
   ```

4. **Iniciar en Desarrollo:**
   ```bash
   pnpm start:dev
   ```

## 🔌 Endpoints

- **GraphQL Playground:** [http://localhost:3000/graphql](http://localhost:3000/graphql)
- **Swagger Docs:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## 📜 Scripts Clave (dentro de /backend)

- `pnpm start:dev`: Servidor con hot-reload.
- `pnpm migration:run`: Sincroniza el esquema usando migraciones.
- `pnpm seed`: Carga el catálogo base de pizzas e ingredientes.
- `pnpm build`: Genera el build de producción en `/dist`.

## 📂 Estructura del Proyecto

- `src/ingredients`: Módulo de gestión de ingredientes individuales.
- `src/pizzas`: Módulo de gestión de pizzas y su asociación con ingredientes.
- `src/database`: Configuración de DataSource, Migraciones y Seeders.
- `main.ts`: Punto de entrada con configuraciones de seguridad (Helmet, Rate Limit, etc.).
