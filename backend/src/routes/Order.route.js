/**
 * Rotas de Pedidos
 * Define os endpoints para operações relacionadas a pedidos
 */

const express = require("express");
const Authentication = require("../middlewares/Authentication");
const Validation = require("../middlewares/Validation");
const { CreateOrder } = require("../validations/Order.validation");
const OrdersController = require("../controllers/Order.controller");
const router = express.Router();

// Aplica autenticação em todas as rotas de pedidos
router.use(Authentication);

// Rota para criar novo pedido
router
  .route("/create-order")
  .post(
    CreateOrder, // Validação dos dados do pedido
    Validation, // Middleware de validação
    OrdersController.createOrder // Controlador de criação
  );

// Rota para listar todos os pedidos
router.route("/get-orders").get(OrdersController.getAllorders);

// Rota para obter dados de fatura de um pedido
router.route("/get-invoice/:id").get(OrdersController.getInvoiceById);

// Rota para excluir pedido
router.route("/delete/:id").delete(OrdersController.deleteOrder);

module.exports = router;
