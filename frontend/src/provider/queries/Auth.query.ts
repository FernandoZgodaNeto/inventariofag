/**
 * Queries de Autenticação
 * Define as operações de API para registro e login de usuários usando RTK Query
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Criação da API de autenticação
export const AuthApi = createApi({
  reducerPath: "AuthApi", // Nome do reducer no store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL // URL base do backend
  }),
  endpoints: (builder) => ({
    // Mutation para registro de usuário
    registerUser: builder.mutation<any, any>({
      query: (obj) => ({
        url: "/v1/auth/register",
        method: "POST",
        body: obj, // Dados do usuário (nome, email, senha, token)
      }),
    }),
    // Mutation para login de usuário
    loginUser: builder.mutation<any, any>({
      query: (obj) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: obj, // Credenciais (email, senha, token)
      }),
    }),
  }),
});

// Exporta os hooks gerados automaticamente
export const { useRegisterUserMutation, useLoginUserMutation } = AuthApi;
