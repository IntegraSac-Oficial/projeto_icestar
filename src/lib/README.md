# Library Utilities

This directory contains reusable utility functions and validation schemas for the iStar landing page.

## Files

### `utils.ts`
Core utility functions for class name management and smooth scrolling.

**Functions:**
- `cn()` - Conditionally join Tailwind CSS class names
- `scrollToSection()` - Smooth scroll to page sections with offset

**Documentation:** See [utils.md](./utils.md) for detailed usage examples.

**Demo:** Visit `/utils-demo` to see interactive examples.

### `validations.ts`
Zod validation schemas for form handling.

**Exports:**
- `contactFormSchema` - Validation schema for the contact form
- `ContactFormData` - TypeScript type inferred from the schema

## Usage Examples

### Using cn() for conditional classes

```typescript
import { cn } from '@/lib/utils';

function MyComponent({ isActive, size }) {
  return (
    <div
      className={cn(
        'base-class',
        isActive && 'active-class',
        size === 'large' && 'large-class'
      )}
    >
      Content
    </div>
  );
}
```

### Using scrollToSection() for navigation

```typescript
import { scrollToSection } from '@/lib/utils';

function Navigation() {
  return (
    <nav>
      <button onClick={() => scrollToSection('about')}>
        About
      </button>
      <button onClick={() => scrollToSection('services', 100)}>
        Services (custom offset)
      </button>
    </nav>
  );
}
```

### Using validation schema

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validations';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Valid form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Testing

### Visual Testing
Run the development server and visit `/utils-demo`:
```bash
npm run dev
```

### Type Checking
Verify TypeScript types:
```bash
npm run type-check
```

## Requirements Validation

These utilities validate:
- **Requirement 1.4**: Smooth scrolling navigation
- **Requirement 15.5**: Code quality and reusable functions
- **Requirement 8.6-8.8**: Form validation
- **Requirement 11.1**: TypeScript type definitions

## Integration

The `cn()` utility is already integrated into:
- `Button.tsx` - For conditional button styling

The `scrollToSection()` utility will be used in:
- `Header.tsx` - For navigation menu clicks
- `MobileMenu.tsx` - For mobile navigation
- `Footer.tsx` - For footer quick links
- `CTASection.tsx` - For call-to-action buttons

## Future Enhancements

Potential additions to this library:
- Animation utilities
- Date/time formatting functions
- String manipulation helpers
- Number formatting utilities
- Local storage helpers
- Debounce/throttle functions
