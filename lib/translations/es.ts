import { log } from "console";

export const es = {
  admin: {
    title: "Panel de Administración",
    scenariosTitle: "Gestionar Escenarios",
    scenariosDescription: "Agregar, editar o eliminar escenarios de capacitación con transcripciones y desglose.",
    sessionsTitle: "Sesiones de Agentes",
    sessionsDescription: "Ver sesiones enviadas por agentes de ventas, incluyendo comentarios y estadísticas.",
    usersTitle: "Gestión de Usuarios",
    usersDescription: "Revisar líderes de equipo y agentes de ventas. Permisos por rol.",
    statsTitle: "Estadísticas",
    statsDescription: "Ver tendencias de grabación e información sobre la actividad del usuario."
  },
  common: {
    loading: "Cargando..."
  },
  broadcast: {
    end: "Finalizar Transmisión",
    live: "En Vivo",
    start: "Iniciar Transmisión"
  },
  header: {
    title: "Acerca de",
    about: "Este es un proyecto que pretende demostrar cómo usar la API en tiempo real de OpenAI con WebRTC en un proyecto moderno de Next 15. Tiene componentes shadcn/ui ya instalados y el hook de sesión de audio WebRTC ya implementado. Clona el proyecto y define tus propias herramientas.",
    banner: "🎉 ¡Descubre la nueva biblioteca OpenAI Realtime Blocks UI para Next.js!",
    bannerLink: "Saber más →",
    beta: "123ink",
    dark: "Oscuro",
    dashboard: "Tablero",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    language: "Idioma",
    light: "Claro",
    logo: "Sala de formación de ventas WeWow",
    statistics: "Estadísticas",

    system: "Sistema",
    theme: "Cambiar tema",
    twitter: "Seguir en"
  },
  hero: {
    badge: "Next.js + shadcn/ui",
    subtitle: "Haga una demostración haciendo clic en el botón de abajo y pruebe las herramientas disponibles",
    title: "API en tiempo real de OpenAI (WebRTC)"
  },
  messageControls: {
    content: "Contenido",
    filter: "Filtrar por tipo",
    log: "Registrar en Consola",
    logs: "Registros de Conversación",
    search: "Buscar mensajes...",
    type: "Tipo",
    view: "Ver Registros"
  },
  recording: {
    title: "Detalles de la Grabación",
    agent: "Agente",
    scenario: "Escenario",
    createdAt: "Creado En",
    transcript: "Transcripción"
  },
  scenarios: {
    title: "Escenarios",
    description: "Agregar, editar o eliminar escenarios de capacitación con transcripciones y desglose.",
    new: "+ Nuevo Escenario",
    id: "ID:",
    by: "Por",
    unknown: "Desconocido",
    edit: "Editar",
    delete: "Eliminar",
    confirmDelete: "¿Estás seguro de que deseas eliminar este escenario?",
    deleteFailed: "Error al eliminar el escenario.",
  },
  status: {
    error: "¡Ups!",
    info: "Alternando Asistente de Voz...",
    language: "Idioma cambiado de",
    session: "Sesión establecida",
    success: "¡Estamos en vivo!",
    toggle: "Alternando Asistente de Voz..."
  },
  tokenUsage: {
    input: "Tokens de Entrada",
    output: "Tokens de Salida",
    total: "Tokens Totales",
    usage: "Uso de Tokens"
  },
  tools: {
    availableTools: {
      title: "Herramientas Disponibles",
      copyFn: {
        description: 'Di "Copiar eso al portapapeles" para pegarlo en algún lugar.',
        name: "Función Copiar"
      },
      getTime: {
        description: 'Pregunta "¿Qué hora es?" para obtener la hora actual.',
        name: "Obtener Hora"
      },
      launchWebsite: {
        description: '"Llévame a [sitio web]" para abrir un sitio en una nueva pestaña.',
        name: "Abrir Sitio Web"
      },
      partyMode: {
        description: '¡Di "Iniciar modo fiesta" para una animación dinámica de confeti!',
        name: "Modo Fiesta"
      },
      themeSwitcher: {
        description: 'Di "Cambiar fondo" o "Cambiar a modo oscuro" o "Cambiar a modo claro".',
        name: "Cambiar Tema"
      },
      scrapeWebsite: {
        name: "Extractor de Sitios Web",
        description: 'Di "Extraer contenido de [URL del sitio]" para obtener contenido de una página web.'
      }
    },
    clipboard: {
      description: "Ahora puedes pegarlo en algún lugar.",
      success: "Texto copiado al portapapeles. Pide al usuario que lo pegue en algún lugar.",
      toast: "¡Texto copiado al portapapeles!"
    },
    launchWebsite: {
      description: "Error al abrir el sitio web",
      success: "¡Sitio web abierto! Informa al usuario que se ha abierto.",
      toast: "Abriendo sitio web "
    },
    partyMode: {
      description: "Error al activar el modo fiesta",
      success: "Modo fiesta activado",
      toast: "¡Modo fiesta!"
    },
    switchTheme: "Tema cambiado a ",
    themeFailed: "Error al cambiar el tema",
    time: "Anunciar al usuario: La hora actual es ",
    scrapeWebsite: {
      success: "Contenido del sitio web extraído exitosamente",
      description: "Error al extraer contenido del sitio web",
      toast: "Extrayendo contenido del sitio web..."
    }
  },
  transcriber: {
    title: "Transcripción en Vivo"
  },
  voice: {
    select: "Seleccionar una voz",
    ash: "Ash - Suave y Profesional",
    ballad: "Ballad - Cálida y Cautivadora",
    coral: "Coral - Clara y Amigable",
    sage: "Sage - Autoritaria y Tranquila",
    verse: "Verse - Dinámica y Expresiva"
  },
  language: "Spanish",
  languagePrompt: "Habla y responde solo en español. Es crucial que mantengas tus respuestas en español. Si el usuario habla en otros idiomas, deberías responder en español. (Spanish only)"
} 