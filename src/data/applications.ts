import { Application } from '@/types/applications';

/**
 * Vehicle application types data
 * Validates: Requirements 5.1, 5.2, 13.1, 13.2
 */
export const applications: Application[] = [
  {
    id: 'fiorino',
    name: 'Fiorino',
    description: 'Adaptação completa para Fiat Fiorino com isolamento e refrigeração.',
  },
  {
    id: 'ducato',
    name: 'Ducato',
    description: 'Soluções para Fiat Ducato, ideal para transporte de grande volume.',
  },
  {
    id: 'sprinter',
    name: 'Sprinter',
    description: 'Projetos especializados para Mercedes-Benz Sprinter.',
  },
  {
    id: 'vans',
    name: 'Vans em Geral',
    description: 'Adaptação para diversos modelos de vans e veículos comerciais.',
  },
];
