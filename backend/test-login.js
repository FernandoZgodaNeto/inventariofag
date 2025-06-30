/**
 * Script de Teste de Login
 * Testa o sistema de login para verificar se está funcionando
 */

const axios = require("axios");

// Configurações
const BASE_URL = "http://localhost:4000/api/v1";
const TEST_EMAIL = "marco@email.com";
const TEST_PASSWORD = "123456"; // Substitua pela senha real

async function testLogin() {
  try {
    console.log("🧪 Testando sistema de login...");
    console.log(`📧 Email: ${TEST_EMAIL}`);
    console.log(`🔑 Senha: ${TEST_PASSWORD}`);
    console.log("");

    // Dados para o login
    const loginData = {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      token: "test-token" // Token fake para desenvolvimento
    };

    console.log("📤 Enviando requisição de login...");
    
    // Faz a requisição de login
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("✅ Login realizado com sucesso!");
    console.log("📋 Resposta do servidor:");
    console.log(JSON.stringify(response.data, null, 2));
    
    // Testa o endpoint de perfil com o token
    if (response.data.token) {
      console.log("\n🔍 Testando endpoint de perfil...");
      
      const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("✅ Perfil obtido com sucesso!");
      console.log("📋 Dados do perfil:");
      console.log(JSON.stringify(profileResponse.data, null, 2));
    }

  } catch (error) {
    console.error("❌ Erro no teste de login:");
    
    if (error.response) {
      console.error("📊 Status:", error.response.status);
      console.error("📋 Dados:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("🌐 Erro de conexão - Verifique se o servidor está rodando");
    } else {
      console.error("💥 Erro:", error.message);
    }
  }
}

// Executa o teste
testLogin(); 