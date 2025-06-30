/**
 * Validações de Consumidor
 * Define as regras de validação para operações relacionadas a consumidores/usuários
 */

const { body, param, query } = require("express-validator");

class ConsumerValidation {
  /**
   * Validações para registro de consumidor
   * Verifica nome, email, telefone, data de nascimento e endereço
   */
  static RegisterConsumer = [
    body("name").notEmpty().withMessage("Nome não pode ser vazio"),
    body("email")
      .isEmail()
      .withMessage("E-mail deve ser válido")
      .notEmpty()
      .withMessage("E-mail não pode ser vazio"),
    body("mobile").notEmpty().withMessage("Celular não pode ser vazio"),
    body("dob").notEmpty().withMessage("Data de nascimento não pode ser vazia"),
    body("address").notEmpty().withMessage("Endereço não pode ser vazio"),
  ];

  /**
   * Validações para parâmetros de ID
   * Verifica se o ID fornecido é um MongoDB ObjectId válido
   */
  static Params_id = [
    param("id")
      .isMongoId()
      .withMessage("Forneça um ID válido")
      .notEmpty()
      .withMessage("ID é obrigatório"),
  ];

  /**
   * Validações para parâmetros de query
   * Permite parâmetros opcionais de página e busca
   */
  static query_page = [query("page").optional(), query("query").optional()];
}

module.exports = ConsumerValidation;
