/**
 * Contact form data interface
 * Validates: Requirements 11.1, 11.2, 15.3
 */
export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  message: string;
}

/**
 * Select option interface for dropdowns
 * Validates: Requirements 11.1, 11.2, 15.3
 */
export interface SelectOption {
  value: string;
  label: string;
}
