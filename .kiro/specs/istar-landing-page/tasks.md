# Implementation Plan: iStar Landing Page

## Overview

This implementation plan breaks down the iStar landing page into discrete, actionable coding tasks. The landing page will be built using Next.js 16 (App Router), React 18, TypeScript 5.x, and Tailwind CSS 3.x. The implementation follows a bottom-up approach: starting with project setup, building reusable UI components, creating data structures, implementing page sections, and finally integrating all components into the main page.

Each task builds incrementally on previous work, ensuring that code is integrated and functional at every step. Testing tasks are marked as optional with `*` to allow for flexible MVP delivery.

## Tasks

- [x] 1. Initialize Next.js project and configure development environment
  - Create new Next.js 16 project with TypeScript and Tailwind CSS
  - Configure `tsconfig.json` with strict mode enabled
  - Configure `tailwind.config.ts` with custom colors (primary red #C62828, dark red #8E0000, neutral grays)
  - Set up project directory structure (components/, types/, data/, lib/, hooks/)
  - Install required dependencies: `lucide-react`, `react-hook-form`, `zod`
  - Create `src/app/globals.css` with Tailwind directives
  - Verify development server runs successfully with `npm run dev`
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.7, 15.1_

- [x] 2. Create TypeScript type definitions and interfaces
  - Create `src/types/index.ts` with base types
  - Create `src/types/services.ts` with `Service` interface
  - Create `src/types/applications.ts` with `Application` interface
  - Create `src/types/form.ts` with `ContactFormData` interface and `SelectOption` interface
  - Define `NavigationItem`, `Differential` interfaces in `src/types/index.ts`
  - _Requirements: 11.1, 11.2, 11.5, 15.3_

- [x] 3. Create static data files
  - Create `src/data/navigation.ts` with navigation menu items (Início, Sobre, Serviços, Aplicações, Contato)
  - Create `src/data/services.ts` with 6 service offerings (thermal insulation, refrigeration, vehicle adaptation, maintenance, custom projects, consulting)
  - Create `src/data/applications.ts` with 4 vehicle types (Fiorino, Ducato, Sprinter, Vans)
  - Create `src/data/differentials.ts` with 4 competitive advantages (quality, delivery, experience, service)
  - Include appropriate Lucide React icons for each data item
  - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 6.1, 6.2, 13.1, 13.2_

- [x] 4. Build reusable UI components
  - [x] 4.1 Create Button component (`src/components/ui/Button.tsx`)
    - Implement three variants: primary, secondary, outline
    - Implement three sizes: sm, md, lg
    - Add TypeScript props interface with variant, size, children, onClick, type, disabled, fullWidth
    - Apply Tailwind classes for primary red (#C62828) background on primary variant
    - Add hover and focus states with appropriate styling
    - _Requirements: 2.5, 2.7, 7.3, 8.11, 11.2, 11.5, 12.1_

  - [x] 4.2 Create Card component (`src/components/ui/Card.tsx`)
    - Implement white background with subtle shadow (shadow-card)
    - Add rounded corners (rounded-lg)
    - Add optional hoverable prop with lift effect (shadow-card-hover)
    - Add TypeScript props interface with children, className, hoverable
    - _Requirements: 4.7, 12.8_

  - [x] 4.3 Create Input component (`src/components/ui/Input.tsx`)
    - Implement label, input field, and error message display
    - Add TypeScript props interface with label, type, name, placeholder, error, required, register
    - Support input types: text, email, tel
    - Apply red border on error state and focus state
    - Display error message below input in red text
    - _Requirements: 8.1, 8.2, 8.3, 8.6, 8.7, 8.8, 8.10, 8.12, 11.6, 11.8_

  - [x] 4.4 Create Select component (`src/components/ui/Select.tsx`)
    - Implement label, select dropdown, and error message display
    - Add TypeScript props interface with label, name, options, error, required, register
    - Define `SelectOption` interface with value and label
    - Apply consistent styling with Input component
    - _Requirements: 8.4, 8.10, 11.6, 11.8_

  - [x] 4.5 Create Textarea component (`src/components/ui/Textarea.tsx`)
    - Implement label, textarea field, and error message display
    - Add TypeScript props interface with label, name, placeholder, rows, error, required, register
    - Apply consistent styling with Input component
    - _Requirements: 8.5, 8.10, 11.6, 11.8_

  - [x] 4.6 Create SectionContainer component (`src/components/ui/SectionContainer.tsx`)
    - Implement wrapper with max-width 1280px and centered alignment
    - Add responsive padding (px-4 sm:px-6 lg:px-8)
    - Add TypeScript props interface with children, className, background, id
    - Support background variants: white, light-gray, neutral-gray
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.7, 12.5, 12.6_

- [x] 5. Create form validation schema
  - Create `src/lib/validations.ts` with Zod schema for contact form
  - Define validation rules: fullName (min 3 chars), phone (regex pattern), email (valid format), vehicleType (required), message (max 500 chars, optional)
  - Export `ContactFormData` type inferred from schema
  - _Requirements: 8.6, 8.7, 8.8, 11.1_

- [x] 6. Create utility functions
  - Create `src/lib/utils.ts` with `cn()` helper for conditional Tailwind classes
  - Add `scrollToSection()` function for smooth scrolling with offset for fixed header
  - _Requirements: 1.4, 15.5_

- [x] 7. Implement custom hooks
  - Create `src/hooks/useScrollSpy.ts` hook for active section detection
  - Use IntersectionObserver API to detect visible sections
  - Return active section ID for navigation highlighting
  - _Requirements: 1.1, 1.4_

- [x] 8. Build layout components
  - [x] 8.1 Create Header component (`src/components/layout/Header.tsx`)
    - Implement fixed positioning with backdrop blur
    - Display iStar logo on the left
    - Display navigation menu items from `navigation.ts` data
    - Display primary CTA button on the right
    - Implement smooth scroll on menu item click using `scrollToSection()`
    - Highlight active section using `useScrollSpy()` hook
    - Add mobile menu toggle button (hamburger icon) for viewports < 768px
    - Manage `isMobileMenuOpen` state
    - Apply white background with subtle shadow
    - Use primary red (#C62828) for logo and active menu items
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 10.2, 11.2, 11.6_

  - [x] 8.2 Create MobileMenu component (`src/components/layout/MobileMenu.tsx`)
    - Implement slide-in menu from right side
    - Add TypeScript props interface with isOpen, onClose, navigationItems
    - Display navigation items vertically
    - Implement overlay backdrop with click-to-close
    - Close menu on navigation item click after smooth scroll
    - Add slide animation (CSS transform or Framer Motion)
    - _Requirements: 1.6, 1.7, 10.2, 11.2_

  - [x] 8.3 Create Footer component (`src/components/layout/Footer.tsx`)
    - Implement four-column layout for desktop (≥1024px)
    - Implement two-column layout for tablet (768-1024px)
    - Implement single-column layout for mobile (<768px)
    - Display company name and description
    - Display quick links to page sections
    - Display contact information (phone, email, address placeholder)
    - Display social media icons with links (placeholder)
    - Display copyright notice
    - Use dark red (#8E0000) background with white text
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.3, 11.6, 12.2_

- [x] 9. Checkpoint - Verify UI components and layout structure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Build page sections
  - [x] 10.1 Create Hero section (`src/components/sections/Hero.tsx`)
    - Implement two-column layout for desktop (≥768px) with text on left, image on right
    - Implement single-column layout for mobile (<768px) with image below text
    - Display h1 headline with iStar value proposition
    - Display h2 subheadline with additional context
    - Display supporting paragraph text
    - Display two CTA buttons (primary and secondary variants)
    - Display hero vehicle image on right side (use placeholder SVG)
    - Use SectionContainer wrapper
    - Ensure section occupies at least 80vh height
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 10.2, 11.6, 11.7, 13.1, 13.3_

  - [x] 10.2 Create About section (`src/components/sections/About.tsx`)
    - Implement section title (h2)
    - Display company value proposition text
    - Display 3-4 key benefits with icons in grid layout
    - Implement three-column grid for desktop (≥1024px)
    - Implement two-column grid for tablet (≥768px)
    - Implement single-column for mobile (<768px)
    - Use light gray background (#F5F5F5)
    - Use SectionContainer wrapper
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 10.2, 10.3, 11.6, 12.5_

  - [x] 10.3 Create Services section (`src/components/sections/Services.tsx`)
    - Import services data from `src/data/services.ts`
    - Implement three-column grid for desktop (≥1024px)
    - Implement two-column grid for tablet (640-1024px)
    - Implement single-column for mobile (<640px)
    - Map over services array and render Card component for each service
    - Display icon, title, and description in each Card
    - Add hover effect to cards (hoverable prop)
    - Use primary red (#C62828) for icons
    - Use SectionContainer wrapper
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 10.2, 10.3, 11.2, 12.1, 12.8_

  - [x] 10.4 Create Applications section (`src/components/sections/Applications.tsx`)
    - Import applications data from `src/data/applications.ts`
    - Implement four-column grid for desktop (≥1024px)
    - Implement two-column grid for tablet (768-1024px)
    - Implement single-column for mobile (<768px)
    - Map over applications array and render Card component for each application
    - Display vehicle name and description in each Card
    - Add CTA button to each card
    - Use light gray background (#F5F5F5)
    - Use SectionContainer wrapper
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 10.2, 10.3, 11.2, 12.5_

  - [x] 10.5 Create Differentials section (`src/components/sections/Differentials.tsx`)
    - Import differentials data from `src/data/differentials.ts`
    - Implement four-column grid for desktop (≥1024px)
    - Implement two-column grid for tablet (640-1024px)
    - Implement single-column for mobile (<640px)
    - Map over differentials array and render Card component for each differential
    - Display icon, title, and description in each Card
    - Use neutral gray background (#EAEAEA)
    - Use SectionContainer wrapper
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 10.2, 10.3, 11.2, 12.6_

  - [x] 10.6 Create CTASection component (`src/components/sections/CTASection.tsx`)
    - Implement full-width section with primary red (#C62828) background
    - Display compelling headline encouraging action
    - Display prominent CTA button
    - Use white text for contrast
    - Center content horizontally
    - Add TypeScript props interface with headline, buttonText, buttonHref
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 11.2, 12.1_

  - [x] 10.7 Create ContactForm section (`src/components/sections/ContactForm.tsx`)
    - Implement React Hook Form with Zod validation schema
    - Create form with fullName, phone, email, vehicleType, message fields
    - Use Input component for text, email, and tel fields
    - Use Select component for vehicleType with options from data file
    - Use Textarea component for message field
    - Implement two-column layout for desktop (≥768px) for name/phone/email
    - Implement single-column layout for mobile (<768px)
    - Display validation errors below each field on blur
    - Implement form submission handler with simulated API call
    - Display success message on successful submission
    - Reset form after successful submission
    - Add loading state during submission
    - Use SectionContainer wrapper
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11, 8.12, 10.2, 10.4, 11.2_

- [x] 11. Checkpoint - Verify all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Integrate all components into main page
  - Update `src/app/page.tsx` to import and render all section components
  - Arrange sections in order: Hero, About, Services, Applications, Differentials, CTASection, ContactForm
  - Add section IDs for smooth scroll navigation (hero, about, services, applications, contact)
  - Add scroll-margin-top CSS to sections to account for fixed header
  - Wrap page in semantic HTML structure (main element)
  - _Requirements: 1.4, 11.6, 15.1, 15.2_

- [x] 13. Update root layout with metadata and Header/Footer
  - Update `src/app/layout.tsx` to include Header and Footer components
  - Add page metadata (title, description, Open Graph tags)
  - Configure font (Inter from Google Fonts or system fonts)
  - Ensure Header is fixed and Footer is at bottom
  - _Requirements: 1.1, 9.1, 11.6, 15.1_

- [x] 14. Implement responsive behavior and polish
  - Verify all breakpoints work correctly (320px, 640px, 768px, 1024px, 1440px, 1920px)
  - Ensure no horizontal scrolling at any viewport width
  - Verify touch target sizes are minimum 44x44px on mobile
  - Add focus states to all interactive elements (ring-2 ring-primary)
  - Verify smooth scroll behavior works across all browsers
  - Test mobile menu open/close functionality
  - Test form validation and submission flow
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 11.6_

- [x] 15. Add accessibility features
  - Add aria-label to icon-only buttons (mobile menu toggle)
  - Add aria-expanded to mobile menu toggle button
  - Add aria-current to active navigation items
  - Add aria-live region for form success/error messages
  - Verify semantic HTML structure (nav, main, section, footer)
  - Verify all images have alt attributes
  - Verify all form inputs have associated labels
  - Test keyboard navigation (Tab, Enter, Escape)
  - Verify focus indicators are visible
  - _Requirements: 11.6, 11.7, 11.8_

- [x] 16. Create placeholder assets
  - Create or source placeholder vehicle image for Hero section
  - Add placeholder image to `public/images/` directory
  - Optimize image size and format (WebP with fallback)
  - _Requirements: 2.5, 13.3, 13.4_

- [ ]* 17. Write unit tests for UI components
  - Test Button component renders with correct variants and sizes
  - Test Card component renders children and applies hoverable effect
  - Test Input component displays error messages correctly
  - Test Select component renders options correctly
  - Test Textarea component renders with correct props
  - Use React Testing Library for component tests
  - _Requirements: 11.1, 11.2, 15.4_

- [ ]* 18. Write integration tests for form validation
  - Test empty required fields show validation errors
  - Test invalid email format shows error message
  - Test invalid phone format shows error message
  - Test valid form submission displays success message
  - Test form resets after successful submission
  - _Requirements: 8.6, 8.7, 8.8, 8.9_

- [ ]* 19. Write tests for navigation and scroll behavior
  - Test Header renders navigation items correctly
  - Test mobile menu toggles open/close
  - Test smooth scroll triggers on navigation click
  - Test active section highlighting updates on scroll
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 1.7_

- [x] 20. Final verification and quality checks
  - Run TypeScript type checking (`npm run type-check`)
  - Run Next.js linting (`npm run lint`)
  - Build production bundle (`npm run build`)
  - Verify build completes without errors
  - Test production build locally (`npm run start`)
  - Verify all sections render correctly in production mode
  - Check console for any warnings or errors
  - _Requirements: 14.1, 14.2, 14.3, 15.1, 15.2, 15.3, 15.5, 15.6_

- [x] 21. Checkpoint - Final review and handoff
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- The implementation follows a bottom-up approach: setup → components → data → sections → integration
- All code uses TypeScript with strict type checking
- All styling uses Tailwind CSS utility classes
- The project is ready for future backend integration without requiring refactoring
- Checkpoints ensure incremental validation and provide opportunities for user feedback
