# 🍕 Pizzas & Ingredients GraphQL API

API robusta construida con **NestJS**, **GraphQL (Apollo)** y **TypeORM (PostgreSQL)**, diseñada con un enfoque en seguridad multicapa y gestión relacional.

## 🚀 Características Principales

- **CRUD Completo:** Gestión de Pizzas e Ingredientes con relaciones muchos-a-muchos.
- **Triple Capa de Seguridad:** API Key Global, Autenticación JWT y RBAC (Roles y Permisos).
- **Documentación Dual:** GraphQL Playground para exploraciones y Swagger para la API REST.
- **Arquitectura Escalable:** Gestión dinámica de roles y permisos por parte de administradores.
- **Dockerizado:** Entorno listo para desarrollo con un solo comando.
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

... (se mantienen los pasos de instalación) ...

---

## 📚 Documentación de API

- **Swagger (REST):** [http://localhost:5431/api/docs](http://localhost:5431/api/docs)
- **GraphQL Playground:** [http://localhost:5431/graphql](http://localhost:5431/graphql)

#### 🛡️ Consultando GraphQL

Debido a la estricta política de seguridad ("Zero Trust"), el GraphQL Playground integrado está bloqueado por defecto.

Para consultar la API GraphQL (`http://localhost:5431/graphql`), se recomienda utilizar herramientas externas como **Postman**, **Insomnia** o **Apollo Studio**, configurando los siguientes **HTTP Headers** en cada petición:

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

... (se mantiene el contenido previo) ...

### 2. Capa de API Key Global

... (se mantiene el contenido previo) ...

### 3. Autenticación JWT (Identity)

... (se mantiene el contenido previo) ...

### 4. RBAC (Control de Acceso Basado en Roles)

... (se mantiene el contenido previo) ...

### 5. Auditoría de Dispositivos y Geolocalización

En cada inicio de sesión exitoso, el sistema captura:

- **IP Address:** Dirección IP del cliente (con soporte para proxies).
- **Device Type:** Información extraída del User-Agent.
- **Location:** Ciudad y País determinados mediante la librería `geoip-lite`.
- **Timestamp:** Fecha y hora exacta del acceso.

Esta información es consultable por los administradores para detectar accesos sospechosos o comportamientos inusuales.

### 6. Seguridad de Red y Cabeceras

- **Helmet:** Cubre cabeceras HTTP estándar para prevenir ataques como XSS y Clickjacking.
- **Rate Limit:** Restringe el número de peticiones por IP en una ventana de tiempo.

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
