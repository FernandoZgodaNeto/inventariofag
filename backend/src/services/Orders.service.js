/**
 * Serviço de Pedidos
 * Gerencia operações relacionadas a pedidos do sistema
 */

const httpStatus = require("http-status");
const { OrdersModel } = require("../models");
const ApiError = require("../utils/ApiError");

class OrderService {
  /**
   * Cria um novo pedido no sistema
   * @param {string} user - ID do usuário que está criando o pedido
   * @param {Object} body - Dados do pedido (usuário consumidor e itens)
   * @returns {Object} - Mensagem de sucesso
   */
  static async createOrder(user, body) {
    await OrdersModel.create({
      user,
      consumer: body.user,
      items: body.items,
    });

    return {
      msg: "Pedido criado com sucesso",
    };
  }

  /**
   * Busca todos os pedidos com paginação e filtros
   * @param {string} user - ID do usuário
   * @param {number} page - Número da página
   * @param {string} query - Termo de busca nos itens
   * @returns {Object} - Lista de pedidos e informações de paginação
   */
  static async getAllorders(user, page = 1, query = "") {
    const limit = 10;
    const perPage = (Number(page) - 1) * limit;

    // Query base
    let queryies = { user };

    // Adiciona filtro de busca se query fornecida
    if (query && query.trim()) {
      queryies.items = {
        $elemMatch: {
          name: { $regex: query, $options: "i" }, // Case insensitive
        },
      };
    }

    // Busca pedidos com população de dados do consumidor
    const data = await OrdersModel.find(queryies)
      .populate("consumer", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(perPage);

    // Conta total de pedidos para paginação
    const documents = await OrdersModel.countDocuments(queryies);
    const hasMore = perPage + limit < documents;

    return {
      data,
      hasMore,
    };
  }

  /**
   * Exclui um pedido específico
   * @param {string} user - ID do usuário
   * @param {string} id - ID do pedido a ser excluído
   * @returns {Object} - Mensagem de sucesso
   */
  static async deleteOrder(user, id) {
    const existOrder = await OrdersModel.findOne({ user, _id: id });

    if (!existOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, "Pedido não encontrado");
    }

    await OrdersModel.findByIdAndDelete(existOrder._id);

    return {
      msg: "Pedido excluído com sucesso",
    };
  }

  /**
   * Busca dados de um pedido específico para geração de fatura
   * @param {string} user - ID do usuário
   * @param {string} id - ID do pedido
   * @returns {Object} - Dados completos do pedido com informações do consumidor
   */
  static async getInvoiceById(user, id) {
    const order = await OrdersModel.findOne({ user, _id: id })
      .select("consumer user items createdAt")
      .populate("consumer", "name email address -_id")
      .populate("user", "name -_id");

    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, "Pedido não encontrado");
    }

    return order;
  }
}

module.exports = OrderService;
