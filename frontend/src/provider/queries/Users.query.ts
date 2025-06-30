/**
 * Queries de Usuários
 * Define as operações de API para gerenciamento de usuários usando RTK Query
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Criação da API de usuários
export const UserApi = createApi({
  reducerPath: "UserApi", // Nome do reducer no store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL // URL base do backend
  }),

  // Tags para cache invalidation
  tagTypes: ["getAllConsumer", "getConsumer"],

  endpoints: (builder) => ({
    // Mutation para registrar novo usuário
    registerConsumer: builder.mutation<any, any>({
      query: (obj) => ({
        url: "/v1/consumer/register",
        method: "POST",
        body: obj, // Dados do usuário (nome, email, telefone, endereço, data de nascimento)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["getAllConsumer"], // Invalida cache de lista de usuários
    }),

    // Query para buscar todos os usuários com paginação e filtros
    getAllConsumers: builder.query<any, any>({
      query: (obj) => ({
        url: `/v1/consumer/get-all?query=${obj.query}&page=${obj.page}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["getAllConsumer"], // Fornece cache para lista de usuários
    }),

    // Query para buscar usuários para seleção em dropdowns
    getForSearchUser: builder.query<any, any>({
      query: () => ({
        url: `/v1/consumer/get-search`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["getAllConsumer"],
    }),

    // Mutation para deletar usuário
    deleteConsumer: builder.mutation<any, any>({
      query: (_id) => ({
        url: "/v1/consumer/delete/" + _id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["getAllConsumer"],
    }),

    // Query para buscar usuário específico por ID
    getConsumers: builder.query<any, any>({
      query: (_id) => ({
        url: "/v1/consumer/get/" + _id,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["getConsumer"], // Fornece cache para usuário específico
    }),

    // Mutation para atualizar usuário
    UpdateConsumer: builder.mutation<any, any>({
      query: ({ data, _id }) => ({
        url: "/v1/consumer/update/" + _id,
        method: "PATCH",
        body: data, // Dados atualizados do usuário
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["getAllConsumer", "getConsumer"], // Invalida ambos os caches
    }),

    // Query para dados do dashboard
    dashboardData: builder.query<any, any>({
      query: () => ({
        url: "/v1/consumer/dashboard/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
    }),
  }),
});

// Exporta os hooks gerados automaticamente
export const {
  useRegisterConsumerMutation,
  useGetAllConsumersQuery,
  useDeleteConsumerMutation,
  useGetConsumersQuery,
  useUpdateConsumerMutation,
  useGetForSearchUserQuery,
  useDashboardDataQuery,
} = UserApi;
