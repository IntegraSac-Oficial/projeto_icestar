# Input Component

## Overview

A reusable, accessible form input component with label, error display, and validation support. Built with TypeScript, React Hook Form, and Tailwind CSS for the iStar landing page.

## Features

- **Three Input Types**: Text, Email, and Tel
- **Label Support**: Automatic label association with input
- **Error Display**: Red border and error message on validation failure
- **Required Field Indicator**: Visual asterisk for required fields
- **Focus States**: Primary red border and ring on focus
- **Full TypeScript Support**: Comprehensive type definitions
- **React Hook Form Integration**: Seamless integration with form validation
- **Accessibility**: Semantic HTML with proper label associations

## Props Interface

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

### Prop Descriptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Label text displayed above input |
| `type` | `'text' \| 'email' \| 'tel'` | Yes | - | HTML input type |
| `name` | `string` | Yes | - | Input name for form registration |
| `placeholder` | `string` | No | `undefined` | Placeholder text |
| `error` | `string` | No | `undefined` | Error message to display |
| `required` | `boolean` | No | `false` | Shows asterisk if true |
| `register` | `UseFormRegister<any>` | Yes | - | React Hook Form register function |

## Input Types

### Text
- **Use Case**: Full name, general text input
- **HTML Type**: `text`
- **Example**: Name fields, address fields

### Email
- **Use Case**: Email address input
- **HTML Type**: `email`
- **Browser Validation**: Built-in email format validation
- **Example**: Contact form email field

### Tel
- **Use Case**: Phone number input
- **HTML Type**: `tel`
- **Browser Behavior**: Mobile devices show numeric keyboard
- **Example**: Phone/WhatsApp number fields

## States

### Normal State
- **Border**: Neutral gray (#EAEAEA)
- **Background**: White
- **Text**: Black (#111111)

### Focus State
- **Border**: Primary red (#C62828)
- **Ring**: 2px primary red ring
- **Outline**: None (custom focus ring)

### Error State
- **Border**: Primary red (#C62828)
- **Ring**: 2px primary red ring
- **Error Message**: Red text below input
- **Persistent**: Error state remains until corrected

### Required State
- **Indicator**: Red asterisk (*) next to label
- **Color**: Primary red (#C62828)

## Usage Examples

### Basic Usage

```tsx
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';

function MyForm() {
  const { register } = useForm();

  return (
    <Input
      label="Full Name"
      type="text"
      name="fullName"
      placeholder="Enter your full name"
      register={register}
    />
  );
}
```

### Required Field

```tsx
<Input
  label="Email Address"
  type="email"
  name="email"
  placeholder="your.email@example.com"
  required
  register={register}
/>
```

### With Error Message

```tsx
<Input
  label="Phone Number"
  type="tel"
  name="phone"
  placeholder="(11) 98765-4321"
  required
  error="Telefone inválido"
  register={register}
/>
```

### Complete Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';

const schema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().regex(/^[\d\s\-\(\)\+]+$/, 'Telefone inválido'),
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        required
        error={errors.fullName?.message as string}
        register={register}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        required
        error={errors.email?.message as string}
        register={register}
      />

      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="(11) 98765-4321"
        required
        error={errors.phone?.message as string}
        register={register}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Two-Column Layout (Desktop)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input
    label="First Name"
    type="text"
    name="firstName"
    placeholder="John"
    register={register}
  />

  <Input
    label="Last Name"
    type="text"
    name="lastName"
    placeholder="Doe"
    register={register}
  />

  <Input
    label="Email"
    type="email"
    name="email"
    placeholder="john.doe@example.com"
    register={register}
  />

  <Input
    label="Phone"
    type="tel"
    name="phone"
    placeholder="(11) 98765-4321"
    register={register}
  />
</div>
```

## Accessibility

The Input component includes several accessibility features:

- **Label Association**: Proper `htmlFor` and `id` connection
- **Semantic HTML**: Uses native `<input>` and `<label>` elements
- **Focus States**: Visible focus ring with `focus:ring-2 focus:ring-primary`
- **Error Announcements**: Error messages are associated with inputs
- **Required Indicators**: Visual asterisk for required fields
- **Keyboard Support**: Full keyboard navigation support
- **Touch Targets**: Adequate size for mobile touch interaction

## Styling Details

### Base Styles
- Width: Full width (`w-full`)
- Padding: `px-4 py-3`
- Border radius: Large (rounded-lg)
- Border: 1px solid
- Transition: All properties with 200ms duration

### Label Styles
- Display: Block
- Font size: Small (`text-sm`)
- Font weight: Medium
- Color: Black (#111111)
- Margin bottom: 2 (0.5rem)

### Error Message Styles
- Margin top: 2 (0.5rem)
- Font size: Small (`text-sm`)
- Color: Primary red (#C62828)

### Focus Behavior
- Border color changes to primary red
- 2px ring appears in primary red
- Smooth transition (200ms)

### Error Behavior
- Border immediately changes to primary red
- Ring appears in primary red
- Error message displays below input
- State persists until error is cleared

## Requirements Validation

This component satisfies the following requirements:

- **Req 8.1**: Input field for full name ✓
- **Req 8.2**: Input field for phone/WhatsApp number ✓
- **Req 8.3**: Input field for email address ✓
- **Req 8.6**: Validation error message display ✓
- **Req 8.7**: Email validation error display ✓
- **Req 8.8**: Phone validation error display ✓
- **Req 8.10**: Clear labels for all input fields ✓
- **Req 8.12**: Visual feedback on focus and validation state ✓
- **Req 11.6**: Semantic HTML elements ✓
- **Req 11.8**: Proper label associations ✓

## Testing

To test the Input component:

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/input-demo`
3. Verify all input types render correctly
4. Test focus states (click on inputs)
5. Test error states (view error examples)
6. Test required field indicators
7. Test placeholder text
8. Test two-column responsive layout
9. Test form submission with validation

## Integration with React Hook Form

The Input component is designed to work seamlessly with React Hook Form:

1. **Register Function**: Pass the `register` function from `useForm()`
2. **Error Handling**: Pass error messages from `formState.errors`
3. **Validation**: Use Zod schema with `zodResolver` for validation
4. **Mode**: Set `mode: 'onBlur'` for validation on blur

## Browser Support

The Input component works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Considerations

- **Tel Input**: Shows numeric keyboard on mobile devices
- **Email Input**: Shows email-optimized keyboard on mobile devices
- **Touch Targets**: Input height (py-3) provides adequate touch target
- **Responsive**: Full width ensures proper display on all screen sizes

## Notes

- The component uses Tailwind CSS utility classes exclusively
- No custom CSS required
- Colors are defined in `tailwind.config.ts`
- Component is fully typed with TypeScript strict mode
- Requires React Hook Form as a peer dependency
- Error messages should be provided by validation schema
- Component handles both controlled and uncontrolled form patterns

## Common Patterns

### Contact Form Pattern
```tsx
// Name, Phone, Email in two-column layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="Full Name" type="text" name="fullName" required register={register} />
  <Input label="Phone" type="tel" name="phone" required register={register} />
</div>
<Input label="Email" type="email" name="email" required register={register} />
```

### Single Column Pattern
```tsx
// All fields stacked vertically
<div className="space-y-4">
  <Input label="Full Name" type="text" name="fullName" required register={register} />
  <Input label="Email" type="email" name="email" required register={register} />
  <Input label="Phone" type="tel" name="phone" required register={register} />
</div>
```

### With Custom Validation Messages
```tsx
// Portuguese validation messages
<Input
  label="Nome Completo"
  type="text"
  name="fullName"
  placeholder="Digite seu nome completo"
  required
  error={errors.fullName?.message as string}
  register={register}
/>
```
