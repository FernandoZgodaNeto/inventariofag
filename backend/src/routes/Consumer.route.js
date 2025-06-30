/**
 * Rotas de Consumidor
 * Define os endpoints para operações relacionadas a consumidores/clientes
 */

const express = require("express");
const Authentication = require("../middlewares/Authentication");
const ConsumerController = require("../controllers/Consumer.controller");
const ConsumerValidation = require("../validations/Consumer.validation");
const Validation = require("../middlewares/Validation");
const router = express.Router();

// Aplica autenticação em todas as rotas de consumidor
router.use(Authentication);

// Rota para listar todos os consumidores com paginação
router.get(
  "/get-all",
  ConsumerValidation.query_page, // Validação dos parâmetros de query
  Validation, // Middleware de validação
  ConsumerController.GetAllUser // Controlador de listagem
);

// Rota para buscar consumidores para seleção
router.get("/get-search", ConsumerController.GetUserForSearch);

// Rota para registrar novo consumidor
router.post(
  "/register",
  ConsumerValidation.RegisterConsumer, // Validação dos dados do consumidor
  Validation, // Middleware de validação
  ConsumerController.RegisterConsumer // Controlador de registro
);

// Rota para excluir consumidor
router.delete(
  "/delete/:id",
  ConsumerValidation.Params_id, // Validação do ID
  Validation, // Middleware de validação
  ConsumerController.DeleteConsumer // Controlador de exclusão
);

// Rota para obter dados do dashboard
router.route("/dashboard").get(ConsumerController.DashboardData);

// Rota para buscar consumidor específico
router.get(
  "/get/:id",
  ConsumerValidation.Params_id, // Validação do ID
  Validation, // Middleware de validação
  ConsumerController.getById // Controlador de busca
);

// Rota para atualizar consumidor
router.patch(
  "/update/:id",
  ConsumerValidation.RegisterConsumer, // Validação dos dados do consumidor
  Validation, // Middleware de validação
  ConsumerController.updateById // Controlador de atualização
);

module.exports = router;
