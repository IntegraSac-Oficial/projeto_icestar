import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

/**
 * Manual test file for Input component
 * This file demonstrates all Input variants and states
 * Run the dev server and import this component to visually test
 */

const InputTest: React.FC = () => {
  // Form 1: Basic inputs without validation
  const { register: register1 } = useForm();

  // Form 2: Inputs with error states
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
        <h2 className="text-2xl font-bold mb-4">Input Component Tests</h2>

        {/* Basic Inputs */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Input Types</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                register={register1}
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                register={register1}
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="(11) 98765-4321"
                register={register1}
              />
            </div>
          </div>

          {/* Required Fields */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Required Fields (with asterisk)</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Input
                label="Full Name"
                type="text"
                name="requiredName"
                placeholder="Enter your full name"
                required
                register={register1}
              />

              <Input
                label="Email Address"
                type="email"
                name="requiredEmail"
                placeholder="your.email@example.com"
                required
                register={register1}
              />
            </div>
          </div>

          {/* Error States */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Error States</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Input
                label="Full Name"
                type="text"
                name="errorName"
                placeholder="Enter your full name"
                required
                error="Nome deve ter pelo menos 3 caracteres"
                register={register2}
              />

              <Input
                label="Email Address"
                type="email"
                name="errorEmail"
                placeholder="your.email@example.com"
                required
                error="E-mail inválido"
                register={register2}
              />

              <Input
                label="Phone Number"
                type="tel"
                name="errorPhone"
                placeholder="(11) 98765-4321"
                required
                error="Telefone inválido"
                register={register2}
              />
            </div>
          </div>

          {/* Focus States */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Focus States</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Click on the inputs below to see the focus state with red border and ring.
              </p>
              <div className="space-y-4">
                <Input
                  label="Test Focus State"
                  type="text"
                  name="focusTest1"
                  placeholder="Click to focus"
                  register={register1}
                />

                <Input
                  label="Another Input"
                  type="text"
                  name="focusTest2"
                  placeholder="Click to focus"
                  register={register1}
                />
              </div>
            </div>
          </div>

          {/* Complete Form Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Complete Form with Validation</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  error={errors.fullName?.message as string}
                  register={register3}
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  error={errors.email?.message as string}
                  register={register3}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="(11) 98765-4321"
                  required
                  error={errors.phone?.message as string}
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

          {/* Two-Column Layout Example */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Two-Column Layout (Desktop)</h3>
            <div className="max-w-2xl bg-white p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="John"
                  register={register1}
                />

                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  register={register1}
                />

                <Input
                  label="Email"
                  type="email"
                  name="email2"
                  placeholder="john.doe@example.com"
                  register={register1}
                />

                <Input
                  label="Phone"
                  type="tel"
                  name="phone2"
                  placeholder="(11) 98765-4321"
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

export default InputTest;
