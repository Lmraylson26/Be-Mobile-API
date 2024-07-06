# AdonisJS Backend Sales Application

Este projeto é uma aplicação back-end desenvolvida com AdonisJS que fornece uma API RESTful para gerenciar usuários, clientes, produtos e vendas. A aplicação é dockerizada e utiliza MySQL como banco de dados. O projeto segue o padrão MVC e foi desenvolvido em:

- Adonis na versão 6.12.1
- Lucid na versão 21.1.0

<details>
<summary> Requisitos do Sistema</summary>

## Requisitos Locais
- Node.js (versão 14 ou superior)
- NPM (versão 6 ou superior)
- MySQL (versão 8 ou superior)
- VSCode (opcional, mas recomendado)
- Extensão Thunder Client para VSCode (opcional, mas recomendado)

## Requisitos rodar com Docker
- Docker (versão 20 ou superior)
- Docker Compose (versão 1.25 ou superior)
- VSCode (opcional, mas recomendado)
- Extensão Thunder Client para VSCode (opcional, mas recomendado)

### Instalando VSCode e Thunder Client

1. Baixe e instale o [Visual Studio Code](https://code.visualstudio.com/).
2. Abra o VSCode e vá para a aba de extensões (`Ctrl+Shift+X` ou `Cmd+Shift+X`).
3. Pesquise por `Thunder Client` e instale a extensão.

</details>


<details>
<summary> informações</summary>

## Arquivos Importantes

- `docker-compose.yml`
Este arquivo define os serviços do Docker para o projeto, incluindo o serviço do back-end e o serviço do banco de dados MySQL.

- `Dockerfile`
Este arquivo define como a imagem Docker do back-end será construída.

- `entrypoint.sh`
Este script é usado para inicializar o contêiner Docker, garantindo que o banco de dados MySQL esteja pronto antes de iniciar a aplicação AdonisJS.

</details>


## Como Instalar e Rodar o Projeto

<details>
<summary> Instalação Local</summary>

### Instalação Local

1. Clone o repositório:

```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo .env com as seguintes variáveis de ambiente:

```env
TZ=UTC
HOST=0.0.0.0
PORT=3333
LOG_LEVEL=info
APP_KEY=T_XEj1cGRvwwFR_OjQmUMA9QLAIl37CX
NODE_ENV=development
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_DATABASE=be_mobile_api
```

4. Execute as migrações para criar as tabelas no banco de dados:

```bash
node ace migration:run --force

```
5. Inicie a aplicação:

```bash
npm run dev

```

6. Acesse a aplicação em [http://localhost:3333](http://localhost:3333).
</details>

<details>
<summary> Instalação com Docker</summary>

### Instalação com Docker

1. Clone o repositório:

```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
```

2. Crie o arquivo .env com as seguintes variáveis de ambiente:

```env
TZ=UTC
HOST=0.0.0.0
PORT=3333
LOG_LEVEL=info
APP_KEY=T_XEj1cGRvwwFR_OjQmUMA9QLAIl37CX
NODE_ENV=development
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_DATABASE=be_mobile_api
```

3. Construa e inicie os contêineres:

```bash
docker-compose up --build
```

4. Acesse a aplicação em [http://localhost:3333](http://localhost:3333).
</details>

