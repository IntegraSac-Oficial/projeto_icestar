# Select Component

## Overview

A reusable, accessible form select dropdown component with label, error display, and validation support. Built with TypeScript, React Hook Form, and Tailwind CSS for the iStar landing page. Provides consistent styling with the Input component.

## Features

- **Dropdown Selection**: Native HTML select element with custom styling
- **Label Support**: Automatic label association with select
- **Error Display**: Red border and error message on validation failure
- **Required Field Indicator**: Visual asterisk for required fields
- **Focus States**: Primary red border and ring on focus
- **Full TypeScript Support**: Comprehensive type definitions
- **React Hook Form Integration**: Seamless integration with form validation
- **Accessibility**: Semantic HTML with proper label associations
- **Consistent Styling**: Matches Input component design

## Props Interface

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

### Prop Descriptions

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Label text displayed above select |
| `name` | `string` | Yes | - | Select name for form registration |
| `options` | `SelectOption[]` | Yes | - | Array of options to display |
| `error` | `string` | No | `undefined` | Error message to display |
| `required` | `boolean` | No | `false` | Shows asterisk if true |
| `register` | `UseFormRegister<any>` | Yes | - | React Hook Form register function |

### SelectOption Interface

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Value submitted with form |
| `label` | `string` | Text displayed to user |

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
- **Error Message**: Red text below select
- **Persistent**: Error state remains until corrected

### Required State
- **Indicator**: Red asterisk (*) next to label
- **Color**: Primary red (#C62828)

## Usage Examples

### Basic Usage

```tsx
import { useForm } from 'react-hook-form';
import Select, { SelectOption } from '@/components/ui/Select';

function MyForm() {
  const { register } = useForm();

  const vehicleOptions: SelectOption[] = [
    { value: '', label: 'Selecione o tipo de veículo' },
    { value: 'fiorino', label: 'Fiorino' },
    { value: 'ducato', label: 'Ducato' },
    { value: 'sprinter', label: 'Sprinter' },
    { value: 'van', label: 'Van' },
  ];

  return (
    <Select
      label="Tipo de Veículo"
      name="vehicleType"
      options={vehicleOptions}
      register={register}
    />
  );
}
```

### Required Field

```tsx
<Select
  label="Tipo de Veículo"
  name="vehicleType"
  options={vehicleOptions}
  required
  register={register}
/>
```

### With Error Message

```tsx
<Select
  label="Tipo de Veículo"
  name="vehicleType"
  options={vehicleOptions}
  required
  error="Selecione um tipo de veículo"
  register={register}
/>
```

### Complete Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select, { SelectOption } from '@/components/ui/Select';

const schema = z.object({
  vehicleType: z.string().min(1, 'Selecione um tipo de veículo'),
  service: z.string().min(1, 'Selecione um serviço'),
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

  const vehicleOptions: SelectOption[] = [
    { value: '', label: 'Selecione o tipo de veículo' },
    { value: 'fiorino', label: 'Fiorino' },
    { value: 'ducato', label: 'Ducato' },
    { value: 'sprinter', label: 'Sprinter' },
    { value: 'van', label: 'Van' },
  ];

  const serviceOptions: SelectOption[] = [
    { value: '', label: 'Selecione um serviço' },
    { value: 'thermal-insulation', label: 'Isolamento Térmico' },
    { value: 'refrigeration', label: 'Aparelhos de Refrigeração' },
    { value: 'vehicle-adaptation', label: 'Adaptação Veicular' },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Tipo de Veículo"
        name="vehicleType"
        options={vehicleOptions}
        required
        error={errors.vehicleType?.message as string}
        register={register}
      />

      <Select
        label="Serviço Desejado"
        name="service"
        options={serviceOptions}
        required
        error={errors.service?.message as string}
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
  <Select
    label="Tipo de Veículo"
    name="vehicleType"
    options={vehicleOptions}
    register={register}
  />

  <Select
    label="Serviço"
    name="service"
    options={serviceOptions}
    register={register}
  />
</div>
```

### Mixed Form with Input and Select

```tsx
import Input from '@/components/ui/Input';
import Select, { SelectOption } from '@/components/ui/Select';

function ContactForm() {
  const { register } = useForm();

  const vehicleOptions: SelectOption[] = [
    { value: '', label: 'Selecione o tipo de veículo' },
    { value: 'fiorino', label: 'Fiorino' },
    { value: 'ducato', label: 'Ducato' },
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Nome Completo"
        type="text"
        name="fullName"
        required
        register={register}
      />

      <Select
        label="Tipo de Veículo"
        name="vehicleType"
        options={vehicleOptions}
        required
        register={register}
      />

      <Input
        label="E-mail"
        type="email"
        name="email"
        required
        register={register}
      />
    </div>
  );
}
```

## Option Data Patterns

### Vehicle Type Options (iStar Landing Page)

```tsx
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

### Service Options

```tsx
const serviceOptions: SelectOption[] = [
  { value: '', label: 'Selecione um serviço' },
  { value: 'thermal-insulation', label: 'Isolamento Térmico' },
  { value: 'refrigeration', label: 'Aparelhos de Refrigeração' },
  { value: 'vehicle-adaptation', label: 'Adaptação Veicular' },
  { value: 'maintenance', label: 'Manutenção e Suporte' },
  { value: 'custom-projects', label: 'Projetos Sob Medida' },
  { value: 'consulting', label: 'Consultoria Técnica' },
];
```

### Country/Region Options

```tsx
const countryOptions: SelectOption[] = [
  { value: '', label: 'Selecione um país' },
  { value: 'br', label: 'Brasil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'uy', label: 'Uruguai' },
];
```

## Accessibility

The Select component includes several accessibility features:

- **Label Association**: Proper `htmlFor` and `id` connection
- **Semantic HTML**: Uses native `<select>` and `<label>` elements
- **Focus States**: Visible focus ring with `focus:ring-2 focus:ring-primary`
- **Error Announcements**: Error messages are associated with select
- **Required Indicators**: Visual asterisk for required fields
- **Keyboard Support**: Full keyboard navigation support (arrow keys, Enter, Escape)
- **Touch Targets**: Adequate size for mobile touch interaction
- **Native Behavior**: Leverages browser's native select functionality

## Styling Details

### Base Styles
- Width: Full width (`w-full`)
- Padding: `px-4 py-3`
- Border radius: Large (rounded-lg)
- Border: 1px solid
- Background: White (explicit for select elements)
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
- Error message displays below select
- State persists until error is cleared

## Requirements Validation

This component satisfies the following requirements:

- **Req 8.4**: Selection field for vehicle type ✓
- **Req 8.10**: Clear labels for all form inputs ✓
- **Req 8.12**: Visual feedback on focus and validation state ✓
- **Req 11.6**: Semantic HTML elements ✓
- **Req 11.8**: Proper label associations ✓

## Testing

To test the Select component:

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/select-demo`
3. Verify all select dropdowns render correctly
4. Test focus states (click on selects)
5. Test error states (view error examples)
6. Test required field indicators
7. Test option selection
8. Test two-column responsive layout
9. Test mixed forms with Input and Select components
10. Test form submission with validation

## Integration with React Hook Form

The Select component is designed to work seamlessly with React Hook Form:

1. **Register Function**: Pass the `register` function from `useForm()`
2. **Error Handling**: Pass error messages from `formState.errors`
3. **Validation**: Use Zod schema with `zodResolver` for validation
4. **Mode**: Set `mode: 'onBlur'` for validation on blur

## Browser Support

The Select component works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Considerations

- **Native Dropdown**: Uses native select element for optimal mobile UX
- **Touch Targets**: Select height (py-3) provides adequate touch target
- **Responsive**: Full width ensures proper display on all screen sizes
- **Native Picker**: Mobile devices show native picker UI

## Consistency with Input Component

The Select component maintains visual consistency with the Input component:

- **Same padding**: `px-4 py-3`
- **Same border radius**: `rounded-lg`
- **Same focus states**: Primary red border and ring
- **Same error states**: Primary red border, ring, and error message
- **Same label styling**: Font size, weight, and spacing
- **Same required indicator**: Red asterisk

This ensures a cohesive form experience when mixing Input and Select components.

## Notes

- The component uses Tailwind CSS utility classes exclusively
- No custom CSS required
- Colors are defined in `tailwind.config.ts`
- Component is fully typed with TypeScript strict mode
- Requires React Hook Form as a peer dependency
- Error messages should be provided by validation schema
- Component handles both controlled and uncontrolled form patterns
- Uses native `<select>` element for best accessibility and mobile UX
- First option typically serves as placeholder (empty value)

## Common Patterns

### Contact Form Pattern
```tsx
// Mixed Input and Select fields
<div className="space-y-4">
  <Input label="Nome Completo" type="text" name="fullName" required register={register} />
  <Input label="Telefone" type="tel" name="phone" required register={register} />
  <Input label="E-mail" type="email" name="email" required register={register} />
  <Select label="Tipo de Veículo" name="vehicleType" options={vehicleOptions} required register={register} />
</div>
```

### Two-Column Pattern
```tsx
// Inputs and Selects in grid layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="Nome" type="text" name="name" required register={register} />
  <Input label="Telefone" type="tel" name="phone" required register={register} />
  <Select label="Veículo" name="vehicle" options={vehicleOptions} required register={register} />
  <Select label="Serviço" name="service" options={serviceOptions} required register={register} />
</div>
```

### With Custom Validation Messages
```tsx
// Portuguese validation messages
<Select
  label="Tipo de Veículo"
  name="vehicleType"
  options={vehicleOptions}
  required
  error={errors.vehicleType?.message as string}
  register={register}
/>
```

## Best Practices

1. **Always include a placeholder option**: First option with empty value and descriptive label
2. **Use descriptive labels**: Clear, concise labels that explain what to select
3. **Provide meaningful values**: Use semantic values (e.g., 'fiorino') not generic IDs
4. **Keep options manageable**: For long lists (>10 items), consider alternative UI patterns
5. **Validate selection**: Ensure empty value is not submitted for required fields
6. **Match Input styling**: Use Select alongside Input for consistent form design
7. **Test on mobile**: Verify native picker works well on mobile devices
8. **Provide error feedback**: Always show validation errors when selection is invalid

