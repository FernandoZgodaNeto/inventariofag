/**
 * Modelo de Perfil
 * Define a estrutura de dados para perfis de usuários (tokens de refresh)
 */

const mongoose = require("mongoose");

// Schema do perfil com validações e configurações
const Schema = new mongoose.Schema(
  {
    // Referência ao usuário
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Usuário é obrigatório"],
    },
    // Token de refresh para renovação de autenticação
    refresh_token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  }
);

// Cria e exporta o modelo
const model = mongoose.model("profile", Schema);
module.exports = model;
