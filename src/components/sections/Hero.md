# Hero Component

## Overview

The Hero component is the main banner section of the iStar landing page. It provides an impactful first impression with a strong value proposition, supporting text, call-to-action buttons, and a visual representation of a refrigerated vehicle.

## Features

- **Responsive Layout**: Two-column layout on desktop (≥768px), single-column on mobile (<768px)
- **Visual Hierarchy**: Clear h1 headline, h2 subheadline, and supporting paragraph
- **Dual CTAs**: Primary button (Solicite um Orçamento) and secondary button (Conheça Nossos Serviços)
- **Hero Image**: Custom SVG illustration of a refrigerated vehicle with iStar branding
- **Smooth Scrolling**: Buttons trigger smooth scroll to relevant sections
- **Minimum Height**: Occupies at least 80vh of viewport height
- **Accessibility**: Semantic HTML, proper heading hierarchy, and ARIA labels

## Requirements Satisfied

- **2.1**: Displays strong headline describing iStar's main value proposition
- **2.2**: Displays subtitle providing additional context
- **2.3**: Displays supporting text explaining service benefits
- **2.4**: Displays exactly two CTA buttons with different visual hierarchy
- **2.5**: Displays high-quality vehicle image (SVG illustration)
- **2.6**: Stacks content vertically on mobile with image below text
- **2.7**: Uses primary red color (#C62828) for primary CTA button
- **2.8**: Uses contrasting colors for text readability
- **2.9**: Occupies at least 80% of initial viewport height
- **10.2**: Responsive layout for mobile (<768px)
- **11.6**: Uses semantic HTML elements
- **11.7**: Includes alt attributes (aria-label) for images
- **13.1**: Uses professional placeholder text appropriate for the industry
- **13.3**: Uses placeholder image representing vehicle context

## Usage

```tsx
import Hero from '@/components/sections/Hero';

export default function Page() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  );
}
```

## Component Structure

```
Hero
├── Section (min-h-[80vh], id="hero")
│   └── SectionContainer
│       └── Grid (2 columns on md+)
│           ├── Text Content (Left/Top)
│           │   ├── h1 (Headline)
│           │   ├── h2 (Subheadline)
│           │   ├── p (Supporting text)
│           │   └── Button Group
│           │       ├── Button (Primary - "Solicite um Orçamento")
│           │       └── Button (Secondary - "Conheça Nossos Serviços")
│           └── Hero Image (Right/Bottom)
│               └── SVG (Refrigerated vehicle illustration)
```

## Responsive Behavior

### Mobile (<768px)
- Single-column layout (`grid-cols-1`)
- Image appears above text (`order-first`)
- Buttons stack vertically on small screens
- Full-width layout with responsive padding

### Desktop (≥768px)
- Two-column layout (`md:grid-cols-2`)
- Text on left, image on right (`md:order-last`)
- Buttons appear side-by-side
- Larger typography and spacing

## Styling

### Colors
- **Headline**: Black (#111111)
- **Subheadline**: Gray-700
- **Body Text**: Gray-600
- **Primary Button**: Primary red (#C62828) background, white text
- **Secondary Button**: White background, primary red text and border
- **SVG Accents**: Primary red (#C62828)

### Typography
- **h1**: text-4xl md:text-5xl lg:text-6xl, font-bold
- **h2**: text-2xl md:text-3xl lg:text-4xl, font-semibold
- **p**: text-lg md:text-xl, leading-relaxed

### Spacing
- Section padding: py-12 md:py-16 lg:py-24
- Content gap: gap-8 md:gap-12
- Button gap: gap-4

## Interactions

### Primary Button Click
Smoothly scrolls to the contact form section (`#contact`)

```typescript
const handlePrimaryClick = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
```

### Secondary Button Click
Smoothly scrolls to the services section (`#services`)

```typescript
const handleSecondaryClick = () => {
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }
};
```

## SVG Illustration

The hero image is a custom SVG illustration featuring:
- Refrigerated vehicle body with cabin
- Windshield and wheels
- Refrigeration unit (red accent)
- iStar logo text
- Snowflake icon (representing refrigeration)
- Primary red (#C62828) color scheme

The SVG is:
- Fully responsive (scales with container)
- Accessible (includes aria-label)
- Lightweight (no external dependencies)
- Customizable (easy to modify colors and elements)

## Accessibility

- **Semantic HTML**: Uses `<section>`, `<h1>`, `<h2>`, `<p>`, and `<button>` elements
- **Heading Hierarchy**: Proper h1 → h2 structure
- **ARIA Labels**: SVG includes `aria-label` for screen readers
- **Keyboard Navigation**: All buttons are keyboard accessible
- **Focus States**: Buttons have visible focus indicators
- **Color Contrast**: Text meets WCAG AA standards

## Testing

The component includes comprehensive tests covering:
- Headline and subheadline rendering
- Supporting text rendering
- Two CTA buttons rendering
- Hero image rendering
- Smooth scroll functionality
- Responsive layout classes
- Accessibility attributes
- Color usage

Run tests with:
```bash
npm test Hero.test.tsx
```

## Demo

A demo page is available at `/hero-demo` to preview the Hero component in isolation with mock sections for scroll testing.

## Future Enhancements

- Replace SVG with actual vehicle photography
- Add animation on scroll (fade-in, slide-in)
- Add video background option
- Add A/B testing for different headlines
- Add analytics tracking for button clicks

## Dependencies

- `@/components/ui/Button`: Reusable button component
- `@/components/ui/SectionContainer`: Section wrapper with max-width and padding
- `@/lib/utils`: Utility functions (if needed)

## Notes

- The component uses the `scroll-mt-20` class to account for the fixed header when scrolling
- The minimum height is set to 80vh to ensure the hero section is prominent
- The SVG is inline to avoid additional HTTP requests and enable easy customization
- Button click handlers check for element existence before scrolling to prevent errors
