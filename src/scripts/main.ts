/* Interacciones y animaciones. El contenido ya viene renderizado por Astro;
   aquí solo se añade movimiento. Todo respeta prefers-reduced-motion. */

const raiz = document.documentElement;
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const conCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

const UI = (() => {
    try {
        return JSON.parse($('#ui')?.textContent || '{}');
    } catch {
        return {};
    }
})();

function span(clase: string, texto?: string) {
    const s = document.createElement('span');
    s.className = clase;
    if (texto !== undefined) s.textContent = texto;
    return s;
}

/* ───────── Variables CSS desde atributos (la CSP no permite style="") ───────── */

function variables() {
    $$('[data-i]').forEach((n) => n.style.setProperty('--i', n.dataset.i!));
    $$('[data-d]').forEach((n) => n.style.setProperty('--d', n.dataset.d + 'ms'));
    $$('[data-marca]').forEach((n) => n.style.setProperty('--marca', n.dataset.marca!));
}

/* ───────── Texto: letras, palabras e iluminado ───────── */

function dividirLetras() {
    let n = 0;
    $$('.letras').forEach((cont) => {
        const texto = cont.textContent || '';
        cont.textContent = '';
        for (const ch of texto) {
            const s = span('letra', ch === ' ' ? ' ' : ch);
            s.style.setProperty('--i', String(n++));
            cont.appendChild(s);
        }
    });
}

function dividirPalabras(nodo: Node, contador: { n: number }) {
    Array.from(nodo.childNodes).forEach((hijo) => {
        if (hijo.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            (hijo.textContent || '').split(/(\s+)/).forEach((trozo) => {
                if (!trozo) return;
                if (/^\s+$/.test(trozo)) {
                    frag.appendChild(document.createTextNode(' '));
                    return;
                }
                const mascara = span('palabra');
                const interior = span('', trozo);
                interior.style.setProperty('--i', String(contador.n++));
                mascara.appendChild(interior);
                frag.appendChild(mascara);
            });
            nodo.replaceChild(frag, hijo);
        } else if (hijo.nodeType === Node.ELEMENT_NODE) {
            dividirPalabras(hijo, contador);
        }
    });
}

function prepararIluminado() {
    $$('.iluminar').forEach((p) => {
        const palabras = (p.textContent || '').trim().split(/\s+/);
        p.textContent = '';
        palabras.forEach((w, i) => {
            p.appendChild(span('luz', w));
            if (i < palabras.length - 1) p.appendChild(document.createTextNode(' '));
        });
    });
}

/* ───────── Descifrado y escritura ───────── */

const GLIFOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_<>';
const rafs = new WeakMap<Element, number>();

function descifrar(nodo: HTMLElement, texto: string, dur = 600) {
    if (sinMovimiento) {
        nodo.textContent = texto;
        return;
    }
    cancelAnimationFrame(rafs.get(nodo) || 0);
    const inicio = performance.now();
    const paso = (ahora: number) => {
        const p = Math.min((ahora - inicio) / dur, 1);
        const fijos = Math.floor(p * texto.length);
        let salida = texto.slice(0, fijos);
        for (let i = fijos; i < texto.length; i++) salida += texto[i] === ' ' ? ' ' : GLIFOS[(Math.random() * GLIFOS.length) | 0];
        nodo.textContent = salida;
        if (p < 1) rafs.set(nodo, requestAnimationFrame(paso));
    };
    rafs.set(nodo, requestAnimationFrame(paso));
}

function rotarRoles() {
    const nodo = $('#rol');
    const roles: string[] = UI.roles || [];
    if (!nodo || roles.length < 2 || sinMovimiento) return;
    let i = 0;
    setInterval(() => {
        if (document.hidden) return;
        i = (i + 1) % roles.length;
        descifrar(nodo, roles[i], 700);
    }, 2600);
}

function descifrarAlPasar() {
    $$('[data-scramble]').forEach((a) => {
        const original = a.textContent || '';
        a.addEventListener('mouseenter', () => descifrar(a, original, 350));
    });
}

/** Escribe el texto letra a letra y luego llama a `fin`. */
function escribir(nodo: HTMLElement, texto: string, fin?: () => void) {
    if (sinMovimiento) {
        nodo.textContent = texto;
        fin?.();
        return;
    }
    let i = 0;
    const tecla = () => {
        nodo.textContent = texto.slice(0, ++i);
        if (i < texto.length) setTimeout(tecla, 45 + Math.random() * 70);
        else fin && setTimeout(fin, 350);
    };
    setTimeout(tecla, 400);
}

/* ───────── Cifras que cuentan ───────── */

function contar(nodo: HTMLElement) {
    const hasta = Number(nodo.dataset.hasta) || 0;
    if (sinMovimiento) return;
    const inicio = performance.now();
    const paso = (ahora: number) => {
        const p = Math.min((ahora - inicio) / 1200, 1);
        nodo.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * hasta));
        if (p < 1) requestAnimationFrame(paso);
    };
    nodo.textContent = '0';
    requestAnimationFrame(paso);
}

/* ───────── Apariciones al hacer scroll ───────── */

function observarApariciones() {
    const objetivos = $$('[data-rev], [data-palabras]');
    const mostrar = (o: HTMLElement) => {
        o.classList.add('visible');
        o.querySelectorAll<HTMLElement>('.contar').forEach(contar);
        o.querySelectorAll<HTMLElement>('.escribir').forEach((n) =>
            escribir(n, n.dataset.texto || '', () => $('#terminal-salida')?.classList.add('visible')),
        );
    };
    if (!('IntersectionObserver' in window) || sinMovimiento) {
        objetivos.forEach(mostrar);
        return;
    }
    const obs = new IntersectionObserver(
        (entradas) =>
            entradas.forEach((e) => {
                if (!e.isIntersecting) return;
                mostrar(e.target as HTMLElement);
                obs.unobserve(e.target);
            }),
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    objetivos.forEach((o) => obs.observe(o));
}

function enlaceActivo() {
    if (!('IntersectionObserver' in window)) return;
    const enlaces = new Map<string, HTMLElement>();
    $$('.nav a').forEach((a) => enlaces.set(a.getAttribute('href')!.slice(1), a));
    const obs = new IntersectionObserver(
        (entradas) =>
            entradas.forEach((e) => {
                if (!e.isIntersecting) return;
                enlaces.forEach((a) => {
                    a.classList.remove('activo');
                    a.removeAttribute('aria-current');
                });
                const a = enlaces.get(e.target.id);
                if (a) {
                    a.classList.add('activo');
                    a.setAttribute('aria-current', 'location');
                }
            }),
        { rootMargin: '-45% 0px -50% 0px' },
    );
    $$('main section[id]').forEach((s) => obs.observe(s));
}

/* ───────── Scroll: progreso, cabecera, iluminado y línea de tiempo ───────── */

function alDesplazar() {
    const barra = $('.progreso');
    const cabecera = $('.cabecera');
    const tiempo = $('.tiempo');
    const parrafos = $$('.iluminar');
    if (!cabecera) return;
    let ultimo = window.scrollY;
    let pendiente = false;

    const actualizar = () => {
        pendiente = false;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const alto = document.documentElement.scrollHeight - vh;
        if (barra) barra.style.transform = `scaleX(${alto > 0 ? y / alto : 0})`;

        cabecera.classList.toggle('con-fondo', y > 40);
        if (!raiz.classList.contains('menu-abierto')) {
            if (y > ultimo + 6 && y > 200) cabecera.classList.add('oculta');
            else if (y < ultimo - 6) cabecera.classList.remove('oculta');
        }
        ultimo = y;

        parrafos.forEach((p) => {
            const r = p.getBoundingClientRect();
            const avance = sinMovimiento ? 1 : (vh * 0.85 - r.top) / (r.height + vh * 0.25);
            const luces = p.children;
            const hasta = Math.round(Math.max(0, Math.min(1, avance)) * luces.length);
            for (let i = 0; i < luces.length; i++) luces[i].classList.toggle('on', i < hasta);
        });

        if (tiempo) {
            const r = tiempo.getBoundingClientRect();
            const avance = sinMovimiento ? 1 : (vh * 0.7 - r.top) / r.height;
            tiempo.style.setProperty('--avance', String(Math.max(0, Math.min(1, avance))));
        }
    };

    window.addEventListener(
        'scroll',
        () => {
            if (!pendiente) {
                pendiente = true;
                requestAnimationFrame(actualizar);
            }
        },
        { passive: true },
    );
    window.addEventListener('resize', actualizar);
    actualizar();
}

/* ───────── Foco de luz que sigue al cursor ───────── */

function focos() {
    if (sinMovimiento || !conCursor) return;
    const hero = $('.hero');
    const fondo = $('.hero-fondo');
    hero?.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        fondo?.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        fondo?.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
    // Tarjetas del laboratorio: borde y brillo siguen al cursor
    $$('.proyecto, .lab-vacio').forEach((c) =>
        c.addEventListener('pointermove', (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--px', e.clientX - r.left + 'px');
            c.style.setProperty('--py', e.clientY - r.top + 'px');
        }),
    );
}

/* ───────── Tema, idioma y menú ───────── */

function tema() {
    const boton = $('#tema');
    const texto = $('#tema-texto');
    if (!boton || !texto) return;
    const pintar = () => {
        const oscuro = raiz.dataset.theme === 'dark';
        texto.textContent = oscuro ? UI.claro : UI.oscuro;
        boton.setAttribute('aria-label', oscuro ? UI.aClaro : UI.aOscuro);
    };
    const aplicar = (nuevo: string) => {
        raiz.dataset.theme = nuevo;
        $('#meta-tema')?.setAttribute('content', nuevo === 'dark' ? '#0a0a0b' : '#f3f2ee');
        try {
            localStorage.setItem('tema', nuevo);
        } catch {}
        pintar();
    };
    boton.addEventListener('click', () => {
        const nuevo = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
        if (!document.startViewTransition || sinMovimiento) {
            aplicar(nuevo);
            return;
        }
        // Revelado circular desde el botón
        const r = boton.getBoundingClientRect();
        raiz.style.setProperty('--tx', r.left + r.width / 2 + 'px');
        raiz.style.setProperty('--ty', r.top + r.height / 2 + 'px');
        raiz.classList.add('cambiando-tema');
        const fin = () => raiz.classList.remove('cambiando-tema');
        document.startViewTransition(() => aplicar(nuevo)).finished.then(fin, fin);
    });
    pintar();
}

function idioma() {
    $$<HTMLAnchorElement>('[data-idioma]').forEach((a) =>
        a.addEventListener('click', (e) => {
            try {
                localStorage.setItem('idioma', a.dataset.idioma!);
            } catch {}
            // Mantiene la sección en la que estás
            if (location.hash) {
                e.preventDefault();
                location.href = a.getAttribute('href') + location.hash;
            }
        }),
    );
}

function menu() {
    const boton = $('#menu-btn');
    if (!boton) return;
    const cerrar = () => {
        raiz.classList.remove('menu-abierto');
        boton.setAttribute('aria-expanded', 'false');
        boton.textContent = UI.menu;
    };
    boton.addEventListener('click', () => {
        const abierto = raiz.classList.toggle('menu-abierto');
        boton.setAttribute('aria-expanded', String(abierto));
        boton.textContent = abierto ? UI.cerrar : UI.menu;
        if (abierto) $('.nav a')?.focus();
    });
    $$('.nav a').forEach((a) => a.addEventListener('click', cerrar));
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !raiz.classList.contains('menu-abierto')) return;
        cerrar();
        boton.focus();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) cerrar();
    });
}

/* ───────── Globo de red (portada) ─────────
   Puntos en una esfera (espiral de Fibonacci) con conexiones que viajan
   entre nodos. Al llegar, cada conexión muestra un evento de la plataforma
   (agente de IA, seguridad, despliegue). Canvas 2D, se pausa fuera de pantalla. */

const EVENTOS = [
    'agent: pr review ✓',
    'sast: 0 critical',
    'deploy → prod',
    'model v3 → registry',
    'trivy: clean',
    'dora: elite',
    'ai triage: 12 → 2',
    'drift: none',
    'secrets: vaulted',
    'data quality ✓',
];

function globo() {
    const canvas = $<HTMLCanvasElement>('#globo');
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const hero = $('.hero');

    type V3 = [number, number, number];
    const N = 640;
    const ORO = Math.PI * (3 - Math.sqrt(5));
    const puntos: V3[] = [];
    for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        puntos.push([Math.cos(ORO * i) * r, y, Math.sin(ORO * i) * r]);
    }

    let colorTexto = '#000';
    let colorAcento = '#f60';
    let colorFondo = '#000';
    const leerColores = () => {
        const cs = getComputedStyle(raiz);
        colorFondo = cs.getPropertyValue('--fondo').trim() || colorFondo;
        colorTexto = cs.getPropertyValue('--texto').trim() || colorTexto;
        colorAcento = cs.getPropertyValue('--acento').trim() || colorAcento;
    };

    let ancho = 1,
        alto = 1,
        dpr = 1;
    const medir = () => {
        const r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        ancho = canvas.width = Math.max(1, Math.round(r.width * dpr));
        alto = canvas.height = Math.max(1, Math.round(r.height * dpr));
    };

    let giro = 0.6;
    const INCLINACION = 0.4;
    let extraX = 0,
        extraY = 0,
        objetivoX = 0,
        objetivoY = 0;

    const rotar = (p: V3): V3 => {
        const a = giro + extraY;
        const ca = Math.cos(a),
            sa = Math.sin(a);
        const x = p[0] * ca + p[2] * sa;
        const z1 = -p[0] * sa + p[2] * ca;
        const b = INCLINACION + extraX;
        const cb = Math.cos(b),
            sb = Math.sin(b);
        return [x, p[1] * cb - z1 * sb, p[1] * sb + z1 * cb];
    };

    interface Arco {
        a: V3;
        b: V3;
        d: number;
        dur: number;
        inicio: number;
        evento: string;
    }
    let arcos: Arco[] = [];
    let siguienteEvento = 0;
    const nuevoArco = (ahora: number) => {
        const a = puntos[(Math.random() * N) | 0];
        let b: V3, d: number;
        do {
            b = puntos[(Math.random() * N) | 0];
            d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
        } while (d < 0.5 || d > 1.9);
        const dur = 1500 + d * 900;
        // Solo algunas conexiones muestran un evento, para no saturar
        // Como mucho dos eventos a la vez, para no saturar
        const activos = arcos.filter((x) => x.evento).length;
        const evento = activos < 2 && Math.random() < 0.5 ? EVENTOS[siguienteEvento++ % EVENTOS.length] : '';
        arcos.push({ a, b, d, dur, inicio: ahora + Math.random() * 900, evento });
    };
    const slerp = (a: V3, b: V3, d: number, t: number): V3 => {
        const s = Math.sin(d);
        const k1 = Math.sin((1 - t) * d) / s;
        const k2 = Math.sin(t * d) / s;
        const alt = 1 + 0.16 * Math.sin(Math.PI * t) * d;
        return [(a[0] * k1 + b[0] * k2) * alt, (a[1] * k1 + b[1] * k2) * alt, (a[2] * k1 + b[2] * k2) * alt];
    };

    const COLA = 0.45; // largo de la estela
    const VIDA = 1.1; // tiempo extra tras llegar (para el evento)
    const ORBITA_INCL = -0.32;
    const circulo = (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
    };

    const dibujar = (ahora: number) => {
        ctx.clearRect(0, 0, ancho, alto);
        const cx = ancho / 2,
            cy = alto / 2;
        const R = Math.min(ancho, alto) * 0.36;

        // Órbita con un satélite
        const rx = R * 1.3,
            ry = R * 1.3 * 0.3;
        const co = Math.cos(ORBITA_INCL),
            so = Math.sin(ORBITA_INCL);
        const ang = ahora * 0.00035;
        const ex = rx * Math.cos(ang),
            ey = ry * Math.sin(ang);
        const sat = [cx + ex * co - ey * so, cy + ex * so + ey * co];
        const satDetras = Math.sin(ang) < 0;

        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.strokeStyle = colorTexto;
        ctx.lineWidth = dpr;
        ctx.setLineDash([2 * dpr, 7 * dpr]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, ORBITA_INCL, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        const satelite = () => {
            ctx.globalAlpha = satDetras ? 0.3 : 1;
            ctx.fillStyle = colorAcento;
            circulo(sat[0], sat[1], 3.2 * dpr);
            ctx.fill();
        };
        if (satDetras) satelite();

        // Nodos
        ctx.fillStyle = colorTexto;
        for (let i = 0; i < N; i++) {
            const q = rotar(puntos[i]);
            const prof = (q[2] + 1) / 2;
            ctx.globalAlpha = 0.07 + 0.68 * prof * prof;
            circulo(cx + q[0] * R, cy - q[1] * R, (0.55 + 1.05 * prof) * dpr);
            ctx.fill();
        }

        // Conexiones
        ctx.lineWidth = 1.4 * dpr;
        ctx.lineCap = 'round';
        ctx.font = `500 ${10.5 * dpr}px 'JetBrains Mono', ui-monospace, monospace`;
        ctx.textBaseline = 'middle';
        const PASOS = 26;
        for (const arco of arcos) {
            const p = (ahora - arco.inicio) / arco.dur;
            if (p <= 0) continue;
            ctx.strokeStyle = colorAcento;
            ctx.fillStyle = colorAcento;
            const cabeza = Math.min(p, 1);
            const cola = Math.min(1, Math.max(0, p - COLA));
            let prev: V3 | null = null;
            if (cabeza > cola) {
                for (let i = 0; i <= PASOS; i++) {
                    const t = cola + (cabeza - cola) * (i / PASOS);
                    const q = rotar(slerp(arco.a, arco.b, arco.d, t));
                    const pt: V3 = [cx + q[0] * R, cy - q[1] * R, q[2]];
                    if (prev) {
                        ctx.globalAlpha = (q[2] > -0.05 ? 0.95 : 0.18) * (i / PASOS);
                        ctx.beginPath();
                        ctx.moveTo(prev[0], prev[1]);
                        ctx.lineTo(pt[0], pt[1]);
                        ctx.stroke();
                    }
                    prev = pt;
                }
            }
            const qb = rotar(slerp(arco.a, arco.b, arco.d, 1));
            const fin: V3 = prev ?? [cx + qb[0] * R, cy - qb[1] * R, qb[2]];
            const delante = fin[2] > -0.05;
            if (p < 1) {
                ctx.globalAlpha = delante ? 1 : 0.25;
                circulo(fin[0], fin[1], 2.2 * dpr);
                ctx.fill();
            } else {
                // Pulso al llegar
                const k = (p - 1) / COLA;
                if (k < 1) {
                    ctx.globalAlpha = (1 - k) * (delante ? 0.9 : 0.2);
                    circulo(fin[0], fin[1], (2 + 12 * k) * dpr);
                    ctx.stroke();
                }
                // Evento de la plataforma junto al nodo de destino
                if (arco.evento && delante) {
                    const v = (p - 1) / VIDA;
                    const alfa = v < 0.15 ? v / 0.15 : 1 - Math.max(0, (v - 0.6) / 0.4);
                    const w = ctx.measureText(arco.evento).width + 12 * dpr;
                    // Si no cabe a la derecha del nodo, va a la izquierda
                    const x = fin[0] + 9 * dpr + w > ancho - 4 * dpr ? fin[0] - 9 * dpr - w : fin[0] + 9 * dpr;
                    const y = Math.max(11 * dpr, fin[1] - 9 * dpr);
                    ctx.globalAlpha = Math.max(0, alfa) * 0.92;
                    ctx.fillStyle = colorFondo;
                    ctx.beginPath();
                    ctx.roundRect(x, y - 9 * dpr, w, 18 * dpr, 4 * dpr);
                    ctx.fill();
                    ctx.strokeStyle = colorAcento;
                    ctx.lineWidth = dpr;
                    ctx.stroke();
                    ctx.lineWidth = 1.4 * dpr;
                    ctx.fillStyle = colorTexto;
                    ctx.fillText(arco.evento, x + 6 * dpr, y + 0.5 * dpr);
                }
            }
        }

        if (!satDetras) satelite();
        ctx.globalAlpha = 1;
    };

    let animando = false;
    let enPantalla = true;
    let ultimo = 0;
    const cuadro = (ahora: number) => {
        if (!animando) return;
        const dt = Math.min(64, ahora - ultimo);
        ultimo = ahora;
        giro += dt * 0.00011;
        extraX += (objetivoX - extraX) * 0.045;
        extraY += (objetivoY - extraY) * 0.045;
        arcos = arcos.filter((a) => (ahora - a.inicio) / a.dur < 1 + VIDA);
        while (arcos.length < 7) nuevoArco(ahora);
        dibujar(ahora);
        requestAnimationFrame(cuadro);
    };
    const arrancar = () => {
        if (animando || sinMovimiento || !enPantalla || document.hidden) return;
        animando = true;
        ultimo = performance.now();
        requestAnimationFrame(cuadro);
    };
    const parar = () => (animando = false);
    const redibujar = () => {
        if (!animando) dibujar(performance.now());
    };

    leerColores();
    medir();
    if (sinMovimiento) {
        // Fotograma fijo con conexiones a medio recorrido
        const ahora = performance.now();
        for (let i = 0; i < 6; i++) nuevoArco(ahora);
        arcos.forEach((a) => {
            a.inicio = ahora - 0.75 * a.dur;
            a.evento = '';
        });
        dibujar(ahora);
    } else arrancar();

    new MutationObserver(() => {
        leerColores();
        redibujar();
    }).observe(raiz, { attributes: true, attributeFilter: ['data-theme'] });
    new ResizeObserver(() => {
        medir();
        redibujar();
    }).observe(canvas);
    new IntersectionObserver((e) => {
        enPantalla = e[0].isIntersecting;
        enPantalla ? arrancar() : parar();
    }).observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? parar() : arrancar()));

    if (hero && conCursor) {
        hero.addEventListener('pointermove', (e) => {
            const r = hero.getBoundingClientRect();
            objetivoY = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
            objetivoX = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
        });
        hero.addEventListener('pointerleave', () => {
            objetivoX = 0;
            objetivoY = 0;
        });
    }
}

/* ───────── Pipeline de la portada ───────── */

function pipeline() {
    const filas = $$('#pipeline-pasos .paso');
    const estado = $('#pipeline-estado');
    const progreso = $('#pipeline-progreso');
    const run = $('#pipeline-run');
    if (!filas.length || !estado || !progreso || !run) return;
    const total = filas.length;

    const pintar = (actual: number) => {
        filas.forEach((li, i) => {
            li.classList.toggle('hecho', i < actual);
            li.classList.toggle('activo', i === actual);
        });
        const fin = actual >= total;
        estado.textContent = fin ? UI.pipeline.desplegado : actual < 0 ? UI.pipeline.enCola : UI.pipeline.ejecutando;
        estado.classList.toggle('ok', fin);
        progreso.style.transform = `scaleX(${Math.max(0, Math.min(1, actual / total))})`;
    };
    if (sinMovimiento) {
        pintar(total);
        return;
    }
    let actual = -1;
    let numero = 128;
    pintar(actual);
    const avanzar = () => {
        if (document.hidden) {
            setTimeout(avanzar, 1000);
            return;
        }
        actual++;
        if (actual > total) {
            actual = 0;
            run.textContent = 'run #' + ++numero;
        }
        pintar(actual);
        setTimeout(avanzar, actual >= total ? 3200 : 1150);
    };
    setTimeout(avanzar, 1900);
}

/* ───────── Botones magnéticos ───────── */

function magneticos() {
    if (sinMovimiento || !conCursor) return;
    $$('.boton').forEach((b) => {
        b.addEventListener('pointermove', (e) => {
            const r = b.getBoundingClientRect();
            b.style.setProperty('--bx', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'px');
            b.style.setProperty('--by', ((e.clientY - r.top) / r.height - 0.5) * 8 + 'px');
        });
        b.addEventListener('pointerleave', () => {
            b.style.setProperty('--bx', '0px');
            b.style.setProperty('--by', '0px');
        });
    });
}

/* ───────── Copiar el correo ───────── */

function copiarCorreo() {
    const boton = $('#copiar');
    const correo = boton?.dataset.correo;
    if (!boton || !correo) return;
    boton.addEventListener('click', () => {
        const copia = navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(correo) : Promise.reject();
        copia
            .then(
                () => {
                    boton.textContent = UI.copiado;
                    boton.classList.add('ok');
                },
                () => {
                    boton.textContent = UI.noCopiado;
                },
            )
            .then(() =>
                setTimeout(() => {
                    boton.textContent = UI.copiar;
                    boton.classList.remove('ok');
                }, 1800),
            );
    });
}

/* ───────── Inicio ───────── */

variables();
dividirLetras();
$$('[data-palabras]').forEach((t) => dividirPalabras(t, { n: 0 }));
prepararIluminado();
tema();
idioma();
menu();
rotarRoles();
descifrarAlPasar();
observarApariciones();
enlaceActivo();
alDesplazar();
focos();
globo();
pipeline();
magneticos();
copiarCorreo();

requestAnimationFrame(() => raiz.classList.add('lista'));
// Tras la entrada, las letras del nombre responden al cursor sin retardo
setTimeout(() => raiz.classList.add('intro-fin'), 2200);
