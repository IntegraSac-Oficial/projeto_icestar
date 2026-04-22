# useScrollSpy Hook

## Overview

The `useScrollSpy` hook is a custom React hook that detects which section of a page is currently visible in the viewport. It uses the IntersectionObserver API to efficiently track section visibility and returns the ID of the active section.

## Purpose

This hook is designed to support navigation highlighting in single-page applications, particularly for the iStar landing page. It enables the header navigation to highlight the currently visible section as users scroll through the page.

## Requirements

- **Requirement 1.1**: Fixed Header Navigation - Supports active section highlighting
- **Requirement 1.4**: Smooth scroll navigation with active section detection

## API

### Function Signature

```typescript
useScrollSpy(sectionIds: string[]): string
```

### Parameters

- `sectionIds` (string[]): An array of section IDs to observe. These should match the `id` attributes of the sections in your page.

### Return Value

- Returns a string representing the ID of the currently active/visible section
- Returns an empty string (`''`) if no section is currently visible or during initial render

## How It Works

1. **Initialization**: The hook sets up an IntersectionObserver when the component mounts
2. **Observation**: It observes all sections specified in the `sectionIds` array
3. **Detection**: When a section enters the viewport (becomes visible), the observer callback fires
4. **State Update**: The active section state is updated with the ID of the visible section
5. **Cleanup**: The observer is disconnected when the component unmounts or when `sectionIds` changes

### IntersectionObserver Configuration

The hook uses specific configuration to ensure accurate section detection:

```typescript
{
  rootMargin: '-100px 0px -80% 0px',
  threshold: 0,
}
```

- **rootMargin**: 
  - Top offset (`-100px`): Accounts for the fixed header height, ensuring sections are considered active when they're below the header
  - Bottom offset (`-80%`): Ensures a section is considered active when it's near the top of the viewport, not just when any part is visible
- **threshold**: Set to `0` to trigger as soon as any part of the section is visible

## Usage Example

### Basic Usage in Header Component

```typescript
'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function Header() {
  const sectionIds = ['hero', 'about', 'services', 'applications', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav>
        <ul className="flex gap-4">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? 'text-primary font-bold' : 'text-gray-700'}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

### With Smooth Scrolling

```typescript
'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function Navigation() {
  const sectionIds = ['hero', 'about', 'services', 'contact'];
  const activeSection = useScrollSpy(sectionIds);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav>
      {sectionIds.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={activeSection === id ? 'active' : ''}
        >
          {id}
        </button>
      ))}
    </nav>
  );
}
```

## Important Considerations

### Section Setup

For the hook to work correctly, your page sections must:

1. Have `id` attributes that match the IDs in the `sectionIds` array
2. Have sufficient height to be detected (ideally full viewport height or more)
3. Include `scroll-margin-top` CSS to account for the fixed header:

```css
section {
  scroll-margin-top: 80px; /* Height of fixed header */
}
```

Or using Tailwind CSS:

```tsx
<section id="hero" className="scroll-mt-20">
  {/* Section content */}
</section>
```

### Client-Side Only

This hook uses browser APIs (`IntersectionObserver`, `document.getElementById`) and must be used in client components. Ensure your component has the `'use client'` directive at the top.

### Performance

The IntersectionObserver API is highly performant and doesn't cause layout thrashing or excessive re-renders. It's specifically designed for this type of scroll-based detection.

## Demo

A demo page is available at `/scrollspy-demo` that demonstrates the hook's functionality with multiple colored sections and a fixed navigation bar showing the active section.

## Browser Support

The IntersectionObserver API is supported in all modern browsers:
- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

For older browsers, consider using a polyfill or fallback implementation.

## Testing

To test the hook:

1. Navigate to `/scrollspy-demo` in your browser
2. Scroll through the page and observe the navigation bar
3. The active section indicator should update as you scroll
4. Click navigation items to test smooth scrolling
5. Verify that the correct section is highlighted when near the top of the viewport

## Implementation Details

### State Management

The hook uses a single state variable to track the active section:

```typescript
const [activeSection, setActiveSection] = useState<string>('');
```

### Effect Dependencies

The effect depends on `sectionIds`, meaning:
- If `sectionIds` changes, the observer is recreated
- The old observer is properly cleaned up via the cleanup function
- This allows for dynamic section lists if needed

### Error Handling

The hook gracefully handles missing sections:
- If a section ID doesn't exist in the DOM, it's simply not observed
- No errors are thrown
- The hook continues to work for sections that do exist

## Future Enhancements

Potential improvements for future versions:

1. **Configurable rootMargin**: Allow customization of the intersection thresholds
2. **Debouncing**: Add optional debouncing for rapid scroll events
3. **Direction Detection**: Track scroll direction (up/down) for more sophisticated highlighting
4. **Multiple Active Sections**: Support highlighting multiple sections simultaneously
5. **Callback Support**: Allow passing a callback function when the active section changes

## Related Components

This hook is designed to be used with:
- `Header` component (src/components/layout/Header.tsx)
- `MobileMenu` component (src/components/layout/MobileMenu.tsx)
- Navigation components that need active section highlighting

## References

- [MDN: IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Hooks Documentation](https://react.dev/reference/react)
- Design Document: `.kiro/specs/istar-landing-page/design.md`
- Requirements Document: `.kiro/specs/istar-landing-page/requirements.md`
