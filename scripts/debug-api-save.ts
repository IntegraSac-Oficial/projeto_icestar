/**
 * Debug API Save Script
 * 
 * Simulates what the API does when saving content
 */

import { updateSection } from '../src/lib/services/content.service';

async function debugApiSave() {
  console.log('🔍 Debugging API save process...\n');

  const testData = {
    main_title: 'Soluções Completas em Isolamento Térmico e Refrigeração Veicular',
    subtitle: 'Transforme seu veículo em uma câmara frigorífica profissional',
    description: 'A Ice Star é especialista em adaptação de veículos para transporte refrigerado. Oferecemos isolamento térmico de alta qualidade, instalação de aparelhos de refrigeração e projetos personalizados para atender suas necessidades específicas.',
    primary_button_text: 'Solicite um Orçamento',
    secondary_button_text: 'Conheça Nossos Serviços',
  };

  console.log('Data to save:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n');

  try {
    console.log('Calling updateSection...');
    await updateSection('hero', testData, 'admin@icestar.com');
    console.log('✅ updateSection completed\n');

    // Now read it back using the service
    const { getSection } = await import('../src/lib/services/content.service');
    console.log('Reading back with getSection...');
    const result = await getSection('hero');
    
    if (result) {
      console.log('Data read back:');
      console.log(JSON.stringify(result.section_data, null, 2));
      console.log('\n');

      // Compare
      let allMatch = true;
      for (const [key, value] of Object.entries(testData)) {
        if (result.section_data[key] !== value) {
          console.log(`❌ Mismatch in ${key}:`);
          console.log(`  Expected: ${value}`);
          console.log(`  Got:      ${result.section_data[key]}`);
          allMatch = false;
        }
      }

      if (allMatch) {
        console.log('✅ All data matches! Service layer is working correctly.');
      } else {
        console.log('❌ Data mismatch detected in service layer');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

// Run the script
debugApiSave()
  .then(() => {
    console.log('\n✅ Debug completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Debug failed:', error);
    process.exit(1);
  });
