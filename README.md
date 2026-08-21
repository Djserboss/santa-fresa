# Santa Fresa — sitio web

Sitio estático (sin backend). El catálogo se carga desde `data/catalog.json`,
así que actualizar productos no requiere tocar HTML/CSS/JS.

## Estructura

```
index.html          → estructura de la página
css/styles.css       → todos los estilos
js/main.js           → carga catalog.json y arma las tarjetas de producto
data/catalog.json    → EL CATÁLOGO. Edita esto para agregar/quitar/cambiar cajas.
```

## Actualizar el catálogo

Abre `data/catalog.json` y edita el arreglo. Cada producto:

```json
{
  "id": "clasica",
  "name": "Caja Clásica",
  "price": 45000,
  "description": "6 fresas en chocolate oscuro, presentación sencilla.",
  "chocolateColor": "#3B2420",
  "dots": ["#FDE8DA", "#FDE8DA", "#FDE8DA"]
}
```

- `price` en pesos, sin puntos ni signo (se formatea solo).
- `chocolateColor` es el color de relleno de la fresa ilustrada.
- `dots` son los colores de las "semillas" (hasta 6).
- Para agregar una caja nueva, copia un bloque y cambia los valores.
- Guarda, haz commit y push — el sitio se actualiza solo (ver despliegue abajo).

## Probar localmente

No abras `index.html` directo con doble clic — el navegador bloquea el
`fetch()` del catálogo por CORS en `file://`. Sirve la carpeta con un
servidor simple:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

o con Node:

```bash
npx serve .
```

## Despliegue gratis (Vercel, recomendado)

1. Crea un repo en GitHub y sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Sitio Santa Fresa"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/santa-fresa.git
   git push -u origin main
   ```
2. Entra a https://vercel.com → "Add New Project" → importa el repo de GitHub.
3. Framework preset: "Other" (es HTML plano, sin build step).
4. Deploy. Te da una URL tipo `santa-fresa.vercel.app` gratis, con HTTPS.
5. Cada vez que hagas `git push`, Vercel vuelve a desplegar solo.

Alternativa equivalente: Netlify (mismo flujo, arrastra la carpeta o conecta
el repo en https://app.netlify.com).

## Dominio propio (opcional, más adelante)

Cuando quieras `santafresa.com` en vez de `santa-fresa.vercel.app`:
1. Compra el dominio (Namecheap, GoDaddy, ~10-15 USD/año).
2. En Vercel/Netlify: Settings → Domains → agrega tu dominio.
3. Apunta los DNS del dominio a los que te indique Vercel/Netlify.

## Próximos pasos técnicos sugeridos

- [ ] Reemplazar ilustraciones SVG por fotos reales de producto.
- [ ] Agregar favicon (`favicon.ico` en la raíz + `<link rel="icon">` en el head).
- [ ] Meta tags para compartir en redes (Open Graph: título, descripción, imagen).
- [ ] Analítica gratis: Vercel Analytics o Plausible (self-hosted) o GA4.
- [ ] Si algún día alguien sin conocimientos técnicos necesita editar el
      catálogo sin tocar JSON/Git: mover `catalog.json` a un Google Sheet
      público y leerlo con la API de `opensheet.elk.sh` (gratis, sin backend).
