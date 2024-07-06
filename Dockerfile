# Usar a imagem base do Node.js
FROM node:22-alpine3.19

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app-backend

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Copiar o script de inicialização
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expor a porta que o aplicativo vai usar
EXPOSE 3333

# Definir a variável de ambiente para desenvolvimento
ENV NODE_ENV=development

# Comando para iniciar a aplicação
CMD ["sh", "/usr/local/bin/entrypoint.sh"]
