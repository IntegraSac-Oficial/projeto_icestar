/**
 * Script para migrar o banco de dados de 'default' para 'db_icestar'
 * 
 * Este script:
 * 1. Cria o novo banco 'db_icestar'
 * 2. Copia todas as tabelas e dados
 * 3. Verifica a integridade dos dados
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Carregar variáveis de ambiente do .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars: Record<string, string> = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
    }
  });
  
  return envVars;
}

const env = loadEnv();

const OLD_DATABASE = 'default';
const NEW_DATABASE = 'db_icestar';

async function migrateDatabase() {
  console.log('🚀 Iniciando migração do banco de dados...\n');

  // Criar conexão sem especificar banco (para poder criar o novo banco)
  const connection = await mysql.createConnection({
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    user: env.DB_USER || 'mysql',
    password: env.DB_PASSWORD,
    charset: 'utf8mb4'
  });

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
    console.log(`   1. Atualize o arquivo .env.local:`);
    console.log(`      DB_NAME=${NEW_DATABASE}`);
    console.log(`   2. Reinicie o servidor Next.js`);
    console.log(`   3. Teste o sistema completamente`);
    console.log(`   4. Após confirmar que tudo funciona, delete o banco antigo:`);
    console.log(`      DROP DATABASE \`${OLD_DATABASE}\`;`);
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
