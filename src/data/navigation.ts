import { NavigationItem } from '@/types';

/**
 * Navigation menu items for header
 * Validates: Requirements 4.1, 13.1
 */
export const navigationItems: NavigationItem[] = [
  {
    id: 'hero',
    label: 'Início',
    href: '#hero',
  },
  {
    id: 'about',
    label: 'Sobre',
    href: '#about',
  },
  {
    id: 'services',
    label: 'Serviços',
    href: '#services',
  },
  {
    id: 'applications',
    label: 'Aplicações',
    href: '#applications',
  },
  {
    id: 'contact',
    label: 'Contato',
    href: '#contact',
  },
];
