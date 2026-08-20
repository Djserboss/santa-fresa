// Santa Fresa — carga el catálogo desde data/catalog.json y arma las tarjetas.
// Para actualizar productos: edita data/catalog.json, no este archivo ni el HTML.

const WHATSAPP_NUMBER = '573023909392';

function formatPrice(pesos) {
  return '$' + pesos.toLocaleString('es-CO');
}

function productCardHTML(p) {
  const dots = (p.dots || []).map((color, i) => {
    // positions spread the dots loosely across the strawberry silhouette
    const positions = [[85,105],[115,98],[100,130],[80,140],[122,134],[100,90]];
    const [cx, cy] = positions[i % positions.length];
    return `<circle cx="${cx}" cy="${cy}" r="4" fill="${color}"/>`;
  }).join('');

  const waText = encodeURIComponent(`Hola Santa Fresa, quiero pedir la ${p.name}`);

  return `
    <div class="product-card">
      <div class="product-frame">
        <div class="scallop-frame" style="width:100%;height:100%;">
          <svg class="ring" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="none" stroke="#C98CA0" stroke-width="2" stroke-dasharray="3 8"/></svg>
          <svg viewBox="0 0 200 200" width="58%" height="58%">
            <path d="M100 60c-8-16-24-20-34-15 7 1 14 7 16 15h18z" fill="#4C8C4A"/>
            <path d="M100 66c-30 0-50 23-50 49 0 24 23 41 50 41s50-17 50-41c0-26-20-49-50-49z" fill="${p.chocolateColor}"/>
            ${dots}
          </svg>
        </div>
      </div>
      <h3>${p.name}</h3>
      <div class="price">${formatPrice(p.price)}</div>
      <p>${p.description}</p>
      <a class="btn btn-ghost" style="margin:14px auto 0; padding:9px 18px; font-size:0.82rem;"
         href="https://wa.me/${WHATSAPP_NUMBER}?text=${waText}" target="_blank" rel="noopener">
        Pedir esta caja
      </a>
    </div>`;
}

async function loadCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  try {
    const res = await fetch('data/catalog.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar el catálogo');
    const products = await res.json();
    grid.innerHTML = products.map(productCardHTML).join('');
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p style="text-align:center;color:#5C3A32;">No pudimos cargar el catálogo. Escríbenos por WhatsApp para ver las opciones disponibles.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadCatalog);
