import { Snowflake, Wrench, Truck, Settings, ClipboardCheck, Users } from 'lucide-react';
import { Service } from '@/types/services';

/**
 * Service offerings data
 * Validates: Requirements 4.1, 4.2, 4.3, 13.1, 13.2
 */
export const services: Service[] = [
  {
    id: 'thermal-insulation',
    icon: Snowflake,
    title: 'Isolamento Térmico',
    description: 'Soluções completas em isolamento térmico para manter a temperatura ideal do seu veículo.',
  },
  {
    id: 'refrigeration',
    icon: Wrench,
    title: 'Aparelhos de Refrigeração',
    description: 'Instalação e manutenção de sistemas de refrigeração de alta performance.',
  },
  {
    id: 'vehicle-adaptation',
    icon: Truck,
    title: 'Adaptação Veicular',
    description: 'Projetos personalizados de adaptação interna para transporte refrigerado.',
  },
  {
    id: 'maintenance',
    icon: Settings,
    title: 'Manutenção e Suporte',
    description: 'Assistência técnica especializada e manutenção preventiva.',
  },
  {
    id: 'custom-projects',
    icon: ClipboardCheck,
    title: 'Projetos Sob Medida',
    description: 'Desenvolvimento de soluções customizadas para necessidades específicas.',
  },
  {
    id: 'consulting',
    icon: Users,
    title: 'Consultoria Técnica',
    description: 'Orientação especializada para escolha da melhor solução térmica.',
  },
];
