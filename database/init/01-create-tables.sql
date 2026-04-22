-- iStar Database Initialization Script
-- This script creates the initial database structure for the iStar landing page

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS istar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE istar;

-- Table: contact_submissions
-- Stores all contact form submissions from the landing page
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    message TEXT,
    status ENUM('new', 'contacted', 'converted', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: services
-- Stores service information for the landing page
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: vehicle_applications
-- Stores vehicle type information
CREATE TABLE IF NOT EXISTS vehicle_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: differentials
-- Stores competitive advantages/differentials
CREATE TABLE IF NOT EXISTS differentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    differential_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: site_settings
-- Stores general site configuration
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    description VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial services data
INSERT INTO services (service_id, title, description, icon, display_order) VALUES
('thermal-insulation', 'Isolamento Térmico', 'Soluções completas em isolamento térmico para manter a temperatura ideal do seu veículo.', 'Snowflake', 1),
('refrigeration', 'Aparelhos de Refrigeração', 'Instalação e manutenção de sistemas de refrigeração de alta performance.', 'Wrench', 2),
('vehicle-adaptation', 'Adaptação Veicular', 'Projetos personalizados de adaptação interna para transporte refrigerado.', 'Truck', 3),
('maintenance', 'Manutenção e Suporte', 'Assistência técnica especializada e manutenção preventiva.', 'Settings', 4),
('custom-projects', 'Projetos Sob Medida', 'Desenvolvimento de soluções customizadas para necessidades específicas.', 'ClipboardCheck', 5),
('consulting', 'Consultoria Técnica', 'Orientação especializada para escolha da melhor solução térmica.', 'Users', 6);

-- Insert initial vehicle applications data
INSERT INTO vehicle_applications (application_id, name, description, display_order) VALUES
('fiorino', 'Fiorino', 'Adaptação completa para Fiat Fiorino com isolamento e refrigeração.', 1),
('ducato', 'Ducato', 'Soluções para Fiat Ducato, ideal para transporte de grande volume.', 2),
('sprinter', 'Sprinter', 'Projetos especializados para Mercedes-Benz Sprinter.', 3),
('vans', 'Vans em Geral', 'Adaptação para diversos modelos de vans e veículos comerciais.', 4);

-- Insert initial differentials data
INSERT INTO differentials (differential_id, title, description, icon, display_order) VALUES
('quality', 'Qualidade Garantida', 'Materiais premium e processos certificados.', 'Award', 1),
('delivery', 'Prazo Alinhado', 'Cumprimento rigoroso de prazos acordados.', 'Clock', 2),
('experience', 'Experiência Comprovada', 'Anos de expertise no mercado de refrigeração veicular.', 'Star', 3),
('service', 'Atendimento Personalizado', 'Suporte dedicado do início ao fim do projeto.', 'HeartHandshake', 4);

-- Insert initial site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'iStar', 'text', 'Nome do site'),
('contact_email', 'contato@istar.com.br', 'text', 'E-mail de contato principal'),
('contact_phone', '(11) 99999-9999', 'text', 'Telefone de contato principal'),
('address', 'Rua Exemplo, 123 - São Paulo - SP - CEP 01234-567', 'text', 'Endereço físico da empresa'),
('facebook_url', 'https://facebook.com', 'text', 'URL do Facebook'),
('instagram_url', 'https://instagram.com', 'text', 'URL do Instagram'),
('linkedin_url', 'https://linkedin.com', 'text', 'URL do LinkedIn'),
('twitter_url', 'https://twitter.com', 'text', 'URL do Twitter');
