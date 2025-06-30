/**
 * Script de Migração de Usuários
 * Migra usuários existentes com senhas em texto plano para senhas criptografadas
 */

require("dotenv").config({});
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { PUBLIC_DATA } = require("./constant");

// Conecta ao banco de dados
async function connectDB() {
  try {
    await mongoose.connect(PUBLIC_DATA.mongo_uri);
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error.message);
    process.exit(1);
  }
}

// Função para verificar se uma string parece ser uma senha criptografada
function isHashedPassword(password) {
  // Senhas criptografadas com bcrypt começam com $2a$, $2b$, $2x$ ou $2y$
  return password.startsWith('$2a$') || 
         password.startsWith('$2b$') || 
         password.startsWith('$2x$') || 
         password.startsWith('$2y$');
}

// Função para migrar usuários
async function migrateUsers() {
  try {
    // Importa o modelo de usuário
    const UserModel = require("./src/models/user.models");
    
    // Busca todos os usuários
    const users = await UserModel.find({});
    console.log(`Encontrados ${users.length} usuários no sistema`);
    
    let migratedCount = 0;
    let alreadyHashedCount = 0;
    
    for (const user of users) {
      // Verifica se a senha já está criptografada
      if (isHashedPassword(user.password)) {
        console.log(`Usuário ${user.email} já tem senha criptografada`);
        alreadyHashedCount++;
        continue;
      }
      
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(user.password, 12);
      
      // Atualiza o usuário
      await UserModel.findByIdAndUpdate(user._id, {
        password: hashedPassword
      });
      
      console.log(`Usuário ${user.email} migrado com sucesso`);
      migratedCount++;
    }
    
    console.log(`\n=== Resumo da Migração ===`);
    console.log(`Usuários já criptografados: ${alreadyHashedCount}`);
    console.log(`Usuários migrados: ${migratedCount}`);
    console.log(`Total de usuários: ${users.length}`);
    
  } catch (error) {
    console.error("Erro durante a migração:", error.message);
  }
}

// Função principal
async function main() {
  console.log("Iniciando migração de usuários...");
  
  await connectDB();
  await migrateUsers();
  
  console.log("Migração concluída!");
  process.exit(0);
}

// Executa o script
main().catch((error) => {
  console.error("Erro fatal:", error.message);
  process.exit(1);
}); 