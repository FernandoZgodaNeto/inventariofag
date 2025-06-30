# Inventário Inteligente - Sistema Full Stack com MERN

## 🗂️ Sobre o Projeto

Inventário Inteligente é uma aplicação web desenvolvida com a stack MERN (MongoDB, Express, React, Node.js), criada para facilitar a administração de produtos, usuários e pedidos de forma moderna e eficiente. Ideal para equipes que buscam controle completo com uma interface clara e responsiva.

---

## ⚙️ Recursos Principais

### 🔑 Acesso e Autenticação

- **Cadastro de Conta** com validações robustas
- **Login com Tokens JWT** para sessões seguras
- **Painel do Usuário** para gerenciamento de informações pessoais

### 👤 Administração de Usuários

- **Tabela com Paginação** para listagem de usuários
- **Sistema de Filtros** por nome e email
- **Funções CRUD** (criar, editar, visualizar e excluir)
- **Validações Dinâmicas** em tempo real

### 📦 Controle de Pedidos

- **Criação de Pedidos** com múltiplos produtos
- **Listagens Otimizadas** com busca por cliente
- **Detalhes Completos** de cada pedido
- **Exportação em PDF** para impressão
- **Remoção Segura** com confirmação

### 📊 Painel Administrativo

- **Gráficos e Indicadores** com dados atualizados automaticamente

---

## 🧰 Tecnologias e Ferramentas

### Backend

- `Node.js` e `Express.js` para a API RESTful
- `MongoDB` com `Mongoose` para persistência de dados
- `JWT` para autenticação baseada em token
- `Express Validator` para sanitização
- `Morgan` para logs de requisições

### Frontend

- `React` com `TypeScript` para interfaces robustas
- `Redux Toolkit` e `RTK Query` para gerenciamento de estado e dados
- `React Router` para rotas
- `PrimeReact` e `Tailwind CSS` para UI responsiva e moderna
- `Formik` e `Yup` para formulários validados

---

## 🚧 Como Instalar e Rodar

### Pré-Requisitos

- Node.js (v16+)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Configuração do Servidor (Backend)

```bash
cd backend
npm install
```

Crie o arquivo `.env` em `backend/`:

```env
PORT=4000
MONGO_URI=mongodb://localhost/inventario
JWT_AUTH=chave_secreta_jwt
NODE_ENV=development
```

### Configuração da Interface (Frontend)

```bash
cd frontend
npm install
```

Crie o arquivo `.env` em `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000/api
```

---

## ▶️ Iniciando a Aplicação

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

### Acesso

- Interface: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:4000](http://localhost:4000)

---

## 🗃️ Organização do Código

```
inventario-inteligente/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validations/
│   ├── constant.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── provider/
│   │   └── assets/
│   └── package.json
└── README.md
```

---

## 🧩 Considerações Técnicas

### Banco de Dados

- MongoDB como base de dados principal
- Conexão configurável via `.env`

### Segurança

- Proteção via CORS
- Limitação de requisições (Rate Limiting)
- Validação de dados em todas as rotas

### Autenticação

- Tokens JWT com tempo de expiração ajustável
- Validação de credenciais com feedback amigável

---

## 📌 Melhorias Aplicadas

- 🌍 **Localização Completa** para português
- 🧾 **Mensagens de Erro** amigáveis e traduzidas
- 🧹 **Código Limpo**, comentado e bem estruturado
- 📚 **Documentação interna** com JSDoc

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
