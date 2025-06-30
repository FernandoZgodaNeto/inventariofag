/**
 * Classe de Erro Customizada para API
 * Estende a classe Error para incluir código de status HTTP
 */

class ApiError extends Error {
  // Código de status HTTP padrão (500 - Erro interno do servidor)
  statusCode = 500;

  /**
   * Construtor da classe ApiError
   * @param {number} statusCode - Código de status HTTP
   * @param {string} msg - Mensagem de erro
   */
  constructor(statusCode, msg) {
    super(msg);
    this.message = msg;
    this.statusCode = statusCode;

    // Error.
  }
}

module.exports = ApiError;
