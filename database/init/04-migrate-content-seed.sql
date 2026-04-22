-- Ice Star Admin Panel - Content Migration Seed Script
-- Migrates existing hardcoded content from components to database
-- This script is idempotent and safe to run multiple times

USE istar;

-- ============================================================================
-- HERO SECTION CONTENT
-- ============================================================================
-- Extracted from: src/components/sections/Hero.tsx

INSERT INTO content_sections (section_key, section_data, updated_by)
SELECT 
    'hero',
    JSON_OBJECT(
        'main_title', 'Soluções Completas em Isolamento Térmico e Refrigeração Veicular',
        'subtitle', 'Transforme seu veículo em uma câmara frigorífica profissional',
        'description', 'A Ice Star é especialista em adaptação de veículos para transporte refrigerado. Oferecemos isolamento térmico de alta qualidade, instalação de aparelhos de refrigeração e projetos personalizados para atender suas necessidades específicas.',
        'primary_button_text', 'Solicite um Orçamento',
        'secondary_button_text', 'Conheça Nossos Serviços'
    ),
    'system'
WHERE NOT EXISTS (
    SELECT 1 FROM content_sections WHERE section_key = 'hero'
);

-- ============================================================================
-- ABOUT SECTION CONTENT
-- ============================================================================
-- Extracted from: src/components/sections/About.tsx

INSERT INTO content_sections (section_key, section_data, updated_by)
SELECT 
    'about',
    JSON_OBJECT(
        'section_title', 'Sobre a Ice Star',
        'main_description', 'Somos referência em soluções de isolamento térmico e refrigeração veicular. Com tecnologia de ponta e compromisso com a excelência, transformamos veículos comerciais em câmaras frigoríficas eficientes e confiáveis, garantindo a preservação perfeita de produtos refrigerados durante o transporte.',
        'benefits', JSON_ARRAY(
            JSON_OBJECT(
                'id', 'expertise',
                'title', 'Expertise Técnica',
                'description', 'Equipe especializada com anos de experiência em refrigeração veicular',
                'icon', 'Target'
            ),
            JSON_OBJECT(
                'id', 'quality',
                'title', 'Qualidade Superior',
                'description', 'Materiais de primeira linha e processos rigorosos de qualidade',
                'icon', 'Award'
            ),
            JSON_OBJECT(
                'id', 'customization',
                'title', 'Soluções Personalizadas',
                'description', 'Projetos adaptados às necessidades específicas de cada cliente',
                'icon', 'CheckCircle'
            ),
            JSON_OBJECT(
                'id', 'support',
                'title', 'Suporte Completo',
                'description', 'Acompanhamento desde o projeto até a manutenção pós-instalação',
                'icon', 'Users'
            )
        )
    ),
    'system'
WHERE NOT EXISTS (
    SELECT 1 FROM content_sections WHERE section_key = 'about'
);

-- ============================================================================
-- CTA SECTION CONTENT
-- ============================================================================
-- Extracted from: src/components/sections/CTASection.tsx (typical usage)

INSERT INTO content_sections (section_key, section_data, updated_by)
SELECT 
    'cta',
    JSON_OBJECT(
        'headline', 'Pronto para Transformar seu Veículo?',
        'button_text', 'Fale Conosco Agora',
        'button_href', '#contact'
    ),
    'system'
WHERE NOT EXISTS (
    SELECT 1 FROM content_sections WHERE section_key = 'cta'
);

-- ============================================================================
-- CONTACT FORM SECTION CONTENT
-- ============================================================================
-- Extracted from: src/components/sections/ContactForm.tsx

INSERT INTO content_sections (section_key, section_data, updated_by)
SELECT 
    'contact_form',
    JSON_OBJECT(
        'section_title', 'Solicite um Orçamento',
        'section_description', 'Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar a melhor solução para seu veículo',
        'submit_button_text', 'Enviar Solicitação',
        'success_message', 'Mensagem enviada com sucesso! Entraremos em contato em breve. Obrigado!',
        'form_fields', JSON_OBJECT(
            'full_name_label', 'Nome Completo',
            'full_name_placeholder', 'Seu nome completo',
            'phone_label', 'Telefone / WhatsApp',
            'phone_placeholder', '(00) 00000-0000',
            'email_label', 'E-mail',
            'email_placeholder', 'seu@email.com',
            'vehicle_type_label', 'Tipo de Veículo',
            'vehicle_type_placeholder', 'Selecione o tipo de veículo',
            'message_label', 'Mensagem (Opcional)',
            'message_placeholder', 'Conte-nos mais sobre suas necessidades...'
        )
    ),
    'system'
WHERE NOT EXISTS (
    SELECT 1 FROM content_sections WHERE section_key = 'contact_form'
);

-- ============================================================================
-- FOOTER SECTION CONTENT
-- ============================================================================
-- Extracted from: src/components/layout/Footer.tsx

INSERT INTO content_sections (section_key, section_data, updated_by)
SELECT 
    'footer',
    JSON_OBJECT(
        'company_name', 'Ice Star',
        'company_description', 'Especialistas em isolamento térmico e refrigeração veicular. Soluções completas e personalizadas para o seu negócio.',
        'phone', '(11) 99999-9999',
        'email', 'contato@icestar.com.br',
        'address', JSON_OBJECT(
            'street', 'Rua Exemplo, 123',
            'city', 'São Paulo',
            'state', 'SP',
            'zip', '01234-567',
            'full', 'Rua Exemplo, 123 - São Paulo - SP - CEP 01234-567'
        ),
        'social_media_links', JSON_OBJECT(
            'facebook', 'https://facebook.com',
            'instagram', 'https://instagram.com',
            'linkedin', 'https://linkedin.com',
            'twitter', 'https://twitter.com'
        ),
        'social_media_text', 'Siga-nos nas redes sociais para ficar por dentro das novidades e promoções.',
        'copyright_text', 'Ice Star. Todos os direitos reservados.'
    ),
    'system'
WHERE NOT EXISTS (
    SELECT 1 FROM content_sections WHERE section_key = 'footer'
);

-- ============================================================================
-- UPDATE SITE SETTINGS - BRAND NAME CORRECTION
-- ============================================================================
-- Update brand name from "iStar" to "Ice Star" for consistency

UPDATE site_settings 
SET setting_value = 'Ice Star' 
WHERE setting_key = 'site_name' AND setting_value = 'iStar';

UPDATE site_settings 
SET setting_value = 'contato@icestar.com.br' 
WHERE setting_key = 'contact_email';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Verify all content sections were created
SELECT 
    CONCAT('Content sections created: ', COUNT(*)) AS status
FROM content_sections 
WHERE section_key IN ('hero', 'about', 'cta', 'contact_form', 'footer');

-- Display all migrated content sections
SELECT 
    section_key,
    updated_by,
    updated_at,
    CASE 
        WHEN JSON_LENGTH(section_data) > 0 THEN 'Data populated'
        ELSE 'No data'
    END AS data_status
FROM content_sections
ORDER BY section_key;

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================
-- 
-- This script migrates the following content:
-- 
-- 1. HERO SECTION
--    - Main title, subtitle, description
--    - Primary and secondary button text
-- 
-- 2. ABOUT SECTION
--    - Section title and main description
--    - Four benefit items with icons, titles, and descriptions
-- 
-- 3. CTA SECTION
--    - Headline and button text
-- 
-- 4. CONTACT FORM SECTION
--    - Section title and description
--    - Form field labels and placeholders
--    - Submit button text and success message
-- 
-- 5. FOOTER SECTION
--    - Company name and description
--    - Contact information (phone, email, address)
--    - Social media links
--    - Copyright text
-- 
-- BRAND NAME CORRECTION:
-- - Changed "iStar" to "Ice Star" throughout the content
-- - This is the correct brand name per requirements (Requirement 23.1)
-- 
-- EXISTING DATA:
-- - Services, applications, and differentials remain in their existing tables
-- - These tables were already populated by 01-create-tables.sql
-- - No migration needed for these sections
-- 
-- ============================================================================
