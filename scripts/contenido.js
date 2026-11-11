/*
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO DEL PORTAFOLIO
 *  Todo el texto de la web se edita aquí. No hace falta tocar
 *  el HTML ni el CSS.
 *
 *  `icono` es el nombre de un icono de scripts/iconos.js.
 *  Si una tecnología no tiene icono, se muestran sus iniciales.
 * ─────────────────────────────────────────────────────────────
 */
const CONTENIDO = {

    // Tu foto en el centro de la animación de la portada.
    // Guárdala en img/foto.jpg (cuadrada, mín. 800×800) y escribe: foto: 'img/foto.jpg'
    // Si lo dejas vacío, se muestra solo la animación.
    foto: 'img/foto.jpg',

    // Línea pequeña sobre tu nombre
    puesto: 'Senior DevSecOps · Interbank',

    // Palabras que rotan bajo tu nombre
    roles: ['DevSecOps', 'MLOps & DataOps', 'Cloud & SRE', 'Agentes de IA'],

    // Una sola frase: qué haces
    resumen: 'Automatizo, aseguro y despliego software en la nube.',

    // Palabras de la cinta animada
    cinta: ['Automatización', 'Seguridad', 'Cloud', 'CI/CD', 'Observabilidad', 'MLOps', 'Inteligencia Artificial'],

    // Perfil: un párrafo corto (se ilumina al hacer scroll)
    sobreMi: [
        'Ingeniero de Sistemas especializado en DevSecOps. Construyo plataformas CI/CD seguras e infraestructura cloud para banca, logística y consumo masivo, y hoy lidero la adopción de agentes de IA en el ciclo de desarrollo.',
    ],

    // Cifras clave (se animan al aparecer)
    cifras: [
        { numero: 7, sufijo: '+', texto: 'años de experiencia' },
        { numero: 3, sufijo: '', texto: 'países: Perú, Brasil y México' },
        { numero: 3, sufijo: '', texto: 'nubes: GCP, AWS y Azure' },
        { numero: 3, sufijo: '', texto: 'bancos: Interbank, Consubanco y Scotiabank' },
    ],

    datos: [
        { etiqueta: 'Ubicación', valor: 'Lima, Perú' },
        { etiqueta: 'Idiomas', valor: 'Español nativo · Inglés fluido (C2 escrito) · Francés B2 oral' },
    ],

    stack: [
        {
            titulo: 'Lenguajes',
            items: [
                { nombre: 'Python', icono: 'python' },
                { nombre: 'Java', icono: 'openjdk' },
                { nombre: 'Go', icono: 'go' },
                { nombre: 'JavaScript', icono: 'javascript' },
                { nombre: 'Bash', icono: 'gnubash' },
                { nombre: 'Groovy', icono: 'apachegroovy' },
                { nombre: 'PowerShell' },
                { nombre: 'SQL' },
            ],
        },
        {
            titulo: 'Cloud e infraestructura',
            items: [
                { nombre: 'Google Cloud', icono: 'googlecloud' },
                { nombre: 'AWS', icono: 'amazonaws' },
                { nombre: 'Azure', icono: 'microsoftazure' },
                { nombre: 'Terraform', icono: 'terraform' },
                { nombre: 'Terragrunt' },
                { nombre: 'Kubernetes', icono: 'kubernetes' },
                { nombre: 'Docker', icono: 'docker' },
                { nombre: 'Ansible', icono: 'ansible' },
            ],
        },
        {
            titulo: 'CI/CD',
            items: [
                { nombre: 'GitHub Actions', icono: 'githubactions' },
                { nombre: 'Jenkins', icono: 'jenkins' },
                { nombre: 'Azure DevOps', icono: 'azuredevops' },
                { nombre: 'Git', icono: 'git' },
                { nombre: 'Bitbucket', icono: 'bitbucket' },
            ],
        },
        {
            titulo: 'Seguridad',
            items: [
                { nombre: 'SonarQube', icono: 'sonarqube' },
                { nombre: 'Checkmarx', icono: 'checkmarx' },
                { nombre: 'Fortify' },
                { nombre: 'Black Duck' },
                { nombre: 'CodeQL', icono: 'github' },
                { nombre: 'Burp Suite', icono: 'portswigger' },
                { nombre: 'OWASP ZAP' },
                { nombre: 'Fluid Attacks' },
                { nombre: 'Vault', icono: 'vault' },
            ],
        },
        {
            titulo: 'Observabilidad',
            items: [
                { nombre: 'Prometheus', icono: 'prometheus' },
                { nombre: 'Grafana', icono: 'grafana' },
                { nombre: 'Backstage', icono: 'backstage' },
            ],
        },
        {
            titulo: 'Datos, MLOps e IA',
            items: [
                { nombre: 'GitHub Copilot', icono: 'githubcopilot' },
                { nombre: 'Claude', icono: 'claude' },
                { nombre: 'Databricks', icono: 'databricks' },
                { nombre: 'Airflow', icono: 'apacheairflow' },
                { nombre: 'MLflow', icono: 'mlflow' },
                { nombre: 'Kubeflow' },
                { nombre: 'TensorFlow', icono: 'tensorflow' },
                { nombre: 'Kafka', icono: 'apachekafka' },
                { nombre: 'BigQuery', icono: 'googlebigquery' },
                { nombre: 'PostgreSQL', icono: 'postgresql' },
                { nombre: 'MySQL', icono: 'mysql' },
                { nombre: 'SQL Server', icono: 'microsoftsqlserver' },
            ],
        },
    ],

    // Experiencia: máximo 2–3 logros por puesto, una línea cada uno.
    experiencia: [
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

    // Añade aquí tus certificaciones cuando las tengas (con `enlace` a la credencial).
    formacion: [
        { anio: 'En curso', titulo: 'Máster en Inteligencia Artificial', emisor: 'Universidad Internacional de Valencia', enlace: '' },
        { anio: '2024', titulo: 'Ingeniería de Sistemas e Informática', emisor: 'Universidad Tecnológica del Perú', enlace: '' },
        { anio: '2021', titulo: 'Inglés — nivel avanzado', emisor: 'Británico · Lima', enlace: '' },
    ],

    contacto: {
        correo: 'jean-paul-a@hotmail.com', // déjalo vacío ('') si no quieres mostrarlo públicamente
        redes: [
            { nombre: 'LinkedIn', icono: 'linkedin', url: 'https://www.linkedin.com/in/jeanpaulandrade/' },
            { nombre: 'GitHub', icono: 'github', url: 'https://github.com/YaphetS0206' },
        ],
    },
};
