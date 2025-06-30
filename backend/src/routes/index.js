/**
 * Configuração Principal de Rotas
 * Centraliza todas as rotas da API em um único arquivo
 */

const router = require("express").Router();

// Array com todas as rotas da aplicação
const routes = [
  {
    path: "/auth", // Rotas de autenticação (login, registro, perfil)
    route: require("./Auth.route"),
  },
  {
    path: "/consumer", // Rotas de consumidores/usuários
    route: require("./Consumer.route"),
  },
  {
    path: "/orders", // Rotas de pedidos
    route: require("./Order.route"),
  },
];

// Registra cada rota no router principal
routes.forEach((cur) => {
  router.use(cur.path, cur.route);
});

module.exports = router;
