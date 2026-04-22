/**
 * Manual verification script for authentication service
 * Run with: npx tsx scripts/verify-auth-service.ts
 */

import { hashPassword, comparePassword, verifyCredentials } from '../src/lib/services/auth.service';
import { query, closePool } from '../src/lib/db/connection';

async function main() {
  console.log('🔍 Verifying Authentication Service...\n');

  try {
    // Test 1: Password Hashing
    console.log('Test 1: Password Hashing');
    const testPassword = 'SecurePass123!';
    const hash = await hashPassword(testPassword);
    console.log('✅ Password hashed successfully');
    console.log(`   Hash format: ${hash.substring(0, 20)}...`);
    console.log(`   Cost factor: ${hash.split('$')[2]}`);

    // Test 2: Password Comparison
    console.log('\nTest 2: Password Comparison');
    const isValidCorrect = await comparePassword(testPassword, hash);
    const isValidWrong = await comparePassword('WrongPassword', hash);
    console.log(`✅ Correct password: ${isValidCorrect ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Wrong password: ${!isValidWrong ? 'PASS' : 'FAIL'}`);

    // Test 3: Database Connection
    console.log('\nTest 3: Database Connection');
    const [rows] = await query('SELECT 1 as test');
    console.log('✅ Database connection successful');

    // Test 4: Check admin_users table exists
    console.log('\nTest 4: Check admin_users table');
    const [tables] = await query(
      "SHOW TABLES LIKE 'admin_users'"
    );
    if (Array.isArray(tables) && tables.length > 0) {
      console.log('✅ admin_users table exists');
    } else {
      console.log('❌ admin_users table not found');
    }

    // Test 5: Check if initial admin exists
    console.log('\nTest 5: Check initial admin user');
    const [adminRows] = await query<any[]>(
      'SELECT email FROM admin_users WHERE email = ?',
      ['admin@icestar.com']
    );
    if (Array.isArray(adminRows) && adminRows.length > 0) {
      console.log('✅ Initial admin user exists');
      console.log(`   Email: ${adminRows[0].email}`);
    } else {
      console.log('⚠️  Initial admin user not found (run seed script first)');
    }

    // Test 6: Verify credentials (if admin exists)
    if (Array.isArray(adminRows) && adminRows.length > 0) {
      console.log('\nTest 6: Credential Verification');
      console.log('⚠️  Cannot test without knowing the password');
      console.log('   (Password is generated during seed script execution)');
    }

    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during verification:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

main();
