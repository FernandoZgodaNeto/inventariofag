/**
 * Validações de Pedido
 * Define as regras de validação para operações relacionadas a pedidos
 */

const { body } = require("express-validator");

class OrderValidation {
  /**
   * Validações para criação de pedido
   * Verifica se o usuário é válido e se há itens no pedido
   */
  static CreateOrder = [
    body("user")
      .isMongoId()
      .withMessage("ID do consumidor deve ser um MongoDB ObjectId válido")
      .notEmpty()
      .withMessage("Consumidor é obrigatório"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Pedido deve conter pelo menos um item")
      .custom((items) => {
        if (!Array.isArray(items) || items.length === 0) {
          throw new Error("Pedido deve conter pelo menos um item");
        }
        
        // Valida cada item do array
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
            throw new Error(`Item ${i + 1}: Nome é obrigatório`);
          }
          if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
            throw new Error(`Item ${i + 1}: Preço deve ser um número positivo`);
          }
        }
        
        return true;
      }),
  ];
}

module.exports = OrderValidation;
