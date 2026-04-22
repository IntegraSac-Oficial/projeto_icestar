import { Award, Clock, Star, HeartHandshake } from 'lucide-react';
import { Differential } from '@/types';

/**
 * Competitive differentials data
 * Validates: Requirements 6.1, 6.2, 13.1, 13.2
 */
export const differentials: Differential[] = [
  {
    id: 'quality',
    icon: Award,
    title: 'Qualidade Garantida',
    description: 'Materiais premium e processos certificados.',
  },
  {
    id: 'delivery',
    icon: Clock,
    title: 'Prazo Alinhado',
    description: 'Cumprimento rigoroso de prazos acordados.',
  },
  {
    id: 'experience',
    icon: Star,
    title: 'Experiência Comprovada',
    description: 'Anos de expertise no mercado de refrigeração veicular.',
  },
  {
    id: 'service',
    icon: HeartHandshake,
    title: 'Atendimento Personalizado',
    description: 'Suporte dedicado do início ao fim do projeto.',
  },
];
