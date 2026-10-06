# Usar Node.js 18 (estable)
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Ejecutar seeder y luego iniciar el servidor
CMD ["sh", "-c", "node seeders/seed.js && node server.js"]