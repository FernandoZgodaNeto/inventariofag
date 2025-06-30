/**
 * Configuração de Rotas da Aplicação
 * Define todas as rotas e suas respectivas páginas usando React Router
 */

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import Invoice from "../pages/Invoice";
import UserPage from "../pages/Users";
import OrdersPage from "../pages/Orders";

// Configuração das rotas da aplicação
export const Routes = createBrowserRouter([
    // Rota principal com layout autenticado
    {
        path: '/',
        Component: App,
        children: [
            // Página inicial (Dashboard)
            {
                path: '/',
                Component: HomePage
            },
            // Página de faturas
            {
                path: '/invoice',
                Component: Invoice
            },
            // Página de gerenciamento de usuários
            {
                path: '/user',
                Component: UserPage
            },
            // Página de gerenciamento de pedidos
            {
                path: '/orders',
                Component: OrdersPage
            }

            , {
                path: '*',
                Component: ErrorPage
            }
        ]
    },
    // Rotas de autenticação (sem layout principal)
    {
        path: '/login',
        Component: Login,

    },
    {
        path: '/register',
        Component: Register
    }
])
