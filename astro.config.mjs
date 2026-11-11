// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
    // Cambia esta URL si conectas un dominio propio
    site: 'https://jeanpaulad.vercel.app',
    trailingSlash: 'never',
    build: {
        format: 'directory',
        // CSS y JS siempre en archivos externos: la CSP no permite código en línea
        inlineStylesheets: 'never',
    },
    vite: {
        build: { assetsInlineLimit: 0 },
    },
    devToolbar: { enabled: false },
});
