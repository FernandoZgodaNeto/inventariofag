# Frontend - Sistema de Gerenciamento de Inventário

## 📋 Descrição

Frontend do sistema de gerenciamento de inventário desenvolvido em React com TypeScript. O sistema oferece uma interface moderna e responsiva para gerenciamento de usuários, pedidos e dashboard com gráficos.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **Redux Toolkit** - Gerenciamento de estado global
- **RTK Query** - Gerenciamento de cache e requisições
- **React Router** - Roteamento da aplicação
- **PrimeReact** - Biblioteca de componentes UI
- **Tailwind CSS** - Framework CSS utilitário
- **Formik + Yup** - Gerenciamento de formulários e validação
- **Chart.js** - Gráficos e visualizações
- **React Icons** - Ícones SVG
- **Sonner** - Sistema de notificações toast

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── BredCrums.tsx           # Componente de breadcrumbs
│   │   ├── Header.tsx              # Cabeçalho da aplicação
│   │   └── Loader.tsx              # Componente de carregamento
│   ├── layout/
│   │   └── MainLayout.tsx          # Layout principal com sidebar
│   ├── pages/
│   │   ├── Error.tsx               # Página de erro 404
│   │   ├── Home/
│   │   │   ├── components/
│   │   │   │   ├── Basic.tsx       # Gráfico de barras
│   │   │   │   └── Pie.tsx         # Gráfico de pizza
│   │   │   └── index.tsx           # Dashboard principal
│   │   ├── Invoice/
│   │   │   └── index.tsx           # Página de faturas
│   │   ├── Login.tsx               # Página de login
│   │   ├── Orders/
│   │   │   ├── components/
│   │   │   │   ├── AddOrder.model.tsx
│   │   │   │   ├── Card.order.tsx
│   │   │   │   └── ShowAndPrint.model.tsx
│   │   │   └── index.tsx           # Página de pedidos
│   │   ├── Register.tsx            # Página de registro
│   │   └── Users/
│   │       ├── Components/
│   │       │   ├── Card.user.tsx
│   │       │   ├── Model.user.tsx
│   │       │   └── UpdateModel.user.tsx
│   │       └── index.tsx           # Página de usuários
│   ├── provider/
│   │   ├── queries/
│   │   │   ├── Auth.query.ts       # Queries de autenticação
│   │   │   ├── Orders.query.ts     # Queries de pedidos
│   │   │   └── Users.query.ts      # Queries de usuários
│   │   ├── Route.tsx               # Configuração de rotas
│   │   ├── slice/
│   │   │   ├── Sidebar.slice.ts    # Estado da sidebar
│   │   │   └── user.slice.ts       # Estado do usuário
│   │   └── Store.tsx               # Store Redux
│   ├── App.tsx                     # Componente principal
│   ├── main.tsx                    # Ponto de entrada
│   └── index.css                   # Estilos globais
├── public/
├── package.json                    # Dependências do projeto
├── tailwind.config.js              # Configuração do Tailwind
├── tsconfig.json                   # Configuração do TypeScript
└── vite.config.ts                  # Configuração do Vite
```

## 🔧 Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn ou npm

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   cd frontend
   yarn install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   # Crie um arquivo .env na raiz do frontend
   VITE_BACKEND_URL=http://localhost:4000/api
   VITE_SITE_KEY=sua_chave_recaptcha_aqui
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```

5. Para build de produção:
   ```bash
   yarn build
   ```

## 🎨 Funcionalidades

### 🔐 Autenticação
- **Login**: Autenticação com email, senha e reCAPTCHA
- **Registro**: Cadastro de novos usuários
- **Proteção de Rotas**: Redirecionamento automático para login
- **Logout**: Limpeza de dados e redirecionamento

### 👥 Gerenciamento de Usuários
- **Listagem**: Tabela com paginação e busca
- **Adição**: Modal para cadastro de novos usuários
- **Edição**: Modal para atualização de dados
- **Exclusão**: Confirmação antes de remover usuários
- **Busca**: Filtro por nome, email, telefone ou endereço

### 📦 Gerenciamento de Pedidos
- **Listagem**: Tabela com paginação e busca
- **Adição**: Modal para criação de novos pedidos
- **Exclusão**: Confirmação antes de remover pedidos
- **Fatura**: Visualização e impressão de faturas
- **Busca**: Filtro por itens do pedido

### 📊 Dashboard
- **Gráfico de Barras**: Estatísticas de usuários, pedidos e vendas
- **Gráfico de Pizza**: Distribuição percentual dos dados
- **Dados em Tempo Real**: Atualização automática via RTK Query

### 🎯 Interface
- **Responsiva**: Adaptação para desktop, tablet e mobile
- **Sidebar**: Navegação colapsável com ícones
- **Breadcrumbs**: Navegação hierárquica
- **Notificações**: Sistema de toast para feedback
- **Loading States**: Indicadores de carregamento

## 🔄 Gerenciamento de Estado

### Redux Toolkit
- **User Slice**: Dados do usuário autenticado
- **Sidebar Slice**: Estado da barra lateral
- **RTK Query**: Cache e sincronização de dados

### RTK Query
- **Auth API**: Operações de login e registro
- **Users API**: CRUD de usuários/consumidores
- **Orders API**: CRUD de pedidos e faturas

## 🎨 UI/UX

### PrimeReact Components
- **Button**: Botões com estados de loading
- **Chart**: Gráficos interativos
- **Modal**: Diálogos modais
- **Form**: Componentes de formulário

### Tailwind CSS
- **Design System**: Classes utilitárias
- **Responsividade**: Breakpoints mobile-first
- **Customização**: Configuração personalizada

## 🔐 Segurança

- **reCAPTCHA**: Proteção contra bots
- **JWT**: Autenticação via tokens
- **Validação**: Formulários com Yup
- **Sanitização**: Limpeza de dados de entrada

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para diferentes tamanhos de tela
- **Sidebar**: Comportamento responsivo da navegação
- **Tabelas**: Scroll horizontal em telas pequenas

## 🚀 Performance

- **Code Splitting**: Carregamento sob demanda
- **RTK Query**: Cache inteligente de dados
- **Lazy Loading**: Componentes carregados quando necessário
- **Optimized Build**: Vite para build otimizado

## 📝 Notas de Desenvolvimento

- **TypeScript**: Tipagem estática para melhor DX
- **ESLint**: Linting e formatação de código
- **Componentes Reutilizáveis**: Arquitetura modular
- **Hooks Customizados**: Lógica reutilizável
- **Error Boundaries**: Tratamento de erros

## 🔄 Melhorias Implementadas

- ✅ Comentários profissionais em todo o código
- ✅ Remoção de código não utilizado
- ✅ Melhoria na estrutura de componentes
- ✅ Otimização de imports
- ✅ Melhoria no componente Loader
- ✅ Documentação completa do projeto
- ✅ Tipagem TypeScript aprimorada
