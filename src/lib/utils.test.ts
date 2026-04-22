/**
 * Manual test/demonstration file for utility functions
 * This file demonstrates the cn() and scrollToSection() functions
 * 
 * To test these utilities:
 * 1. Import them in a component
 * 2. Use cn() for conditional class names
 * 3. Use scrollToSection() for navigation
 */

import { cn, scrollToSection } from './utils';

/**
 * Example usage of cn() function
 */
export const cnExamples = {
  // Basic usage
  basic: cn('class1', 'class2', 'class3'),
  // Expected: "class1 class2 class3"

  // Conditional classes
  conditional: (isActive: boolean, isDisabled: boolean) =>
    cn('base-class', isActive && 'active', isDisabled && 'disabled'),
  // Expected: "base-class active" (if isActive=true, isDisabled=false)

  // Filtering falsy values
  withFalsy: cn('class1', false, 'class2', null, 'class3', undefined),
  // Expected: "class1 class2 class3"

  // Real-world example: Button with dynamic classes
  buttonClasses: (variant: string, size: string, disabled: boolean) =>
    cn(
      'font-medium rounded-lg transition-all',
      variant === 'primary' && 'bg-primary text-white',
      variant === 'secondary' && 'bg-white text-primary border-2',
      size === 'sm' && 'py-2 px-4 text-sm',
      size === 'md' && 'py-3 px-6 text-base',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
};

/**
 * Example usage of scrollToSection() function
 */
export const scrollToSectionExamples = {
  // Scroll to a section with default offset (80px)
  scrollToServices: () => scrollToSection('services'),

  // Scroll to a section with custom offset
  scrollToContact: () => scrollToSection('contact', 100),

  // Scroll to hero section with no offset
  scrollToHero: () => scrollToSection('hero', 0),
};

/**
 * Test results for cn() function
 * Run these in the browser console to verify behavior
 */
export const testCn = () => {
  console.group('cn() Function Tests');
  
  console.log('Basic:', cnExamples.basic);
  console.log('Expected: "class1 class2 class3"');
  
  console.log('\nConditional (active=true, disabled=false):', 
    cnExamples.conditional(true, false));
  console.log('Expected: "base-class active"');
  
  console.log('\nWith Falsy:', cnExamples.withFalsy);
  console.log('Expected: "class1 class2 class3"');
  
  console.log('\nButton Classes (primary, md, disabled):', 
    cnExamples.buttonClasses('primary', 'md', true));
  console.log('Expected: "font-medium rounded-lg transition-all bg-primary text-white py-3 px-6 text-base opacity-50 cursor-not-allowed"');
  
  console.groupEnd();
};

/**
 * Instructions for testing scrollToSection():
 * 
 * 1. Create a page with sections that have IDs:
 *    <section id="hero">Hero Content</section>
 *    <section id="services">Services Content</section>
 *    <section id="contact">Contact Content</section>
 * 
 * 2. Add a fixed header with height ~80px
 * 
 * 3. Call the scroll functions:
 *    scrollToSection('services')     // Scrolls with 80px offset
 *    scrollToSection('contact', 100) // Scrolls with 100px offset
 * 
 * 4. Verify:
 *    - Smooth scrolling animation occurs
 *    - Section appears below the fixed header
 *    - Console warning appears for non-existent sections
 */
