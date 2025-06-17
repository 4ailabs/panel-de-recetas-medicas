// Script de prueba rápida para Airtable
// Ejecuta esto en la consola del navegador

const testAirtable = async () => {
  const API_KEY = 'patIzNNnbvXsS2OiG.f4383a609b51eae5d6e27c57632e7ade2782dc4d62ababc6d976cfb35971b788';
  const BASE_ID = 'appYbBijylq9Xo1o4';
  const TABLE_NAME = 'Datos';
  
  console.log('🔍 Probando conexión a Airtable...');
  
  try {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?maxRecords=1`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log(`📊 Status: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error:', errorData);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Conexión exitosa!');
    console.log('📋 Campos disponibles:', Object.keys(data.records[0]?.fields || {}));
    
  } catch (error) {
    console.error('❌ Error de red:', error);
  }
};

// Ejecutar test
testAirtable();