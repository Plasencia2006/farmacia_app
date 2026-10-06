# Usar Node.js 18 (estable)
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Hacer ejecutable el script de inicio
RUN chmod +x start.sh

# Exponer puerto
EXPOSE 3000

# Usar el script de inicio
CMD ["./start.sh"]