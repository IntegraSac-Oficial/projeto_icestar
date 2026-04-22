# Header Component

## Overview

The Header component is a fixed navigation bar that remains at the top of the viewport during page scrolling. It provides navigation to different sections of the landing page, displays the iStar logo, and includes a call-to-action button.

## Features

- **Fixed Positioning**: Stays at the top of the viewport with backdrop blur effect
- **Logo**: Displays the iStar brand logo on the left side
- **Navigation Menu**: Shows navigation items that link to page sections
- **Smooth Scrolling**: Implements smooth scroll behavior when navigation items are clicked
- **Active Section Highlighting**: Highlights the currently visible section in the navigation
- **Mobile Menu**: Responsive hamburger menu for viewports < 768px
- **CTA Button**: Primary call-to-action button on the right side
- **Accessibility**: Full keyboard navigation and ARIA labels

## Requirements Validated

- 1.1: Fixed header at top of viewport during scrolling
- 1.2: iStar logo displayed on the left
- 1.3: Navigation menu items linking to page sections
- 1.4: Smooth scrolling to target sections
- 1.5: Primary CTA button on the right
- 1.6: Mobile menu icon for viewports < 768px
- 1.7: Mobile menu toggle functionality
- 1.8: Primary red color (#C62828) for branding
- 1.9: White background with subtle shadow
- 10.2: Responsive layout support
- 11.2: TypeScript interfaces for type safety
- 11.6: Semantic HTML elements

## Usage

```tsx
import Header from '@/components/layout/Header';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* Page content with sections */}
        <section id="hero">...</section>
        <section id="about">...</section>
        <section id="services">...</section>
        <section id="applications">...</section>
        <section id="contact">...</section>
      </main>
    </>
  );
}
```

## Props

The Header component does not accept any props. It uses static navigation data from `src/data/navigation.ts`.

## Dependencies

- **Navigation Data**: `src/data/navigation.ts` - Array of navigation items
- **useScrollSpy Hook**: `src/hooks/useScrollSpy.ts` - Detects active section
- **scrollToSection Utility**: `src/lib/utils.ts` - Smooth scroll function
- **Button Component**: `src/components/ui/Button.tsx` - CTA button
- **Lucide Icons**: `Menu` and `X` icons for mobile menu toggle

## Responsive Behavior

### Desktop (≥768px)
- Horizontal navigation menu displayed inline
- CTA button visible on the right
- No hamburger menu icon

### Mobile (<768px)
- Hamburger menu icon displayed
- Navigation menu hidden by default
- Clicking hamburger toggles mobile menu
- Mobile menu slides in from top with vertical navigation
- CTA button included in mobile menu

## Styling

- **Background**: White with subtle shadow (`shadow-md`)
- **Backdrop Blur**: Applied for modern glass effect
- **Logo Color**: Primary red (#C62828)
- **Active Navigation**: Primary red text color
- **Inactive Navigation**: Gray text with hover effect
- **Height**: Fixed at 80px (h-20)
- **Max Width**: 1280px with centered alignment

## Accessibility

- **Semantic HTML**: Uses `<header>` and `<nav>` elements
- **ARIA Labels**: 
  - Logo button has descriptive aria-label
  - Mobile menu toggle has dynamic aria-label and aria-expanded
  - Navigation has aria-label for screen readers
  - Active items have aria-current="page"
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Visible focus rings on all interactive elements

## State Management

The component manages the following internal state:

- `isMobileMenuOpen`: Boolean controlling mobile menu visibility
- `activeSection`: String from useScrollSpy hook indicating current section

## Testing

To test the Header component:

1. Run the development server: `npm run dev`
2. Navigate to `/header-demo` in your browser
3. Test the following:
   - Click navigation items to verify smooth scrolling
   - Scroll the page to verify active section highlighting
   - Resize window to < 768px to test mobile menu
   - Click hamburger icon to open/close mobile menu
   - Click "Solicitar Orçamento" to scroll to contact section

## Implementation Notes

- The component uses the `'use client'` directive as it requires client-side interactivity
- The useScrollSpy hook uses IntersectionObserver API for efficient scroll detection
- Mobile menu closes automatically when a navigation item is clicked
- The logo is clickable and scrolls to the hero section
- All scroll offsets account for the fixed header height (80px)
