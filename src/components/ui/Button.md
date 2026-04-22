# Button Component

## Overview

A reusable, accessible button component with multiple variants, sizes, and states. Built with TypeScript and Tailwind CSS for the iStar landing page.

## Features

- **Three Variants**: Primary, Secondary, and Outline
- **Three Sizes**: Small (sm), Medium (md), and Large (lg)
- **Full TypeScript Support**: Comprehensive type definitions
- **Accessibility**: Focus states, disabled states, and semantic HTML
- **Responsive**: Works across all device sizes
- **Customizable**: Support for full-width, click handlers, and button types

## Props Interface

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

### Prop Descriptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | Yes | - | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | Yes | - | Button size |
| `children` | `React.ReactNode` | Yes | - | Button content (text, icons, etc.) |
| `onClick` | `() => void` | No | `undefined` | Click event handler |
| `type` | `'button' \| 'submit' \| 'reset'` | No | `'button'` | HTML button type |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `fullWidth` | `boolean` | No | `false` | Full width button |

## Variants

### Primary
- **Background**: Primary red (#C62828)
- **Text**: White
- **Hover**: Darker red (#8E0000)
- **Use Case**: Main call-to-action buttons

### Secondary
- **Background**: White
- **Text**: Primary red (#C62828)
- **Border**: Primary red (2px)
- **Hover**: Red background with white text
- **Use Case**: Secondary actions, alternative CTAs

### Outline
- **Background**: Transparent
- **Text**: White
- **Border**: White (2px)
- **Hover**: White background with primary red text
- **Use Case**: Buttons on dark backgrounds (e.g., CTA sections)

## Sizes

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | `py-2 px-4` | `text-sm` | Compact spaces, inline actions |
| `md` | `py-3 px-6` | `text-base` | Standard buttons, most common |
| `lg` | `py-4 px-8` | `text-lg` | Hero sections, prominent CTAs |

## Usage Examples

### Basic Usage

```tsx
import Button from '@/components/ui/Button';

// Primary button
<Button variant="primary" size="md">
  Get Started
</Button>

// Secondary button
<Button variant="secondary" size="md">
  Learn More
</Button>

// Outline button (on dark background)
<Button variant="outline" size="md">
  Contact Us
</Button>
```

### With Click Handler

```tsx
<Button 
  variant="primary" 
  size="md"
  onClick={() => console.log('Button clicked!')}
>
  Click Me
</Button>
```

### Form Submit Button

```tsx
<Button 
  variant="primary" 
  size="md"
  type="submit"
>
  Submit Form
</Button>
```

### Disabled State

```tsx
<Button 
  variant="primary" 
  size="md"
  disabled
>
  Disabled Button
</Button>
```

### Full Width

```tsx
<Button 
  variant="primary" 
  size="md"
  fullWidth
>
  Full Width Button
</Button>
```

### Different Sizes

```tsx
<div className="flex gap-4">
  <Button variant="primary" size="sm">Small</Button>
  <Button variant="primary" size="md">Medium</Button>
  <Button variant="primary" size="lg">Large</Button>
</div>
```

## Accessibility

The Button component includes several accessibility features:

- **Focus States**: Visible focus ring with `focus:ring-2 focus:ring-primary`
- **Disabled States**: Reduced opacity and cursor change when disabled
- **Semantic HTML**: Uses native `<button>` element
- **Keyboard Support**: Full keyboard navigation support
- **ARIA Support**: Inherits native button ARIA attributes

## Styling Details

### Base Styles
- Font weight: Medium
- Border radius: Large (rounded-lg)
- Transition: All properties with 200ms duration
- Focus ring: 2px primary color with offset

### Hover States
- **Primary**: Background darkens to #8E0000
- **Secondary**: Background changes to primary red, text to white
- **Outline**: Background changes to white, text to primary red

### Disabled State
- Opacity: 50%
- Cursor: Not allowed
- Hover effects disabled

## Requirements Validation

This component satisfies the following requirements:

- **Req 2.5, 2.7**: Three variants (primary, secondary, outline) ✓
- **Req 7.3**: Three sizes (sm, md, lg) ✓
- **Req 8.11**: TypeScript props interface ✓
- **Req 11.2**: Primary red (#C62828) background on primary variant ✓
- **Req 11.5**: Hover and focus states ✓
- **Req 12.1**: Primary red color usage ✓

## Testing

To test the Button component:

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/button-demo`
3. Verify all variants, sizes, and states render correctly
4. Test hover and focus states
5. Test click handlers
6. Test disabled state
7. Test full-width behavior

## Browser Support

The Button component works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The component uses Tailwind CSS utility classes exclusively
- No custom CSS required
- Colors are defined in `tailwind.config.ts`
- Component is fully typed with TypeScript strict mode
- Ready for use in forms with proper `type` prop support
