/**
 * Fix Database Charset Script
 * 
 * Ensures the database, tables, and columns are using UTF-8 encoding
 */

import { getConnection } from '../src/lib/db/connection';

async function fixDatabaseCharset() {
  console.log('🔧 Fixing database charset configuration...\n');

  const connection = await getConnection();

  try {
    // Set connection charset
    console.log('Setting connection charset to utf8mb4...');
    await connection.query('SET NAMES utf8mb4');
    await connection.query('SET CHARACTER SET utf8mb4');
    await connection.query('SET character_set_connection=utf8mb4');
    console.log('✅ Connection charset set\n');

    // Check current database charset
    console.log('Checking database charset...');
    const [dbCharset] = await connection.query<any[]>(
      `SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME 
       FROM information_schema.SCHEMATA 
       WHERE SCHEMA_NAME = 'istar'`
    );
    console.log('Current database charset:', dbCharset[0]);

    // Alter database charset if needed
    if (dbCharset[0].DEFAULT_CHARACTER_SET_NAME !== 'utf8mb4') {
      console.log('\nAltering database charset to utf8mb4...');
      await connection.query('ALTER DATABASE istar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
      console.log('✅ Database charset updated\n');
    } else {
      console.log('✅ Database already using utf8mb4\n');
    }

    // Check and fix content_sections table
    console.log('Checking content_sections table...');
    const [tableCharset] = await connection.query<any[]>(
      `SELECT TABLE_NAME, TABLE_COLLATION 
       FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = 'istar' AND TABLE_NAME = 'content_sections'`
    );
    console.log('Current table charset:', tableCharset[0]);

    if (!tableCharset[0].TABLE_COLLATION.startsWith('utf8mb4')) {
      console.log('\nAltering content_sections table charset...');
      await connection.query(
        'ALTER TABLE content_sections CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
      );
      console.log('✅ Table charset updated\n');
    } else {
      console.log('✅ Table already using utf8mb4\n');
    }

    // Check section_data column specifically
    console.log('Checking section_data column...');
    const [columnCharset] = await connection.query<any[]>(
      `SELECT COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME 
       FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = 'istar' 
       AND TABLE_NAME = 'content_sections' 
       AND COLUMN_NAME = 'section_data'`
    );
    console.log('Current column charset:', columnCharset[0]);

    if (columnCharset[0].CHARACTER_SET_NAME !== 'utf8mb4') {
      console.log('\nAltering section_data column charset...');
      await connection.query(
        'ALTER TABLE content_sections MODIFY section_data JSON CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
      );
      console.log('✅ Column charset updated\n');
    } else {
      console.log('✅ Column already using utf8mb4\n');
    }

    console.log('✅ All database charset configurations fixed!');
    console.log('\n⚠️  IMPORTANT: Restart your Next.js server for changes to take effect!');
  } catch (error) {
    console.error('❌ Error fixing database charset:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the script
fixDatabaseCharset()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
