# Card Component

A reusable card container component with optional hover effects.

## Features

- White background with subtle shadow (shadow-card)
- Rounded corners (rounded-lg)
- Optional hoverable prop with lift effect and enhanced shadow
- Fully typed with TypeScript
- Customizable with additional className

## Props

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}
```

### Props Description

- **children** (required): The content to be displayed inside the card
- **className** (optional): Additional CSS classes to apply to the card
- **hoverable** (optional, default: false): When true, applies hover effects (lift and enhanced shadow)

## Usage Examples

### Basic Card

```tsx
import Card from '@/components/ui/Card';

<Card>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</Card>
```

### Hoverable Card

```tsx
<Card hoverable>
  <div className="p-6">
    <h3>Hoverable Card</h3>
    <p>This card will lift and show enhanced shadow on hover</p>
  </div>
</Card>
```

### Card with Custom Styling

```tsx
<Card className="p-8 border-2 border-primary" hoverable>
  <h3>Custom Styled Card</h3>
  <p>Additional classes can be applied via className prop</p>
</Card>
```

### Service Card Example

```tsx
<Card hoverable className="p-6">
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
      <Icon className="text-white" />
    </div>
    <h4 className="text-lg font-semibold mb-2">Service Title</h4>
    <p className="text-gray-600 text-sm">Service description</p>
  </div>
</Card>
```

### Application Card Example

```tsx
<Card hoverable className="p-4">
  <div className="text-center">
    <div className="h-32 bg-neutral flex items-center justify-center mb-3 rounded">
      <img src="/vehicle.png" alt="Vehicle" />
    </div>
    <h4 className="font-semibold">Vehicle Name</h4>
    <p className="text-sm text-gray-600 mt-1">Vehicle description</p>
  </div>
</Card>
```

## Styling

### Base Styles
- Background: `bg-white`
- Border radius: `rounded-lg` (8px)
- Shadow: `shadow-card` (0 2px 8px rgba(0, 0, 0, 0.1))

### Hover Styles (when hoverable=true)
- Transition: `transition-all duration-200`
- Enhanced shadow: `hover:shadow-card-hover` (0 4px 16px rgba(0, 0, 0, 0.15))
- Lift effect: `hover:-translate-y-1`

## Design System Integration

The Card component uses the following design tokens from the Tailwind configuration:

- **Shadow Card**: `shadow-card` - Subtle shadow for depth
- **Shadow Card Hover**: `shadow-card-hover` - Enhanced shadow on hover
- **Border Radius**: `rounded-lg` - Consistent rounded corners

## Accessibility

- Uses semantic `<div>` element
- Content structure should be provided by children
- Ensure proper heading hierarchy within card content
- Add appropriate ARIA labels if card is interactive

## Visual Testing

To visually test the Card component, run the development server and navigate to `/card-demo`:

```bash
npm run dev
```

Then open: `http://localhost:3000/card-demo`

## Requirements Validation

**Validates: Requirements 4.7, 12.8**

- **Requirement 4.7**: Service cards use white background with subtle shadow for depth
- **Requirement 12.8**: Consistent use of subtle shadows for depth and elevation
