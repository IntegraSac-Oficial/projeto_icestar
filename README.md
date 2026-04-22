# iStar Landing Page

A modern, professional, and responsive landing page for iStar - a company specializing in thermal insulation and vehicle refrigeration.

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 6.0.3 (strict mode)
- **Styling**: Tailwind CSS 3.4.19
- **UI Library**: React 19.2.5
- **Form Handling**: React Hook Form 7.72.1 with Zod 4.3.6 validation
- **Icons**: Lucide React 1.8.0

## Project Structure

```
istar-landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Tailwind directives and global styles
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileMenu
│   │   ├── sections/           # Hero, About, Services, etc.
│   │   └── ui/                 # Reusable UI components
│   ├── types/                  # TypeScript type definitions
│   ├── data/                   # Static data files
│   ├── lib/                    # Utility functions
│   └── hooks/                  # Custom React hooks
├── public/
│   └── images/                 # Images and assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.js              # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### Linting

Run Next.js linting:

```bash
npm run lint
```

## Design System

### Colors

- **Primary Red**: `#C62828` - Primary actions and branding
- **Dark Red**: `#8E0000` - Secondary elements and footer
- **White**: `#FFFFFF` - Primary backgrounds
- **Black**: `#111111` - Primary text
- **Light Gray**: `#F5F5F5` - Alternating section backgrounds
- **Neutral Gray**: `#EAEAEA` - Subtle section backgrounds

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold weight with responsive sizing
- **Body**: Regular weight with responsive sizing

### Shadows

- **Card**: `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Card Hover**: `0 4px 16px rgba(0, 0, 0, 0.15)`

## Features

- ✅ Responsive design (320px - 1920px)
- ✅ Fixed header navigation with smooth scrolling
- ✅ Mobile menu with hamburger icon
- ✅ Hero section with CTAs
- ✅ Services showcase
- ✅ Vehicle applications display
- ✅ Competitive differentiators
- ✅ Contact form with validation
- ✅ Comprehensive footer
- ✅ TypeScript strict mode
- ✅ Tailwind CSS utility-first styling

## Requirements Coverage

This implementation satisfies requirements 14.1, 14.2, 14.3, 14.4, 14.7, and 15.1 from the specification.

## License

Private project for iStar.
