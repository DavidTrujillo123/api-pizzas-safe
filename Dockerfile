# Etapa de desarrollo (builder)
FROM node:20-alpine AS builder

# Instalar pnpm globalmente
RUN npm i -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Compilar proyecto
RUN pnpm build


# Etapa de producción (runner)
FROM node:20-alpine AS runner

# Instalar pnpm
RUN npm i -g pnpm

WORKDIR /app

# Establecer entorno en producción
ENV NODE_ENV=production

# Copiar pnpm lock y package
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Copiar el build desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Variables por defecto (las verdaderas se inyectan en ejecución)
ENV PORT=3000

# Exponer el puerto
EXPOSE ${PORT}

# Comando de inicio
CMD ["node", "dist/main"]
