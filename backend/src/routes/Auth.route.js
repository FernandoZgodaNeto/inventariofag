/**
 * Rotas de Autenticação
 * Define os endpoints para registro, login e perfil de usuários
 */

const AuthController = require("../controllers/Auth.controller");
const Authentication = require("../middlewares/Authentication");
const Validation = require("../middlewares/Validation");
const AuthValidation = require("../validations/Auth.validation");

const router = require("express").Router();

// Rota para registro de novos usuários
router.post(
  "/register",
  AuthValidation.RegisterUser, // Validação dos dados de entrada
  Validation, // Middleware de validação
  AuthController.RegisterUser // Controlador de registro
);

// Rota para login de usuários
router.post(
  "/login",
  AuthValidation.LoginUser, // Validação das credenciais
  Validation, // Middleware de validação
  AuthController.LoginUser // Controlador de login
);

// Rota para obter perfil do usuário autenticado
router.get("/profile", Authentication, AuthController.ProfileController);

module.exports = router;
