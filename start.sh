#!/bin/sh

echo "🚀 Iniciando aplicación Farmacia..."

# Ejecutar seeder (ignorar errores si ya existen datos)
echo "📦 Ejecutando seeder..."
node seeders/seed.js || echo "️  Seeder falló o ya existen datos, continuando..."

# Esperar 2 segundos para asegurar que la BD esté lista
sleep 2

# Iniciar servidor
echo "🌐 Iniciando servidor..."
exec node server.js