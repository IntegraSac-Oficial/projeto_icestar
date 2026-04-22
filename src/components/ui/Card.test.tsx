import React from 'react';
import Card from './Card';

/**
 * Manual test file for Card component
 * This file demonstrates all Card variants and features
 * Run the dev server and import this component to visually test
 */

const CardTest: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-neutral-light min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4">Card Component Tests</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Card (No Hover)</h3>
            <div className="max-w-md">
              <Card>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Card Title</h4>
                  <p className="text-gray-600">
                    This is a basic card with white background, rounded corners (rounded-lg), 
                    and subtle shadow (shadow-card). It does not have hover effects.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hoverable Card (With Lift Effect)</h3>
            <div className="max-w-md">
              <Card hoverable>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Hoverable Card</h4>
                  <p className="text-gray-600">
                    This card has the hoverable prop set to true. Hover over it to see 
                    the lift effect (translate-y) and enhanced shadow (shadow-card-hover).
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Card with Custom ClassName</h3>
            <div className="max-w-md">
              <Card className="p-8 border-2 border-primary">
                <h4 className="text-xl font-semibold mb-2 text-primary">Custom Styled Card</h4>
                <p className="text-gray-600">
                  This card has custom className applied: p-8 (padding) and border-2 border-primary.
                  The className prop allows for additional styling while maintaining base styles.
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Service Card Example</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">🔧</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Service 1</h4>
                  <p className="text-gray-600 text-sm">
                    Example service card with icon, title, and description.
                  </p>
                </div>
              </Card>

              <Card hoverable className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">❄️</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Service 2</h4>
                  <p className="text-gray-600 text-sm">
                    Another service card demonstrating consistent styling.
                  </p>
                </div>
              </Card>

              <Card hoverable className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl">🚚</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Service 3</h4>
                  <p className="text-gray-600 text-sm">
                    Third service card showing grid layout behavior.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Application Card Example</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card hoverable className="p-4">
                <div className="text-center">
                  <div className="h-32 bg-neutral flex items-center justify-center mb-3 rounded">
                    <span className="text-4xl">🚐</span>
                  </div>
                  <h4 className="font-semibold">Fiorino</h4>
                  <p className="text-sm text-gray-600 mt-1">Compact vehicle</p>
                </div>
              </Card>

              <Card hoverable className="p-4">
                <div className="text-center">
                  <div className="h-32 bg-neutral flex items-center justify-center mb-3 rounded">
                    <span className="text-4xl">🚙</span>
                  </div>
                  <h4 className="font-semibold">Ducato</h4>
                  <p className="text-sm text-gray-600 mt-1">Large capacity</p>
                </div>
              </Card>

              <Card hoverable className="p-4">
                <div className="text-center">
                  <div className="h-32 bg-neutral flex items-center justify-center mb-3 rounded">
                    <span className="text-4xl">🚐</span>
                  </div>
                  <h4 className="font-semibold">Sprinter</h4>
                  <p className="text-sm text-gray-600 mt-1">Premium option</p>
                </div>
              </Card>

              <Card hoverable className="p-4">
                <div className="text-center">
                  <div className="h-32 bg-neutral flex items-center justify-center mb-3 rounded">
                    <span className="text-4xl">🚚</span>
                  </div>
                  <h4 className="font-semibold">Vans</h4>
                  <p className="text-sm text-gray-600 mt-1">Various models</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTest;
