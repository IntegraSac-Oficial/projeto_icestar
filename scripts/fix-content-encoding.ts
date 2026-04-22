/**
 * Fix Content Encoding Script
 * 
 * Fixes UTF-8 encoding issues in existing content_sections data
 * Converts incorrectly encoded text back to proper UTF-8
 */

import { getConnection } from '../src/lib/db/connection';

async function fixContentEncoding() {
  console.log('🔧 Fixing content encoding issues...\n');

  const connection = await getConnection();

  try {
    // Set connection charset to utf8mb4
    await connection.query('SET NAMES utf8mb4');
    await connection.query('SET CHARACTER SET utf8mb4');

    // Get all content sections
    const [sections] = await connection.query<any[]>(
      'SELECT section_key, section_data FROM content_sections'
    );

    if (!sections || sections.length === 0) {
      console.log('✅ No content sections found');
      return;
    }

    console.log(`Found ${sections.length} section(s) to check:\n`);

    for (const section of sections) {
      console.log(`  Section: ${section.section_key}`);
      
      let sectionData = typeof section.section_data === 'string'
        ? JSON.parse(section.section_data)
        : section.section_data;

      let hasChanges = false;
      const fixedData: any = {};

      // Check each field for encoding issues
      for (const [key, value] of Object.entries(sectionData)) {
        if (typeof value === 'string') {
          // Check if string has encoding issues (contains Ã, Â, etc.)
          if (/[ÃÂ]/.test(value)) {
            // Try to fix by converting from Latin1 to UTF-8
            try {
              const buffer = Buffer.from(value, 'latin1');
              const fixed = buffer.toString('utf8');
              fixedData[key] = fixed;
              hasChanges = true;
              console.log(`    ✓ Fixed field: ${key}`);
              console.log(`      Before: ${value.substring(0, 50)}...`);
              console.log(`      After:  ${fixed.substring(0, 50)}...`);
            } catch (err) {
              console.log(`    ✗ Could not fix field: ${key}`);
              fixedData[key] = value;
            }
          } else {
            fixedData[key] = value;
          }
        } else {
          fixedData[key] = value;
        }
      }

      if (hasChanges) {
        // Update the section with fixed data
        await connection.query(
          'UPDATE content_sections SET section_data = ? WHERE section_key = ?',
          [JSON.stringify(fixedData), section.section_key]
        );
        console.log(`    ✅ Updated section\n`);
      } else {
        console.log(`    ℹ No encoding issues found\n`);
      }
    }

    console.log('✅ All content encoding fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing content encoding:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the script
fixContentEncoding()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
