/**
 * Configuração do Store Redux
 * Centraliza todos os reducers e middlewares da aplicação
 */

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserSlice } from "./slice/user.slice";
import { SidebarSlice } from "./slice/Sidebar.slice";
import { AuthApi } from "./queries/Auth.query";
import { UserApi } from "./queries/Users.query";
import { OrdersApi } from "./queries/Orders.query";

// Configuração do store principal
export const store = configureStore({
    // Reducers da aplicação
    reducer: {
        [UserSlice.name]: UserSlice.reducer,        // Slice de usuário
        [SidebarSlice.name]: SidebarSlice.reducer,  // Slice da sidebar
        [AuthApi.reducerPath]: AuthApi.reducer,     // API de autenticação
        [UserApi.reducerPath]: UserApi.reducer,     // API de usuários
        [OrdersApi.reducerPath]: OrdersApi.reducer  // API de pedidos
    },

    // Middlewares para RTK Query
    middleware: (d) => d().concat(
        AuthApi.middleware,   // Middleware para autenticação
        UserApi.middleware,   // Middleware para usuários
        OrdersApi.middleware  // Middleware para pedidos
    )
})

// Configura listeners para RTK Query
setupListeners(store.dispatch)