# Backend - Sistema de Gerenciamento de Inventário

## 📋 Descrição

Backend do sistema de gerenciamento de inventário desenvolvido em Node.js com Express e MongoDB. O sistema oferece funcionalidades completas para autenticação de usuários, gerenciamento de consumidores/clientes e controle de pedidos.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **bcryptjs** - Criptografia de senhas
- **express-validator** - Validação de dados
- **cors** - Cross-Origin Resource Sharing
- **morgan** - Logging de requisições HTTP

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── db.config.js          # Configuração do banco de dados
│   ├── controllers/
│   │   ├── Auth.controller.js     # Controlador de autenticação
│   │   ├── Consumer.controller.js # Controlador de consumidores
│   │   └── Order.controller.js    # Controlador de pedidos
│   ├── middlewares/
│   │   ├── Authentication.js      # Middleware de autenticação
│   │   ├── CaptchaBypass.js       # Middleware de captcha
│   │   ├── ErrorHandler.js        # Tratamento de erros
│   │   └── Validation.js          # Validação de dados
│   ├── models/
│   │   ├── Consumer.models.js     # Modelo de consumidor
│   │   ├── Orders.models.js       # Modelo de pedido
│   │   ├── profile.models.js      # Modelo de perfil
│   │   ├── user.models.js         # Modelo de usuário
│   │   └── index.js               # Exportação dos modelos
│   ├── routes/
│   │   ├── Auth.route.js          # Rotas de autenticação
│   │   ├── Consumer.route.js      # Rotas de consumidor
│   │   ├── Order.route.js         # Rotas de pedido
│   │   └── index.js               # Centralizador de rotas
│   ├── services/
│   │   ├── Auth.service.js        # Serviço de autenticação
│   │   ├── Consumer.service.js    # Serviço de consumidor
│   │   └── Orders.service.js      # Serviço de pedidos
│   ├── utils/
│   │   ├── ApiError.js            # Classe de erro customizada
│   │   ├── CatchAsync.js          # Wrapper para funções assíncronas
│   │   └── Token.utils.js         # Utilitários de token JWT
│   ├── validations/
│   │   ├── Auth.validation.js     # Validações de autenticação
│   │   ├── Consumer.validation.js # Validações de consumidor
│   │   └── Order.validation.js    # Validações de pedido
│   └── app.js                     # Configuração da aplicação
├── constant.js                    # Configurações públicas
├── server.js                      # Arquivo principal do servidor
└── package.json                   # Dependências do projeto
```

## 🔧 Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (local ou Atlas)
- Yarn ou npm

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   cd backend
   yarn install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   # Crie um arquivo .env na raiz do backend
   PORT=4000
   MONGO_URI=mongodb://localhost/inventario
   JWT_AUTH=sua_chave_secreta_jwt
   NODE_ENV=development
   CAPTCHA_SCREATE_KEY=sua_chave_recaptcha
   ```

4. Execute o servidor:
   ```bash
   # Desenvolvimento
   yarn dev
   
   # Produção
   yarn start
   ```

## 📚 API Endpoints

### Autenticação (`/api/v1/auth`)

- `POST /register` - Registro de usuário
- `POST /login` - Login de usuário
- `GET /profile` - Obter perfil do usuário

### Consumidores (`/api/v1/consumer`)

- `GET /get-all` - Listar consumidores (com paginação)
- `GET /get-search` - Buscar consumidores para seleção
- `POST /register` - Registrar novo consumidor
- `GET /get/:id` - Obter consumidor específico
- `PATCH /update/:id` - Atualizar consumidor
- `DELETE /delete/:id` - Excluir consumidor
- `GET /dashboard` - Dados do dashboard

### Pedidos (`/api/v1/orders`)

- `POST /create-order` - Criar novo pedido
- `GET /get-orders` - Listar pedidos (com paginação)
- `GET /get-invoice/:id` - Obter dados para fatura
- `DELETE /delete/:id` - Excluir pedido

## 🔐 Segurança

- **Autenticação JWT**: Tokens de acesso para autenticação
- **Criptografia de Senhas**: Senhas criptografadas com bcrypt
- **Validação de Dados**: Validação rigorosa de entrada com express-validator
- **CORS**: Configurado para permitir requisições cross-origin
- **Captcha**: Integração com Google reCAPTCHA (em produção)

## 🗄️ Modelos de Dados

### Usuário
- `name`: Nome completo
- `email`: Email único
- `password`: Senha criptografada

### Consumidor
- `user`: Referência ao usuário criador
- `name`: Nome completo
- `email`: Email único
- `mobile`: Telefone
- `dob`: Data de nascimento
- `address`: Endereço
- `isActive`: Status ativo/inativo

### Pedido
- `user`: Referência ao usuário criador
- `consumer`: Referência ao consumidor
- `items`: Array de itens (nome e preço)
- `isActive`: Status ativo/inativo

### Perfil
- `user`: Referência ao usuário
- `refresh_token`: Token de renovação

## 🛠️ Funcionalidades

- ✅ Autenticação e autorização
- ✅ CRUD completo de consumidores
- ✅ Gerenciamento de pedidos
- ✅ Dashboard com estatísticas
- ✅ Paginação e busca
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Logs de requisições
- ✅ Criptografia de senhas

## 📝 Notas de Desenvolvimento

- O sistema utiliza arquitetura MVC (Model-View-Controller)
- Implementa padrão Repository através dos serviços
- Middleware de autenticação aplicado em rotas protegidas
- Validação centralizada com express-validator
- Tratamento de erros customizado com ApiError
- Wrapper CatchAsync para captura automática de erros assíncronos

## 🔄 Melhorias Implementadas

- ✅ Comentários profissionais em todo o código
- ✅ Correção de problemas de segurança (senhas em texto plano)
- ✅ Melhoria na lógica de busca (case insensitive)
- ✅ Otimização do cálculo de vendas no dashboard
- ✅ Remoção de código não utilizado
- ✅ Melhoria no tratamento de erros
- ✅ Documentação completa da API 