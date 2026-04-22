/**
 * Content Fetcher Utility
 * 
 * Fetches dynamic content from database for landing page components.
 * Implements 5-minute in-memory caching for performance.
 * Provides fallback values for missing content.
 * 
 * Requirements: 19.1, 19.2, 19.3, 19.4, 19.5
 */

import { query } from '@/lib/db/connection';
import type { RowDataPacket } from 'mysql2/promise';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache
const cache = new Map<string, CacheEntry<any>>();

/**
 * Get data from cache or fetch from database
 */
async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    // Check cache
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    // Fetch from database
    const data = await fetcher();
    
    // Store in cache
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
    
    // Return cached data even if expired, or fallback
    const cached = cache.get(key);
    if (cached) {
      return cached.data;
    }
    
    return fallback;
  }
}

/**
 * Hero Content Interface
 */
export interface HeroContent {
  main_title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  secondary_button_text: string;
}

/**
 * Get hero section content
 */
export async function getHeroContent(): Promise<HeroContent> {
  const fallback: HeroContent = {
    main_title: 'Soluções Completas em Isolamento Térmico e Refrigeração Veicular',
    subtitle: 'Transforme seu veículo em uma câmara frigorífica profissional',
    description: 'A Ice Star é especialista em adaptação de veículos para transporte refrigerado.',
    primary_button_text: 'Solicite um Orçamento',
    secondary_button_text: 'Conheça Nossos Serviços',
  };

  return getCachedData('hero', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['hero']
    );

    if (!rows || rows.length === 0) {
      return fallback;
    }

    const data = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    return {
      main_title: data.main_title || fallback.main_title,
      subtitle: data.subtitle || fallback.subtitle,
      description: data.description || fallback.description,
      primary_button_text: data.primary_button_text || fallback.primary_button_text,
      secondary_button_text: data.secondary_button_text || fallback.secondary_button_text,
    };
  }, fallback);
}

/**
 * About Content Interface
 */
export interface AboutBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  section_title: string;
  main_description: string;
  benefits: AboutBenefit[];
}

/**
 * Get about section content
 */
export async function getAboutContent(): Promise<AboutContent> {
  const fallback: AboutContent = {
    section_title: 'Sobre a Ice Star',
    main_description: 'Somos referência em soluções de isolamento térmico e refrigeração veicular.',
    benefits: [
      {
        id: 'expertise',
        title: 'Expertise Técnica',
        description: 'Equipe especializada com anos de experiência',
        icon: 'Target',
      },
      {
        id: 'quality',
        title: 'Qualidade Superior',
        description: 'Materiais de primeira linha',
        icon: 'Award',
      },
      {
        id: 'customization',
        title: 'Soluções Personalizadas',
        description: 'Projetos adaptados às suas necessidades',
        icon: 'CheckCircle',
      },
      {
        id: 'support',
        title: 'Suporte Completo',
        description: 'Acompanhamento do projeto à manutenção',
        icon: 'Users',
      },
    ],
  };

  return getCachedData('about', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['about']
    );

    if (!rows || rows.length === 0) {
      return fallback;
    }

    const data = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    return {
      section_title: data.section_title || fallback.section_title,
      main_description: data.main_description || fallback.main_description,
      benefits: data.benefits || fallback.benefits,
    };
  }, fallback);
}

/**
 * CTA Content Interface
 */
export interface CTAContent {
  headline: string;
  button_text: string;
  button_href?: string;
}

/**
 * Get CTA section content
 */
export async function getCTAContent(): Promise<CTAContent> {
  const fallback: CTAContent = {
    headline: 'Pronto para Transformar seu Veículo?',
    button_text: 'Fale Conosco Agora',
    button_href: '#contact',
  };

  return getCachedData('cta', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['cta']
    );

    if (!rows || rows.length === 0) {
      return fallback;
    }

    const data = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    return {
      headline: data.headline || fallback.headline,
      button_text: data.button_text || fallback.button_text,
      button_href: data.button_href || fallback.button_href,
    };
  }, fallback);
}

/**
 * Contact Form Content Interface
 */
export interface ContactFormContent {
  section_title: string;
  section_description: string;
  submit_button_text: string;
  success_message: string;
  form_fields?: {
    full_name_label?: string;
    full_name_placeholder?: string;
    phone_label?: string;
    phone_placeholder?: string;
    email_label?: string;
    email_placeholder?: string;
    vehicle_type_label?: string;
    vehicle_type_placeholder?: string;
    message_label?: string;
    message_placeholder?: string;
  };
}

/**
 * Get contact form section content
 */
export async function getContactFormContent(): Promise<ContactFormContent> {
  const fallback: ContactFormContent = {
    section_title: 'Solicite um Orçamento',
    section_description: 'Preencha o formulário abaixo e nossa equipe entrará em contato',
    submit_button_text: 'Enviar Solicitação',
    success_message: 'Mensagem enviada com sucesso!',
    form_fields: {
      full_name_label: 'Nome Completo',
      full_name_placeholder: 'Seu nome completo',
      phone_label: 'Telefone / WhatsApp',
      phone_placeholder: '(00) 00000-0000',
      email_label: 'E-mail',
      email_placeholder: 'seu@email.com',
      vehicle_type_label: 'Tipo de Veículo',
      vehicle_type_placeholder: 'Selecione o tipo de veículo',
      message_label: 'Mensagem (Opcional)',
      message_placeholder: 'Conte-nos mais sobre suas necessidades...',
    },
  };

  return getCachedData('contact_form', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['contact_form']
    );

    if (!rows || rows.length === 0) {
      return fallback;
    }

    const data = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    return {
      section_title: data.section_title || fallback.section_title,
      section_description: data.section_description || fallback.section_description,
      submit_button_text: data.submit_button_text || fallback.submit_button_text,
      success_message: data.success_message || fallback.success_message,
      form_fields: data.form_fields || fallback.form_fields,
    };
  }, fallback);
}

/**
 * Footer Content Interface
 */
export interface FooterContent {
  company_name: string;
  company_description: string;
  phone: string;
  email: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    full: string;
  };
  social_media_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  social_media_text?: string;
  copyright_text?: string;
}

/**
 * Get footer section content
 */
export async function getFooterContent(): Promise<FooterContent> {
  const fallback: FooterContent = {
    company_name: 'Ice Star',
    company_description: 'Especialistas em isolamento térmico e refrigeração veicular.',
    phone: '(11) 99999-9999',
    email: 'contato@icestar.com.br',
    address: {
      full: 'São Paulo - SP',
    },
    social_media_links: {},
    copyright_text: 'Ice Star. Todos os direitos reservados.',
  };

  return getCachedData('footer', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['footer']
    );

    if (!rows || rows.length === 0) {
      return fallback;
    }

    const data = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    return {
      company_name: data.company_name || fallback.company_name,
      company_description: data.company_description || fallback.company_description,
      phone: data.phone || fallback.phone,
      email: data.email || fallback.email,
      address: data.address || fallback.address,
      social_media_links: data.social_media_links || fallback.social_media_links,
      social_media_text: data.social_media_text || fallback.social_media_text,
      copyright_text: data.copyright_text || fallback.copyright_text,
    };
  }, fallback);
}

/**
 * Get active logo path
 */
export async function getActiveLogo(): Promise<string | null> {
  return getCachedData('active_logo', async () => {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT file_path FROM logos WHERE is_active = TRUE LIMIT 1'
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0].file_path;
  }, null);
}

/**
 * Clear all cache (useful for testing or manual cache invalidation)
 */
export function clearContentCache(): void {
  cache.clear();
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string): void {
  cache.delete(key);
}
