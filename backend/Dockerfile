FROM node:20-alpine

# Definir el usuario node (incluido por defecto en imágenes de node) para ejecutar la app
# en lugar del usuario root
WORKDIR /usr/src/app

# Cambiar permisos de la carpeta de trabajo al usuario node
RUN chown -R node:node /usr/src/app

# Copiar archivos de dependencias como usuario node
COPY --chown=node:node package.json pnpm-lock.yaml* package-lock.json* ./

# Instalar dependencias
RUN npm ci --omit=dev || npm install --omit=dev

# Copiar el código fuente como usuario node
COPY --chown=node:node . .

# Cambiar al usuario no-root
USER node

# Exponer el puerto
EXPOSE 4000

# Iniciar la aplicación
CMD ["npm", "start"]
