/**
 * Middleware de Tratamento de Erros
 * Captura e formata erros da aplicação para resposta padronizada
 */

const ApiError = require("../utils/ApiError");

/**
 * Função de tratamento de erros
 * @param {Error} err - Objeto de erro capturado
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Função next do Express
 */
const ErrorHandling = (err, req, res, next) => {
  const obj = {};

  // Verifica se é um erro customizado da aplicação
  if (err instanceof ApiError) {
    obj["statusCode"] = err.statusCode;
    obj["message"] = err.message;
    obj["stack"] = err.stack;
  } else {
    // Erro genérico com status 400
    obj["statusCode"] = 400;
    obj["message"] = err.message;
    obj["stack"] = err.stack;
  }

  // Retorna resposta de erro formatada
  res.status(obj.statusCode).json(obj);
};

module.exports = ErrorHandling;
