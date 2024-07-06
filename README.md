# AdonisJS Backend Sales Application - be. Mobile - Desafio

Este projeto é uma aplicação back-end desenvolvida com AdonisJS que fornece uma API RESTful para gerenciar usuários, clientes, produtos e vendas. A aplicação é dockerizada e utiliza MySQL como banco de dados. O projeto segue o padrão MVC e foi desenvolvido em:

- Adonis na versão 6.12.1
- Lucid na versão 21.1.0

<details>
<summary> Requisitos do Sistema</summary>

## Requisitos para rodar localmente
- Node.js (versão 14 ou superior)
- NPM (versão 6 ou superior)
- MySQL (versão 8 ou superior)
- VSCode (opcional, mas recomendado)
- Extensão Thunder Client para VSCode (opcional, mas recomendado)

## Requisitos para rodar com Docker
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

## Arquivos importantes

- `docker-compose.yml`
Este arquivo define os serviços do Docker para o projeto, incluindo o serviço do back-end e o serviço do banco de dados MySQL.

- `Dockerfile`
Este arquivo define como a imagem Docker do back-end será construída.

- `entrypoint.sh`
Este script é usado para inicializar o contêiner Docker, garantindo que o banco de dados MySQL esteja pronto antes de iniciar a aplicação AdonisJS.

</details>


## Como instalar e rodar o projeto

<details>
<summary> Instalação Local</summary>

### Instalação local

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

## Como testar as rotas com Thunder Client


### Testando as Rotas

- Com o Thunder Client instalado, clique no ícone da extensão na barra lateral do VScode.

- Clique em `"New Request"` para criar uma nova requisição.

<details>
<summary>Exemplo de Requisição para Signup</summary>

- URL: `http://localhost:3333/signup`
- Método: `POST`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "name": "Anakin Skywalker",
  "email": "anakin_padawan@starwars",
  "password": "p@ide2"
}
```
</details>
<details>
<summary>Exemplo de Requisição para Login</summary>

- URL: `http://localhost:3333/login`
- Método: `POST`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "email": "anakin_padawan@starwars",
  "password": "p@ide2"
}
```
</details>


- Todas as rotas a partir daqui necessida de autenticação com `JWT`

1. Ao acessar a rota de login com um email e password válidos você receberá como resposta da requisição uma chave: `Bearer`

2. Copie essa chave e cole em Auth -> Auth -> Token Authorization

<details>
<summary>Clients</summary>

### Listar todos os clientes

- URL: `http://localhost:3333/clients`
- Método: `GET`

### Mostrar detalhes de um cliente

- URL: `http://localhost:3333/clients/:id`
- Método: `GET`


### Criar um cliente

- URL: `http://localhost:3333/clients`
- Método: `POST`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "name": "Lucas Skywater",
  "cpf": "00011122233",
  "userId": 1
}

```

### Atualizar um cliente

- URL: `http://localhost:3333/clients/:id`
- Método: `PUT`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "name": "Luke Skywalker",
  "cpf": "00011122233",
  "userId": 1
}

```

### Excluir um cliente

- URL: `http://localhost:3333/clients/:id`
- Método: `DELETE`

</details>
<details>
<summary>Products</summary>

### Listar todos os produtos

- URL: `http://localhost:3333/products`
- Método: `GET`

### Mostrar detalhes de um produto

- URL: `http://localhost:3333/products/:id`
- Método: `GET`


### Criar um produto

- URL: `http://localhost:3333/products`
- Método: `POST`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "name": "Light saber blue",
  "price": 10,
  "description": "Peça rara passada de pai para filho"
}

```

### Atualizar um produto

- URL: `http://localhost:3333/products/:id`
- Método: `PUT`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "name": "Light saber blue",
  "price": 10.000,
  "description": "Peça rara passada de pai para filho, pelo melhor amigo do pai"
}

```

### Excluir um produto (soft delete)

- URL: `http://localhost:3333/products/:id`
- Método: `DELETE`

</details>
<details>
<summary>Sales</summary>

### Criar um venda

- URL: `http://localhost:3333/sales`
- Método: `POST`
- Cabeçalhos: `Content-Type: application/json`
- Corpo:
```Json
{
  "clientId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}

```
</details>

## Exemplo guiado

### Passo a passo para testar a aplicação

1. **Cria um User**
   - URL: `http://localhost:3333/signup`
   - Método: `POST`
   - Cabeçalhos: `Content-Type: application/json`
   - Corpo:
     ```json
     {
       "name": "Anakin Skywalker",
       "email": "anakin_padawan@starwars",
       "password": "p@ide2"
     }
     ```

2. **Faz login com User**
   - URL: `http://localhost:3333/login`
   - Método: `POST`
   - Cabeçalhos: `Content-Type: application/json`
   - Corpo:
     ```json
     {
       "email": "anakin_padawan@starwars",
       "password": "p@ide2"
     }
     ```
   - Copie o token JWT retornado.

3. **Cria 3 clientes**
   - Cliente 1:
     - URL: `http://localhost:3333/clients`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Leia Organa",
         "cpf": "11122233344",
         "userId": 1
       }
       ```
   - Cliente 2:
     - URL: `http://localhost:3333/clients`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Han Solo",
         "cpf": "22233344455",
         "userId": 1
       }
       ```
   - Cliente 3:
     - URL: `http://localhost:3333/clients`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Chewbacca",
         "cpf": "33344455566",
         "userId": 1
       }
       ```

4. **Edita um cliente**
   - URL: `http://localhost:3333/clients/2`
   - Método: `PUT`
   - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
   - Corpo:
     ```json
     {
       "name": "Han Solo",
       "cpf": "22233344455",
       "userId": 1
     }
     ```

5. **Apaga um cliente**
   - URL: `http://localhost:3333/clients/3`
   - Método: `DELETE`
   - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`

6. **Verifica um cliente específico**
   - URL: `http://localhost:3333/clients/1`
   - Método: `GET`
   - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`

7. **Cria 3 Produtos**
   - Produto 1:
     - URL: `http://localhost:3333/products`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Light saber blue",
         "price": 10,
         "description": "Peça rara passada de pai para filho"
       }
       ```
   - Produto 2:
     - URL: `http://localhost:3333/products`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Light saber red",
         "price": 15,
         "description": "Peça rara de um Sith"
       }
       ```
   - Produto 3:
     - URL: `http://localhost:3333/products`
     - Método: `POST`
     - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
     - Corpo:
       ```json
       {
         "name": "Blaster",
         "price": 20,
         "description": "Arma preferida dos stormtroopers"
       }
       ```

8. **Edita um produto**
   - URL: `http://localhost:3333/products/2`
   - Método: `PUT`
   - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
   - Corpo:
     ```json
     {
       "name": "Light saber red",
       "price": 20,
       "description": "Peça rara de um Lord Sith"
     }
     ```

9. **Apaga um produto**
   - URL: `http://localhost:3333/products/3`
   - Método: `DELETE`
   - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`

10. **Verifica se estão todos os produtos**
    - URL: `http://localhost:3333/products`
    - Método: `GET`
    - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`

11. **Verifica um produto específico**
    - URL: `http://localhost:3333/products/1`
    - Método: `GET`
    - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`

12. **Cria uma venda**
    - URL: `http://localhost:3333/sales`
    - Método: `POST`
    - Cabeçalhos: `Content-Type: application/json`, `Authorization: Bearer <SEU_TOKEN>`
    - Corpo:
      ```json
      {
        "clientId": 1,
        "products": [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 1
          }
        ]
      }
      ```

13. **Verifica se estão todos os clientes**
    - URL: `http://localhost:3333/clients`
    - Método: `GET`
    - Cabeçalhos: `Authorization: Bearer <SEU_TOKEN>`
