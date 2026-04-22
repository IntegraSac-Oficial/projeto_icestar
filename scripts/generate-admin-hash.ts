/**
 * Generate bcrypt hash for admin password
 * Run with: npx tsx scripts/generate-admin-hash.ts
 */

import { hashPassword } from '../src/lib/services/auth.service';
import { closePool } from '../src/lib/db/connection';

async function main() {
  const password = 'IceStar2024!Admin#Secure';
  
  console.log('Generating bcrypt hash for admin password...\n');
  console.log(`Password: ${password}`);
  
  const hash = await hashPassword(password);
  
  console.log(`\nGenerated hash:\n${hash}`);
  console.log(`\nHash length: ${hash.length} characters`);
  console.log(`Cost factor: ${hash.split('$')[2]}`);
  
  await closePool();
}

main();
