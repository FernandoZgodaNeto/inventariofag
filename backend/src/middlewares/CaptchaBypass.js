/**
 * Middleware de Bypass do Captcha
 * Gerencia a verificação do reCAPTCHA em diferentes ambientes
 */

// Verifica se está em ambiente de desenvolvimento
const isDev = process.env.NODE_ENV !== "production";

/**
 * Middleware para verificação do captcha
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Função next do Express
 */
const CaptchaBypass = (req, res, next) => {
  // Captura o token do reCAPTCHA enviado no corpo da requisição
  const token = req.body.token;

  if (isDev) {
    // Em desenvolvimento, ignora a verificação real do captcha
    if (!token) {
      return res.status(400).json({
        message: "Token do captcha é obrigatório (mesmo em desenvolvimento)",
      });
    }

    // Log opcional para controle em desenvolvimento
    console.log("Captcha verificado via bypass (ambiente de desenvolvimento)");
    return next();
  }

  // Em produção, verifica se o token foi fornecido
  // TODO: Implementar verificação real com o Google reCAPTCHA
  if (!token) {
    return res.status(400).json({ 
      message: "Token do captcha é obrigatório" 
    });
  }

  // Provisoriamente permite continuar em produção
  return next();
};

module.exports = CaptchaBypass;
