/**
 * Test credential verification with actual admin user
 * Run with: npx tsx scripts/test-credential-verification.ts
 */

import { verifyCredentials } from '../src/lib/services/auth.service';
import { closePool } from '../src/lib/db/connection';

async function main() {
  console.log('🔍 Testing Credential Verification...\n');

  try {
    // Test 1: Valid credentials
    console.log('Test 1: Valid credentials');
    const validUser = await verifyCredentials(
      'admin@icestar.com',
      'IceStar2024!Admin#Secure'
    );
    
    if (validUser) {
      console.log('✅ PASS - Valid credentials accepted');
      console.log(`   User ID: ${validUser.id}`);
      console.log(`   Email: ${validUser.email}`);
      console.log(`   Created: ${validUser.created_at}`);
    } else {
      console.log('❌ FAIL - Valid credentials rejected');
    }

    // Test 2: Invalid password
    console.log('\nTest 2: Invalid password');
    const invalidPassword = await verifyCredentials(
      'admin@icestar.com',
      'WrongPassword123!'
    );
    
    if (invalidPassword === null) {
      console.log('✅ PASS - Invalid password rejected');
    } else {
      console.log('❌ FAIL - Invalid password accepted');
    }

    // Test 3: Non-existent user
    console.log('\nTest 3: Non-existent user');
    const nonExistentUser = await verifyCredentials(
      'nonexistent@icestar.com',
      'SomePassword123!'
    );
    
    if (nonExistentUser === null) {
      console.log('✅ PASS - Non-existent user rejected');
    } else {
      console.log('❌ FAIL - Non-existent user accepted');
    }

    // Test 4: Empty credentials
    console.log('\nTest 4: Empty credentials');
    const emptyCredentials = await verifyCredentials('', '');
    
    if (emptyCredentials === null) {
      console.log('✅ PASS - Empty credentials rejected');
    } else {
      console.log('❌ FAIL - Empty credentials accepted');
    }

    // Test 5: SQL injection attempt
    console.log('\nTest 5: SQL injection attempt');
    const sqlInjection = await verifyCredentials(
      "admin@icestar.com' OR '1'='1",
      'anything'
    );
    
    if (sqlInjection === null) {
      console.log('✅ PASS - SQL injection attempt blocked');
    } else {
      console.log('❌ FAIL - SQL injection attempt succeeded');
    }

    console.log('\n✅ All credential verification tests completed!');
  } catch (error) {
    console.error('\n❌ Error during testing:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

main();
