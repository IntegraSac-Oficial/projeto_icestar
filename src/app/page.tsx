import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Applications from '@/components/sections/Applications';
import Differentials from '@/components/sections/Differentials';
import CTASection from '@/components/sections/CTASection';
import ContactForm from '@/components/sections/ContactForm';
import {
  getHeroContent,
  getAboutContent,
  getCTAContent,
  getContactFormContent,
} from '@/lib/utils/content-fetcher';

/**
 * Main landing page component
 * Fetches dynamic content from database and passes to components
 * Validates: Requirements 1.4, 11.6, 15.1, 15.2, 19.1, 19.2, 19.3, 19.4, 19.5
 */
export default async function Home() {
  // Fetch all content in parallel
  const [heroContent, aboutContent, ctaContent, contactFormContent] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getCTAContent(),
    getContactFormContent(),
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero content={heroContent} />

      {/* About Section */}
      <About content={aboutContent} />

      {/* Services Section */}
      <Services />

      {/* Applications Section */}
      <Applications />

      {/* Differentials Section */}
      <Differentials />

      {/* CTA Section */}
      <CTASection 
        headline={ctaContent.headline}
        buttonText={ctaContent.button_text}
        buttonHref={ctaContent.button_href || '#contact'}
      />

      {/* Contact Form Section */}
      <ContactForm content={contactFormContent} />
    </main>
  );
}
