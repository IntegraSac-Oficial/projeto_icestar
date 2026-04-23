import React from 'react';
import Header from './Header';

/**
 * Manual test file for Header component
 * This file demonstrates the Header component with all its features
 * Run the dev server and navigate to /header-demo to visually test
 * 
 * Test Cases:
 * 1. Header renders with iStar logo
 * 2. Navigation items are displayed (desktop view)
 * 3. CTA button "Solicitar Orçamento" is visible
 * 4. Mobile menu toggle button appears on mobile (<768px)
 * 5. Mobile menu opens/closes when toggle is clicked
 * 6. Navigation items trigger smooth scroll
 * 7. Active section is highlighted in navigation
 * 8. Mobile menu closes after clicking a navigation item
 */

const HeaderTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />
      
      {/* Test Content - Sections to scroll to */}
      <main className="pt-20">
        <section id="hero" className="min-h-screen bg-white flex items-center justify-center scroll-mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hero Section</h1>
            <p className="text-lg text-gray-600">This is the hero section. Scroll down to test navigation.</p>
          </div>
        </section>

        <section id="about" className="min-h-screen bg-neutral-light flex items-center justify-center scroll-mt-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Section</h2>
            <p className="text-lg text-gray-600">This is the about section.</p>
          </div>
        </section>

        <section id="services" className="min-h-screen bg-white flex items-center justify-center scroll-mt-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Section</h2>
            <p className="text-lg text-gray-600">This is the services section.</p>
          </div>
        </section>

        <section id="contact" className="min-h-screen bg-white flex items-center justify-center scroll-mt-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Section</h2>
            <p className="text-lg text-gray-600">This is the contact section.</p>
          </div>
        </section>
      </main>

      {/* Test Instructions */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">Test Instructions:</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>✓ Click navigation items to test smooth scroll</li>
          <li>✓ Scroll to see active section highlighting</li>
          <li>✓ Resize window to &lt;768px to test mobile menu</li>
          <li>✓ Click hamburger icon to open/close mobile menu</li>
          <li>✓ Click "Solicitar Orçamento" to scroll to contact</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTest;
