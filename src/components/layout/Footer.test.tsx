import React from 'react';
import Footer from './Footer';

/**
 * Manual test file for Footer component
 * This file demonstrates the Footer component with all its sections
 * Run the dev server and navigate to /footer-demo to visually test
 */

const FooterTest: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Spacer to push footer down */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Footer Component Test</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Test Checklist</h2>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Layout Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Desktop (≥1024px): Four-column layout</li>
                <li>Tablet (768-1024px): Two-column layout</li>
                <li>Mobile (&lt;768px): Single-column layout</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Content Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Company name "iStar" is displayed</li>
                <li>Company description is visible</li>
                <li>Quick links to all page sections</li>
                <li>Contact information (phone, email, address)</li>
                <li>Social media icons (Facebook, Instagram, LinkedIn, Twitter)</li>
                <li>Copyright notice with current year</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Interaction Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Quick links trigger smooth scroll to sections</li>
                <li>Phone link opens phone dialer</li>
                <li>Email link opens email client</li>
                <li>Social media links open in new tab</li>
                <li>Hover effects on links work correctly</li>
                <li>Focus states are visible on keyboard navigation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Style Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Dark red (#8E0000) background</li>
                <li>White text for good contrast</li>
                <li>Proper spacing and padding</li>
                <li>Icons are properly sized and colored</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">Accessibility Tests</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>ARIA labels on navigation and social media links</li>
                <li>Keyboard navigation works (Tab, Enter)</li>
                <li>Focus indicators are visible</li>
                <li>Links have proper attributes (target, rel)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> Scroll down to see the Footer component. 
              Resize your browser window to test responsive layouts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default FooterTest;
