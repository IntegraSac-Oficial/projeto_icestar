import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Differentials from '@/components/sections/Differentials';
import Gallery from '@/components/sections/Gallery';
import CTASection from '@/components/sections/CTASection';
import ContactForm from '@/components/sections/ContactForm';
import {
  getHeroContent,
  getAboutContent,
  getCTAContent,
  getContactFormContent,
} from '@/lib/utils/content-fetcher';
import { getAllGalleryImages } from '@/lib/services/gallery.service';

/**
 * Main landing page component
 * Fetches dynamic content from database and passes to components
 * Validates: Requirements 1.4, 11.6, 15.1, 15.2, 19.1, 19.2, 19.3, 19.4, 19.5
 */
export default async function Home() {
  // Fetch all content in parallel
  const [heroContent, aboutContent, ctaContent, contactFormContent, galleryImages] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getCTAContent(),
    getContactFormContent(),
    getAllGalleryImages(),
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero content={heroContent} />

      {/* About Section */}
      <About content={aboutContent} />

      {/* Services Section */}
      <Services />

      {/* Differentials Section */}
      <Differentials />

      {/* Gallery Section - Applications */}
      <Gallery images={galleryImages} />

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
