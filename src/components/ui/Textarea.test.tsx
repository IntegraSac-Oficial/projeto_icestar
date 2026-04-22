'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Textarea from './Textarea';

/**
 * Manual test file for Textarea component
 * This file demonstrates all Textarea variants and states
 * Run the dev server and import this component to visually test
 */

const TextareaTest: React.FC = () => {
  // Form 1: Basic textareas without validation
  const { register: register1 } = useForm();

  // Form 2: Textareas with error states
  const { register: register2 } = useForm();

  // Form 3: Complete form example
  const {
    register: register3,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="p-8 space-y-12 bg-neutral-light min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4">Textarea Component Tests</h2>

        {/* Basic Textareas */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Textarea</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Textarea
                label="Message"
                name="message"
                placeholder="Enter your message here..."
                register={register1}
              />
            </div>
          </div>

          {/* Different Row Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Different Row Sizes</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Textarea
                label="Small Textarea (3 rows)"
                name="small"
                placeholder="Small textarea with 3 rows"
                rows={3}
                register={register1}
              />

              <Textarea
                label="Medium Textarea (4 rows - default)"
                name="medium"
                placeholder="Medium textarea with 4 rows (default)"
                register={register1}
              />

              <Textarea
                label="Large Textarea (8 rows)"
                name="large"
                placeholder="Large textarea with 8 rows"
                rows={8}
                register={register1}
              />
            </div>
          </div>

          {/* Required Field */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Required Field (with asterisk)</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Textarea
                label="Required Message"
                name="requiredMessage"
                placeholder="This field is required"
                required
                register={register1}
              />
            </div>
          </div>

          {/* Error State */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Error State</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Textarea
                label="Message"
                name="errorMessage"
                placeholder="Enter your message here..."
                required
                error="Mensagem muito longa (máximo 500 caracteres)"
                register={register2}
              />

              <Textarea
                label="Comments"
                name="errorComments"
                placeholder="Enter your comments..."
                required
                error="Este campo é obrigatório"
                register={register2}
              />
            </div>
          </div>

          {/* Focus State */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Focus State</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Click on the textarea below to see the focus state with red border and ring.
              </p>
              <Textarea
                label="Test Focus State"
                name="focusTest"
                placeholder="Click to focus and see the red border"
                register={register1}
              />
            </div>
          </div>

          {/* Complete Form Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Complete Form with Validation</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textarea
                  label="Your Message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={6}
                  required
                  error={errors.message?.message as string}
                  register={register3}
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>

          {/* Resize Behavior */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resize Behavior</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                The textarea can be resized vertically by dragging the bottom-right corner.
              </p>
              <Textarea
                label="Resizable Textarea"
                name="resizable"
                placeholder="Try resizing this textarea vertically..."
                rows={4}
                register={register1}
              />
            </div>
          </div>

          {/* Full Width in Form Layout */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Full Width in Form Layout</h3>
            <div className="max-w-2xl bg-white p-6 rounded-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <Textarea
                  label="Additional Information"
                  name="additionalInfo"
                  placeholder="Any additional details you'd like to share..."
                  rows={5}
                  register={register1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaTest;
