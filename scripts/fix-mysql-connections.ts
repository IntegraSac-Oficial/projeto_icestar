/**
 * Script para verificar e ajustar o limite de conexões do MySQL
 */

import mysql from 'mysql2/promise';

async function fixMySQLConnections() {
  console.log('🔧 Verificando configuração de conexões do MySQL...\n');

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3307', 10),
    user: 'root', // Usando root para ter privilégios
    password: 'root', // Senha root do docker-compose
    charset: 'utf8mb4',
  });

  try {
    // Verificar limite atual de conexões
    console.log('📊 Verificando limite atual de conexões...');
    const [maxConnRows] = await connection.query('SHOW VARIABLES LIKE "max_connections"');
    console.log('Limite atual:', maxConnRows);

    // Verificar conexões ativas
    console.log('\n📊 Verificando conexões ativas...');
    const [processRows] = await connection.query('SHOW PROCESSLIST');
    console.log(`Conexões ativas: ${(processRows as any[]).length}`);
    
    // Mostrar detalhes das conexões
    console.log('\nDetalhes das conexões:');
    (processRows as any[]).forEach((proc: any) => {
      console.log(`  - ID: ${proc.Id}, User: ${proc.User}, DB: ${proc.db || 'N/A'}, Command: ${proc.Command}, Time: ${proc.Time}s`);
    });

    // Aumentar limite de conexões (se necessário)
    console.log('\n🔧 Aumentando limite de conexões para 200...');
    await connection.query('SET GLOBAL max_connections = 200');
    
    // Verificar novo limite
    const [newMaxConnRows] = await connection.query('SHOW VARIABLES LIKE "max_connections"');
    console.log('✅ Novo limite:', newMaxConnRows);

    console.log('\n✅ Configuração ajustada com sucesso!');
    console.log('\n💡 Dica: Para tornar essa mudança permanente, adicione ao arquivo de configuração do MySQL:');
    console.log('   max_connections = 200');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await connection.end();
  }
}

fixMySQLConnections()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Falha:', error);
    process.exit(1);
  });
