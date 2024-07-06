#!/bin/sh

# Aguardando o MySQL estar disponível
echo "Esperando o MySQL iniciar..."
while ! nc -z db 3306; do
  sleep 1
done

# Rodando as migrações
echo "Rodando as migrações..."
node ace migration:run --force

# Iniciando o servidor AdonisJS
echo "Iniciando o servidor AdonisJS..."
npm run dev
