-- Tabela para galeria de aplicações
-- Armazena fotos de trabalhos realizados com legendas

CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `image_path` VARCHAR(500) NOT NULL COMMENT 'Caminho da imagem no servidor',
  `caption` VARCHAR(255) NOT NULL COMMENT 'Legenda da imagem',
  `display_order` INT NOT NULL DEFAULT 0 COMMENT 'Ordem de exibição',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir algumas imagens de exemplo
INSERT INTO `gallery_images` (`image_path`, `caption`, `display_order`) VALUES
('/uploads/gallery/exemplo-1.jpg', 'Isolamento térmico em Fiat Fiorino', 1),
('/uploads/gallery/exemplo-2.jpg', 'Adaptação completa em Fiat Ducato', 2),
('/uploads/gallery/exemplo-3.jpg', 'Sistema de refrigeração em Mercedes Sprinter', 3),
('/uploads/gallery/exemplo-4.jpg', 'Projeto personalizado em van comercial', 4);
