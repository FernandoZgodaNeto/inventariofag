/**
 * Middleware de Autenticação
 * Verifica e valida tokens JWT nas requisições
 */

const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { validateToken } = require("../utils/Token.utils");

/**
 * Middleware para autenticação via token JWT
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Função next do Express
 */
const Authentication = (req, res, next) => {
  try {
    // Obtém o header de autorização
    const headers = req.headers["authorization"] || "";

    // Verifica se o header existe e tem o formato correto
    if (!headers || !headers.startsWith("Bearer ")) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Por favor, faça login primeiro"
      );
    }

    // Extrai o token do header
    const auth_token = headers.split(" ")[1];

    // Verifica se o token foi fornecido
    if (!auth_token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Por favor, forneça um token válido"
      );
    }

    // Valida o token e adiciona o ID do usuário à requisição
    const data = validateToken(auth_token);
    req.user = data.userid;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
