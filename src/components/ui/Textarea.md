# Textarea Component

## Overview

A reusable, accessible form textarea component with label, error display, and validation support. Built with TypeScript, React Hook Form, and Tailwind CSS for the iStar landing page. Designed for multi-line text input with consistent styling matching the Input component.

## Features

- **Multi-line Text Input**: Configurable number of rows
- **Label Support**: Automatic label association with textarea
- **Error Display**: Red border and error message on validation failure
- **Required Field Indicator**: Visual asterisk for required fields
- **Focus States**: Primary red border and ring on focus
- **Vertical Resize**: Users can resize textarea vertically
- **Full TypeScript Support**: Comprehensive type definitions
- **React Hook Form Integration**: Seamless integration with form validation
- **Accessibility**: Semantic HTML with proper label associations

## Props Interface

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

### Prop Descriptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Label text displayed above textarea |
| `name` | `string` | Yes | - | Textarea name for form registration |
| `placeholder` | `string` | No | `undefined` | Placeholder text |
| `rows` | `number` | No | `4` | Number of visible text rows |
| `error` | `string` | No | `undefined` | Error message to display |
| `required` | `boolean` | No | `false` | Shows asterisk if true |
| `register` | `UseFormRegister<any>` | Yes | - | React Hook Form register function |

## States

### Normal State
- **Border**: Neutral gray (#EAEAEA)
- **Background**: White
- **Text**: Black (#111111)
- **Resize**: Vertical only

### Focus State
- **Border**: Primary red (#C62828)
- **Ring**: 2px primary red ring
- **Outline**: None (custom focus ring)

### Error State
- **Border**: Primary red (#C62828)
- **Ring**: 2px primary red ring
- **Error Message**: Red text below textarea
- **Persistent**: Error state remains until corrected

### Required State
- **Indicator**: Red asterisk (*) next to label
- **Color**: Primary red (#C62828)

## Usage Examples

### Basic Usage

```tsx
import { useForm } from 'react-hook-form';
import Textarea from '@/components/ui/Textarea';

function MyForm() {
  const { register } = useForm();

  return (
    <Textarea
      label="Message"
      name="message"
      placeholder="Enter your message here..."
      register={register}
    />
  );
}
```

### Custom Row Size

```tsx
<Textarea
  label="Detailed Description"
  name="description"
  placeholder="Provide detailed information..."
  rows={8}
  register={register}
/>
```

### Required Field

```tsx
<Textarea
  label="Comments"
  name="comments"
  placeholder="Your comments..."
  required
  register={register}
/>
```

### With Error Message

```tsx
<Textarea
  label="Message"
  name="message"
  placeholder="Enter your message..."
  required
  error="Mensagem muito longa (máximo 500 caracteres)"
  register={register}
/>
```

### Complete Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Textarea from '@/components/ui/Textarea';

const schema = z.object({
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(500, 'Mensagem muito longa (máximo 500 caracteres)'),
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
      <Textarea
        label="Your Message"
        name="message"
        placeholder="Tell us about your project..."
        rows={6}
        required
        error={errors.message?.message as string}
        register={register}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Contact Form Pattern

```tsx
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

function ContactForm() {
  const { register } = useForm();

  return (
    <div className="space-y-4">
      {/* Two-column layout for name and email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          required
          register={register}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          required
          register={register}
        />
      </div>

      {/* Full-width textarea */}
      <Textarea
        label="Message"
        name="message"
        placeholder="Tell us about your needs..."
        rows={6}
        register={register}
      />
    </div>
  );
}
```

### Different Sizes

```tsx
{/* Small textarea for brief comments */}
<Textarea
  label="Brief Comment"
  name="comment"
  rows={3}
  register={register}
/>

{/* Medium textarea (default) */}
<Textarea
  label="Description"
  name="description"
  register={register}
/>

{/* Large textarea for detailed input */}
<Textarea
  label="Detailed Information"
  name="details"
  rows={10}
  register={register}
/>
```

## Accessibility

The Textarea component includes several accessibility features:

- **Label Association**: Proper `htmlFor` and `id` connection
- **Semantic HTML**: Uses native `<textarea>` and `<label>` elements
- **Focus States**: Visible focus ring with `focus:ring-2 focus:ring-primary`
- **Error Announcements**: Error messages are associated with textareas
- **Required Indicators**: Visual asterisk for required fields
- **Keyboard Support**: Full keyboard navigation support
- **Resize Control**: Vertical resize only (prevents layout breaking)
- **Touch Targets**: Adequate size for mobile touch interaction

## Styling Details

### Base Styles
- Width: Full width (`w-full`)
- Padding: `px-4 py-3`
- Border radius: Large (rounded-lg)
- Border: 1px solid
- Transition: All properties with 200ms duration
- Resize: Vertical only (`resize-vertical`)

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
- Error message displays below textarea
- State persists until error is cleared

### Resize Behavior
- **Vertical Only**: Users can drag bottom edge to resize height
- **No Horizontal**: Prevents breaking layout
- **Visual Indicator**: Browser shows resize handle in bottom-right corner
- **Minimum Height**: Determined by `rows` prop

## Requirements Validation

This component satisfies the following requirements:

- **Req 8.5**: Textarea field for additional message ✓
- **Req 8.10**: Clear labels for all input fields ✓
- **Req 11.6**: Semantic HTML elements ✓
- **Req 11.8**: Proper label associations ✓

## Testing

To test the Textarea component:

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/textarea-demo`
3. Verify textarea renders correctly
4. Test focus states (click on textarea)
5. Test error states (view error examples)
6. Test required field indicators
7. Test placeholder text
8. Test different row sizes (3, 4, 8, 10)
9. Test vertical resize functionality
10. Test form submission with validation

## Integration with React Hook Form

The Textarea component is designed to work seamlessly with React Hook Form:

1. **Register Function**: Pass the `register` function from `useForm()`
2. **Error Handling**: Pass error messages from `formState.errors`
3. **Validation**: Use Zod schema with `zodResolver` for validation
4. **Mode**: Set `mode: 'onBlur'` for validation on blur

## Browser Support

The Textarea component works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Considerations

- **Touch Targets**: Textarea padding (py-3) provides adequate touch target
- **Responsive**: Full width ensures proper display on all screen sizes
- **Resize Handle**: May be harder to use on mobile, but still functional
- **Keyboard**: Mobile keyboards work naturally with textarea
- **Line Breaks**: Mobile users can easily add line breaks

## Consistency with Input Component

The Textarea component maintains visual and functional consistency with the Input component:

- **Same Border Styles**: Identical border colors and widths
- **Same Focus States**: Identical red border and ring
- **Same Error States**: Identical error styling and message display
- **Same Label Styles**: Identical label typography and spacing
- **Same Required Indicator**: Identical red asterisk
- **Same Padding**: Identical internal padding (px-4 py-3)
- **Same Border Radius**: Identical rounded corners (rounded-lg)
- **Same Transitions**: Identical animation timing (200ms)

## Common Use Cases

### Contact Form Message Field
```tsx
<Textarea
  label="Mensagem"
  name="message"
  placeholder="Conte-nos sobre seu projeto..."
  rows={6}
  register={register}
/>
```

### Optional Comments Field
```tsx
<Textarea
  label="Comentários Adicionais (Opcional)"
  name="comments"
  placeholder="Alguma informação adicional..."
  rows={4}
  register={register}
/>
```

### Required Feedback Field
```tsx
<Textarea
  label="Seu Feedback"
  name="feedback"
  placeholder="Compartilhe sua experiência..."
  rows={5}
  required
  error={errors.feedback?.message as string}
  register={register}
/>
```

### Project Description Field
```tsx
<Textarea
  label="Descrição do Projeto"
  name="projectDescription"
  placeholder="Descreva os detalhes do seu projeto de refrigeração..."
  rows={8}
  required
  error={errors.projectDescription?.message as string}
  register={register}
/>
```

## Validation Patterns

### Minimum Length
```typescript
const schema = z.object({
  message: z.string().min(10, 'Mensagem muito curta'),
});
```

### Maximum Length
```typescript
const schema = z.object({
  message: z.string().max(500, 'Mensagem muito longa (máximo 500 caracteres)'),
});
```

### Optional Field
```typescript
const schema = z.object({
  comments: z.string().optional(),
});
```

### Required with Length Constraints
```typescript
const schema = z.object({
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(500, 'Mensagem muito longa (máximo 500 caracteres)'),
});
```

## Notes

- The component uses Tailwind CSS utility classes exclusively
- No custom CSS required
- Colors are defined in `tailwind.config.ts`
- Component is fully typed with TypeScript strict mode
- Requires React Hook Form as a peer dependency
- Error messages should be provided by validation schema
- Component handles both controlled and uncontrolled form patterns
- Default rows is 4, which provides good balance for most use cases
- Vertical resize allows users to adjust height as needed
- Horizontal resize is disabled to prevent layout issues

## Differences from Input Component

While maintaining visual consistency, Textarea differs from Input in:

1. **Multi-line**: Supports multiple lines of text
2. **Rows Prop**: Configurable initial height
3. **Resize**: Users can resize vertically
4. **No Type Prop**: Only one type (multi-line text)
5. **Larger Content**: Better for longer text input

## Performance Considerations

- Lightweight component with minimal overhead
- No external dependencies beyond React Hook Form
- Efficient re-rendering with React Hook Form optimization
- No JavaScript-based resize logic (uses native CSS)

## Future Enhancements

Potential future improvements (not currently implemented):

- Character counter display
- Auto-resize based on content
- Rich text editing capabilities
- Markdown preview
- Emoji picker integration

## Related Components

- **Input**: Single-line text input with similar styling
- **Select**: Dropdown selection with similar styling
- **Button**: Form submission button
- **Card**: Container for form sections
