import { LucideIcon } from 'lucide-react';

/**
 * Navigation item for header menu
 * Validates: Requirements 11.1, 11.2
 */
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

/**
 * Competitive differential item
 * Validates: Requirements 11.1, 11.2
 */
export interface Differential {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
