# Portafolio — Jean Paul Andrade Delgadillo

Sitio estático (HTML, CSS y JavaScript sin dependencias ni paso de build).

## Editar el contenido

Todo el texto está en `scripts/contenido.js`: puesto, perfil, stack, experiencia, formación y contacto.

### Poner tu foto

1. Guarda la foto (cuadrada, mínimo 800×800 px, `.jpg` o `.webp`) en `img/foto.jpg`.
2. En `scripts/contenido.js` cambia `foto: ''` por `foto: 'img/foto.jpg'`.

La foto aparece en el centro del globo animado, en blanco y negro, y toma color al pasar el cursor.

## Ver en local

```bash
python3 -m http.server 8080
# abre http://localhost:8080
```

## Publicar en Vercel

### Opción A — desde GitHub (recomendada, se redespliega con cada push)

1. Crea un repositorio en tu cuenta de GitHub y sube esta carpeta.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio.
3. Configuración: **Framework Preset: Other**, sin *Build Command*, *Output Directory* vacío (raíz).
4. Pulsa **Deploy**.

### Opción B — desde la terminal

```bash
npx vercel        # despliegue de prueba
npx vercel --prod # producción
```

## Qué incluye `vercel.json`

- **Cabeceras de seguridad:** Content-Security-Policy estricta (sin `unsafe-inline`), HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `Cross-Origin-Opener-Policy`.
- **URLs limpias** y página `404.html` propia.

Si añades recursos de otros dominios (imágenes externas, analítica), amplía la CSP en `vercel.json`.
