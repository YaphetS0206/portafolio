# Portafolio — Jean Paul Andrade Delgadillo

Sitio estático hecho con [Astro](https://astro.build), bilingüe (español e inglés) y sin dependencias en el navegador.

## Editar el contenido

| Qué | Dónde |
| --- | --- |
| Textos en español e inglés (perfil, experiencia, formación, contacto) | `src/i18n/textos.ts` |
| Correo, redes, foto, stack y prototipos del laboratorio | `src/data/perfil.ts` |
| Estilos | `src/styles/global.css` |
| Animaciones | `src/scripts/main.ts` |

### Añadir un prototipo o experimento

En `src/data/perfil.ts`, dentro de `PROYECTOS`, copia el ejemplo del comentario y rellénalo
(`repo` con el enlace de GitHub y `demo` con la URL publicada, por ejemplo en Vercel).
Mientras la lista esté vacía, la sección muestra "Próximamente".

### Idioma

- `/` es español y `/en` inglés.
- En la primera visita, si el navegador no está en español, se redirige a `/en`.
- El selector ES / EN de la cabecera guarda la elección.

## Ver en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

> **Al añadir o actualizar dependencias** usa `npx npm@10 install <paquete>`.
> El npm 11 de macOS quita del `package-lock.json` paquetes que Vercel necesita en Linux
> y el despliegue falla con `npm ci ... Missing: @emnapi/... from lock file`.

## Publicar en Vercel

`vercel.json` ya indica el framework (Astro), el comando de build y la carpeta `dist`.
Cada `git push` a `main` publica en producción; cada rama genera una vista previa.

`vercel.json` también define las cabeceras de seguridad: CSP estricta sin `unsafe-inline`, HSTS,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y
`Cross-Origin-Opener-Policy`. Por eso no se usan estilos ni scripts en línea: si añades recursos de
otros dominios, amplía la CSP.
