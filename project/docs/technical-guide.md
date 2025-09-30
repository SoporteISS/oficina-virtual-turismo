# Guía Técnica - Portal Turístico Montaña Central de Asturias

## Stack Tecnológico Recomendado

### Frontend
- **React 18** con TypeScript para desarrollo robusto y tipado seguro
- **Vite** como bundler y servidor de desarrollo para optimización de rendimiento
- **Tailwind CSS** para diseño responsivo y sistema de componentes consistente
- **React Router** para navegación SPA optimizada para SEO
- **React i18next** para internacionalización completa

### Backend/CMS
- **Strapi v4** (Headless CMS) para gestión de contenidos flexible
- **PostgreSQL** como base de datos principal
- **Cloudinary** para gestión y optimización de imágenes
- **Node.js/Express** para APIs personalizadas si necesario

### Hosting y Deploy
- **Vercel/Netlify** para frontend (Jamstack)
- **Railway/PlanetScale** para base de datos
- **Cloudflare** para CDN y optimización de rendimiento

## Arquitectura de Información

### Estructura de Contenidos

```
Home
├── Oficinas de Turismo
├── Cómo Llegar
├── Mapa Interactivo
│   ├── Rutas de Senderismo
│   ├── Patrimonio Cultural/Industrial
│   ├── Alojamientos
│   ├── Restaurantes
│   ├── Miradores
│   └── Servicios
├── Alojamientos
│   ├── Hoteles Rurales
│   ├── Casas Rurales
│   ├── Apartamentos
│   └── Campings
├── Actividades
│   ├── Senderismo
│   ├── Ciclismo
│   ├── Turismo Activo
│   └── Turismo Familiar
├── Naturaleza
├── Patrimonio
│   ├── Cultural
│   └── Industrial
├── Rutas
│   ├── Senderismo
│   ├── Bicicleta
│   └── Temáticas
├── Gastronomía
├── Agenda y Eventos
├── Noticias
└── Contacto
```

## Modelo de Datos CMS

### Tipos de Contenido Principales

#### 1. Alojamiento (Accommodation)
```typescript
interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: 'hotel' | 'casa-rural' | 'apartamento' | 'camping';
  description: string;
  shortDescription: string;
  images: Image[];
  location: Location;
  contact: Contact;
  amenities: string[];
  services: Service[];
  capacity: number;
  rooms?: number;
  priceRange: PriceRange;
  accessibility: AccessibilityInfo;
  ratings: Rating[];
  availability?: Availability[];
  municipality: Municipality;
  seoMeta: SEOMeta;
  featured: boolean;
  active: boolean;
}
```

#### 2. Ruta (Route)
```typescript
interface Route {
  id: string;
  name: string;
  slug: string;
  type: 'senderismo' | 'ciclismo' | 'tematica';
  difficulty: 'facil' | 'moderada' | 'dificil' | 'muy-dificil';
  description: string;
  shortDescription: string;
  images: Image[];
  gpxFile?: File;
  kmlFile?: File;
  distance: number; // km
  duration: number; // minutes
  elevation: number; // meters
  startPoint: Location;
  endPoint: Location;
  waypoints: Location[];
  accessibility: RouteAccessibility;
  familyFriendly: boolean;
  petFriendly: boolean;
  season: Season[];
  equipment: string[];
  safety: SafetyInfo;
  municipality: Municipality;
  seoMeta: SEOMeta;
  featured: boolean;
  active: boolean;
}
```

#### 3. Evento (Event)
```typescript
interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  images: Image[];
  startDate: Date;
  endDate?: Date;
  time?: string;
  location: Location;
  organizer: string;
  contact: Contact;
  price: EventPrice;
  capacity?: number;
  registration?: RegistrationInfo;
  accessibility: AccessibilityInfo;
  municipality: Municipality;
  seoMeta: SEOMeta;
  featured: boolean;
  active: boolean;
}
```

#### 4. Restaurante (Restaurant)
```typescript
interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: CuisineType[];
  description: string;
  shortDescription: string;
  images: Image[];
  location: Location;
  contact: Contact;
  hours: OpeningHours;
  priceRange: PriceRange;
  specialties: string[];
  dietaryOptions: DietaryOption[];
  accessibility: AccessibilityInfo;
  ratings: Rating[];
  municipality: Municipality;
  seoMeta: SEOMeta;
  featured: boolean;
  active: boolean;
}
```

### Taxonomías del Sistema

#### Municipios
```typescript
enum Municipality {
  CANGAS_DE_ONIS = 'cangas-de-onis',
  ONÍS = 'onis',
  AMIEVA = 'amieva',
  CABRALES = 'cabrales',
  PEÑAMELLERA_ALTA = 'penamellera-alta',
  PEÑAMELLERA_BAJA = 'penamellera-baja'
}
```

#### Accesibilidad
```typescript
interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  audioGuides: boolean;
  signLanguage: boolean;
  brailleSupport: boolean;
  reducedMobility: boolean;
  visualImpairment: boolean;
  hearingImpairment: boolean;
  cognitiveImpairment: boolean;
  notes?: string;
}
```

## API del Chatbot

### Arquitectura del Chatbot

#### Intents Principales
```typescript
interface ChatbotIntent {
  name: string;
  patterns: string[];
  responses: string[];
  context?: string;
  actions?: BotAction[];
}

const MAIN_INTENTS = [
  {
    name: 'route_recommendation',
    patterns: [
      'rutas de senderismo',
      'qué rutas recomiendas',
      'senderos fáciles',
      'rutas para familias'
    ],
    responses: [
      'Te puedo recomendar rutas según tu nivel y preferencias. ¿Buscas algo fácil, moderado o desafiante?'
    ],
    context: 'route_selection',
    actions: ['show_route_filters']
  },
  {
    name: 'accommodation_search',
    patterns: [
      'dónde dormir',
      'alojamientos',
      'hoteles rurales',
      'casas rurales'
    ],
    responses: [
      'Tenemos excelentes opciones de alojamiento. ¿Prefieres hotel, casa rural o apartamento?'
    ],
    context: 'accommodation_search',
    actions: ['show_accommodation_types']
  },
  {
    name: 'weather_info',
    patterns: [
      'tiempo',
      'clima',
      'lluvia',
      'temperatura'
    ],
    responses: [
      'Las condiciones actuales son ideales para actividades al aire libre. ¿Necesitas recomendaciones específicas?'
    ],
    context: 'weather',
    actions: ['show_weather_widget']
  }
];
```

#### Sistema de Context Management
```typescript
interface ChatContext {
  userId: string;
  currentIntent?: string;
  entities: Record<string, any>;
  location?: {
    lat: number;
    lng: number;
    municipality?: string;
  };
  preferences: {
    difficulty?: string;
    type?: string;
    budget?: string;
    accessibility?: boolean;
  };
  sessionData: Record<string, any>;
}
```

#### Mensajes del Sistema
```typescript
const SYSTEM_MESSAGES = {
  welcome: {
    es: "¡Hola! Soy tu asistente turístico virtual de la Montaña Central de Asturias. Puedo ayudarte a encontrar rutas, alojamientos, eventos y mucho más. ¿En qué puedo ayudarte?",
    en: "Hello! I'm your virtual tourism assistant for Central Mountain Asturias. I can help you find routes, accommodations, events and much more. How can I help you?"
  },
  fallback: {
    es: "Perdona, no he entendido bien tu consulta. ¿Puedes ser más específico? Puedo ayudarte con rutas, alojamientos, eventos o información general del destino.",
    en: "Sorry, I didn't understand your query well. Can you be more specific? I can help you with routes, accommodations, events or general destination information."
  },
  privacy_compliance: {
    es: "Respeto tu privacidad. No almaceno información personal y solo uso los datos de la conversación para mejorar tu experiencia durante esta sesión.",
    en: "I respect your privacy. I don't store personal information and only use conversation data to improve your experience during this session."
  }
};
```

## SEO Técnico

### Schema.org Markup

#### TouristDestination
```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Montaña Central de Asturias",
  "description": "Destino turístico inteligente...",
  "url": "https://montanacentral.es",
  "image": "https://cdn.montanacentral.es/hero-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Asturias",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.3472",
    "longitude": "-5.0318"
  }
}
```

#### Route Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Trip",
  "name": "Ruta del Alba",
  "description": "Espectacular recorrido...",
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Place",
        "name": "Punto de inicio",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.3472",
          "longitude": "-5.0318"
        }
      }
    ]
  }
}
```

### Metadatos y Performance

#### Meta Tags Template
```typescript
interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: any;
}
```

#### Performance Budget
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.5s

### Técnicas de Optimización

#### Code Splitting
```typescript
// Lazy loading por rutas
const Accommodation = lazy(() => import('./pages/Accommodation'));
const Routes = lazy(() => import('./pages/Routes'));

// Component-based splitting
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

#### Image Optimization
```typescript
// Responsive images con Cloudinary
const optimizedImageUrl = (publicId: string, options: ImageOptions) => {
  return `https://res.cloudinary.com/montana-central/image/upload/c_fill,f_auto,q_auto:eco,w_${options.width},h_${options.height}/${publicId}`;
};
```

## Internacionalización (i18n)

### Estructura de Traducciones
```
src/i18n/
├── locales/
│   ├── es/
│   │   ├── common.json
│   │   ├── navigation.json
│   │   ├── routes.json
│   │   └── accommodation.json
│   ├── en/
│   │   ├── common.json
│   │   ├── navigation.json
│   │   ├── routes.json
│   │   └── accommodation.json
│   └── index.ts
```

### Configuración i18next
```typescript
const resources = {
  es: {
    common: commonES,
    navigation: navigationES,
    routes: routesES
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    routes: routesEN
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });
```

## Lista de Verificación WCAG 2.1 AA

### Principio 1: Perceptible
- [ ] Textos alternativos para todas las imágenes
- [ ] Subtítulos para videos
- [ ] Contraste mínimo 4.5:1 para texto normal
- [ ] Contraste mínimo 3:1 para texto grande
- [ ] Texto redimensionable hasta 200% sin pérdida de funcionalidad
- [ ] Información no transmitida solo por color

### Principio 2: Operable
- [ ] Toda funcionalidad accesible por teclado
- [ ] Sin contenido que cause convulsiones
- [ ] Tiempo suficiente para leer contenido
- [ ] Enlaces descriptivos y contextuales
- [ ] Navegación consistente
- [ ] Foco visible en elementos interactivos

### Principio 3: Comprensible
- [ ] Idioma de la página especificado
- [ ] Cambios de contexto predecibles
- [ ] Identificación y descripción de errores
- [ ] Etiquetas e instrucciones para formularios
- [ ] Sugerencias para corrección de errores

### Principio 4: Robusto
- [ ] HTML válido y semántico
- [ ] Compatibilidad con tecnologías asistivas
- [ ] Elementos ARIA correctamente implementados
- [ ] Jerarquía de encabezados lógica

## Plan de Medición y KPIs

### Eventos de Analítica

#### Google Analytics 4 Events
```typescript
// Eventos personalizados
const trackEvent = (eventName: string, parameters: any) => {
  gtag('event', eventName, {
    custom_parameter_1: parameters.category,
    custom_parameter_2: parameters.value,
    ...parameters
  });
};

// Eventos específicos del turismo
const TOURISM_EVENTS = {
  route_view: 'view_route_detail',
  route_download: 'download_gpx',
  accommodation_view: 'view_accommodation',
  accommodation_contact: 'contact_accommodation',
  event_interest: 'interested_in_event',
  chatbot_interaction: 'chatbot_message',
  map_interaction: 'interact_with_map',
  weather_check: 'check_weather',
  language_change: 'change_language'
};
```

#### KPIs Dashboard
- **Engagement**: Tiempo en página, páginas por sesión, tasa de rebote
- **Conversiones**: Clics en teléfonos, emails, reservas iniciadas
- **Contenido**: Páginas más visitadas, descargas de GPX, interacciones con mapa
- **Chatbot**: Mensajes por sesión, intents más frecuentes, satisfacción
- **Accesibilidad**: Uso de lectores de pantalla, navegación por teclado
- **Performance**: Core Web Vitals, errores JavaScript, tiempo de carga

### Cuadro de Mando de Contenidos

#### Métricas de Contenido
```typescript
interface ContentMetrics {
  pageViews: number;
  uniquePageViews: number;
  averageTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
  socialShares: number;
  comments: number;
  downloads: number;
  contactClicks: number;
}
```

#### Dashboard de Gestión
- **Estado del contenido**: Publicado, borrador, revisión, archivado
- **Rendimiento por tipo**: Rutas vs alojamientos vs eventos
- **Engagement temporal**: Variaciones estacionales
- **Contenido popular**: Top 10 páginas más visitadas
- **Oportunidades**: Contenido con alto potencial pero bajo rendimiento

Este sistema proporciona una base sólida para el desarrollo, mantenimiento y evolución continua del portal turístico, garantizando cumplimiento normativo, excelente experiencia de usuario y facilidad de gestión de contenidos.