# Design Document

## Overview

This document provides the technical design for the iStar landing page, a modern single-page application built with Next.js 16, React, TypeScript, and Tailwind CSS. The design translates the requirements into a concrete implementation plan with component architecture, data models, and technical specifications.

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.x
- **UI Library**: React 18.x (functional components with hooks)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React (lightweight, tree-shakeable)

### Design Principles

1. **Component Reusability**: Create atomic, reusable components
2. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
3. **Responsive First**: Mobile-first approach with progressive enhancement
4. **Performance**: Minimal dependencies, optimized images, code splitting
5. **Maintainability**: Clear separation of concerns, consistent naming conventions
6. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Architecture

### Application Structure

```
istar-landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Tailwind directives
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Applications.tsx
│   │   │   ├── Differentials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       └── SectionContainer.tsx
│   ├── types/
│   │   ├── index.ts
│   │   ├── services.ts
│   │   ├── applications.ts
│   │   └── form.ts
│   ├── data/
│   │   ├── services.ts
│   │   ├── applications.ts
│   │   ├── differentials.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations.ts
│   └── hooks/
│       └── useScrollSpy.ts
├── public/
│   └── images/
│       └── placeholder-vehicle.svg
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

### Component Hierarchy

```
App (page.tsx)
├── Header
│   └── MobileMenu
├── Hero
│   └── Button (x2)
├── About
│   └── SectionContainer
├── Services
│   ├── SectionContainer
│   └── Card (x6)
├── Applications
│   ├── SectionContainer
│   └── Card (x4)
├── Differentials
│   ├── SectionContainer
│   └── Card (x4)
├── CTASection
│   └── Button
├── ContactForm
│   ├── SectionContainer
│   ├── Input (x3)
│   ├── Select
│   ├── Textarea
│   └── Button
└── Footer
```

## Components and Interfaces

### Layout Components

#### Header Component

**Purpose**: Fixed navigation bar with logo, menu, and CTA button

**Props Interface**:
```typescript
interface HeaderProps {
  // No props needed - uses static navigation data
}
```

**State**:
- `isMobileMenuOpen: boolean` - Mobile menu visibility
- `activeSection: string` - Current active section for highlighting

**Behavior**:
- Fixed positioning with backdrop blur on scroll
- Smooth scroll to sections on menu click
- Mobile menu toggle with hamburger icon
- Active section highlighting based on scroll position

**Responsive Breakpoints**:
- Mobile (<768px): Hamburger menu, stacked layout
- Desktop (≥768px): Horizontal menu, inline CTA

#### Footer Component

**Purpose**: Comprehensive footer with company info, links, and contact details

**Props Interface**:
```typescript
interface FooterProps {
  // No props needed - uses static footer data
}
```

**Sections**:
- Company description
- Quick links (navigation)
- Contact information
- Social media icons
- Copyright notice

**Responsive Breakpoints**:
- Mobile (<768px): Single column, stacked sections
- Tablet (768-1024px): Two columns
- Desktop (≥1024px): Four columns

#### MobileMenu Component

**Purpose**: Slide-out mobile navigation menu

**Props Interface**:
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}
```

**Behavior**:
- Slide-in animation from right
- Overlay backdrop with click-to-close
- Smooth scroll to section and auto-close on item click
- Focus trap for accessibility

### Section Components

#### Hero Component

**Purpose**: Main banner with headline, subheadline, CTAs, and hero image

**Props Interface**:
```typescript
interface HeroProps {
  // No props needed - uses static content
}
```

**Content Structure**:
- Headline (h1)
- Subheadline (h2)
- Supporting text (p)
- Primary CTA button
- Secondary CTA button
- Hero image (vehicle)

**Responsive Breakpoints**:
- Mobile (<768px): Vertical stack, image below text
- Desktop (≥768px): Two-column layout, image on right

#### About Component

**Purpose**: Company presentation with value proposition and benefits

**Props Interface**:
```typescript
interface AboutProps {
  // No props needed - uses static content
}
```

**Content Structure**:
- Section title
- Value proposition text
- Benefits list (3-4 items with icons)

**Responsive Breakpoints**:
- Mobile (<768px): Single column benefits
- Tablet (≥768px): Two-column benefits grid
- Desktop (≥1024px): Three-column benefits grid

#### Services Component

**Purpose**: Showcase of service offerings in card format

**Props Interface**:
```typescript
interface ServicesProps {
  services: Service[];
}

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
```

**Behavior**:
- Grid layout with responsive columns
- Hover effect on cards (lift and shadow)
- Icon color matches brand primary

**Responsive Breakpoints**:
- Mobile (<640px): 1 column
- Tablet (640-1024px): 2 columns
- Desktop (≥1024px): 3 columns

#### Applications Component

**Purpose**: Display supported vehicle types

**Props Interface**:
```typescript
interface ApplicationsProps {
  applications: Application[];
}

interface Application {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}
```

**Behavior**:
- Card-based layout with vehicle images
- CTA button on each card
- Consistent styling with Services cards

**Responsive Breakpoints**:
- Mobile (<768px): 1 column
- Tablet (768-1024px): 2 columns
- Desktop (≥1024px): 4 columns

#### Differentials Component

**Purpose**: Highlight competitive advantages

**Props Interface**:
```typescript
interface DifferentialsProps {
  differentials: Differential[];
}

interface Differential {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
```

**Behavior**:
- Grid layout with icon, title, and description
- Visual distinction with neutral background

**Responsive Breakpoints**:
- Mobile (<640px): 1 column
- Tablet (640-1024px): 2 columns
- Desktop (≥1024px): 4 columns

#### CTASection Component

**Purpose**: Intermediate call-to-action before contact form

**Props Interface**:
```typescript
interface CTASectionProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}
```

**Behavior**:
- Full-width section with primary red background
- White text for contrast
- Centered content with prominent button

#### ContactForm Component

**Purpose**: Lead capture form with validation

**Props Interface**:
```typescript
interface ContactFormProps {
  // No props needed - handles submission internally
}
```

**Form Fields**:
```typescript
interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  message: string;
}
```

**Validation Rules**:
- `fullName`: Required, min 3 characters
- `phone`: Required, valid phone format (regex)
- `email`: Required, valid email format
- `vehicleType`: Required, one of predefined options
- `message`: Optional, max 500 characters

**Behavior**:
- Real-time validation on blur
- Error messages below each field
- Success message on submit (simulated)
- Form reset after successful submission
- Loading state during submission

**Responsive Breakpoints**:
- Mobile (<768px): Single column, full-width inputs
- Desktop (≥768px): Two-column layout for name/phone/email

### UI Components

#### Button Component

**Purpose**: Reusable button with variants

**Props Interface**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}
```

**Variants**:
- `primary`: Red background (#C62828), white text
- `secondary`: White background, red text, red border
- `outline`: Transparent background, white text, white border

**Sizes**:
- `sm`: py-2 px-4, text-sm
- `md`: py-3 px-6, text-base
- `lg`: py-4 px-8, text-lg

#### Card Component

**Purpose**: Reusable card container

**Props Interface**:
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}
```

**Behavior**:
- White background with subtle shadow
- Rounded corners (border-radius: 8px)
- Optional hover effect (lift and enhanced shadow)

#### Input Component

**Purpose**: Form input with label and error display

**Props Interface**:
```typescript
interface InputProps {
  label: string;
  type: 'text' | 'email' | 'tel';
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}
```

**Behavior**:
- Label above input
- Error message below input (red text)
- Focus state with red border
- Error state with red border

#### Select Component

**Purpose**: Dropdown select with label and error display

**Props Interface**:
```typescript
interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}

interface SelectOption {
  value: string;
  label: string;
}
```

#### Textarea Component

**Purpose**: Multi-line text input with label and error display

**Props Interface**:
```typescript
interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}
```

#### SectionContainer Component

**Purpose**: Consistent section wrapper with padding and max-width

**Props Interface**:
```typescript
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light-gray' | 'neutral-gray';
  id?: string;
}
```

**Behavior**:
- Max-width: 1280px
- Centered with auto margins
- Responsive padding (px-4 sm:px-6 lg:px-8)
- Configurable background color

## Data Models

### Navigation Data

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Início', href: '#hero' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'services', label: 'Serviços', href: '#services' },
  { id: 'applications', label: 'Aplicações', href: '#applications' },
  { id: 'contact', label: 'Contato', href: '#contact' },
];
```

### Services Data

```typescript
import { Snowflake, Wrench, Truck, Settings, ClipboardCheck, Users } from 'lucide-react';

const services: Service[] = [
  {
    id: 'thermal-insulation',
    icon: Snowflake,
    title: 'Isolamento Térmico',
    description: 'Soluções completas em isolamento térmico para manter a temperatura ideal do seu veículo.',
  },
  {
    id: 'refrigeration',
    icon: Wrench,
    title: 'Aparelhos de Refrigeração',
    description: 'Instalação e manutenção de sistemas de refrigeração de alta performance.',
  },
  {
    id: 'vehicle-adaptation',
    icon: Truck,
    title: 'Adaptação Veicular',
    description: 'Projetos personalizados de adaptação interna para transporte refrigerado.',
  },
  {
    id: 'maintenance',
    icon: Settings,
    title: 'Manutenção e Suporte',
    description: 'Assistência técnica especializada e manutenção preventiva.',
  },
  {
    id: 'custom-projects',
    icon: ClipboardCheck,
    title: 'Projetos Sob Medida',
    description: 'Desenvolvimento de soluções customizadas para necessidades específicas.',
  },
  {
    id: 'consulting',
    icon: Users,
    title: 'Consultoria Técnica',
    description: 'Orientação especializada para escolha da melhor solução térmica.',
  },
];
```

### Applications Data

```typescript
const applications: Application[] = [
  {
    id: 'fiorino',
    name: 'Fiorino',
    description: 'Adaptação completa para Fiat Fiorino com isolamento e refrigeração.',
  },
  {
    id: 'ducato',
    name: 'Ducato',
    description: 'Soluções para Fiat Ducato, ideal para transporte de grande volume.',
  },
  {
    id: 'sprinter',
    name: 'Sprinter',
    description: 'Projetos especializados para Mercedes-Benz Sprinter.',
  },
  {
    id: 'vans',
    name: 'Vans em Geral',
    description: 'Adaptação para diversos modelos de vans e veículos comerciais.',
  },
];
```

### Differentials Data

```typescript
import { Award, Clock, Star, HeartHandshake } from 'lucide-react';

const differentials: Differential[] = [
  {
    id: 'quality',
    icon: Award,
    title: 'Qualidade Garantida',
    description: 'Materiais premium e processos certificados.',
  },
  {
    id: 'delivery',
    icon: Clock,
    title: 'Prazo Alinhado',
    description: 'Cumprimento rigoroso de prazos acordados.',
  },
  {
    id: 'experience',
    icon: Star,
    title: 'Experiência Comprovada',
    description: 'Anos de expertise no mercado de refrigeração veicular.',
  },
  {
    id: 'service',
    icon: HeartHandshake,
    title: 'Atendimento Personalizado',
    description: 'Suporte dedicado do início ao fim do projeto.',
  },
];
```

### Vehicle Type Options

```typescript
const vehicleTypeOptions: SelectOption[] = [
  { value: '', label: 'Selecione o tipo de veículo' },
  { value: 'fiorino', label: 'Fiorino' },
  { value: 'ducato', label: 'Ducato' },
  { value: 'sprinter', label: 'Sprinter' },
  { value: 'van', label: 'Van' },
  { value: 'truck', label: 'Caminhão' },
  { value: 'other', label: 'Outro' },
];
```

## Styling and Design System

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C62828',
          dark: '#8E0000',
        },
        neutral: {
          light: '#F5F5F5',
          DEFAULT: '#EAEAEA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Typography Scale

- **Headings**:
  - H1: text-4xl md:text-5xl lg:text-6xl, font-bold
  - H2: text-3xl md:text-4xl lg:text-5xl, font-bold
  - H3: text-2xl md:text-3xl, font-semibold
  - H4: text-xl md:text-2xl, font-semibold

- **Body**:
  - Large: text-lg md:text-xl
  - Base: text-base md:text-lg
  - Small: text-sm md:text-base

### Spacing Scale

- **Section Padding**:
  - Vertical: py-12 md:py-16 lg:py-24
  - Horizontal: px-4 sm:px-6 lg:px-8

- **Component Spacing**:
  - Gap between items: gap-4 md:gap-6 lg:gap-8
  - Margin between sections: mb-8 md:mb-12 lg:mb-16

### Color Usage

- **Primary Red (#C62828)**:
  - Primary CTA buttons
  - Active navigation items
  - Form focus states
  - Icon accents
  - CTA section background

- **Dark Red (#8E0000)**:
  - Footer background
  - Hover states for primary buttons
  - Secondary accents

- **White (#FFFFFF)**:
  - Primary background
  - Card backgrounds
  - Text on dark backgrounds

- **Black (#111111)**:
  - Primary text color
  - Headings

- **Light Gray (#F5F5F5)**:
  - Alternating section backgrounds (About, Applications)

- **Neutral Gray (#EAEAEA)**:
  - Differentials section background
  - Input borders
  - Subtle dividers

## Technical Implementation Details

### Smooth Scrolling

**Implementation**:
```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
```

**Offset for Fixed Header**:
```css
/* Add scroll-margin-top to sections */
section {
  scroll-margin-top: 80px; /* Height of fixed header */
}
```

### Active Section Detection

**Custom Hook**:
```typescript
// hooks/useScrollSpy.ts
export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
```

### Form Validation

**Validation Schema (Zod)**:
```typescript
// lib/validations.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().regex(/^[\d\s\-\(\)\+]+$/, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
  vehicleType: z.string().min(1, 'Selecione um tipo de veículo'),
  message: z.string().max(500, 'Mensagem muito longa').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Form Submission Handler**:
```typescript
const onSubmit = async (data: ContactFormData) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success message
    toast.success('Mensagem enviada com sucesso!');
    
    // Reset form
    reset();
  } catch (error) {
    toast.error('Erro ao enviar mensagem. Tente novamente.');
  }
};
```

### Mobile Menu Animation

**Framer Motion (Optional)**:
```typescript
<motion.div
  initial={{ x: '100%' }}
  animate={{ x: isOpen ? 0 : '100%' }}
  transition={{ type: 'tween', duration: 0.3 }}
  className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl"
>
  {/* Menu content */}
</motion.div>
```

**CSS-only Alternative**:
```css
.mobile-menu {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-menu.open {
  transform: translateX(0);
}
```

## Responsive Design Strategy

### Breakpoint System

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: ≥ 1024px (xl, 2xl)

### Mobile-First Approach

1. Design for mobile first (320px base)
2. Add complexity at larger breakpoints
3. Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)

### Touch Target Sizes

- Minimum: 44x44px for all interactive elements
- Buttons: min-h-[44px] min-w-[44px]
- Links: py-2 px-4 (minimum)

### Image Optimization

- Use Next.js Image component for automatic optimization
- Provide multiple sizes for responsive images
- Use WebP format with fallbacks
- Lazy load images below the fold

## Performance Considerations

### Code Splitting

- Automatic route-based splitting (Next.js default)
- Dynamic imports for heavy components (if needed)
- Lazy load ContactForm (below fold)

### Bundle Size

- Use Lucide React (tree-shakeable icons)
- Avoid heavy animation libraries (use CSS or Framer Motion selectively)
- Minimize third-party dependencies

### Loading Strategy

- Prioritize above-the-fold content (Hero, Header)
- Defer non-critical resources
- Use font-display: swap for web fonts

## Accessibility

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use `<section>` for page sections
- Use `<footer>` for footer

### ARIA Labels

- Add aria-label to icon-only buttons
- Add aria-expanded to mobile menu toggle
- Add aria-current to active navigation items
- Add aria-live for form success/error messages

### Keyboard Navigation

- Ensure all interactive elements are focusable
- Visible focus indicators (ring-2 ring-primary)
- Logical tab order
- Escape key closes mobile menu

### Color Contrast

- Ensure WCAG AA compliance (4.5:1 for normal text)
- Primary red (#C62828) on white: 7.3:1 ✓
- White on dark red (#8E0000): 11.2:1 ✓

## Testing Strategy

### Component Testing

**Test Cases**:
1. Header renders with correct navigation items
2. Mobile menu toggles correctly
3. Smooth scroll triggers on navigation click
4. Form validation displays errors correctly
5. Form submission shows success message
6. Cards render with correct data
7. Buttons render with correct variants

**Testing Library**: React Testing Library

### Form Validation Testing

**Test Cases**:
1. Empty required fields show error messages
2. Invalid email format shows error
3. Invalid phone format shows error
4. Valid form submission succeeds
5. Form resets after successful submission

### Responsive Testing

**Manual Testing**:
- Test on actual devices (iOS, Android)
- Test on different browsers (Chrome, Safari, Firefox)
- Test at breakpoints: 320px, 375px, 768px, 1024px, 1440px

### Accessibility Testing

**Tools**:
- axe DevTools
- Lighthouse accessibility audit
- Manual keyboard navigation testing
- Screen reader testing (NVDA, VoiceOver)

## Future Enhancements

### Phase 2 (Backend Integration)

1. **API Integration**:
   - Connect ContactForm to backend API
   - Add email notification service
   - Add WhatsApp integration

2. **CMS Integration**:
   - Make content editable via CMS
   - Dynamic service/application management
   - Blog section for SEO

3. **Analytics**:
   - Google Analytics integration
   - Conversion tracking
   - Heatmap analysis

### Phase 3 (Advanced Features)

1. **Multi-language Support**:
   - i18n implementation
   - Language switcher
   - Localized content

2. **Advanced Animations**:
   - Scroll-triggered animations
   - Parallax effects
   - Micro-interactions

3. **Performance Optimization**:
   - Image CDN integration
   - Advanced caching strategies
   - Service worker for offline support

## Deployment

### Build Configuration

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Environment Variables

```env
# .env.local (for future backend integration)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
```

### Production Checklist

- [ ] Run type checking (`npm run type-check`)
- [ ] Run linting (`npm run lint`)
- [ ] Test on multiple devices
- [ ] Verify all images are optimized
- [ ] Check Lighthouse scores (Performance, Accessibility, SEO)
- [ ] Verify meta tags and Open Graph data
- [ ] Test form submission
- [ ] Verify responsive behavior at all breakpoints

## Conclusion

This design document provides a comprehensive technical blueprint for implementing the iStar landing page. The architecture prioritizes:

1. **Maintainability**: Clear component structure and separation of concerns
2. **Scalability**: Prepared for future backend integration and feature additions
3. **Performance**: Optimized bundle size and loading strategy
4. **Accessibility**: WCAG-compliant with semantic HTML and ARIA labels
5. **Responsiveness**: Mobile-first approach with comprehensive breakpoint coverage

The implementation should follow this design closely while allowing for minor adjustments based on real-world testing and feedback.
