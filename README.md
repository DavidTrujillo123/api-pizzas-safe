# 🍕 Pizzas & Ingredients GraphQL API

API robusta construida con **NestJS**, **GraphQL (Apollo)** y **TypeORM (PostgreSQL)**, diseñada con un enfoque en seguridad multicapa y gestión relacional.

## 🚀 Características Principales

- **CRUD Completo:** Gestión de Pizzas e Ingredientes con relaciones muchos-a-muchos.
- **Triple Capa de Seguridad:** API Key Global, Autenticación JWT y RBAC (Roles y Permisos).
- **Documentación Dual:** GraphQL Playground para exploraciones y Swagger para la API REST.
- **Arquitectura Escalable:** Gestión dinámica de roles y permisos por parte de administradores.
- **Dockerizado:** Soporte para contenedores para facilitar el despliegue de la infraestructura.
- **Historial de Dispositivos:** Registro automático de IP, tipo de dispositivo y geolocalización en cada inicio de sesión.

---

## 🛡️ Seguridad y Autenticación

La API implementa un modelo de seguridad "Zero Trust":

1.  **API Key Global:** Todas las peticiones deben incluir la cabecera `X-API-KEY`.
2.  **JWT (Access & Refresh Tokens):** Tras validar la API Key, los endpoints protegidos requieren un Bearer Token.
3.  **RBAC (Role-Based Access Control):** Control granular por roles (Admin/User).
4.  **Device Tracking:** Registro de auditoría de dispositivos (IP y Ubicación) integrado en el flujo de login.

---

## 🛠️ Instalación y Configuración

### 1. Clonar y Configurar Entorno

```bash
cp .env.example .env
# Ajusta tus credenciales en el archivo .env si es necesario
```

### 2. Levantar Infraestructura (Opcional)

Si deseas utilizar Docker para la base de datos PostgreSQL, puedes usar el archivo proporcionado:

```bash
docker-compose up -d
```

> [!NOTE]  
> Este paso es opcional. Puedes usar una instancia local de PostgreSQL siempre que configures correctamente las variables en el archivo `.env`.

### 3. Iniciar Aplicación

```bash
pnpm install
pnpm start:dev
```

### 4. Poblar Base de Datos (Opcional)

Puedes ejecutar el seeder para tener datos de prueba iniciales:

```bash
pnpm seed
```

---

## 📚 Documentación de API

- **Swagger (REST):** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **GraphQL API:** `http://localhost:3000/graphql`

#### 🛡️ Consultando GraphQL

Debido a la estricta política de seguridad ("Zero Trust"), el GraphQL Playground integrado está bloqueado por defecto.

Para consultar la API GraphQL, se recomienda utilizar herramientas externas como **Postman**, **Insomnia** o **Apollo Studio**, configurando los siguientes **HTTP Headers** en cada petición:

1. **Obligatorio para TODAS las peticiones (Queries y Mutations):**
   ```json
   {
     "X-API-KEY": "tu-api-key-aqui"
   }
   ```
2. **Obligatorio adicionales para resolvers protegidos (ej. Mutaciones como Admin):**
   ```json
   {
     "Authorization": "Bearer <tu-jwt-token-aqui>"
   }
   ```

### Gestión de Usuarios y Auditoría (Admin)

Se han habilitado endpoints exclusivos para administradores en Swagger:

- `GET /users`: Lista todos los usuarios con sus roles, permisos e **historial de dispositivos**.

---

## ⚙️ Tecnologías Utilizadas

- **Framework:** NestJS
- **API:** GraphQL & REST (Swagger)
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Security:** Helmet, Rate Limit, Passport (JWT), API Key, GeoIP Geolocation.
- **Containerization:** Docker & Docker Compose

---

## 🔒 Arquitectura de Seguridad Detallada

La API implementa un modelo de defensa en profundidad con múltiples capas de validación:

### 1. Validación Estricta de Entorno (Fail-Fast)

Al iniciar la aplicación, un script nativo verifica que el archivo `.env` contenga todas las variables requeridas. Si alguna falta, el proceso se aborta inmediatamente con un error descriptivo en consola, evitando estados inseguros.

### 2. Capa de API Key Global

Actúa como el primer nivel de protección, interceptando todas las peticiones antes de llegar a los controladores para asegurar que provengan de clientes autorizados.

### 3. Autenticación JWT (Identity)

Utiliza Passport para validar la identidad del usuario mediante Access Tokens de corta duración y Refresh Tokens para renovar el acceso de forma segura.

### 4. RBAC (Control de Acceso Basado en Roles)

Aplica el principio de mínimo privilegio mediante el decorador `@Roles()` y un `RolesGuard`, permitiendo acciones administrativas solo a usuarios con el rol adecuado.

### 5. Auditoría de Dispositivos y Geolocalización

En cada inicio de sesión exitoso, el sistema captura:

- **IP Address:** Dirección IP del cliente.
- **Device Type:** Información del User-Agent.
- **Location:** Ciudad y País determinados mediante `geoip-lite`.
- **Timestamp:** Fecha y hora exacta del acceso.

### 6. Seguridad de Red y Cabeceras

- **Helmet:** Protege contra ataques como XSS y Clickjacking mediante cabeceras HTTP.
- **Rate Limit:** Mitiga ataques por fuerza bruta limitando las peticiones por IP.

---

## 📦 Librerías de Seguridad y Versiones

| Librería             | Versión   | Descripción                         |
| :------------------- | :-------- | :---------------------------------- |
| `helmet`             | `^8.1.0`  | Protección de cabeceras HTTP.       |
| `express-rate-limit` | `^8.2.1`  | Limitación de tasa de peticiones.   |
| `bcrypt`             | `^6.0.0`  | Hashing de contraseñas.             |
| `@nestjs/jwt`        | `^11.0.2` | Emisión y validación de tokens JWT. |
| `passport`           | `^0.7.0`  | Middleware de autenticación.        |
| `passport-jwt`       | `^4.0.1`  | Estrategia de autenticación JWT.    |
| `geoip-lite`         | `^1.4.10` | Geolocalización de IPs local.       |
