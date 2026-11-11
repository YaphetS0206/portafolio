/* Se ejecuta en <head> antes de pintar (externo para permitir una CSP sin 'unsafe-inline').
   1. Idioma: en la primera visita a "/", si el navegador no está en español, va a /en.
      Si la persona eligió un idioma con el selector, se respeta esa elección.
   2. Tema: aplica el guardado o el del sistema, para evitar parpadeos. */
(function () {
    var raiz = document.documentElement;

    try {
        var ruta = location.pathname;
        if (ruta === '/' || ruta === '/index.html') {
            var elegido = localStorage.getItem('idioma');
            var bot = /bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent);
            var lista = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'es'];
            var espanol = String(lista[0]).toLowerCase().indexOf('es') === 0;
            if (elegido === 'en' || (!elegido && !bot && !espanol)) {
                location.replace('/en' + location.hash);
                return;
            }
        }
    } catch (e) {}

    var tema = null;
    try { tema = localStorage.getItem('tema'); } catch (e) {}
    if (tema !== 'light' && tema !== 'dark') {
        tema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    raiz.setAttribute('data-theme', tema);
    var meta = document.getElementById('meta-tema');
    if (meta) meta.setAttribute('content', tema === 'dark' ? '#0a0a0b' : '#f3f2ee');
    raiz.classList.add('js');
})();
