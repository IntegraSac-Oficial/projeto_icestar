/**
 * Script para criar tabela gallery_images no banco de dados local
 */

import { query } from '@/lib/db/connection';

async function createGalleryTable() {
  console.log('🚀 Criando tabela gallery_images...\n');

  try {
    // Criar tabela
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS \`gallery_images\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`image_path\` VARCHAR(500) NOT NULL COMMENT 'Caminho da imagem no servidor',
        \`caption\` VARCHAR(255) NOT NULL COMMENT 'Legenda da imagem',
        \`display_order\` INT NOT NULL DEFAULT 0 COMMENT 'Ordem de exibição',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_display_order\` (\`display_order\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await query(createTableSQL);
    console.log('✅ Tabela gallery_images criada com sucesso!\n');

    // Inserir dados de exemplo
    console.log('📝 Inserindo imagens de exemplo...\n');

    const insertSQL = `
      INSERT INTO \`gallery_images\` (\`image_path\`, \`caption\`, \`display_order\`) VALUES
      ('/uploads/gallery/exemplo-1.jpg', 'Isolamento térmico em Fiat Fiorino', 1),
      ('/uploads/gallery/exemplo-2.jpg', 'Adaptação completa em Fiat Ducato', 2),
      ('/uploads/gallery/exemplo-3.jpg', 'Sistema de refrigeração em Mercedes Sprinter', 3),
      ('/uploads/gallery/exemplo-4.jpg', 'Projeto personalizado em van comercial', 4);
    `;

    await query(insertSQL);
    console.log('✅ Imagens de exemplo inseridas com sucesso!\n');

    // Verificar
    const [rows] = await query('SELECT COUNT(*) as count FROM gallery_images');
    console.log(`📊 Total de imagens na galeria: ${(rows as any)[0].count}\n`);

    console.log('🎉 Script concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar tabela:', error);
    process.exit(1);
  }
}

createGalleryTable();
