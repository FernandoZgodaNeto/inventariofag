/**
 * Controlador de Pedidos
 * Gerencia as operações relacionadas a pedidos do sistema
 */

const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const OrderService = require("../services/Orders.service");

class OrdersController {
  /**
   * Cria um novo pedido no sistema
   * @param {Object} req - Objeto de requisição contendo dados do pedido
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com mensagem de sucesso
   */
  static createOrder = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.createOrder(req?.user, req.body);
    return res.status(httpStatus.CREATED).json(res_obj);
  });

  /**
   * Lista todos os pedidos com paginação e filtros
   * @param {Object} req - Objeto de requisição com parâmetros de busca
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com lista de pedidos
   */
  static getAllorders = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.getAllorders(
      req?.user,
      req.query?.page,
      req.query?.query
    );
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Exclui um pedido específico
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com mensagem de sucesso
   */
  static deleteOrder = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.deleteOrder(req?.user, req?.params?.id);
    return res.status(httpStatus.OK).json(res_obj);
  });

  /**
   * Busca dados de um pedido para geração de fatura
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Resposta com dados completos do pedido
   */
  static getInvoiceById = CatchAsync(async (req, res) => {
    const res_obj = await OrderService.getInvoiceById(
      req?.user,
      req?.params?.id
    );
    return res.status(httpStatus.OK).json(res_obj);
  });
}

module.exports = OrdersController;
