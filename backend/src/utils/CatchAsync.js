/**
 * Utilitário para Captura de Erros Assíncronos
 * Wrapper para funções assíncronas que captura erros automaticamente
 */

/**
 * Wrapper para funções assíncronas que captura erros
 * @param {Function} fn - Função assíncrona a ser executada
 * @returns {Function} Função middleware do Express
 */
const CatchAsync = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log("Ocorreu um erro na promise:", error.message);
    next(error);
  });
};

module.exports = CatchAsync;
