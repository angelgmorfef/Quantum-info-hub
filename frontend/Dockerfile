# Etapa 1: Construcción
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm ci || npm install

# Copiar el código fuente y construir
COPY . .
RUN npm run build

# Etapa 2: Servidor Web seguro
FROM nginx:alpine

# Copiar el build compilado a la carpeta pública de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configurar nginx para correr como no-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Cambiar al usuario nginx
USER nginx

# Exponer el puerto por defecto de nginx
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
