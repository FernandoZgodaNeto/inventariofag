/**
 * Queries de Pedidos
 * Define as operações de API para gerenciamento de pedidos usando RTK Query
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Criação da API de pedidos
export const OrdersApi = createApi({
  reducerPath: "OrdersApi", // Nome do reducer no store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL // URL base do backend
  }),

  // Tags para cache invalidation
  tagTypes: ["getAllOrders"],

  endpoints: (builder) => ({
    // Mutation para criar novo pedido
    CreateOrder: builder.mutation<any, any>({
      query: (obj) => ({
        url: "/v1/orders/create-order",
        method: "POST",
        body: obj, // Dados do pedido (usuário, itens)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["getAllOrders"], // Invalida cache de lista de pedidos
    }),

    // Query para buscar todos os pedidos com paginação e filtros
    getAllOrders: builder.query<any, any>({
      query: (obj) => ({
        url: `/v1/orders/get-orders?query=${obj.query}&page=${obj.page}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["getAllOrders"], // Fornece cache para lista de pedidos
    }),

    // Mutation para deletar pedido
    DeleteOrder: builder.mutation<any, any>({
      query: (obj) => ({
        url: `/v1/orders/delete/${obj}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["getAllOrders"],
    }),

    // Query para buscar fatura/pedido específico por ID
    getInvoiceById: builder.query<any, any>({
      query: (obj) => ({
        url: `/v1/orders/get-invoice/${obj}`,
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
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetInvoiceByIdQuery,
} = OrdersApi;
