(function () {
    'use strict';

    const C = typeof CONTENIDO !== 'undefined' ? CONTENIDO : {};
    const I = typeof ICONOS !== 'undefined' ? ICONOS : {};
    const raiz = document.documentElement;
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel) => document.querySelector(sel);
    const SVG = 'http://www.w3.org/2000/svg';

    /* ───────── Utilidades ───────── */

    function el(etiqueta, clase, texto) {
        const nodo = document.createElement(etiqueta);
        if (clase) nodo.className = clase;
        if (texto !== undefined && texto !== null) nodo.textContent = texto;
        return nodo;
    }

    function enlaceExterno(a, url) {
        a.href = url;
        if (/^https?:/i.test(url)) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
    }

    // Luminancia aproximada de un color #rrggbb (0 = negro, 1 = blanco)
    function luminancia(hex) {
        const n = parseInt(hex.slice(1), 16);
        return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
    }

    // Devuelve un <svg> del icono, o null si no existe
    function icono(nombre) {
        const dato = I[nombre];
        if (!dato) return null;
        const svg = document.createElementNS(SVG, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('class', 'icono');
        const trazo = document.createElementNS(SVG, 'path');
        trazo.setAttribute('d', dato.d);
        svg.appendChild(trazo);
        return svg;
    }

    function iniciales(nombre) {
        const partes = nombre.split(/\s+/);
        return (partes.length > 1 ? partes[0][0] + partes[1][0] : nombre.slice(0, 2)).toUpperCase();
    }

    /* ───────── Render del contenido ───────── */

    function render() {
        $('#anio').textContent = new Date().getFullYear();
        if (C.puesto) $('#puesto').textContent = C.puesto;
        $('#hero-resumen').textContent = C.resumen || '';

        const contacto = C.contacto || {};
        const redes = (contacto.redes || []).filter((r) => r.url);

        // Botones de la portada
        const acciones = $('#hero-acciones');
        redes.forEach((r) => {
            const a = el('a', 'boton');
            enlaceExterno(a, r.url);
            const ic = icono(r.icono);
            if (ic) a.appendChild(ic);
            a.appendChild(document.createTextNode(r.nombre));
            acciones.appendChild(a);
        });

        // Cinta (duplicada para que el bucle sea continuo)
        const cinta = $('#cinta');
        for (let copia = 0; copia < 2; copia++) {
            (C.cinta || []).forEach((t) => {
                cinta.appendChild(el('span', 'cinta-item', t));
                cinta.appendChild(el('span', 'cinta-sep', '/'));
            });
        }

        // Perfil
        const sobre = $('#sobre-texto');
        (C.sobreMi || []).forEach((p) => sobre.appendChild(el('p', 'iluminar', p)));

        const datos = $('#datos');
        (C.datos || []).forEach((d) => {
            const fila = el('div', 'dato');
            fila.setAttribute('data-rev', '');
            fila.appendChild(el('dt', null, d.etiqueta));
            fila.appendChild(el('dd', null, d.valor));
            datos.appendChild(fila);
        });

        const cifras = $('#cifras');
        (C.cifras || []).forEach((c, i) => {
            const caja = el('div', 'cifra');
            caja.setAttribute('data-rev', '');
            caja.style.setProperty('--d', i * 90 + 'ms');
            const num = el('p', 'cifra-num');
            const valor = el('span', 'contar', String(c.numero));
            valor.dataset.hasta = c.numero;
            num.appendChild(valor);
            if (c.sufijo) num.appendChild(el('span', 'cifra-sufijo', c.sufijo));
            caja.appendChild(num);
            caja.appendChild(el('p', 'cifra-texto', c.texto));
            cifras.appendChild(caja);
        });

        // Stack
        const stack = $('#lista-stack');
        (C.stack || []).forEach((grupo, g) => {
            const fila = el('div', 'grupo');
            fila.setAttribute('data-rev', '');
            const cab = el('div', 'grupo-cab');
            cab.appendChild(el('span', 'grupo-num', String(g + 1).padStart(2, '0')));
            cab.appendChild(el('h3', 'grupo-titulo', grupo.titulo));
            fila.appendChild(cab);

            const lista = el('ul', 'tecnos');
            (grupo.items || []).forEach((t, i) => {
                const li = el('li', 'tecno');
                li.style.setProperty('--i', i);
                const dato = I[t.icono];
                if (dato && dato.c) {
                    const l = luminancia(dato.c);
                    // Los colores de marca casi negros o casi blancos no se verían en uno de los temas
                    if (l > 0.22 && l < 0.9) li.style.setProperty('--marca', dato.c);
                }
                const ic = icono(t.icono);
                li.appendChild(ic || el('span', 'icono icono-texto', iniciales(t.nombre)));
                li.appendChild(el('span', 'tecno-nombre', t.nombre));
                lista.appendChild(li);
            });
            fila.appendChild(lista);
            stack.appendChild(fila);
        });

        // Experiencia
        const exp = $('#lista-experiencia');
        (C.experiencia || []).forEach((t) => {
            const li = el('li', 'hito' + (t.actual ? ' hito-actual' : ''));
            li.setAttribute('data-rev', '');
            li.appendChild(el('span', 'hito-periodo', t.periodo));
            const cuerpo = el('div', 'hito-cuerpo');
            cuerpo.appendChild(el('h3', null, t.titulo));
            cuerpo.appendChild(el('p', 'hito-lugar', t.lugar));
            if (t.logros && t.logros.length) {
                const ul = el('ul', 'hito-logros');
                t.logros.forEach((l) => ul.appendChild(el('li', null, l)));
                cuerpo.appendChild(ul);
            }
            li.appendChild(cuerpo);
            exp.appendChild(li);
        });

        // Formación
        const form = $('#lista-formacion');
        (C.formacion || []).forEach((c) => {
            const li = el('li', 'cert');
            li.setAttribute('data-rev', '');
            const cont = el(c.enlace ? 'a' : 'div', 'cert-fila');
            if (c.enlace) enlaceExterno(cont, c.enlace);
            cont.appendChild(el('span', 'cert-anio', c.anio));
            cont.appendChild(el('span', 'cert-titulo', c.titulo));
            cont.appendChild(el('span', 'cert-emisor', c.emisor));
            li.appendChild(cont);
            form.appendChild(li);
        });

        // Contacto
        const correo = $('#contacto-correo');
        if (contacto.correo) {
            correo.textContent = contacto.correo;
            correo.href = 'mailto:' + contacto.correo;
        } else {
            correo.parentElement.remove();
        }
        const listaRedes = $('#redes');
        redes.forEach((r) => {
            const li = el('li');
            li.setAttribute('data-rev', '');
            const a = el('a', 'boton');
            enlaceExterno(a, r.url);
            const ic = icono(r.icono);
            if (ic) a.appendChild(ic);
            a.appendChild(document.createTextNode(r.nombre + ' ↗'));
            li.appendChild(a);
            listaRedes.appendChild(li);
        });
    }

    /* ───────── Texto: división en letras y palabras ───────── */

    function dividirLetras() {
        let n = 0;
        document.querySelectorAll('.letras').forEach((cont) => {
            const texto = cont.textContent;
            cont.textContent = '';
            for (const ch of texto) {
                const s = el('span', 'letra', ch === ' ' ? ' ' : ch);
                s.style.setProperty('--i', n++);
                cont.appendChild(s);
            }
        });
    }

    function dividirPalabras(nodo, contador) {
        Array.from(nodo.childNodes).forEach((hijo) => {
            if (hijo.nodeType === Node.TEXT_NODE) {
                const frag = document.createDocumentFragment();
                hijo.textContent.split(/(\s+)/).forEach((trozo) => {
                    if (!trozo) return;
                    if (/^\s+$/.test(trozo)) {
                        frag.appendChild(document.createTextNode(' '));
                        return;
                    }
                    const mascara = el('span', 'palabra');
                    const interior = el('span', null, trozo);
                    interior.style.setProperty('--i', contador.n++);
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
        document.querySelectorAll('.iluminar').forEach((p) => {
            const palabras = p.textContent.trim().split(/\s+/);
            p.textContent = '';
            palabras.forEach((w, i) => {
                p.appendChild(el('span', 'luz', w));
                if (i < palabras.length - 1) p.appendChild(document.createTextNode(' '));
            });
        });
    }

    /* ───────── Efecto de descifrado ───────── */

    const GLIFOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_<>';

    function descifrar(nodo, texto, duracion) {
        if (sinMovimiento) { nodo.textContent = texto; return; }
        cancelAnimationFrame(nodo._raf);
        const inicio = performance.now();
        const dur = duracion || 600;
        function paso(ahora) {
            const p = Math.min((ahora - inicio) / dur, 1);
            const fijos = Math.floor(p * texto.length);
            let salida = texto.slice(0, fijos);
            for (let i = fijos; i < texto.length; i++) {
                salida += texto[i] === ' ' ? ' ' : GLIFOS[(Math.random() * GLIFOS.length) | 0];
            }
            nodo.textContent = salida;
            if (p < 1) nodo._raf = requestAnimationFrame(paso);
        }
        nodo._raf = requestAnimationFrame(paso);
    }

    function rotarRoles() {
        const nodo = $('#rol');
        const roles = C.roles || [];
        if (!nodo || !roles.length) return;
        let i = 0;
        nodo.textContent = roles[0];
        if (roles.length < 2 || sinMovimiento) return;
        setInterval(() => {
            if (document.hidden) return;
            i = (i + 1) % roles.length;
            descifrar(nodo, roles[i], 700);
        }, 2600);
    }

    function descifrarAlPasar() {
        document.querySelectorAll('[data-scramble]').forEach((a) => {
            const original = a.textContent;
            a.addEventListener('mouseenter', () => descifrar(a, original, 350));
        });
    }

    /* ───────── Cifras que cuentan ───────── */

    function contar(nodo) {
        const hasta = Number(nodo.dataset.hasta) || 0;
        if (sinMovimiento) { nodo.textContent = hasta; return; }
        const inicio = performance.now();
        const dur = 1100;
        function paso(ahora) {
            const p = Math.min((ahora - inicio) / dur, 1);
            nodo.textContent = Math.round((1 - Math.pow(1 - p, 3)) * hasta);
            if (p < 1) requestAnimationFrame(paso);
        }
        nodo.textContent = '0';
        requestAnimationFrame(paso);
    }

    /* ───────── Aparición al hacer scroll ───────── */

    function observarApariciones() {
        const objetivos = document.querySelectorAll('[data-rev], [data-palabras]');
        function mostrar(o) {
            o.classList.add('visible');
            o.querySelectorAll('.contar').forEach(contar);
        }
        if (!('IntersectionObserver' in window) || sinMovimiento) {
            objetivos.forEach(mostrar);
            return;
        }
        const obs = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => {
                if (e.isIntersecting) {
                    mostrar(e.target);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        objetivos.forEach((o) => obs.observe(o));
    }

    function enlaceActivo() {
        if (!('IntersectionObserver' in window)) return;
        const enlaces = new Map();
        document.querySelectorAll('.nav a').forEach((a) => enlaces.set(a.getAttribute('href').slice(1), a));
        const obs = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => {
                if (!e.isIntersecting) return;
                enlaces.forEach((a) => { a.classList.remove('activo'); a.removeAttribute('aria-current'); });
                const a = enlaces.get(e.target.id);
                if (a) { a.classList.add('activo'); a.setAttribute('aria-current', 'location'); }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach((s) => obs.observe(s));
    }

    /* ───────── Scroll: progreso, cabecera, texto iluminado y línea de tiempo ───────── */

    function alDesplazar() {
        const barra = $('.progreso');
        const cabecera = $('.cabecera');
        const tiempo = $('.tiempo');
        const parrafos = Array.from(document.querySelectorAll('.iluminar'));
        let ultimo = window.scrollY;
        let pendiente = false;

        function actualizar() {
            pendiente = false;
            const y = window.scrollY;
            const vh = window.innerHeight;
            const alto = document.documentElement.scrollHeight - vh;
            barra.style.transform = 'scaleX(' + (alto > 0 ? y / alto : 0) + ')';

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
                tiempo.style.setProperty('--avance', Math.max(0, Math.min(1, avance)));
            }
        }

        window.addEventListener('scroll', () => {
            if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
        }, { passive: true });
        window.addEventListener('resize', actualizar);
        actualizar();
    }

    /* ───────── Foco de luz que sigue al cursor en la portada ───────── */

    function focoPortada() {
        const hero = $('.hero');
        const fondo = $('.hero-fondo');
        if (!hero || !fondo || sinMovimiento || !window.matchMedia('(hover: hover)').matches) return;
        hero.addEventListener('pointermove', (e) => {
            const r = hero.getBoundingClientRect();
            fondo.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
            fondo.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
        });
    }

    /* ───────── Tema y menú ───────── */

    function tema() {
        const boton = $('#tema');
        const texto = $('#tema-texto');
        function pintar() {
            const oscuro = raiz.getAttribute('data-theme') === 'dark';
            texto.textContent = oscuro ? 'Claro' : 'Oscuro';
            boton.setAttribute('aria-label', oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
        }
        function aplicar(nuevo) {
            raiz.setAttribute('data-theme', nuevo);
            const meta = $('#meta-tema');
            if (meta) meta.setAttribute('content', nuevo === 'dark' ? '#0a0a0b' : '#f3f2ee');
            try { localStorage.setItem('tema', nuevo); } catch (e) {}
            pintar();
        }
        boton.addEventListener('click', () => {
            const nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            // Revelado circular desde el botón (View Transitions API); sin soporte, cambio directo
            if (!document.startViewTransition || sinMovimiento) { aplicar(nuevo); return; }
            const r = boton.getBoundingClientRect();
            raiz.style.setProperty('--tx', r.left + r.width / 2 + 'px');
            raiz.style.setProperty('--ty', r.top + r.height / 2 + 'px');
            raiz.classList.add('cambiando-tema');
            const fin = () => raiz.classList.remove('cambiando-tema');
            document.startViewTransition(() => aplicar(nuevo)).finished.then(fin, fin);
        });
        pintar();
    }

    function menu() {
        const boton = $('#menu-btn');
        function cerrar() {
            raiz.classList.remove('menu-abierto');
            boton.setAttribute('aria-expanded', 'false');
            boton.textContent = 'Menú';
        }
        boton.addEventListener('click', () => {
            const abierto = raiz.classList.toggle('menu-abierto');
            boton.setAttribute('aria-expanded', String(abierto));
            boton.textContent = abierto ? 'Cerrar' : 'Menú';
            if (abierto) {
                const primero = document.querySelector('.nav a');
                if (primero) primero.focus();
            }
        });
        document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', cerrar));
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape' || !raiz.classList.contains('menu-abierto')) return;
            cerrar();
            boton.focus();
        });
        window.addEventListener('resize', () => { if (window.innerWidth > 900) cerrar(); });
    }

    /* ───────── Globo de red animado (portada) ─────────
       Puntos repartidos en una esfera (espiral de Fibonacci) que giran,
       con arcos que viajan entre nodos como conexiones de red. Canvas 2D,
       sin dependencias; se pausa fuera de pantalla y con la pestaña oculta. */

    function globo() {
        const canvas = $('#globo');
        if (!canvas || !canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        const hero = $('.hero');

        const N = 640;
        const ORO = Math.PI * (3 - Math.sqrt(5));
        const puntos = [];
        for (let i = 0; i < N; i++) {
            const y = 1 - (i / (N - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            puntos.push([Math.cos(ORO * i) * r, y, Math.sin(ORO * i) * r]);
        }

        let colorTexto = '#000';
        let colorAcento = '#f60';
        function leerColores() {
            const cs = getComputedStyle(raiz);
            colorTexto = cs.getPropertyValue('--texto').trim() || colorTexto;
            colorAcento = cs.getPropertyValue('--acento').trim() || colorAcento;
        }

        let ancho = 1;
        let alto = 1;
        let dpr = 1;
        function medir() {
            const r = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            ancho = Math.max(1, Math.round(r.width * dpr));
            alto = Math.max(1, Math.round(r.height * dpr));
            canvas.width = ancho;
            canvas.height = alto;
        }

        // Rotación: giro continuo en Y + inclinación fija en X + desvío suave por el cursor
        let giro = 0.6;
        const INCLINACION = 0.4;
        let extraX = 0, extraY = 0, objetivoX = 0, objetivoY = 0;

        function rotar(p) {
            const a = giro + extraY;
            const ca = Math.cos(a), sa = Math.sin(a);
            const x = p[0] * ca + p[2] * sa;
            const z1 = -p[0] * sa + p[2] * ca;
            const b = INCLINACION + extraX;
            const cb = Math.cos(b), sb = Math.sin(b);
            return [x, p[1] * cb - z1 * sb, p[1] * sb + z1 * cb];
        }

        // Arcos: interpolación esférica entre dos nodos, elevada sobre la superficie
        let arcos = [];
        function nuevoArco(ahora, desfase) {
            const a = puntos[(Math.random() * N) | 0];
            let b, d;
            do {
                b = puntos[(Math.random() * N) | 0];
                d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
            } while (d < 0.5 || d > 1.9);
            const dur = 1500 + d * 900;
            arcos.push({ a, b, d, dur, inicio: ahora - (desfase || 0) * dur + Math.random() * 900 });
        }
        function slerp(a, b, d, t) {
            const s = Math.sin(d);
            const k1 = Math.sin((1 - t) * d) / s;
            const k2 = Math.sin(t * d) / s;
            const alt = 1 + 0.16 * Math.sin(Math.PI * t) * d;
            return [(a[0] * k1 + b[0] * k2) * alt, (a[1] * k1 + b[1] * k2) * alt, (a[2] * k1 + b[2] * k2) * alt];
        }

        const COLA = 0.45;
        const ORBITA_INCL = -0.32;

        function circulo(x, y, r) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
        }

        function dibujar(ahora) {
            ctx.clearRect(0, 0, ancho, alto);
            const cx = ancho / 2;
            const cy = alto / 2;
            const R = Math.min(ancho, alto) * 0.36;

            // Órbita con un satélite
            const rx = R * 1.3, ry = R * 1.3 * 0.3;
            const co = Math.cos(ORBITA_INCL), so = Math.sin(ORBITA_INCL);
            const ang = ahora * 0.00035;
            const ex = rx * Math.cos(ang), ey = ry * Math.sin(ang);
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

            function satelite() {
                ctx.globalAlpha = satDetras ? 0.3 : 1;
                ctx.fillStyle = colorAcento;
                circulo(sat[0], sat[1], 3.2 * dpr);
                ctx.fill();
            }
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
            ctx.strokeStyle = colorAcento;
            ctx.fillStyle = colorAcento;
            ctx.lineWidth = 1.4 * dpr;
            ctx.lineCap = 'round';
            const PASOS = 26;
            for (const arco of arcos) {
                const p = (ahora - arco.inicio) / arco.dur;
                if (p <= 0) continue;
                const cabeza = Math.min(p, 1);
                const cola = Math.max(0, p - COLA);
                let prev = null;
                for (let i = 0; i <= PASOS; i++) {
                    const t = cola + (cabeza - cola) * (i / PASOS);
                    const q = rotar(slerp(arco.a, arco.b, arco.d, t));
                    const pt = [cx + q[0] * R, cy - q[1] * R, q[2]];
                    if (prev) {
                        ctx.globalAlpha = (q[2] > -0.05 ? 0.95 : 0.18) * (i / PASOS);
                        ctx.beginPath();
                        ctx.moveTo(prev[0], prev[1]);
                        ctx.lineTo(pt[0], pt[1]);
                        ctx.stroke();
                    }
                    prev = pt;
                }
                const delante = prev[2] > -0.05;
                if (p < 1) {
                    ctx.globalAlpha = delante ? 1 : 0.25;
                    circulo(prev[0], prev[1], 2.2 * dpr);
                    ctx.fill();
                } else {
                    // Pulso al llegar al destino
                    const k = (p - 1) / COLA;
                    ctx.globalAlpha = (1 - k) * (delante ? 0.9 : 0.2);
                    circulo(prev[0], prev[1], (2 + 12 * k) * dpr);
                    ctx.stroke();
                }
            }

            if (!satDetras) satelite();
            ctx.globalAlpha = 1;
        }

        let animando = false;
        let enPantalla = true;
        let ultimo = 0;

        function cuadro(ahora) {
            if (!animando) return;
            const dt = Math.min(64, ahora - ultimo);
            ultimo = ahora;
            giro += dt * 0.00011;
            extraX += (objetivoX - extraX) * 0.045;
            extraY += (objetivoY - extraY) * 0.045;
            arcos = arcos.filter((a) => (ahora - a.inicio) / a.dur < 1 + COLA);
            while (arcos.length < 7) nuevoArco(ahora);
            dibujar(ahora);
            requestAnimationFrame(cuadro);
        }
        function arrancar() {
            if (animando || sinMovimiento || !enPantalla || document.hidden) return;
            animando = true;
            ultimo = performance.now();
            requestAnimationFrame(cuadro);
        }
        function parar() { animando = false; }
        function redibujar() { if (!animando) dibujar(performance.now()); }

        leerColores();
        medir();
        if (sinMovimiento) {
            // Fotograma fijo: conexiones a medio recorrido
            const ahora = performance.now();
            for (let i = 0; i < 6; i++) nuevoArco(ahora, 0.75);
            arcos.forEach((a) => { a.inicio = ahora - 0.75 * a.dur; });
            dibujar(ahora);
        } else {
            arrancar();
        }

        new MutationObserver(() => { leerColores(); redibujar(); })
            .observe(raiz, { attributes: true, attributeFilter: ['data-theme'] });

        if ('ResizeObserver' in window) {
            new ResizeObserver(() => { medir(); redibujar(); }).observe(canvas);
        } else {
            window.addEventListener('resize', () => { medir(); redibujar(); });
        }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entradas) => {
                enPantalla = entradas[0].isIntersecting;
                enPantalla ? arrancar() : parar();
            }).observe(canvas);
        }
        document.addEventListener('visibilitychange', () => (document.hidden ? parar() : arrancar()));

        if (hero && window.matchMedia('(hover: hover)').matches) {
            hero.addEventListener('pointermove', (e) => {
                const r = hero.getBoundingClientRect();
                objetivoY = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
                objetivoX = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
            });
            hero.addEventListener('pointerleave', () => { objetivoX = 0; objetivoY = 0; });
        }
    }

    function foto() {
        const fig = $('#foto');
        const img = $('#foto-img');
        if (!C.foto || !fig || !img) return;
        img.alt = 'Foto de Jean Paul Andrade Delgadillo';
        img.addEventListener('load', () => {
            fig.hidden = false;
            $('#hero-visual').classList.add('con-foto');
        }, { once: true });
        img.src = C.foto;
    }

    /* ───────── Pipeline animado de la portada ───────── */

    function pipeline() {
        const lista = $('#pipeline-pasos');
        if (!lista) return;
        const pasos = [
            { nombre: 'build', tiempo: '12s' },
            { nombre: 'test', tiempo: '34s' },
            { nombre: 'sast + dast', tiempo: '48s' },
            { nombre: 'deploy → prod', tiempo: '21s' },
            { nombre: 'monitor', tiempo: 'ok' },
        ];
        const estado = $('#pipeline-estado');
        const progreso = $('#pipeline-progreso');
        const run = $('#pipeline-run');
        const filas = pasos.map((p) => {
            const li = el('li', 'paso');
            li.appendChild(el('span', 'paso-marca'));
            li.appendChild(el('span', 'paso-nombre', p.nombre));
            li.appendChild(el('span', 'paso-tiempo', p.tiempo));
            lista.appendChild(li);
            return li;
        });

        function pintar(actual) {
            // actual = índice del paso en ejecución; pasos.length = todo en verde
            filas.forEach((li, i) => {
                li.classList.toggle('hecho', i < actual);
                li.classList.toggle('activo', i === actual);
            });
            const fin = actual >= pasos.length;
            estado.textContent = fin ? 'desplegado ✓' : actual < 0 ? 'en cola' : 'ejecutando…';
            estado.classList.toggle('ok', fin);
            progreso.style.transform = 'scaleX(' + Math.max(0, Math.min(1, actual / pasos.length)) + ')';
        }

        if (sinMovimiento) { pintar(pasos.length); return; }

        let actual = -1;
        let numero = 128;
        pintar(actual);
        function avanzar() {
            if (document.hidden) { setTimeout(avanzar, 1000); return; }
            actual++;
            if (actual > pasos.length) {
                actual = 0;
                numero++;
                run.textContent = 'run #' + numero;
            }
            pintar(actual);
            setTimeout(avanzar, actual >= pasos.length ? 3200 : 1150);
        }
        setTimeout(avanzar, 1900);
    }

    /* ───────── Botones magnéticos ───────── */

    function magneticos() {
        if (sinMovimiento || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        document.querySelectorAll('.boton').forEach((b) => {
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
        const correo = (C.contacto || {}).correo;
        if (!boton || !correo) return;
        function copiar() {
            if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(correo);
            return new Promise((ok, mal) => {
                const t = el('textarea');
                t.value = correo;
                t.setAttribute('readonly', '');
                t.style.cssText = 'position:fixed;opacity:0';
                document.body.appendChild(t);
                t.select();
                const hecho = document.execCommand('copy');
                t.remove();
                hecho ? ok() : mal();
            });
        }
        boton.addEventListener('click', () => {
            copiar().then(
                () => { boton.textContent = 'Copiado ✓'; boton.classList.add('ok'); },
                () => { boton.textContent = 'No se pudo copiar'; }
            ).then(() => setTimeout(() => { boton.textContent = 'Copiar'; boton.classList.remove('ok'); }, 1800));
        });
    }

    /* ───────── Inicio ───────── */

    render();
    dividirLetras();
    document.querySelectorAll('[data-palabras]').forEach((t) => dividirPalabras(t, { n: 0 }));
    prepararIluminado();
    tema();
    menu();
    rotarRoles();
    descifrarAlPasar();
    observarApariciones();
    enlaceActivo();
    alDesplazar();
    focoPortada();
    globo();
    foto();
    pipeline();
    magneticos();
    copiarCorreo();

    requestAnimationFrame(() => raiz.classList.add('lista'));
    // Tras la entrada, las letras del nombre responden al cursor sin el retardo inicial
    setTimeout(() => raiz.classList.add('intro-fin'), 2200);
})();
