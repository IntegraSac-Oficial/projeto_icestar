# MobileMenu Component

## Overview

The `MobileMenu` component is a slide-in mobile navigation menu that appears from the right side of the screen. It provides a mobile-friendly navigation experience with smooth animations, overlay backdrop, and accessibility features.

## Features

- **Slide-in Animation**: Smoothly slides in from the right side with CSS transform transitions
- **Overlay Backdrop**: Semi-transparent black backdrop that closes the menu when clicked
- **Keyboard Support**: Closes when Escape key is pressed
- **Body Scroll Lock**: Prevents background scrolling when menu is open
- **Active Section Highlighting**: Highlights the currently active navigation section
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **Auto-close on Navigation**: Automatically closes after clicking a navigation item

## Props

```typescript
interface MobileMenuProps {
  isOpen: boolean;           // Controls menu visibility
  onClose: () => void;       // Callback when menu should close
  navigationItems: NavigationItem[];  // Array of navigation items to display
  activeSection?: string;    // ID of the currently active section (optional)
}
```

## Usage

```tsx
import MobileMenu from '@/components/layout/MobileMenu';
import { navigationItems } from '@/data/navigation';

function MyComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = 'services'; // From useScrollSpy hook

  return (
    <>
      <button onClick={() => setIsMenuOpen(true)}>
        Open Menu
      </button>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigationItems={navigationItems}
        activeSection={activeSection}
      />
    </>
  );
}
```

## Integration with Header

The MobileMenu component is designed to work seamlessly with the Header component:

```tsx
// In Header.tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const activeSection = useScrollSpy(navigationItems.map(item => item.id));

return (
  <header>
    {/* Header content */}
    <button onClick={() => setIsMobileMenuOpen(true)}>
      <Menu />
    </button>

    <MobileMenu
      isOpen={isMobileMenuOpen}
      onClose={() => setIsMobileMenuOpen(false)}
      navigationItems={navigationItems}
      activeSection={activeSection}
    />
  </header>
);
```

## Behavior

### Opening the Menu
- Menu slides in from the right side with a 300ms transition
- Overlay backdrop fades in simultaneously
- Body scroll is locked to prevent background scrolling

### Closing the Menu
The menu can be closed in multiple ways:
1. Clicking the X button in the menu header
2. Clicking the overlay backdrop
3. Pressing the Escape key
4. Clicking any navigation item (after smooth scrolling to the section)

### Navigation
- Clicking a navigation item triggers smooth scrolling to the target section
- The menu automatically closes after navigation
- Active section is highlighted with red text and light red background

## Styling

The component uses Tailwind CSS classes for styling:

- **Menu Panel**: `w-80 max-w-[85vw]` - 320px width, max 85% of viewport on small screens
- **Animation**: `transform transition-transform duration-300 ease-in-out`
- **Backdrop**: `bg-black bg-opacity-50` - Semi-transparent black overlay
- **Active Item**: `text-primary bg-red-50` - Red text with light red background
- **Inactive Item**: `text-gray-700 hover:text-primary hover:bg-gray-50`

## Accessibility

### ARIA Attributes
- `role="dialog"` - Identifies the menu as a dialog
- `aria-modal="true"` - Indicates the menu is modal
- `aria-label="Menu de navegação mobile"` - Provides accessible name
- `aria-current="page"` - Marks the active navigation item
- `aria-hidden="true"` - Hides the backdrop from screen readers

### Keyboard Navigation
- **Escape**: Closes the menu
- **Tab**: Navigates through menu items
- **Enter/Space**: Activates focused navigation item

### Focus Management
- All interactive elements have visible focus indicators
- Focus is trapped within the menu when open
- Proper focus ring styling with `focus:ring-2 focus:ring-primary`

## Responsive Design

The MobileMenu is designed for mobile viewports (< 768px):
- On desktop, the Header shows a horizontal navigation menu instead
- Menu width adapts to screen size: `w-80 max-w-[85vw]`
- Touch-friendly button sizes (minimum 44x44px)

## Animation Details

### Slide-in Animation
```css
transform: translateX(100%);  /* Hidden state */
transform: translateX(0);     /* Visible state */
transition: transform 300ms ease-in-out;
```

### Backdrop Animation
```css
opacity: 0;  /* Hidden state */
opacity: 1;  /* Visible state */
transition: opacity 300ms ease-in-out;
```

## Requirements Validation

This component validates the following requirements:
- **1.6**: Mobile menu icon displayed on viewports < 768px
- **1.7**: Mobile menu toggles visibility when icon is clicked
- **10.2**: Responsive layout for mobile devices
- **11.2**: TypeScript interfaces for component props

## Testing

To test the MobileMenu component:

1. Navigate to `/mobile-menu-demo` in the development server
2. Click "Open Mobile Menu" to open the menu
3. Test all closing methods (X button, backdrop, Escape key)
4. Test navigation item clicks
5. Test active section highlighting
6. Test keyboard navigation
7. Verify smooth animations
8. Check accessibility with screen reader

## Related Components

- **Header**: Uses MobileMenu for mobile navigation
- **Button**: Used for the CTA button in the menu
- **NavigationItem**: Type definition for navigation items

## Dependencies

- `lucide-react`: For the X (close) icon
- `@/lib/utils`: For `scrollToSection` and `cn` utilities
- `@/types`: For `NavigationItem` type definition
- `@/components/ui/Button`: For the CTA button

## Notes

- The menu is only rendered when `isOpen` is true (conditional rendering)
- Body scroll lock is automatically managed via useEffect
- Event listeners are properly cleaned up when component unmounts
- The menu uses fixed positioning with high z-index (z-50) to appear above all content
