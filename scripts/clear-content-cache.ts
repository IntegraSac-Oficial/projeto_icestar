/**
 * Clear Content Cache Script
 * 
 * Clears the in-memory content cache
 */

import { clearContentCache } from '../src/lib/utils/content-fetcher';

async function clearCache() {
  console.log('🧹 Clearing content cache...\n');

  try {
    clearContentCache();
    console.log('✅ Content cache cleared successfully!');
    console.log('\nThe landing page will now fetch fresh data from the database.');
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    throw error;
  }
}

// Run the script
clearCache()
  .then(() => {
    console.log('\n✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
