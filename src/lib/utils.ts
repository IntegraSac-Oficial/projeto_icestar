/**
 * Utility functions for the iStar landing page
 * Validates: Requirements 1.4, 15.5
 */

/**
 * Conditionally join Tailwind CSS class names
 * Filters out falsy values and joins remaining classes with spaces
 * 
 * @param classes - Array of class names or conditional class expressions
 * @returns Combined class string
 * 
 * @example
 * cn('base-class', isActive && 'active-class', 'another-class')
 * // Returns: "base-class active-class another-class" (if isActive is true)
 * // Returns: "base-class another-class" (if isActive is false)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Smooth scroll to a section with offset for fixed header
 * Accounts for the fixed header height to ensure proper section visibility
 * 
 * @param sectionId - The ID of the target section element
 * @param offset - Additional offset in pixels (default: 80px for header height)
 * 
 * @example
 * scrollToSection('services')
 * // Smoothly scrolls to the element with id="services"
 * 
 * scrollToSection('contact', 100)
 * // Scrolls with a custom 100px offset
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);
  
  if (!element) {
    console.warn(`Element with id "${sectionId}" not found`);
    return;
  }

  // Get the element's position relative to the document
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  
  // Calculate the target scroll position with offset
  const targetPosition = elementPosition - offset;

  // Perform smooth scroll
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}
