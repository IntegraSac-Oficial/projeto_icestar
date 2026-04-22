/**
 * Vehicle application interface
 * Validates: Requirements 11.1, 11.2, 11.5
 */
export interface Application {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}
