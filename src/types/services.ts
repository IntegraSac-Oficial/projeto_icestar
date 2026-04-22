import { LucideIcon } from 'lucide-react';

/**
 * Service offering interface
 * Validates: Requirements 11.1, 11.2, 11.5
 */
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
