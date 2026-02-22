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

---

## 🔒 Arquitectura de Seguridad Detallada

La API implementa un modelo de defensa en profundidad con múltiples capas de validación:

### 1. Validación Estricta de Entorno (Fail-Fast)

Al iniciar la aplicación, un script nativo verifica que el archivo `.env` contenga todas las variables requeridas (17 variables críticas). Si alguna falta, el proceso se aborta inmediatamente con un error descriptivo en consola. **Propósito:** Evitar que el sistema opere en un estado inseguro o mal configurado.

### 2. Capa de API Key Global

Nivel más externo de protección que intercepta todas las peticiones (REST y GraphQL) antes de llegar a los controladores.

- **Cabecera:** `X-API-KEY`
- **Función:** Protege contra ataques de denegación de servicio a nivel de aplicación (L7) y asegura que solo clientes autorizados inicien el flujo de autenticación.

### 3. Autenticación JWT (Identity)

Utiliza `Passport` para validar la identidad del usuario una vez superada la API Key.

- **Access Token:** Token de corta duración para autorización de peticiones.
- **Refresh Token:** Token persistente para renovar el acceso sin pedir credenciales nuevamente.
- **Función:** Identificar de forma única al usuario logueado.

### 4. RBAC (Control de Acceso Basado en Roles)

Nivel de autorización granular basado en el decorador `@Roles()` y un `RolesGuard` personalizado.

- **Admin:** Posee permisos de escritura (POST, PATCH, DELETE) y gestión de roles.
- **User:** Limitado a consultas de lectura (GET, Queries).
- **Función:** Aplicar el principio de "mínimo privilegio" en toda la plataforma.

### 5. Seguridad de Red y Cabeceras

- **Helmet:** Cubre cabeceras HTTP estándar para prevenir ataques como XSS y Clickjacking.
- **Rate Limit:** Restringe el número de peticiones por IP en una ventana de tiempo (configurable vía `.env`).
- **CORS:** Configuración dinámica de orígenes y métodos permitidos.
