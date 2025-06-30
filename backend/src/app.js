/**
 * Configuração principal da aplicação Express
 * Este arquivo configura middlewares, rotas e tratamento de erros
 */

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const ApiError = require("./utils/ApiError");
const ErrorHandling = require("./middlewares/ErrorHandler");

// Middleware para permitir requisições cross-origin
app.use(cors());

// Middleware para logging de requisições HTTP
app.use(morgan("dev"));

// Middleware para parsing de JSON com limite de 10MB
app.use(express.json({ limit: "10mb" }));

// Middleware para parsing de dados de formulário
app.use(express.urlencoded({ extended: false }));

// Rotas da API versão 1
app.use("/api/v1", require("./routes"));

// Middleware para rotas não encontradas (404)
app.use("*", (req, res) => {
  throw new ApiError(404, "Página não encontrada");
});

// Middleware para tratamento de erros
app.use(ErrorHandling);

module.exports = app;
