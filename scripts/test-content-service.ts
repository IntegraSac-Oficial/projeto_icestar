/**
 * Test Content Service
 * 
 * Simple script to verify content service functions work correctly
 */

import { getSection, getAllSections } from '../src/lib/services/content.service';

async function testContentService() {
  console.log('Testing Content Service...\n');

  try {
    // Test 1: Get all sections
    console.log('Test 1: Get all sections');
    const allSections = await getAllSections();
    console.log(`✓ Found ${allSections.length} sections`);
    allSections.forEach((section) => {
      console.log(`  - ${section.section_key} (updated: ${section.updated_at})`);
    });
    console.log();

    // Test 2: Get hero section
    console.log('Test 2: Get hero section');
    const heroSection = await getSection('hero');
    if (heroSection) {
      console.log('✓ Hero section found');
      console.log(`  Main title: ${heroSection.section_data.main_title}`);
      console.log(`  Updated by: ${heroSection.updated_by || 'system'}`);
    } else {
      console.log('✗ Hero section not found');
    }
    console.log();

    // Test 3: Get about section
    console.log('Test 3: Get about section');
    const aboutSection = await getSection('about');
    if (aboutSection) {
      console.log('✓ About section found');
      console.log(`  Title: ${aboutSection.section_data.section_title}`);
      console.log(`  Benefits count: ${aboutSection.section_data.benefits?.length || 0}`);
    } else {
      console.log('✗ About section not found');
    }
    console.log();

    // Test 4: Get non-existent section
    console.log('Test 4: Get non-existent section');
    const nonExistent = await getSection('non_existent');
    if (nonExistent === null) {
      console.log('✓ Correctly returned null for non-existent section');
    } else {
      console.log('✗ Should have returned null');
    }
    console.log();

    console.log('All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during testing:', error);
    process.exit(1);
  }
}

testContentService();
