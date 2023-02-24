
## Digital Bank
Projeto 


## Front-End
 - Nextjs
 - Chakra-ui
 - ContexAp

## Backend
 - Nestjs
 - typescript
 - PostgreSQL
 - Bcrypt
 - JSON Web Token


## Como rodar a aplicação frontend
Clone o repositório e execute o seguinte comando no diretório do projeto:

npm install

Este comando instalará todas as dependências do projeto e as baixará para a pasta node_modules.

## Executando o projeto
Depois de instalar as dependências, você pode iniciar o projeto com o seguinte comando:

npm start

Este comando iniciará o servidor de desenvolvimento e abrirá o projeto em http://localhost:3000 no navegador.

## Como rodar a aplicação banckend
Este projeto utiliza um arquivo .env para armazenar configurações sensíveis, como credenciais de banco de dados e chaves de API. O arquivo .env deve ser criado na raiz do projeto e seguir o formato:

JWT_SECRET= DATABASE_URL=

Depois de instalar as dependências e configurar o arquivo .env, você pode iniciar o projeto com o seguinte comando:

npm run start:dev

Este comando iniciará o servidor e o projeto estará disponível em http://localhost:5555 no navegador.