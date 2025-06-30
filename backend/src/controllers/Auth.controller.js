/**
 * Controlador de Autenticação
 * Gerencia as operações relacionadas ao registro, login e perfil de usuários
 */

const httpStatus = require("http-status");
const AuthService = require("../services/Auth.service");
const CatchAsync = require("../utils/CatchAsync");

class AuthController {
  /**
   * Registra um novo usuário no sistema
   * @param {Object} req - Objeto de requisição contendo dados do usuário
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com dados do usuário criado
   */
  static RegisterUser = CatchAsync(async (req, res) => {
    const res_obj = await AuthService.RegisterUser(req.body);
    res.status(httpStatus.CREATED).send(res_obj);
  });

  /**
   * Autentica um usuário existente
   * @param {Object} req - Objeto de requisição contendo credenciais
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com token de autenticação
   */
  static LoginUser = CatchAsync(async (req, res) => {
    const res_obj = await AuthService.LoginUser(req.body);
    res.status(httpStatus.OK).send(res_obj);
  });

  /**
   * Obtém o perfil do usuário autenticado
   * @param {Object} req - Objeto de requisição com dados do usuário
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com dados do perfil do usuário
   */
  static ProfileController = CatchAsync(async (req, res) => {
    const res_obj = await AuthService.ProfileService(req.user);
    res.status(httpStatus.OK).send(res_obj);
  });
}

module.exports = AuthController;
