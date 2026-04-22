/**
 * Update admin password in database
 * Run with: npx tsx scripts/update-admin-password.ts
 */

import { hashPassword } from '../src/lib/services/auth.service';
import { query, closePool } from '../src/lib/db/connection';

async function main() {
  const email = 'admin@icestar.com';
  const password = 'IceStar2024!Admin#Secure';
  
  console.log('Updating admin password in database...\n');
  
  const hash = await hashPassword(password);
  
  await query(
    'UPDATE admin_users SET password_hash = ? WHERE email = ?',
    [hash, email]
  );
  
  console.log('✅ Admin password updated successfully');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  
  await closePool();
}

main();
