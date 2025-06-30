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

/**
 * Verifica o token do reCAPTCHA
 * @param {string} token - Token do reCAPTCHA
 * @returns {boolean} - True se válido, false caso contrário
 */
async function verifyCaptcha(token) {
  if (!isProduction) {
    console.log("Captcha ignorado no ambiente de desenvolvimento");
    return true;
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: process.env.CAPTCHA_SCREATE_KEY,
          response: token,
        },
      }
    );

    const data = response.data;
    return data.success;
  } catch (error) {
    console.error("Erro ao verificar captcha:", error.message);
    return false;
  }
}

class AuthService {
  /**
   * Registra um novo usuário no sistema
   * @param {Object} body - Dados do usuário (email, password, name, token)
   * @returns {Object} - Token de autenticação e mensagem de sucesso
   */
  static async RegisterUser(body) {
    const { email, password, name, token } = body;

    // Verifica se o captcha é válido
    const isValid = await verifyCaptcha(token);
    if (!isValid) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Captcha inválido");
    }

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

    // Verifica se o captcha é válido
    const isValid = await verifyCaptcha(token);
    if (!isValid) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Captcha inválido");
    }

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
