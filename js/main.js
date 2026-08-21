// Santa Fresa — carga el catálogo desde data/catalog.json y arma las tarjetas.
// Para actualizar productos: edita data/catalog.json, no este archivo ni el HTML.

const WHATSAPP_NUMBER = '573023909392';

function formatPrice(pesos) {
  return '$' + pesos.toLocaleString('es-CO');
}

function productCardHTML(p) {
  const waText = encodeURIComponent(`Hola Santa Fresa, quiero pedir: ${p.name}`);

  return `
    <div class="product-card">
      <div class="product-frame">
        <div class="scallop-frame" style="width:100%;height:100%;">
          <svg class="ring" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="none" stroke="#C98CA0" stroke-width="2" stroke-dasharray="3 8"/></svg>
          <img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy">
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

function groupHTML(title, products) {
  if (!products.length) return '';
  return `
    <div class="catalog-group">
      <h3 class="catalog-group-title">${title}</h3>
      <div class="product-grid">
        ${products.map(productCardHTML).join('')}
      </div>
    </div>`;
}

async function loadCatalog() {
  const container = document.getElementById('catalog-grid');
  if (!container) return;

  try {
    const res = await fetch('data/catalog.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar el catálogo');
    const products = await res.json();

    const chocolate = products.filter(p => p.category === 'chocolate');
    const fresca = products.filter(p => p.category === 'fresca');
    const otras = products.filter(p => !p.category || (p.category !== 'chocolate' && p.category !== 'fresca'));

    container.innerHTML =
      groupHTML('Fresas con chocolate', chocolate) +
      groupHTML('Fresas frescas', fresca) +
      groupHTML('Otros', otras);
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p style="text-align:center;color:#5C3A32;">No pudimos cargar el catálogo. Escríbenos por WhatsApp para ver las opciones disponibles.</p>';
  }
}

function setupMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close the menu after tapping a link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

document.addEventListener('DOMContentLoaded', loadCatalog);
document.addEventListener('DOMContentLoaded', setupMobileNav);

