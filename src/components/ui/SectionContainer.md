# SectionContainer Component

## Overview

The `SectionContainer` component is a reusable wrapper component that provides consistent section styling, max-width constraints, centered alignment, and responsive padding across the iStar landing page.

## Features

- **Max-width constraint**: Content is constrained to 1280px maximum width
- **Centered alignment**: Content is centered horizontally with auto margins
- **Responsive padding**: Adapts padding based on viewport size
  - Mobile (<640px): 16px horizontal padding
  - Tablet (≥640px): 24px horizontal padding
  - Desktop (≥1024px): 32px horizontal padding
- **Background variants**: Supports three background color options
- **Semantic HTML**: Renders as a `<section>` element for accessibility
- **ID support**: Allows setting an ID for smooth scroll navigation
- **Custom styling**: Accepts additional className for customization

## Props

```typescript
interface SectionContainerProps {
  children: React.ReactNode;      // Content to be wrapped
  className?: string;              // Additional CSS classes
  background?: 'white' | 'light-gray' | 'neutral-gray';  // Background color variant
  id?: string;                     // Section ID for navigation
}
```

### Props Details

- **children** (required): The content to be rendered inside the container
- **className** (optional): Additional Tailwind CSS classes to apply
- **background** (optional): Background color variant
  - `'white'`: White background (default)
  - `'light-gray'`: Light gray background (#F5F5F5)
  - `'neutral-gray'`: Neutral gray background (#EAEAEA)
- **id** (optional): HTML id attribute for the section element, useful for smooth scroll navigation

## Usage Examples

### Basic Usage

```tsx
import SectionContainer from '@/components/ui/SectionContainer';

function MySection() {
  return (
    <SectionContainer>
      <h2>Section Title</h2>
      <p>Section content goes here.</p>
    </SectionContainer>
  );
}
```

### With Background Variant

```tsx
<SectionContainer background="light-gray">
  <h2>About Us</h2>
  <p>Company information...</p>
</SectionContainer>
```

### With ID for Navigation

```tsx
<SectionContainer id="services" background="white">
  <h2>Our Services</h2>
  <div className="grid grid-cols-3 gap-6">
    {/* Service cards */}
  </div>
</SectionContainer>
```

### With Custom ClassName

```tsx
<SectionContainer className="py-16 md:py-24" background="neutral-gray">
  <h2>Contact Us</h2>
  <form>{/* Form fields */}</form>
</SectionContainer>
```

### Complete Example

```tsx
<SectionContainer 
  id="differentials" 
  background="neutral-gray"
  className="py-12 md:py-16 lg:py-24"
>
  <h2 className="text-3xl font-bold text-center mb-12">
    Why Choose Us
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Differential cards */}
  </div>
</SectionContainer>
```

## Background Color Mapping

The component maps background prop values to Tailwind CSS classes:

| Prop Value | Tailwind Class | Color Code | Use Case |
|------------|----------------|------------|----------|
| `'white'` | `bg-white` | #FFFFFF | Default sections, primary content |
| `'light-gray'` | `bg-neutral-light` | #F5F5F5 | Alternating sections (About, Applications) |
| `'neutral-gray'` | `bg-neutral` | #EAEAEA | Differentials, subtle backgrounds |

## Responsive Behavior

The component automatically adjusts padding based on viewport size:

```css
/* Mobile (default) */
padding-left: 1rem;   /* 16px */
padding-right: 1rem;  /* 16px */

/* Tablet (≥640px) */
padding-left: 1.5rem; /* 24px */
padding-right: 1.5rem; /* 24px */

/* Desktop (≥1024px) */
padding-left: 2rem;   /* 32px */
padding-right: 2rem;  /* 32px */
```

## Styling Details

### Applied Classes

- `w-full`: Full width of parent container
- `mx-auto`: Centered horizontally with auto margins
- `max-w-[1280px]`: Maximum width constraint
- `px-4 sm:px-6 lg:px-8`: Responsive horizontal padding
- Background color class based on `background` prop
- Any additional classes from `className` prop

### CSS Specificity

The component combines classes in this order:
1. Background color class
2. Base structural classes (width, margins, padding)
3. Custom className (highest specificity)

This allows you to override default styles with the `className` prop if needed.

## Accessibility

- Uses semantic `<section>` HTML element
- Supports `id` attribute for skip navigation and smooth scrolling
- Maintains proper content hierarchy within sections

## Design System Integration

This component is part of the iStar landing page design system and follows these principles:

- **Consistency**: Ensures all sections have uniform max-width and padding
- **Responsiveness**: Adapts to all viewport sizes (320px - 1920px)
- **Maintainability**: Centralizes section styling logic
- **Flexibility**: Allows customization while maintaining defaults

## Requirements Satisfied

This component satisfies the following requirements from the iStar landing page specification:

- **10.1**: Supports viewport widths from 320px to 1920px
- **10.2**: Mobile-optimized spacing (<640px)
- **10.3**: Tablet-optimized layouts (640-1024px)
- **10.4**: Desktop-optimized layouts (>1024px)
- **10.7**: Maintains visual hierarchy and content readability
- **12.5**: Uses light gray (#F5F5F5) for alternating sections
- **12.6**: Uses neutral gray (#EAEAEA) for subtle backgrounds

## Related Components

- **Button**: Primary action component
- **Card**: Content container component
- **Input/Select/Textarea**: Form components
- All section components (Hero, About, Services, etc.) use SectionContainer

## Testing

A visual test component is available at `/section-container-demo` to verify:
- All background variants render correctly
- Responsive padding works at different viewport sizes
- Max-width constraint is applied
- ID attribute is set correctly
- Custom className is applied
- Content is properly centered

## Notes

- The component uses Tailwind CSS utility classes exclusively
- Background colors are defined in `tailwind.config.ts`
- The component is designed to wrap entire page sections
- Vertical padding should be added via `className` prop as needed (e.g., `py-12 md:py-16 lg:py-24`)
