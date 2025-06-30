/**
 * Modelo de Consumidor
 * Define a estrutura de dados para consumidores/clientes do sistema
 */

const mongoose = require("mongoose");

// Schema do consumidor com validações e configurações
const Schema = new mongoose.Schema(
  {
    // Referência ao usuário que criou o consumidor
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Usuário é obrigatório"],
    },
    // Nome completo do consumidor
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true, // Remove espaços em branco
    },
    // Email único do consumidor
    email: {
      type: String,
      required: [true, "E-mail é obrigatório"],
      trim: true,
      lowercase: true, // Converte para minúsculas
    },
    // Número de telefone do consumidor
    mobile: {
      type: String,
      required: [true, "Telefone é obrigatório"],
      trim: true,
    },
    // Data de nascimento do consumidor
    dob: {
      type: Date,
      required: [true, "Data de nascimento é obrigatória"],
    },
    // Endereço completo do consumidor
    address: {
      type: String,
      required: [true, "Endereço é obrigatório"],
      trim: true,
    },
    // Status ativo/inativo do consumidor
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
const model = mongoose.model("Consumer", Schema);
module.exports = model;
