/**
 * Script para migrar o banco de dados do Coolify de 'default' para 'db_icestar'
 * 
 * Este script se conecta ao banco MySQL no Coolify e:
 * 1. Cria o novo banco 'db_icestar'
 * 2. Copia todas as tabelas e dados
 * 3. Verifica a integridade dos dados
 */

import mysql from 'mysql2/promise';

const OLD_DATABASE = 'default';
const NEW_DATABASE = 'db_icestar';

// Credenciais do banco MySQL no Coolify
const COOLIFY_DB_CONFIG = {
  host: 'twcueb02uu8w05auhzpx8dgn', // Nome do container MySQL
  port: 3306,
  user: 'root', // Usando root para ter permissão de criar banco
  password: 'q6F49ymtK7gCwgotX1AH3mQzWNSL6dOxV7tXigVqJj3tEbPJO1AfTmN0Whc6AMaj',
  charset: 'utf8mb4'
};

async function migrateDatabase() {
  console.log('🚀 Iniciando migração do banco de dados no Coolify...\n');
  console.log(`📍 Conectando ao servidor MySQL: ${COOLIFY_DB_CONFIG.host}\n`);

  // Criar conexão sem especificar banco (para poder criar o novo banco)
  const connection = await mysql.createConnection(COOLIFY_DB_CONFIG);

  try {
    // 1. Criar o novo banco de dados
    console.log(`📦 Criando banco de dados '${NEW_DATABASE}'...`);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${NEW_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log('✅ Banco de dados criado com sucesso!\n');

    // 2. Obter lista de tabelas do banco antigo
    console.log(`📋 Listando tabelas do banco '${OLD_DATABASE}'...`);
    await connection.query(`USE \`${OLD_DATABASE}\``);
    const [tables] = await connection.query<any[]>('SHOW TABLES');
    
    const tableNames = tables.map(row => Object.values(row)[0] as string);
    console.log(`✅ Encontradas ${tableNames.length} tabelas: ${tableNames.join(', ')}\n`);

    if (tableNames.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada no banco antigo.');
      console.log('   O banco está vazio ou não existe.\n');
      return;
    }

    // 3. Copiar cada tabela
    for (const tableName of tableNames) {
      console.log(`📊 Copiando tabela '${tableName}'...`);
      
      // Criar estrutura da tabela
      await connection.query(
        `CREATE TABLE IF NOT EXISTS \`${NEW_DATABASE}\`.\`${tableName}\` LIKE \`${OLD_DATABASE}\`.\`${tableName}\``
      );
      
      // Copiar dados
      await connection.query(
        `INSERT INTO \`${NEW_DATABASE}\`.\`${tableName}\` SELECT * FROM \`${OLD_DATABASE}\`.\`${tableName}\``
      );
      
      // Verificar contagem de registros
      const [oldCount] = await connection.query<any[]>(
        `SELECT COUNT(*) as count FROM \`${OLD_DATABASE}\`.\`${tableName}\``
      );
      const [newCount] = await connection.query<any[]>(
        `SELECT COUNT(*) as count FROM \`${NEW_DATABASE}\`.\`${tableName}\``
      );
      
      const oldTotal = oldCount[0].count;
      const newTotal = newCount[0].count;
      
      if (oldTotal === newTotal) {
        console.log(`✅ Tabela '${tableName}' copiada: ${newTotal} registros\n`);
      } else {
        console.error(`❌ ERRO: Contagem diferente na tabela '${tableName}'!`);
        console.error(`   Origem: ${oldTotal} | Destino: ${newTotal}\n`);
        throw new Error(`Falha na migração da tabela ${tableName}`);
      }
    }

    // 4. Resumo final
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ MIGRAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`\n📊 Resumo:`);
    console.log(`   - Banco antigo: ${OLD_DATABASE}`);
    console.log(`   - Banco novo: ${NEW_DATABASE}`);
    console.log(`   - Tabelas migradas: ${tableNames.length}`);
    console.log(`\n⚠️  PRÓXIMOS PASSOS:`);
    console.log(`   1. Atualize o banco de dados MySQL no Coolify:`);
    console.log(`      - Vá no painel do Coolify`);
    console.log(`      - Edite o banco de dados MySQL`);
    console.log(`      - Altere "Database Name" de "default" para "db_icestar"`);
    console.log(`      - Salve e reinicie o banco`);
    console.log(`   2. Reinicie a aplicação Next.js no Coolify`);
    console.log(`   3. Teste o sistema completamente`);
    console.log(`   4. Após confirmar que tudo funciona, delete o banco antigo:`);
    console.log(`      - Execute no phpMyAdmin: DROP DATABASE \`${OLD_DATABASE}\`;`);
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ ERRO durante a migração:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Executar migração
migrateDatabase()
  .then(() => {
    console.log('🎉 Script finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Falha na migração:', error);
    process.exit(1);
  });
