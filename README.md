# 🍕 Pizzas & Ingredients GraphQL API

API robusta construida con **NestJS**, **GraphQL (Apollo)** y **TypeORM (PostgreSQL)**, diseñada con un enfoque en seguridad multicapa y gestión relacional.

## 🚀 Características Principales

- **CRUD Completo:** Gestión de Pizzas e Ingredientes con relaciones muchos-a-muchos.
- **Triple Capa de Seguridad:** API Key Global, Autenticación JWT y RBAC (Roles y Permisos).
- **Documentación Dual:** GraphQL Playground para exploraciones y Swagger para la API REST.
- **Arquitectura Escalable:** Gestión dinámica de roles y permisos por parte de administradores.
- **Dockerizado:** Entorno listo para desarrollo con un solo comando.

---

## 🛡️ Seguridad y Autenticación

La API implementa un modelo de seguridad "Zero Trust":

1.  **API Key Global:** Todas las peticiones deben incluir la cabecera `X-API-KEY: pizzas-secret-api-key-2026`.
2.  **JWT (Access & Refresh Tokens):** Tras validar la API Key, los endpoints protegidos requieren un Bearer Token.
3.  **RBAC (Role-Based Access Control):**
    - **Admin:** Acceso total a mutaciones (escritura) y gestión del sistema.
    - **User:** Acceso restringido a solo lectura (queries).

---

## 🛠️ Instalación y Configuración

### 1. Clonar y Configurar Entorno

```bash
cp .env.example .env
# Ajusta tus credenciales en el archivo .env si es necesario
```

### 2. Levantar Infraestructura (Docker)

```bash
docker-compose up -d
```

### 3. Iniciar Aplicación

```bash
pnpm install
pnpm start:dev
```

### 4. Poblar Base de Datos (Opcional)

```bash
pnpm seed
```

---

## 📚 Documentación de API

- **Swagger (REST):** [http://localhost:5431/api/docs](http://localhost:5431/api/docs)
- **GraphQL Playground:** [http://localhost:5431/graphql](http://localhost:5431/graphql)

### Usuarios de Prueba (Seeder)

- **Admin:** `admin` / `admin123`
- **User:** `user` / `user123`

---

## ⚙️ Tecnologías Utilizadas

- **Framework:** NestJS
- **API:** GraphQL & REST (Swagger)
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Security:** Helmet, Rate Limit, Passport (JWT), API Key.
- **Containerization:** Docker & Docker Compose
