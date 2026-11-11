/*
 * Datos compartidos por los dos idiomas: contacto, stack y prototipos.
 * `icono` es el nombre de un icono de src/data/iconos.ts.
 * Si una tecnología no tiene icono, se muestran sus iniciales.
 */
import type { Bilingue } from '../i18n/textos';

export const NOMBRE = 'Jean Paul Andrade Delgadillo';
export const FOTO = '/img/foto.jpg'; // déjalo vacío ('') para mostrar solo la animación

export const CONTACTO = {
    correo: 'jean-paul-a@hotmail.com', // déjalo vacío ('') si no quieres mostrarlo
    redes: [
        { nombre: 'LinkedIn', icono: 'linkedin', url: 'https://www.linkedin.com/in/jeanpaulandrade/' },
        { nombre: 'GitHub', icono: 'github', url: 'https://github.com/YaphetS0206' },
    ],
};

/* ───────── Prototipos y experimentos ─────────
   estado: 'produccion' | 'prototipo' | 'desarrollo' | 'laboratorio'
   repo:   URL del repositorio (vacío si es privado)
   demo:   URL publicada (Vercel, etc.), opcional              */
export interface Proyecto {
    nombre: Bilingue;
    ruta: string; // texto corto tipo "usuario/repositorio"
    estado: 'produccion' | 'prototipo' | 'desarrollo' | 'laboratorio';
    descripcion: Bilingue;
    tags: string[];
    repo?: string;
    demo?: string;
    destacado?: boolean;
}

/*  Vacío por ahora: la sección muestra "Próximamente".
    Para añadir uno, copia este ejemplo dentro de los corchetes:

    {
        nombre: { es: 'Mi experimento', en: 'My experiment' },
        ruta: 'YaphetS0206/mi-repo',
        estado: 'prototipo',
        descripcion: { es: 'Qué hace, en una línea.', en: 'What it does, in one line.' },
        tags: ['IA', 'GitHub Actions'],
        repo: 'https://github.com/YaphetS0206/mi-repo',
        demo: 'https://mi-experimento.vercel.app',
    },
*/
export const PROYECTOS: Proyecto[] = [];

/* ───────── Stack ───────── */
export const STACK: { titulo: Bilingue; items: { nombre: string; icono?: string }[] }[] = [
    {
        titulo: { es: 'Lenguajes', en: 'Languages' },
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
        titulo: { es: 'Cloud e infraestructura', en: 'Cloud & infrastructure' },
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
        titulo: { es: 'Seguridad', en: 'Security' },
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
        titulo: { es: 'Observabilidad', en: 'Observability' },
        items: [
            { nombre: 'Prometheus', icono: 'prometheus' },
            { nombre: 'Grafana', icono: 'grafana' },
            { nombre: 'Backstage', icono: 'backstage' },
        ],
    },
    {
        titulo: { es: 'Datos, MLOps e IA', en: 'Data, MLOps & AI' },
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
];
