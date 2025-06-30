/**
 * Serviço de Autenticação
 * Gerencia operações de registro, login e perfil de usuários
 */

const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { UserModel, ProfileModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { generatoken } = require("../utils/Token.utils");
const axios = require("axios");

const isProduction = process.env.NODE_ENV === "production";

class AuthService {
  /**
   * Registra um novo usuário no sistema
   * @param {Object} body - Dados do usuário (email, password, name, token)
   * @returns {Object} - Token de autenticação e mensagem de sucesso
   */
  static async RegisterUser(body) {
    const { email, password, name, token } = body;

    // Verifica se o usuário já existe
    const checkExist = await UserModel.findOne({ email });
    if (checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Usuário já registrado");
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 12);

    // Cria o usuário e gera tokens
    const user = await UserModel.create({ 
      email, 
      password: hashedPassword, 
      name 
    });
    
    const tokend = generatoken(user);
    const refresh_token = generatoken(user, "2d");

    // Cria o perfil do usuário
    await ProfileModel.create({
      user: user._id,
      refresh_token,
    });

    return {
      msg: "Usuário registrado com sucesso",
      token: tokend,
    };
  }

  /**
   * Autentica um usuário existente
   * @param {Object} body - Credenciais do usuário (email, password, token)
   * @returns {Object} - Token de autenticação e mensagem de sucesso
   */
  static async LoginUser(body) {
    const { email, password, token } = body;

    // Verifica se o usuário existe
    const checkExist = await UserModel.findOne({ email });
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Usuário não registrado");
    }

    // Verifica se a senha está correta usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, checkExist.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Credenciais inválidas");
    }

    // Gera token de autenticação
    const tokend = generatoken(checkExist);
    return {
      msg: "Usuário logado com sucesso",
      token: tokend,
    };
  }

  /**
   * Obtém dados do perfil do usuário
   * @param {string} user - ID do usuário
   * @returns {Object} - Dados do usuário e mensagem de sucesso
   */
  static async ProfileService(user) {
    const checkExist = await UserModel.findById(user).select("name email");
    if (!checkExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Usuário não registrado");
    }

    return {
      msg: "Dados obtidos com sucesso",
      user: checkExist,
    };
  }
}

module.exports = AuthService;
