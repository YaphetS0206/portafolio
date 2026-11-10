/* Aplica el tema guardado (o el del sistema) antes de pintar, para evitar parpadeos.
   Se carga de forma síncrona en <head>; es externo para permitir una CSP sin 'unsafe-inline'. */
(function () {
    var raiz = document.documentElement;
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
