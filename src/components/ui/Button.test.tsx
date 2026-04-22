import React from 'react';
import Button from './Button';

/**
 * Manual test file for Button component
 * This file demonstrates all Button variants and sizes
 * Run the dev server and import this component to visually test
 */

const ButtonTest: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Variants</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Primary Variant</h3>
            <div className="flex gap-4 items-center">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="primary" size="md">Medium Primary</Button>
              <Button variant="primary" size="lg">Large Primary</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Secondary Variant</h3>
            <div className="flex gap-4 items-center">
              <Button variant="secondary" size="sm">Small Secondary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="secondary" size="lg">Large Secondary</Button>
            </div>
          </div>

          <div className="bg-primary p-4 rounded">
            <h3 className="text-lg font-semibold mb-2 text-white">Outline Variant (on dark background)</h3>
            <div className="flex gap-4 items-center">
              <Button variant="outline" size="sm">Small Outline</Button>
              <Button variant="outline" size="md">Medium Outline</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Button States</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Disabled State</h3>
            <div className="flex gap-4 items-center">
              <Button variant="primary" size="md" disabled>Disabled Primary</Button>
              <Button variant="secondary" size="md" disabled>Disabled Secondary</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Full Width</h3>
            <Button variant="primary" size="md" fullWidth>Full Width Button</Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With Click Handler</h3>
            <Button 
              variant="primary" 
              size="md" 
              onClick={() => alert('Button clicked!')}
            >
              Click Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonTest;
