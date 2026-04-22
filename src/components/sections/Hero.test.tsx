import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

describe('Hero Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  it('renders the main headline (h1)', () => {
    render(<Hero />);
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveTextContent(/Soluções Completas em Isolamento Térmico e Refrigeração Veicular/i);
  });

  it('renders the subheadline (h2)', () => {
    render(<Hero />);
    const subheadline = screen.getByRole('heading', { level: 2 });
    expect(subheadline).toBeInTheDocument();
    expect(subheadline).toHaveTextContent(/Transforme seu veículo/i);
  });

  it('renders supporting paragraph text', () => {
    render(<Hero />);
    const paragraph = screen.getByText(/A iStar é especialista/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('renders two CTA buttons', () => {
    render(<Hero />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('renders primary CTA button with correct text', () => {
    render(<Hero />);
    const primaryButton = screen.getByRole('button', { name: /Solicite um Orçamento/i });
    expect(primaryButton).toBeInTheDocument();
  });

  it('renders secondary CTA button with correct text', () => {
    render(<Hero />);
    const secondaryButton = screen.getByRole('button', { name: /Conheça Nossos Serviços/i });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('renders hero vehicle image (SVG)', () => {
    render(<Hero />);
    const image = screen.getByRole('img', { name: /Veículo refrigerado iStar/i });
    expect(image).toBeInTheDocument();
  });

  it('has correct section ID for navigation', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('#hero');
    expect(section).toBeInTheDocument();
  });

  it('has minimum 80vh height', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-[80vh]');
  });

  it('primary button scrolls to contact section when clicked', () => {
    // Create mock contact section
    const mockContactSection = document.createElement('section');
    mockContactSection.id = 'contact';
    document.body.appendChild(mockContactSection);

    render(<Hero />);
    const primaryButton = screen.getByRole('button', { name: /Solicite um Orçamento/i });
    
    fireEvent.click(primaryButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    // Cleanup
    document.body.removeChild(mockContactSection);
  });

  it('secondary button scrolls to services section when clicked', () => {
    // Create mock services section
    const mockServicesSection = document.createElement('section');
    mockServicesSection.id = 'services';
    document.body.appendChild(mockServicesSection);

    render(<Hero />);
    const secondaryButton = screen.getByRole('button', { name: /Conheça Nossos Serviços/i });
    
    fireEvent.click(secondaryButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    // Cleanup
    document.body.removeChild(mockServicesSection);
  });

  it('uses SectionContainer wrapper', () => {
    const { container } = render(<Hero />);
    // SectionContainer adds max-w-[1280px] class
    const sectionContainer = container.querySelector('.max-w-\\[1280px\\]');
    expect(sectionContainer).toBeInTheDocument();
  });

  it('has two-column layout on desktop (md breakpoint)', () => {
    const { container } = render(<Hero />);
    const grid = container.querySelector('.md\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('has single-column layout on mobile (grid-cols-1)', () => {
    const { container } = render(<Hero />);
    const grid = container.querySelector('.grid-cols-1');
    expect(grid).toBeInTheDocument();
  });

  it('image appears below text on mobile (order-first md:order-last)', () => {
    const { container } = render(<Hero />);
    const imageContainer = container.querySelector('.order-first.md\\:order-last');
    expect(imageContainer).toBeInTheDocument();
  });

  it('uses primary red color in SVG elements', () => {
    render(<Hero />);
    const svg = screen.getByRole('img', { name: /Veículo refrigerado iStar/i });
    const svgContent = svg.innerHTML;
    expect(svgContent).toContain('#C62828');
  });

  it('has proper accessibility with aria-label on image', () => {
    render(<Hero />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('aria-label', 'Veículo refrigerado iStar');
  });
});
