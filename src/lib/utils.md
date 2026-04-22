# Utility Functions Documentation

This file documents the utility functions available in `src/lib/utils.ts`.

## Functions

### `cn(...classes)`

Conditionally join Tailwind CSS class names. This utility filters out falsy values and joins the remaining classes with spaces, making it easy to apply conditional styling.

**Parameters:**
- `...classes`: Variable number of arguments that can be strings, booleans, undefined, or null

**Returns:**
- `string`: Combined class names with falsy values filtered out

**Examples:**

```typescript
import { cn } from '@/lib/utils';

// Basic usage - join multiple classes
cn('text-lg', 'font-bold', 'text-primary')
// Returns: "text-lg font-bold text-primary"

// Conditional classes
const isActive = true;
const isDisabled = false;
cn('base-class', isActive && 'active', isDisabled && 'disabled')
// Returns: "base-class active"

// Real-world example in a component
function Button({ variant, size, disabled }) {
  return (
    <button
      className={cn(
        'rounded-lg transition-all',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-white text-primary border-2',
        size === 'sm' && 'py-2 px-4 text-sm',
        size === 'md' && 'py-3 px-6 text-base',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      Click me
    </button>
  );
}
```

**Use Cases:**
- Applying conditional Tailwind classes based on component state
- Combining base classes with variant-specific classes
- Filtering out undefined or null class values
- Simplifying complex className logic

---

### `scrollToSection(sectionId, offset?)`

Smoothly scroll to a page section with an offset to account for fixed headers. This function finds an element by ID and scrolls to it with a smooth animation, adjusting for any fixed navigation elements.

**Parameters:**
- `sectionId` (string): The ID of the target section element
- `offset` (number, optional): Additional offset in pixels. Default: 80px (typical header height)

**Returns:**
- `void`

**Behavior:**
- If the element is not found, logs a warning to the console and does nothing
- Uses smooth scrolling animation (`behavior: 'smooth'`)
- Calculates the target position accounting for the offset

**Examples:**

```typescript
import { scrollToSection } from '@/lib/utils';

// Scroll to a section with default 80px offset
scrollToSection('services');

// Scroll to a section with custom offset
scrollToSection('contact', 100);

// Scroll to a section with no offset
scrollToSection('hero', 0);

// Use in a navigation component
function Navigation() {
  return (
    <nav>
      <button onClick={() => scrollToSection('about')}>About</button>
      <button onClick={() => scrollToSection('services')}>Services</button>
      <button onClick={() => scrollToSection('contact')}>Contact</button>
    </nav>
  );
}
```

**Use Cases:**
- Implementing smooth scroll navigation in single-page applications
- Creating "scroll to top" or "scroll to section" buttons
- Building navigation menus that scroll to page sections
- Handling deep links that should scroll to specific sections

**Important Notes:**
- The target element must have an `id` attribute matching the `sectionId` parameter
- The default offset (80px) assumes a fixed header of that height
- Adjust the offset parameter if your header has a different height
- The function will log a warning if the target element is not found

---

## Testing

### Visual Testing

A demo page is available at `/utils-demo` that demonstrates both utility functions:

1. **cn() Demo**: Interactive examples showing how conditional classes work
2. **scrollToSection() Demo**: Test sections with adjustable offset control

To test:
```bash
npm run dev
```

Then navigate to `http://localhost:3000/utils-demo`

### Manual Testing

You can test the functions in the browser console:

```javascript
// Test cn()
import { cn } from '@/lib/utils';
console.log(cn('class1', true && 'class2', false && 'class3'));
// Expected: "class1 class2"

// Test scrollToSection()
import { scrollToSection } from '@/lib/utils';
scrollToSection('your-section-id');
// Should smoothly scroll to the element with id="your-section-id"
```

---

## Requirements Validation

These utility functions validate the following requirements:

- **Requirement 1.4**: Smooth scrolling to page sections when navigation items are clicked
- **Requirement 15.5**: Code quality through reusable utility functions with meaningful names

---

## Implementation Details

### cn() Implementation

The `cn()` function uses:
- Rest parameters (`...classes`) to accept variable arguments
- `Array.filter(Boolean)` to remove falsy values
- `Array.join(' ')` to combine classes with spaces

This approach is:
- Type-safe with TypeScript
- Performant (no external dependencies)
- Simple and easy to understand

### scrollToSection() Implementation

The `scrollToSection()` function uses:
- `document.getElementById()` to find the target element
- `getBoundingClientRect()` to get the element's position
- `window.pageYOffset` to account for current scroll position
- `window.scrollTo()` with `behavior: 'smooth'` for animation

This approach:
- Works across all modern browsers
- Provides smooth scrolling animation
- Accounts for fixed headers with offset parameter
- Handles missing elements gracefully with console warnings

---

## Future Enhancements

Potential improvements for future versions:

1. **cn() enhancements**:
   - Support for object syntax: `cn({ 'class-name': condition })`
   - Integration with clsx or classnames library for more features
   - Support for array inputs

2. **scrollToSection() enhancements**:
   - Callback function when scroll completes
   - Custom easing functions
   - Scroll duration control
   - Support for horizontal scrolling
   - History API integration for URL hash updates
