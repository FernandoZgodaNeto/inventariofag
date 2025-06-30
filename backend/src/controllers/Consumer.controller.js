/**
 * Controlador de Consumidor
 * Gerencia as operações relacionadas a consumidores/clientes do sistema
 */

const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const ConsumerService = require("../services/Consumer.service");

class ConsumerController {
  /**
   * Registra um novo consumidor no sistema
   * @param {Object} req - Objeto de requisição contendo dados do consumidor
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com mensagem de sucesso
   */
  static RegisterConsumer = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.RegisterConsumer(req?.user, req.body);
    return res.status(httpStatus.CREATED).json(res_obj);
  });

  /**
   * Atualiza dados de um consumidor existente
   * @param {Object} req - Objeto de requisição contendo novos dados
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com mensagem de sucesso
   */
  static updateById = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.updateById(
      req?.user,
      req.body,
      req.params.id
    );
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Busca um consumidor específico por ID
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com dados do consumidor
   */
  static getById = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.getById(req?.user, req.params.id);
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Lista todos os consumidores com paginação e filtros
   * @param {Object} req - Objeto de requisição com parâmetros de busca
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com lista de consumidores
   */
  static GetAllUser = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.GetAllUser(
      req?.user,
      req.query?.page,
      req.query?.query
    );
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Exclui um consumidor e seus pedidos relacionados
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com mensagem de sucesso
   */
  static DeleteConsumer = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.DeleteConsumer(
      req?.user,
      req.params.id
    );
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Busca consumidores para seleção em dropdowns
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com lista simplificada de consumidores
   */
  static GetUserForSearch = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.GetUserForSearch(req?.user);
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Obtém dados para o dashboard
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com estatísticas do dashboard
   */
  static DashboardData = CatchAsync(async (req, res) => {
    const res_obj = await ConsumerService.DashboardData(req?.user);
    return res.status(httpStatus.OK).json(res_obj);
  });
}

module.exports = ConsumerController;
