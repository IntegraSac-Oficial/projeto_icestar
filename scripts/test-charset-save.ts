/**
 * Test Charset Save Script
 * 
 * Tests if UTF-8 characters are being saved correctly
 */

import { getConnection } from '../src/lib/db/connection';

async function testCharsetSave() {
  console.log('🧪 Testing UTF-8 save...\n');

  const connection = await getConnection();

  try {
    // Set connection charset explicitly
    await connection.query('SET NAMES utf8mb4');
    await connection.query('SET CHARACTER SET utf8mb4');
    
    const testData = {
      main_title: 'Soluções Completas em Isolamento Térmico e Refrigeração Veicular',
      subtitle: 'Transforme seu veículo em uma câmara frigorífica profissional',
      description: 'A Ice Star é especialista em adaptação de veículos para transporte refrigerado. Oferecemos isolamento térmico de alta qualidade, instalação de aparelhos de refrigeração e projetos personalizados para atender suas necessidades específicas.',
      primary_button_text: 'Solicite um Orçamento',
      secondary_button_text: 'Conheça Nossos Serviços',
    };

    console.log('Test data to save:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n');

    // Save to database
    console.log('Saving to database...');
    await connection.query(
      'UPDATE content_sections SET section_data = ? WHERE section_key = ?',
      [JSON.stringify(testData), 'hero']
    );
    console.log('✅ Saved\n');

    // Read back from database
    console.log('Reading back from database...');
    const [rows] = await connection.query<any[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      ['hero']
    );

    const savedData = typeof rows[0].section_data === 'string'
      ? JSON.parse(rows[0].section_data)
      : rows[0].section_data;

    console.log('Data read from database:');
    console.log(JSON.stringify(savedData, null, 2));
    console.log('\n');

    // Compare
    let allMatch = true;
    for (const [key, value] of Object.entries(testData)) {
      if (savedData[key] !== value) {
        console.log(`❌ Mismatch in ${key}:`);
        console.log(`  Expected: ${value}`);
        console.log(`  Got:      ${savedData[key]}`);
        allMatch = false;
      }
    }

    if (allMatch) {
      console.log('✅ All characters saved and retrieved correctly!');
    } else {
      console.log('❌ Some characters were corrupted');
    }

  } catch (error) {
    console.error('❌ Error testing charset:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run the script
testCharsetSave()
  .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
