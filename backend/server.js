/**
 * Configuração principal do servidor
 * Este arquivo inicializa o servidor Express e estabelece a conexão com o banco de dados
 */

require("dotenv").config({});
const { PUBLIC_DATA } = require("./constant");
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

// Estabelece conexão com o banco de dados MongoDB
ConnectDB();

// Inicia o servidor na porta especificada
app.listen(PUBLIC_DATA.port, () => {
  console.log(`Servidor rodando em http://localhost:${PUBLIC_DATA.port}`);
});
