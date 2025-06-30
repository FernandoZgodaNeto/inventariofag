/**
 * Configurações públicas do sistema
 * Esta classe contém as variáveis de ambiente e configurações padrão da aplicação
 */
class PUBLIC_DATA {
  // Porta do servidor (padrão: 4000)
  static port = process.env.PORT || 4000;

  // URI de conexão com o MongoDB (padrão: localhost/inventario)
  static mongo_uri = process.env.MONGO_URI || `mongodb://localhost/inventario`;

  // Chave secreta para JWT (padrão: string de caracteres especiais)
  static jwt_auth = process.env.JWT_AUTH || "@#$%^&*(@#$%^&*($%^))#$%^&";
}

module.exports = {
  PUBLIC_DATA,
};
