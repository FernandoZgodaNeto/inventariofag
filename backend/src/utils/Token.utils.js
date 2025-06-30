/**
 * Utilitários de Token JWT
 * Gerencia a criação e validação de tokens de autenticação
 */

const jwt = require("jsonwebtoken");
const { PUBLIC_DATA } = require("../../constant");

/**
 * Gera um token JWT para autenticação
 * @param {Object} user - Objeto do usuário contendo _id
 * @param {string} expire - Tempo de expiração do token (padrão: "1d")
 * @returns {string} Token JWT gerado
 */
exports.generatoken = (user, expire = "1d") => {
  const token = jwt.sign({ userid: user._id }, PUBLIC_DATA.jwt_auth, {
    expiresIn: expire,
  });
  return token;
};

/**
 * Valida e decodifica um token JWT
 * @param {string} token - Token JWT a ser validado
 * @returns {Object} Dados decodificados do token
 * @throws {Error} Se o token for inválido ou expirado
 */
exports.validateToken = (token) => {
  const tokens = jwt.verify(token, PUBLIC_DATA.jwt_auth);
  return tokens;
};
