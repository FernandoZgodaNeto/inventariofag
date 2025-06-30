/**
 * Validações de Autenticação
 * Define as regras de validação para registro e login de usuários
 */

const { body } = require("express-validator");

class AuthValidation {
  /**
   * Validações para registro de usuário
   * Verifica nome, email e senha
   */
  static RegisterUser = [
    body("name").notEmpty().withMessage("Nome não pode ser vazio"),
    body("email")
      .isEmail()
      .withMessage("E-mail deve ser válido")
      .notEmpty()
      .withMessage("E-mail não pode ser vazio"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres")
      .notEmpty()
      .withMessage("Senha é obrigatória"),
  ];

  /**
   * Validações para login de usuário
   * Verifica email e senha
   */
  static LoginUser = [
    body("email")
      .isEmail()
      .withMessage("E-mail deve ser válido")
      .notEmpty()
      .withMessage("E-mail é obrigatório"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres")
      .notEmpty()
      .withMessage("Senha é obrigatória"),
  ];
}

module.exports = AuthValidation;
