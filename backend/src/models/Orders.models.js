/**
 * Modelo de Pedido
 * Define a estrutura de dados para pedidos do sistema
 */

const mongoose = require("mongoose");

// Schema do pedido com validações e configurações
const Schema = new mongoose.Schema(
  {
    // Referência ao usuário que criou o pedido
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Usuário é obrigatório"],
    },
    // Referência ao consumidor do pedido
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consumer",
      required: [true, "Consumidor é obrigatório"],
    },
    // Array de itens do pedido
    items: {
      type: [
        {
          // Nome do item
          name: {
            type: String,
            required: [true, "Nome do item é obrigatório"],
            trim: true,
          },
          // Preço do item
          price: {
            type: Number,
            required: [true, "Preço do item é obrigatório"],
            min: [0, "Preço não pode ser negativo"],
          },
        },
      ],
      validate: {
        validator: function(items) {
          return items && items.length > 0;
        },
        message: "Pedido deve conter pelo menos um item"
      }
    },
    // Status ativo/inativo do pedido
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  }
);

// Cria e exporta o modelo
const model = mongoose.model("Order", Schema);
module.exports = model;
