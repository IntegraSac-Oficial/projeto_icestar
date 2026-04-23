-- Script para migrar banco de dados de 'default' para 'db_icestar'
-- Execute este script no phpMyAdmin (copie e cole na aba SQL)

-- ═══════════════════════════════════════════════════════════════
-- PASSO 1: Criar o novo banco de dados
-- ═══════════════════════════════════════════════════════════════
CREATE DATABASE IF NOT EXISTS `db_icestar` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════
-- PASSO 2: Copiar todas as tabelas e dados
-- ═══════════════════════════════════════════════════════════════

-- Copiar tabela: admins
CREATE TABLE IF NOT EXISTS `db_icestar`.`admins` LIKE `default`.`admins`;
INSERT INTO `db_icestar`.`admins` SELECT * FROM `default`.`admins`;

-- Copiar tabela: content_sections
CREATE TABLE IF NOT EXISTS `db_icestar`.`content_sections` LIKE `default`.`content_sections`;
INSERT INTO `db_icestar`.`content_sections` SELECT * FROM `default`.`content_sections`;

-- Copiar tabela: logos
CREATE TABLE IF NOT EXISTS `db_icestar`.`logos` LIKE `default`.`logos`;
INSERT INTO `db_icestar`.`logos` SELECT * FROM `default`.`logos`;

-- Copiar tabela: gallery_images
CREATE TABLE IF NOT EXISTS `db_icestar`.`gallery_images` LIKE `default`.`gallery_images`;
INSERT INTO `db_icestar`.`gallery_images` SELECT * FROM `default`.`gallery_images`;

-- ═══════════════════════════════════════════════════════════════
-- PASSO 3: Verificar se tudo foi copiado corretamente
-- ═══════════════════════════════════════════════════════════════

-- Verificar contagem de registros em cada tabela
SELECT 'admins' as tabela, 
       (SELECT COUNT(*) FROM `default`.`admins`) as banco_antigo,
       (SELECT COUNT(*) FROM `db_icestar`.`admins`) as banco_novo
UNION ALL
SELECT 'content_sections' as tabela,
       (SELECT COUNT(*) FROM `default`.`content_sections`) as banco_antigo,
       (SELECT COUNT(*) FROM `db_icestar`.`content_sections`) as banco_novo
UNION ALL
SELECT 'logos' as tabela,
       (SELECT COUNT(*) FROM `default`.`logos`) as banco_antigo,
       (SELECT COUNT(*) FROM `db_icestar`.`logos`) as banco_novo
UNION ALL
SELECT 'gallery_images' as tabela,
       (SELECT COUNT(*) FROM `default`.`gallery_images`) as banco_antigo,
       (SELECT COUNT(*) FROM `db_icestar`.`gallery_images`) as banco_novo;

-- ═══════════════════════════════════════════════════════════════
-- ✅ MIGRAÇÃO CONCLUÍDA!
-- ═══════════════════════════════════════════════════════════════
-- 
-- PRÓXIMOS PASSOS:
-- 
-- 1. Verifique se os números acima estão iguais (banco_antigo = banco_novo)
-- 
-- 2. Atualize a configuração do banco MySQL no Coolify:
--    - Vá no painel do Coolify
--    - Edite o banco de dados MySQL (UUID: twcueb02uu8w05auhzpx8dgn)
--    - Altere "mysql_database" de "default" para "db_icestar"
--    - Salve e reinicie o banco
-- 
-- 3. Reinicie a aplicação Next.js no Coolify
-- 
-- 4. Teste o sistema completamente
-- 
-- 5. Após confirmar que tudo funciona, delete o banco antigo:
--    DROP DATABASE `default`;
-- 
-- ═══════════════════════════════════════════════════════════════

