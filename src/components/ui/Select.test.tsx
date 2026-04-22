import React from 'react';
import { useForm } from 'react-hook-form';
import Select, { SelectOption } from './Select';

/**
 * Manual test file for Select component
 * This file demonstrates all Select variants and states
 * Run the dev server and import this component to visually test
 */

const SelectTest: React.FC = () => {
  // Form 1: Basic select without validation
  const { register: register1 } = useForm();

  // Form 2: Select with error state
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

  // Sample options
  const vehicleTypeOptions: SelectOption[] = [
    { value: '', label: 'Selecione o tipo de veículo' },
    { value: 'fiorino', label: 'Fiorino' },
    { value: 'ducato', label: 'Ducato' },
    { value: 'sprinter', label: 'Sprinter' },
    { value: 'van', label: 'Van' },
    { value: 'truck', label: 'Caminhão' },
    { value: 'other', label: 'Outro' },
  ];

  const serviceOptions: SelectOption[] = [
    { value: '', label: 'Selecione um serviço' },
    { value: 'thermal-insulation', label: 'Isolamento Térmico' },
    { value: 'refrigeration', label: 'Aparelhos de Refrigeração' },
    { value: 'vehicle-adaptation', label: 'Adaptação Veicular' },
    { value: 'maintenance', label: 'Manutenção e Suporte' },
    { value: 'custom-projects', label: 'Projetos Sob Medida' },
    { value: 'consulting', label: 'Consultoria Técnica' },
  ];

  const countryOptions: SelectOption[] = [
    { value: '', label: 'Selecione um país' },
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'cl', label: 'Chile' },
    { value: 'uy', label: 'Uruguai' },
    { value: 'py', label: 'Paraguai' },
  ];

  return (
    <div className="p-8 space-y-12 bg-neutral-light min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Component Tests</h2>

        {/* Basic Select */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Select Dropdowns</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Select
                label="Tipo de Veículo"
                name="vehicleType"
                options={vehicleTypeOptions}
                register={register1}
              />

              <Select
                label="Serviço Desejado"
                name="service"
                options={serviceOptions}
                register={register1}
              />

              <Select
                label="País"
                name="country"
                options={countryOptions}
                register={register1}
              />
            </div>
          </div>

          {/* Required Fields */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Required Fields (with asterisk)</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Select
                label="Tipo de Veículo"
                name="requiredVehicle"
                options={vehicleTypeOptions}
                required
                register={register1}
              />

              <Select
                label="Serviço Desejado"
                name="requiredService"
                options={serviceOptions}
                required
                register={register1}
              />
            </div>
          </div>

          {/* Error States */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Error States</h3>
            <div className="max-w-md space-y-4 bg-white p-6 rounded-lg">
              <Select
                label="Tipo de Veículo"
                name="errorVehicle"
                options={vehicleTypeOptions}
                required
                error="Selecione um tipo de veículo"
                register={register2}
              />

              <Select
                label="Serviço Desejado"
                name="errorService"
                options={serviceOptions}
                required
                error="Selecione um serviço"
                register={register2}
              />

              <Select
                label="País"
                name="errorCountry"
                options={countryOptions}
                required
                error="Selecione um país"
                register={register2}
              />
            </div>
          </div>

          {/* Focus States */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Focus States</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Click on the select dropdowns below to see the focus state with red border and ring.
              </p>
              <div className="space-y-4">
                <Select
                  label="Test Focus State"
                  name="focusTest1"
                  options={vehicleTypeOptions}
                  register={register1}
                />

                <Select
                  label="Another Select"
                  name="focusTest2"
                  options={serviceOptions}
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
                <Select
                  label="Tipo de Veículo"
                  name="vehicleType"
                  options={vehicleTypeOptions}
                  required
                  error={errors.vehicleType?.message as string}
                  register={register3}
                />

                <Select
                  label="Serviço Desejado"
                  name="service"
                  options={serviceOptions}
                  required
                  error={errors.service?.message as string}
                  register={register3}
                />

                <Select
                  label="País"
                  name="country"
                  options={countryOptions}
                  required
                  error={errors.country?.message as string}
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
                <Select
                  label="Tipo de Veículo"
                  name="vehicleType2"
                  options={vehicleTypeOptions}
                  register={register1}
                />

                <Select
                  label="Serviço"
                  name="service2"
                  options={serviceOptions}
                  register={register1}
                />

                <Select
                  label="País"
                  name="country2"
                  options={countryOptions}
                  register={register1}
                />

                <Select
                  label="Outro Campo"
                  name="other"
                  options={[
                    { value: '', label: 'Selecione uma opção' },
                    { value: 'option1', label: 'Opção 1' },
                    { value: 'option2', label: 'Opção 2' },
                    { value: 'option3', label: 'Opção 3' },
                  ]}
                  register={register1}
                />
              </div>
            </div>
          </div>

          {/* Mixed Form with Input and Select */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mixed Form (Input + Select)</h3>
            <div className="max-w-md bg-white p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                This demonstrates how Select components work alongside Input components with consistent styling.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    Nome Completo <span className="text-primary ml-1">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register1('mixedName')}
                  />
                </div>

                <Select
                  label="Tipo de Veículo"
                  name="mixedVehicle"
                  options={vehicleTypeOptions}
                  required
                  register={register1}
                />

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    E-mail <span className="text-primary ml-1">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-4 py-3 rounded-lg border border-neutral focus:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register1('mixedEmail')}
                  />
                </div>

                <Select
                  label="Serviço Desejado"
                  name="mixedService"
                  options={serviceOptions}
                  required
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

export default SelectTest;
