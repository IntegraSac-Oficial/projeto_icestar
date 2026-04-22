import React from 'react';
import SectionContainer from './SectionContainer';

/**
 * Manual test file for SectionContainer component
 * This file demonstrates all SectionContainer variants and features
 * Run the dev server and import this component to visually test
 */

const SectionContainerTest: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 px-4">SectionContainer Background Variants</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">White Background (Default)</h3>
            <SectionContainer background="white">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-2">White Background Section</h4>
                <p className="text-gray-600">
                  This section has a white background. It includes max-width of 1280px, 
                  centered alignment, and responsive padding (px-4 sm:px-6 lg:px-8).
                </p>
              </div>
            </SectionContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">Light Gray Background</h3>
            <SectionContainer background="light-gray">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-2">Light Gray Background Section</h4>
                <p className="text-gray-600">
                  This section has a light gray background (#F5F5F5). Perfect for alternating 
                  sections to create visual distinction.
                </p>
              </div>
            </SectionContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">Neutral Gray Background</h3>
            <SectionContainer background="neutral-gray">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-2">Neutral Gray Background Section</h4>
                <p className="text-gray-600">
                  This section has a neutral gray background (#EAEAEA). Useful for subtle 
                  section backgrounds and differentiators.
                </p>
              </div>
            </SectionContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 px-4">SectionContainer Features</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">With ID Attribute</h3>
            <SectionContainer id="test-section" background="light-gray">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-2">Section with ID</h4>
                <p className="text-gray-600">
                  This section has id="test-section" for smooth scroll navigation.
                </p>
              </div>
            </SectionContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">With Custom ClassName</h3>
            <SectionContainer className="border-4 border-primary" background="white">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-2">Section with Custom Class</h4>
                <p className="text-gray-600">
                  This section has a custom className applied (border-4 border-primary) 
                  in addition to the default styles.
                </p>
              </div>
            </SectionContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">Responsive Padding Demo</h3>
            <SectionContainer background="neutral-gray">
              <div className="py-12 border-2 border-dashed border-gray-400">
                <h4 className="text-xl font-bold mb-2">Responsive Padding</h4>
                <p className="text-gray-600 mb-4">
                  Resize your browser to see the responsive padding in action:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Mobile (&lt;640px): px-4 (16px horizontal padding)</li>
                  <li>Tablet (≥640px): px-6 (24px horizontal padding)</li>
                  <li>Desktop (≥1024px): px-8 (32px horizontal padding)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  The dashed border shows the content area with padding applied.
                </p>
              </div>
            </SectionContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">Max-Width Constraint</h3>
            <SectionContainer background="light-gray">
              <div className="py-12 border-2 border-dashed border-gray-400">
                <h4 className="text-xl font-bold mb-2">Max-Width: 1280px</h4>
                <p className="text-gray-600">
                  The content is constrained to a maximum width of 1280px and centered 
                  with auto margins. On screens wider than 1280px, you'll see the 
                  background color extending beyond the content area.
                </p>
              </div>
            </SectionContainer>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 px-4">Nested Content Examples</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2 px-4">With Grid Layout</h3>
            <SectionContainer background="white">
              <div className="py-12">
                <h4 className="text-xl font-bold mb-6">Grid Layout Inside Container</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-neutral-light p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">Item 1</h5>
                    <p className="text-sm text-gray-600">Grid item content</p>
                  </div>
                  <div className="bg-neutral-light p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">Item 2</h5>
                    <p className="text-sm text-gray-600">Grid item content</p>
                  </div>
                  <div className="bg-neutral-light p-6 rounded-lg">
                    <h5 className="font-semibold mb-2">Item 3</h5>
                    <p className="text-sm text-gray-600">Grid item content</p>
                  </div>
                </div>
              </div>
            </SectionContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionContainerTest;
