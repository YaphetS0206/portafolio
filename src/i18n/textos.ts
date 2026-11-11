/*
 * ─────────────────────────────────────────────────────────────
 *  TEXTOS DEL PORTAFOLIO (español e inglés)
 *  Todo el texto de la web se edita aquí. Cada bloque existe en
 *  los dos idiomas: si cambias uno, cambia también el otro.
 *
 *  Títulos con énfasis: [texto normal, texto en cursiva]
 * ─────────────────────────────────────────────────────────────
 */

export type Idioma = 'es' | 'en';
export const IDIOMAS: Idioma[] = ['es', 'en'];
export const RUTA: Record<Idioma, string> = { es: '/', en: '/en' };

/** Valor que puede ser igual en ambos idiomas o distinto en cada uno. */
export type Bilingue = string | Record<Idioma, string>;
export const tr = (v: Bilingue, idioma: Idioma) => (typeof v === 'string' ? v : v[idioma]);

export interface Hito {
    actual?: boolean;
    periodo: string;
    titulo: string;
    lugar: string;
    logros: string[];
}

export interface Textos {
    meta: { titulo: string; descripcion: string; locale: string };
    nav: { perfil: string; lab: string; experiencia: string; stack: string; formacion: string; contacto: string };
    ui: {
        saltar: string;
        menu: string;
        cerrar: string;
        claro: string;
        oscuro: string;
        aClaro: string;
        aOscuro: string;
        contactar: string;
        copiar: string;
        copiado: string;
        noCopiado: string;
        arriba: string;
        idioma: string;
        foto: string;
    };
    puesto: string;
    roles: string[];
    resumen: string;
    pipeline: { enCola: string; ejecutando: string; desplegado: string };
    perfil: {
        etiqueta: string;
        texto: string;
        datos: { etiqueta: string; valor: string }[];
        cifras: { numero: number; sufijo?: string; texto: string }[];
    };
    lab: {
        etiqueta: string;
        titulo: [string, string];
        intro: string;
        estados: Record<'produccion' | 'prototipo' | 'desarrollo' | 'laboratorio', string>;
        codigo: string;
        demo: string;
        privado: string;
        verTodo: string;
        vacio: { comando: string; texto: string };
    };
    experiencia: { etiqueta: string; titulo: [string, string]; items: Hito[] };
    stack: { etiqueta: string; titulo: [string, string] };
    formacion: {
        etiqueta: string;
        titulo: [string, string];
        items: { anio: string; titulo: string; emisor: string; enlace?: string }[];
    };
    contacto: { etiqueta: string; titulo: string; texto: string };
    error404: { titulo: [string, string]; volver: string };
}

export const TEXTOS: Record<Idioma, Textos> = {
    /* ═════════════════════════ ESPAÑOL ═════════════════════════ */
    es: {
        meta: {
            titulo: 'Jean Paul Andrade Delgadillo — Senior DevSecOps',
            descripcion:
                'Senior DevSecOps en Interbank. Innovación llevada a producción: CI/CD seguro, cloud, MLOps y agentes de IA en el ciclo de desarrollo.',
            locale: 'es_PE',
        },
        nav: { perfil: 'Perfil', lab: 'Lab', experiencia: 'Experiencia', stack: 'Stack', formacion: 'Formación', contacto: 'Contacto' },
        ui: {
            saltar: 'Saltar al contenido',
            menu: 'Menú',
            cerrar: 'Cerrar',
            claro: 'Claro',
            oscuro: 'Oscuro',
            aClaro: 'Cambiar a tema claro',
            aOscuro: 'Cambiar a tema oscuro',
            contactar: 'Contactar',
            copiar: 'Copiar',
            copiado: 'Copiado ✓',
            noCopiado: 'No se pudo copiar',
            arriba: 'Volver arriba ↑',
            idioma: 'Idioma',
            foto: 'Foto de Jean Paul Andrade Delgadillo',
        },
        puesto: 'Senior DevSecOps · Interbank',
        roles: ['Agentes de IA', 'DevSecOps', 'MLOps & DataOps', 'Cloud & SRE'],
        resumen: 'Convierto ideas nuevas en plataformas seguras, automatizadas y con IA.',
        pipeline: { enCola: 'en cola', ejecutando: 'ejecutando…', desplegado: 'desplegado ✓' },
        perfil: {
            etiqueta: 'Perfil',
            texto:
                'Ingeniero de Sistemas especializado en DevSecOps. Llevo la innovación a producción: plataformas CI/CD seguras, infraestructura cloud y agentes de IA que hacen el desarrollo más rápido y más seguro.',
            datos: [
                { etiqueta: 'Ubicación', valor: 'Lima, Perú' },
                { etiqueta: 'Enfoque', valor: 'IA aplicada al SDLC · Seguridad continua' },
                { etiqueta: 'Idiomas', valor: 'Español nativo · Inglés fluido (C2 escrito) · Francés B2 oral' },
            ],
            cifras: [
                { numero: 7, sufijo: '+', texto: 'años de experiencia' },
                { numero: 3, texto: 'países: Perú, Brasil y México' },
                { numero: 3, texto: 'nubes: GCP, AWS y Azure' },
                { numero: 100, texto: 'repositorios migrados a GitHub' },
            ],
        },
        lab: {
            etiqueta: 'Laboratorio',
            titulo: ['Prototipos y', 'experimentos'],
            intro: 'Ideas que pruebo antes de llevarlas a producción: IA aplicada a la seguridad, automatización e infraestructura.',
            estados: { produccion: 'En producción', prototipo: 'Prototipo', desarrollo: 'En desarrollo', laboratorio: 'Laboratorio' },
            codigo: 'Código',
            demo: 'Ver demo',
            privado: 'Repositorio privado',
            verTodo: 'Ver todo en GitHub',
            vacio: { comando: 'git init nuevo-experimento', texto: 'Próximamente. Aquí publicaré mis próximos prototipos.' },
        },
        experiencia: {
            etiqueta: 'Experiencia',
            titulo: ['Dónde he', 'trabajado'],
            items: [
                {
                    actual: true,
                    periodo: 'Jun 2026 — Actualidad',
                    titulo: 'Senior DevSecOps Engineer',
                    lugar: 'Interbank · Lima',
                    logros: [
                        'Diseño pipelines de CI/CD en GitHub Actions para 15 equipos de DataOps y pipelines de MLOps.',
                        'Lidero la integración de agentes de IA (GitHub Copilot y Claude) en el SDLC: revisión de pull requests y triaje de hallazgos SAST.',
                        'Migré 100 repositorios de Bitbucket a GitHub y medí la entrega con tableros de métricas DORA.',
                    ],
                },
                {
                    periodo: 'Feb 2025 — Dic 2025',
                    titulo: 'DevSecOps Engineer',
                    lugar: 'Consubanco · Ciudad de México',
                    logros: [
                        'Implementé pentesting continuo (CPT) dentro de pipelines y servicios.',
                        'Integré a los equipos de Machine Learning y datos con DevOps (MLOps y DataOps).',
                        'Estandaricé la observabilidad con métricas DORA y reduje costos de nube y de CI/CD.',
                    ],
                },
                {
                    periodo: 'Oct 2024 — Feb 2025',
                    titulo: 'Infrastructure Engineer',
                    lugar: 'Encora · São Paulo',
                    logros: [
                        'Diseñé e implementé la arquitectura de infraestructura en AWS como código.',
                        'Implementé una bóveda de secretos para sacar las credenciales de los archivos declarativos.',
                    ],
                },
                {
                    periodo: 'Ene 2023 — Oct 2024',
                    titulo: 'Site Reliability Engineer',
                    lugar: 'Encora para Scotiabank · Lima',
                    logros: [
                        'Integré análisis de seguridad (Checkmarx, SonarQube) y HashiCorp Vault en los pipelines.',
                        'Implementé Backstage como catálogo de servicios, APIs y métricas.',
                    ],
                },
                {
                    periodo: 'Oct 2022 — Oct 2023',
                    titulo: 'DevOps Engineer',
                    lugar: 'Encora para Alicorp · Lima',
                    logros: [
                        'Impulsé Trunk-Based Development como estándar y reduje costos en Azure.',
                        'Aprovisioné infraestructura con Terraform y Ansible.',
                    ],
                },
                {
                    periodo: 'Mar 2022 — Oct 2022',
                    titulo: 'Site Reliability Engineer',
                    lugar: '99minutos · Ciudad de México',
                    logros: [
                        'Lideré la adopción de Trunk-Based Development en 32 equipos de desarrollo.',
                        'Creé plantillas de pipelines adoptadas como estándar de CI/CD para todos los equipos.',
                    ],
                },
                {
                    periodo: 'Ago 2019 — Feb 2022',
                    titulo: 'DevOps Engineer',
                    lugar: 'Tata Consultancy Services · Lima',
                    logros: [
                        'Gestioné Jenkins para CI/CD en Azure y creé pipelines de pruebas automatizadas.',
                        'Desarrollé microservicios reactivos en Java y tableros de monitoreo de APIs.',
                    ],
                },
            ],
        },
        stack: { etiqueta: 'Stack', titulo: ['Con qué', 'trabajo'] },
        formacion: {
            etiqueta: 'Formación',
            titulo: ['Qué he', 'estudiado'],
            items: [
                { anio: 'En curso', titulo: 'Máster en Inteligencia Artificial', emisor: 'Universidad Internacional de Valencia' },
                { anio: '2024', titulo: 'Ingeniería de Sistemas e Informática', emisor: 'Universidad Tecnológica del Perú' },
                { anio: '2021', titulo: 'Inglés — nivel avanzado', emisor: 'Británico · Lima' },
            ],
        },
        contacto: {
            etiqueta: 'Contacto',
            titulo: '¿Construimos algo juntos?',
            texto: 'Escríbeme para proyectos, colaboraciones u oportunidades.',
        },
        error404: { titulo: ['Esta ruta', 'no existe'], volver: 'Volver al inicio' },
    },

    /* ═════════════════════════ ENGLISH ═════════════════════════ */
    en: {
        meta: {
            titulo: 'Jean Paul Andrade Delgadillo — Senior DevSecOps',
            descripcion:
                'Senior DevSecOps at Interbank. Innovation shipped to production: secure CI/CD, cloud, MLOps and AI agents in the software lifecycle.',
            locale: 'en_US',
        },
        nav: { perfil: 'Profile', lab: 'Lab', experiencia: 'Experience', stack: 'Stack', formacion: 'Education', contacto: 'Contact' },
        ui: {
            saltar: 'Skip to content',
            menu: 'Menu',
            cerrar: 'Close',
            claro: 'Light',
            oscuro: 'Dark',
            aClaro: 'Switch to light theme',
            aOscuro: 'Switch to dark theme',
            contactar: 'Get in touch',
            copiar: 'Copy',
            copiado: 'Copied ✓',
            noCopiado: 'Could not copy',
            arriba: 'Back to top ↑',
            idioma: 'Language',
            foto: 'Photo of Jean Paul Andrade Delgadillo',
        },
        puesto: 'Senior DevSecOps · Interbank',
        roles: ['AI agents', 'DevSecOps', 'MLOps & DataOps', 'Cloud & SRE'],
        resumen: 'I turn new ideas into secure, automated, AI-powered platforms.',
        pipeline: { enCola: 'queued', ejecutando: 'running…', desplegado: 'deployed ✓' },
        perfil: {
            etiqueta: 'Profile',
            texto:
                'Systems Engineer specialized in DevSecOps. I bring innovation to production: secure CI/CD platforms, cloud infrastructure and AI agents that make software delivery faster and safer.',
            datos: [
                { etiqueta: 'Location', valor: 'Lima, Peru' },
                { etiqueta: 'Focus', valor: 'AI in the SDLC · Continuous security' },
                { etiqueta: 'Languages', valor: 'Spanish native · English fluent (C2 writing) · French B2 speaking' },
            ],
            cifras: [
                { numero: 7, sufijo: '+', texto: 'years of experience' },
                { numero: 3, texto: 'countries: Peru, Brazil and Mexico' },
                { numero: 3, texto: 'clouds: GCP, AWS and Azure' },
                { numero: 100, texto: 'repositories migrated to GitHub' },
            ],
        },
        lab: {
            etiqueta: 'Lab',
            titulo: ['Prototypes &', 'experiments'],
            intro: 'Ideas I test before taking them to production: AI applied to security, automation and infrastructure.',
            estados: { produccion: 'Live', prototipo: 'Prototype', desarrollo: 'In progress', laboratorio: 'Lab' },
            codigo: 'Code',
            demo: 'Live demo',
            privado: 'Private repository',
            verTodo: 'See everything on GitHub',
            vacio: { comando: 'git init new-experiment', texto: 'Coming soon. My next prototypes will be published here.' },
        },
        experiencia: {
            etiqueta: 'Experience',
            titulo: ['Where I have', 'worked'],
            items: [
                {
                    actual: true,
                    periodo: 'Jun 2026 — Present',
                    titulo: 'Senior DevSecOps Engineer',
                    lugar: 'Interbank · Lima',
                    logros: [
                        'Design GitHub Actions CI/CD pipelines for 15 DataOps teams, plus MLOps pipelines.',
                        'Lead the integration of AI agents (GitHub Copilot and Claude) into the SDLC: pull request review and SAST triage.',
                        'Migrated 100 repositories from Bitbucket to GitHub and track delivery with DORA dashboards.',
                    ],
                },
                {
                    periodo: 'Feb 2025 — Dec 2025',
                    titulo: 'DevSecOps Engineer',
                    lugar: 'Consubanco · Mexico City',
                    logros: [
                        'Embedded continuous penetration testing (CPT) into pipelines and services.',
                        'Brought Machine Learning and data teams into DevOps (MLOps and DataOps).',
                        'Standardized observability around DORA metrics and reduced cloud and CI/CD costs.',
                    ],
                },
                {
                    periodo: 'Oct 2024 — Feb 2025',
                    titulo: 'Infrastructure Engineer',
                    lugar: 'Encora · São Paulo',
                    logros: [
                        'Designed and built the team’s AWS infrastructure as code.',
                        'Implemented a secrets vault to keep credentials out of declarative files.',
                    ],
                },
                {
                    periodo: 'Jan 2023 — Oct 2024',
                    titulo: 'Site Reliability Engineer',
                    lugar: 'Encora for Scotiabank · Lima',
                    logros: [
                        'Integrated security scanning (Checkmarx, SonarQube) and HashiCorp Vault into pipelines.',
                        'Rolled out Backstage as a catalog of services, APIs and metrics.',
                    ],
                },
                {
                    periodo: 'Oct 2022 — Oct 2023',
                    titulo: 'DevOps Engineer',
                    lugar: 'Encora for Alicorp · Lima',
                    logros: [
                        'Promoted Trunk-Based Development as the standard and reduced Azure costs.',
                        'Provisioned infrastructure with Terraform and Ansible.',
                    ],
                },
                {
                    periodo: 'Mar 2022 — Oct 2022',
                    titulo: 'Site Reliability Engineer',
                    lugar: '99minutos · Mexico City',
                    logros: [
                        'Led the rollout of Trunk-Based Development across 32 development teams.',
                        'Built pipeline templates adopted as the CI/CD standard for every team.',
                    ],
                },
                {
                    periodo: 'Aug 2019 — Feb 2022',
                    titulo: 'DevOps Engineer',
                    lugar: 'Tata Consultancy Services · Lima',
                    logros: [
                        'Managed Jenkins CI/CD to Azure and built automated testing pipelines.',
                        'Developed reactive Java microservices and API monitoring dashboards.',
                    ],
                },
            ],
        },
        stack: { etiqueta: 'Stack', titulo: ['What I', 'work with'] },
        formacion: {
            etiqueta: 'Education',
            titulo: ['What I have', 'studied'],
            items: [
                { anio: 'In progress', titulo: 'Master’s in Artificial Intelligence', emisor: 'Universidad Internacional de Valencia' },
                { anio: '2024', titulo: 'B.Sc. Systems and Computer Engineering', emisor: 'Universidad Tecnológica del Perú' },
                { anio: '2021', titulo: 'English — advanced level', emisor: 'Británico · Lima' },
            ],
        },
        contacto: {
            etiqueta: 'Contact',
            titulo: 'Shall we build something together?',
            texto: 'Write to me about projects, collaborations or opportunities.',
        },
        error404: { titulo: ['This page', 'does not exist'], volver: 'Back to home' },
    },
};
