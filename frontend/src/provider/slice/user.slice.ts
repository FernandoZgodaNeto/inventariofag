/**
 * Slice de Usuário - Redux Toolkit
 * Gerencia o estado global do usuário autenticado na aplicação
 */

import { createSlice } from "@reduxjs/toolkit";

// Interface para o tipo de usuário (opcional para TypeScript)
interface User {
  _id: string;
  name: string;
  email: string;
}

// Interface para o estado inicial
interface UserState {
  user: User | null;
}

// Estado inicial do slice
const initialState: UserState = {
  user: null
};

// Criação do slice de usuário
export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    /**
     * Define o usuário no estado global
     * @param {UserState} state - Estado atual
     * @param {any} action - Ação com payload do usuário
     */
    setUser(state, action) {
      state.user = action.payload;
    },
    /**
     * Remove o usuário do estado global (logout)
     * @param {UserState} state - Estado atual
     */
    removeUser(state) {
      state.user = null;
    }
  }
});

// Exporta as ações do slice
export const { removeUser, setUser } = UserSlice.actions;

// Seletor para acessar o usuário no estado
export const UserSlicePath = (state: any) => state.UserSlice.user;