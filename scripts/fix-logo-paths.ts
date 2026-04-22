/**
 * Fix Logo Paths Script
 * 
 * Updates existing logo file_path entries to use the API route
 * instead of direct public folder paths
 */

import { getConnection } from '../src/lib/db/connection';

async function fixLogoPaths() {
  console.log('🔧 Fixing logo paths...\n');

  const connection = await getConnection();

  try {
    // Get all logos with old path format
    const [logos] = await connection.query<any[]>(
      'SELECT id, file_name, file_path FROM logos WHERE file_path LIKE "/uploads/%"'
    );

    if (!logos || logos.length === 0) {
      console.log('✅ No logos need path updates');
      return;
    }

    console.log(`Found ${logos.length} logo(s) to update:\n`);

    for (const logo of logos) {
      // Extract filename from old path
      const filename = logo.file_name;
      const newPath = `/api/uploads/logos/${filename}`;

      console.log(`  ID ${logo.id}:`);
      console.log(`    Old: ${logo.file_path}`);
      console.log(`    New: ${newPath}`);

      // Update the path
      await connection.query(
        'UPDATE logos SET file_path = ? WHERE id = ?',
        [newPath, logo.id]
      );

      console.log(`    ✅ Updated\n`);
    }

    console.log('✅ All logo paths fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing logo paths:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the script
fixLogoPaths()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
