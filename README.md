# Sistema de Gerenciamento de Inventário - MERN Stack

## 📋 Descrição

Sistema completo de gerenciamento de inventário desenvolvido com a stack MERN (MongoDB, Express.js, React.js, Node.js). O sistema permite gerenciar usuários, pedidos e produtos de forma eficiente e intuitiva.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Registro de Usuários**: Cadastro com validação de email e senha
- **Login Seguro**: Autenticação com JWT e reCAPTCHA
- **Perfil de Usuário**: Visualização e edição de dados pessoais

### 👥 Gerenciamento de Usuários
- **Listagem de Usuários**: Visualização paginada de todos os usuários
- **Busca Avançada**: Filtros por nome e email
- **CRUD Completo**: Criar, visualizar, editar e excluir usuários
- **Validações**: Verificações de dados obrigatórios

### 📦 Gerenciamento de Pedidos
- **Criação de Pedidos**: Adicionar pedidos com múltiplos itens
- **Listagem Inteligente**: Paginação e busca por cliente
- **Visualização Detalhada**: Detalhes completos do pedido
- **Impressão**: Geração de relatórios em PDF
- **Exclusão Segura**: Confirmação antes de deletar

### 📊 Dashboard
- **Gráficos Interativos**: Visualização de dados em tempo real
- **Métricas Importantes**: Estatísticas de vendas e usuários
- **Interface Responsiva**: Adaptável a diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação por tokens
- **Express Validator**: Validação de dados
- **Morgan**: Logging de requisições

### Frontend
- **React.js**: Biblioteca JavaScript
- **TypeScript**: Tipagem estática
- **Redux Toolkit**: Gerenciamento de estado
- **RTK Query**: Cache e sincronização de dados
- **React Router**: Navegação entre páginas
- **PrimeReact**: Componentes UI
- **Tailwind CSS**: Framework CSS
- **Formik + Yup**: Formulários e validação
- **ReCAPTCHA**: Proteção contra bots

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

### Backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz do backend:
```env
PORT=4000
MONGO_URI=mongodb://localhost/inventario
JWT_AUTH=sua_chave_secreta_jwt
CAPTCHA_SCREATE_KEY=sua_chave_recaptcha
NODE_ENV=development
```

### Frontend
```bash
cd frontend
npm install
```

Crie um arquivo `.env` na raiz do frontend:
```env
VITE_BACKEND_URL=http://localhost:4000/api
VITE_SITE_KEY=sua_chave_site_recaptcha
```

## 🏃‍♂️ Executando o Projeto

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

O sistema estará disponível em:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

## 📁 Estrutura do Projeto

```
inventory-management-system-mern-master/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (banco, etc.)
│   │   ├── controllers/     # Controladores da API
│   │   ├── middlewares/     # Middlewares (auth, validação)
│   │   ├── models/          # Modelos do MongoDB
│   │   ├── routes/          # Rotas da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── utils/           # Utilitários
│   │   └── validations/     # Validações de entrada
│   ├── constant.js          # Constantes da aplicação
│   └── server.js            # Arquivo principal do servidor
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── layout/          # Layouts da aplicação
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── provider/        # Redux store e queries
│   │   └── assets/          # Recursos estáticos
│   └── package.json
└── README.md
```

## 🔧 Configurações Importantes

### Banco de Dados
O sistema utiliza MongoDB como banco de dados principal. Certifique-se de que o MongoDB esteja rodando e acessível.

### Autenticação
- **JWT**: Tokens de autenticação com expiração configurável
- **reCAPTCHA**: Proteção contra ataques automatizados
- **Validação**: Verificação de dados de entrada

### Segurança
- **CORS**: Configurado para permitir requisições do frontend
- **Rate Limiting**: Proteção contra spam de requisições
- **Input Validation**: Validação rigorosa de dados de entrada

## 📝 Melhorias Implementadas

### Tradução Completa
- ✅ Todos os textos traduzidos para português
- ✅ Mensagens de erro localizadas
- ✅ Interface completamente em português

### Documentação Profissional
- ✅ Comentários JSDoc em todos os arquivos
- ✅ Documentação de funções e classes
- ✅ Explicações detalhadas de lógica de negócio

### Código Limpo
- ✅ Remoção de comentários desnecessários
- ✅ Estrutura de código organizada
- ✅ Padrões de nomenclatura consistentes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Sistema desenvolvido com foco em boas práticas de desenvolvimento, código limpo e documentação profissional.

---

**Nota**: Este sistema foi completamente traduzido para português e documentado seguindo padrões profissionais do mercado de trabalho. 