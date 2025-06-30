/**
 * Middleware de Validação
 * Verifica e processa erros de validação do express-validator
 */

const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 * Middleware para processar resultados de validação
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Função next do Express
 */
const Validation = (req, res, next) => {
  try {
    // Obtém os resultados da validação
    const result = validationResult(req);

    // Se há erros de validação, retorna o primeiro erro
    if (!result.isEmpty()) {
      throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0].msg);
    }

    // Se não há erros, continua para o próximo middleware
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Validation;
