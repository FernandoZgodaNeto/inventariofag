/**
 * Configuração de Conexão com Banco de Dados
 * Gerencia a conexão com o MongoDB usando Mongoose
 */

const { default: mongoose } = require("mongoose");
const { PUBLIC_DATA } = require("../../constant");

/**
 * Estabelece conexão com o banco de dados MongoDB
 * @returns {Promise<void>}
 */
exports.ConnectDB = async () => {
  try {
    // Conecta ao MongoDB usando a URI configurada
    await mongoose.connect(PUBLIC_DATA.mongo_uri);
    console.log(`O aplicativo está conectado com ${mongoose.connection.host}`);
  } catch (error) {
    // Em caso de erro, desconecta e encerra o processo
    console.error("Erro ao conectar com o banco de dados:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};
