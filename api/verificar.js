import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { folio } = req.query;

  if (!folio) {
    return res.status(400).send(renderHTML(null, 'No se proporcionó folio de receta.'));
  }

  const { data: prescription, error } = await supabase
    .from('prescriptions')
    .select(`
      prescription_id,
      prescription_date,
      patients ( name ),
      prescription_medications ( medication_name, dosage, duration, instructions, item_number )
    `)
    .eq('prescription_id', folio)
    .single();

  if (error || !prescription) {
    return res.status(404).send(renderHTML(null, `Receta con folio "${folio}" no encontrada.`));
  }

  return res.status(200).send(renderHTML(prescription, null));
}

function renderHTML(rx, errorMsg) {
  const doctorName = 'Dr. Miguel Ojeda Rios';
  const cedula = '4098976';
  const university = 'UABJO, ISNN';

  if (errorMsg) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verificacion de Receta</title>
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verificacion de Receta Medica</h1>
      <p>${doctorName} &middot; C.P. ${cedula}</p>
    </div>
    <div class="card error">
      <span class="icon">&#10060;</span>
      <h2>Receta no verificada</h2>
      <p>${errorMsg}</p>
    </div>
  </div>
</body>
</html>`;
  }

  const date = new Date(rx.prescription_date).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const meds = (rx.prescription_medications || [])
    .sort((a, b) => a.item_number - b.item_number)
    .map(m => `<tr><td>${m.item_number}</td><td>${m.medication_name}</td><td>${m.dosage || ''}</td><td>${m.duration || ''}</td></tr>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receta Verificada - ${rx.prescription_id}</title>
  <style>${getStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Receta Medica Verificada</h1>
      <p>${doctorName} &middot; C.P. ${cedula}</p>
      <p class="small">${university}</p>
    </div>
    <div class="card success">
      <span class="icon">&#9989;</span>
      <h2>Receta autentica</h2>
      <p>Esta receta fue emitida por ${doctorName} y se encuentra registrada en el sistema.</p>
    </div>
    <div class="details">
      <p><strong>Folio:</strong> ${rx.prescription_id}</p>
      <p><strong>Paciente:</strong> ${rx.patients?.name || 'N/D'}</p>
      <p><strong>Fecha:</strong> ${date}</p>
    </div>
    ${meds ? `
    <table>
      <thead><tr><th>#</th><th>Medicamento</th><th>Dosis</th><th>Duracion</th></tr></thead>
      <tbody>${meds}</tbody>
    </table>` : ''}
  </div>
</body>
</html>`;
}

function getStyles() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f0f4f8; color: #1a202c; }
    .container { max-width: 600px; margin: 40px auto; padding: 0 16px; }
    .header { text-align: center; margin-bottom: 24px; }
    .header h1 { font-size: 20px; color: #1e40af; }
    .header p { color: #64748b; font-size: 14px; }
    .header .small { font-size: 12px; }
    .card { padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
    .card .icon { font-size: 40px; display: block; margin-bottom: 12px; }
    .card h2 { font-size: 18px; margin-bottom: 8px; }
    .card p { font-size: 14px; color: #475569; }
    .success { background: #ecfdf5; border: 1px solid #6ee7b7; }
    .success h2 { color: #065f46; }
    .error { background: #fef2f2; border: 1px solid #fca5a5; }
    .error h2 { color: #991b1b; }
    .details { background: white; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
    .details p { margin-bottom: 8px; font-size: 14px; }
    table { width: 100%; background: white; border-radius: 12px; border: 1px solid #e2e8f0; border-collapse: collapse; overflow: hidden; }
    th { background: #1e40af; color: white; padding: 10px; font-size: 13px; text-align: left; }
    td { padding: 10px; font-size: 13px; border-top: 1px solid #e2e8f0; }
  `;
}
