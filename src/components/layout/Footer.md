# Footer Component

## Overview

The Footer component provides a comprehensive footer section for the iStar landing page with company information, quick navigation links, contact details, and social media links. It features a responsive layout that adapts from a four-column desktop layout to a single-column mobile layout.

## Requirements Validated

- **9.1**: Display the iStar company name
- **9.2**: Display a brief company description
- **9.3**: Display quick links to main page sections
- **9.4**: Display contact information including phone and email
- **9.5**: Display a placeholder physical address
- **9.6**: Display social media icons with links
- **9.7**: Use the dark red color (#8E0000) as the background
- **9.8**: Use white text for contrast
- **9.9**: Stack content sections vertically on mobile (<768px)
- **10.3**: Responsive layout for tablet and desktop
- **11.6**: Semantic HTML structure
- **12.2**: Use dark red color for footer

## Features

### Layout Structure

The Footer is organized into four main columns:

1. **Company Info**: Company name and description
2. **Quick Links**: Navigation links to page sections
3. **Contact Information**: Phone, email, and physical address
4. **Social Media**: Links to social media platforms

### Responsive Behavior

- **Desktop (≥1024px)**: Four-column grid layout
- **Tablet (768-1024px)**: Two-column grid layout
- **Mobile (<768px)**: Single-column stacked layout

### Content Sections

#### Company Information
- Company name "iStar" displayed prominently
- Brief description of services and expertise
- Establishes brand identity in the footer

#### Quick Links
- Links to all main page sections (Início, Sobre, Serviços, Aplicações, Contato)
- Uses smooth scroll navigation
- Provides easy access to page content from footer

#### Contact Information
- Phone number with tel: link for mobile dialing
- Email address with mailto: link
- Physical address placeholder (street, city, postal code)
- Icons for visual clarity (Phone, Mail, MapPin)

#### Social Media
- Links to Facebook, Instagram, LinkedIn, and Twitter
- Opens in new tab with proper security attributes
- Share icon for visual consistency
- Descriptive text encouraging social media engagement

#### Copyright Notice
- Displays current year dynamically
- Copyright statement with company name
- Separated by border for visual distinction

## Props

The Footer component does not accept any props. It uses static data from the navigation data file and internal content.

```typescript
interface FooterProps {
  // No props - component is self-contained
}
```

## Usage

```tsx
import Footer from '@/components/layout/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

## Styling

### Color Scheme
- **Background**: Dark red (#8E0000) - `bg-primary-dark`
- **Text**: White (#FFFFFF) - `text-white`
- **Secondary Text**: Light gray - `text-gray-300`
- **Hover State**: Pure white - `hover:text-white`

### Typography
- **Section Headings**: Large, semibold (text-lg font-semibold)
- **Company Name**: Extra large, bold (text-2xl font-bold)
- **Body Text**: Small, regular (text-sm)
- **Links**: Small with hover transitions

### Spacing
- **Vertical Padding**: py-12 md:py-16 (responsive)
- **Horizontal Padding**: px-4 sm:px-6 lg:px-8 (responsive)
- **Grid Gap**: gap-8 md:gap-12 (responsive)
- **Section Spacing**: space-y-4 (consistent vertical rhythm)

### Interactive Elements
- **Focus States**: White ring with offset for visibility
- **Hover States**: Color transition from gray to white
- **Transitions**: Smooth color transitions on all interactive elements

## Accessibility

### Semantic HTML
- Uses `<footer>` element for proper document structure
- Uses `<nav>` with aria-label for quick links navigation
- Uses `<ul>` and `<li>` for structured lists

### ARIA Labels
- Navigation has descriptive aria-label: "Links rápidos do rodapé"
- Icons have aria-hidden="true" since text labels are present
- Links have descriptive text for screen readers

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible (white ring)
- Tab order follows logical reading order

### Link Attributes
- External links have `target="_blank"` for new tab
- External links have `rel="noopener noreferrer"` for security
- Phone links use `tel:` protocol
- Email links use `mailto:` protocol

## Interactions

### Quick Link Navigation
When a quick link is clicked:
1. The `scrollToSection()` utility is called with the section ID
2. The page smoothly scrolls to the target section
3. The fixed header offset is accounted for

### Contact Links
- **Phone Link**: Opens phone dialer on mobile devices
- **Email Link**: Opens default email client with pre-filled recipient
- **Social Media Links**: Open in new browser tab

### Hover Effects
- Links change from gray-300 to white on hover
- Smooth color transitions for polished feel
- Consistent hover behavior across all link types

## Implementation Notes

### Dynamic Copyright Year
The copyright year is generated dynamically using JavaScript:
```typescript
const currentYear = new Date().getFullYear();
```

### Social Media Icons
Since Lucide React doesn't include brand-specific social media icons, the component uses the generic `Share2` icon with text labels. This approach:
- Maintains visual consistency
- Provides clear text labels for accessibility
- Avoids dependency on brand icon libraries

### Responsive Grid
The grid layout uses Tailwind's responsive utilities:
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```
This automatically adjusts the number of columns based on viewport width.

## Testing

### Visual Testing
A manual test page is available at `/footer-demo` that displays:
- The Footer component in context
- A comprehensive test checklist
- Instructions for responsive testing

### Test Checklist
- ✓ Four-column layout on desktop (≥1024px)
- ✓ Two-column layout on tablet (768-1024px)
- ✓ Single-column layout on mobile (<768px)
- ✓ Company name and description displayed
- ✓ All quick links present and functional
- ✓ Contact information with proper links
- ✓ Social media links with correct attributes
- ✓ Copyright notice with current year
- ✓ Dark red background with white text
- ✓ Proper spacing and padding
- ✓ Hover effects on all links
- ✓ Focus states visible on keyboard navigation
- ✓ ARIA labels for accessibility

## Browser Compatibility

The Footer component uses standard CSS Grid and Flexbox, which are supported in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- **No External Dependencies**: Uses only Lucide React icons (already in project)
- **Minimal JavaScript**: Only scroll behavior and year calculation
- **Static Content**: No API calls or dynamic data fetching
- **Optimized Rendering**: Pure functional component with no state

## Future Enhancements

Potential improvements for future iterations:

1. **Dynamic Content**: Load footer content from CMS or API
2. **Newsletter Signup**: Add email subscription form
3. **Language Selector**: Add multi-language support
4. **Brand Icons**: Use actual brand icons when available
5. **Analytics**: Track footer link clicks
6. **Sitemap Link**: Add link to XML sitemap
7. **Privacy Links**: Add privacy policy and terms links

## Related Components

- **Header**: Top navigation component with similar link structure
- **MobileMenu**: Mobile navigation with similar scroll behavior
- **SectionContainer**: Wrapper component used throughout the page

## Code Example

Complete implementation example:

```tsx
'use client';

import React from 'react';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { navigationItems } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';

const Footer: React.FC = () => {
  const handleQuickLinkClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* Footer content */}
    </footer>
  );
};

export default Footer;
```

## Maintenance Notes

- Update social media URLs when actual company profiles are available
- Update contact information (phone, email, address) with real data
- Consider adding more footer sections as the site grows
- Keep copyright year dynamic (no manual updates needed)
- Maintain consistent styling with Header component
