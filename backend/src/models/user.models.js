/**
 * Modelo de Usuário
 * Define a estrutura de dados para usuários do sistema
 */

const mongoose = require("mongoose");

// Schema do usuário com validações e configurações
const Schema = new mongoose.Schema(
  {
    // Nome completo do usuário
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true, // Remove espaços em branco
    },
    // Email único do usuário
    email: {
      type: String,
      unique: true, // Garante que cada email seja único
      trim: true,
      lowercase: true, // Converte para minúsculas
      required: [true, "E-mail é obrigatório"],
    },
    // Senha do usuário (deve ser criptografada antes de salvar)
    password: {
      type: String,
      trim: true,
      required: [true, "Senha é obrigatória"],
    },
  },
  {
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
  }
);

// Cria e exporta o modelo
const model = mongoose.model("user", Schema);
module.exports = model;
