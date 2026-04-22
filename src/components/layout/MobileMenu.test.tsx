import React, { useState } from 'react';
import MobileMenu from './MobileMenu';
import { navigationItems } from '@/data/navigation';

/**
 * Manual test file for MobileMenu component
 * This file demonstrates the MobileMenu functionality
 * Run the dev server and navigate to /mobile-menu-demo to visually test
 */

const MobileMenuTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">MobileMenu Component Test</h1>
          <p className="text-gray-600 mb-4">
            This page demonstrates the MobileMenu component functionality.
            Click the button below to open the mobile menu.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold mb-4">Test Controls</h2>
          
          <div className="space-y-4">
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Open Mobile Menu
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Active Section (for highlighting):
              </label>
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {navigationItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Features to Test</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Click "Open Mobile Menu" button to open the menu</li>
            <li>Menu should slide in from the right side</li>
            <li>Overlay backdrop should appear with semi-transparent black background</li>
            <li>Click the X button to close the menu</li>
            <li>Click the backdrop (outside the menu) to close it</li>
            <li>Press Escape key to close the menu</li>
            <li>Click any navigation item - it should close the menu</li>
            <li>Active section should be highlighted in red with light red background</li>
            <li>Body scroll should be prevented when menu is open</li>
            <li>Menu should have smooth slide animation (300ms)</li>
            <li>All interactive elements should have proper focus states</li>
            <li>Menu should be accessible with keyboard navigation</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Expected Behavior</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Opening the Menu:</h3>
              <p>The menu panel slides in from the right side with a smooth animation. An overlay backdrop appears behind it.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Closing the Menu:</h3>
              <p>The menu can be closed by clicking the X button, clicking the backdrop, pressing Escape, or clicking any navigation item.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Active Section Highlighting:</h3>
              <p>The currently active section (selected in the dropdown above) should be highlighted with red text and a light red background.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accessibility:</h3>
              <p>The menu has proper ARIA attributes (role="dialog", aria-modal="true", aria-label). All buttons have aria-labels.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Responsive Design</h2>
          <p className="text-gray-700 mb-4">
            The mobile menu is designed for mobile viewports (&lt; 768px). 
            On desktop, the Header component shows a horizontal navigation menu instead.
          </p>
          <p className="text-gray-700">
            To test the mobile menu properly, resize your browser window to mobile width 
            or use the browser's responsive design mode.
          </p>
        </div>
      </div>

      {/* MobileMenu Component */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationItems={navigationItems}
        activeSection={activeSection}
      />
    </div>
  );
};

export default MobileMenuTest;
