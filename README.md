# Avaliação Final do Módulo

Este projeto é uma aplicação back-end desenvolvida com Node.js e Express. Fornece rotas para funcionalidades de cadastro de usuários e gerenciamento de mensagens (CRUD).

## Tecnologias empregadas
- **Node.js**
- **Express**
- **CORS**
- **bcrypt** (para hash de senhas)
- **UUID** (para gerar identificadores únicos)
- **Sucrase**

## Funcionalidades da aplicação

### Usuários
- **Cadastro de Usuário**: Rota para criar um novo usuário com validações de nome, e-mail e senha.
- **Login de Usuário**: Rota para login de usuário utilizando e-mail e senha, com verificação de credenciais.

### Mensagens
- **Criação de Mensagem**: Rota para criar uma nova mensagem associada a um usuário, com validações de título e descrição.
- **Leitura de Mensagens**: Rota para visualizar todas as mensagens de um usuário específico.
- **Atualização de Mensagem**: Rota para atualizar uma mensagem existente pelo ID.
- **Remoção de Mensagem**: Rota para deletar uma mensagem específica pelo ID.

## Rotas

### Usuários
- **POST** `/signup`: Cria um novo usuário.
- **POST** `/login`: Realiza login do usuário.

### Mensagens
- **POST** `/message`: Cria uma nova mensagem.
- **GET** `/message/:email`: Obtém todas as mensagens de um usuário.
- **PUT** `/message/:id`: Atualiza uma mensagem existente.
- **DELETE** `/message/:id`: Remove uma mensagem pelo ID.

### Boas-vindas
- **GET** `/`: Retorna uma mensagem de boas-vindas.

## Middlewares

### Validação de usuários (`src/middlewares/validationUsers.js`)
- **validateUserRegistration**: Valida os dados fornecidos durante o cadastro.
- **validateUserLogin**: Valida os dados fornecidos durante o login.

### Validação de mensagens (`src/middlewares/validationMessages.js`)
- **messageRegistration**: Verifica se o usuário existe e se os campos título e descrição foram fornecidos.
- **readMessages**: Valida a leitura das mensagens do usuário.
- **updateMessages**: Verifica se a mensagem a ser atualizada existe e se os campos obrigatórios foram fornecidos.
- **deleteMessages**: Verifica se a mensagem a ser deletada existe no banco.
