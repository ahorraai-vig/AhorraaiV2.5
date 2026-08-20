import { 
  Business, 
  Opportunity, 
  CooperationLink, 
  CooperationProposal, 
  Campaign, 
  DemandSignal, 
  ObservatoryIndex, 
  StreetIntelligence, 
  NeighborhoodIntelligence, 
  AgentDefinition, 
  Experiment,
  VigoZone
} from '../types';

export const INITIAL_BUSINESSES: Business[] = [
  // 1. Centro / Príncipe
  {
    id: 'biz-vigo-01',
    name: 'Librería Mendinho Vigo',
    tradeName: 'Librería Mendinho',
    category: 'Librería y Papelería',
    subcategory: 'Libros, narrativa gallega y papelería técnica',
    description: 'Librería independiente con más de 30 años en el corazón peatonal de Vigo. Especializada en autores locales y talleres de lectura infantil.',
    address: 'Rúa do Príncipe, 34',
    street: 'Rúa do Príncipe',
    neighborhood: 'Centro / Príncipe',
    city: 'Vigo',
    coordinates: { lat: 42.2384, lng: -8.7231 },
    phone: '986 22 11 00',
    whatsapp: '600 11 22 33',
    website: 'https://libreriamendinho-demo.vigo.local',
    instagram: '@libreriamendinho_vigo',
    googleMapsUrl: 'https://maps.google.com/?q=Príncipe+Vigo+Libreria+Mendinho',
    schedules: [
      { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 82,
      websiteQualityScore: 45,
      socialMediaActivityScore: 60,
      localSeoScore: 50,
      qrInteractiveScore: 10,
      ecommerceReadyScore: 25,
      whatsappCommerceScore: 40,
      overallIPD: 51
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'VERIFIED',
    confidenceScore: 92,
    tags: ['Cultura', 'Libros', 'Príncipe', 'Comercio Emblemático'],
    hasSmartAgent: true,
    agentName: 'MendinhoBot v1',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4800,
      googleRating: 4.8,
      googleReviewsCount: 184,
      lastAuditDate: '2026-08-10'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-02',
    name: 'Café Princesa & Repostería',
    tradeName: 'Café Princesa',
    category: 'Hostelería y Restauración',
    subcategory: 'Cafetería de especialidad y brunch',
    description: 'Cafetería de especialidad con terraza en zona peatonal, bollería artesanal diaria y ambiente para trabajo o lectura.',
    address: 'Rúa do Príncipe, 42',
    street: 'Rúa do Príncipe',
    neighborhood: 'Centro / Príncipe',
    city: 'Vigo',
    coordinates: { lat: 42.2381, lng: -8.7226 },
    phone: '986 22 45 10',
    whatsapp: '600 44 55 66',
    instagram: '@cafeprincesa_vigo',
    schedules: [
      { slotName: 'Mañanas', hours: '08:30 - 14:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:00 - 21:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 90,
      websiteQualityScore: 20,
      socialMediaActivityScore: 85,
      localSeoScore: 65,
      qrInteractiveScore: 70,
      ecommerceReadyScore: 10,
      whatsappCommerceScore: 30,
      overallIPD: 64
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 88,
    tags: ['Café Especialidad', 'Príncipe', 'Terraza', 'Hostelería'],
    hasSmartAgent: true,
    agentName: 'Princesa CoffeeAgent',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 5200,
      googleRating: 4.6,
      googleReviewsCount: 312,
      lastAuditDate: '2026-08-12'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-03',
    name: 'Calzados Porta do Sol',
    tradeName: 'Porta do Sol Calzados',
    category: 'Moda y Textil',
    subcategory: 'Calzado artesanal, piel y confort',
    description: 'Comercio tradicional de calzado de calidad hecho en España y Portugal con atención personalizada.',
    address: 'Praza da Porta do Sol, 4',
    street: 'Praza da Porta do Sol',
    neighborhood: 'Centro / Príncipe',
    city: 'Vigo',
    coordinates: { lat: 42.2392, lng: -8.7245 },
    phone: '986 21 33 44',
    schedules: [
      { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:00', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'OBSERVADO' }
    ],
    digitalPresence: {
      googleMapsScore: 50,
      websiteQualityScore: 10,
      socialMediaActivityScore: 15,
      localSeoScore: 30,
      qrInteractiveScore: 0,
      ecommerceReadyScore: 0,
      whatsappCommerceScore: 10,
      overallIPD: 22
    },
    honestyMap: {
      identity: 'OBSERVADO',
      schedule: 'OBSERVADO',
      contact: 'OBSERVADO',
      catalog: 'SIN_CONFIRMAR',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'OBSERVED',
    confidenceScore: 65,
    tags: ['Calzado', 'Tradicional', 'Porta do Sol'],
    hasSmartAgent: false,
    crmStatus: 'contactado',
    metrics: {
      estimatedFootfallDaily: 6000,
      googleRating: 4.2,
      googleReviewsCount: 45,
      lastAuditDate: '2026-08-01'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-04',
    name: 'Óptica & Visión Castro',
    tradeName: 'Óptica Castro',
    category: 'Salud y Bienestar',
    subcategory: 'Optometría y gafas de autor',
    description: 'Servicio optométrico avanzado y marcas independientes de monturas sostenibles.',
    address: 'Rúa do Príncipe, 18',
    street: 'Rúa do Príncipe',
    neighborhood: 'Centro / Príncipe',
    city: 'Vigo',
    coordinates: { lat: 42.2388, lng: -8.7238 },
    phone: '986 29 88 11',
    whatsapp: '600 77 88 99',
    website: 'https://opticacastro-demo.vigo.local',
    schedules: [
      { slotName: 'Mañanas', hours: '09:30 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 85,
      websiteQualityScore: 70,
      socialMediaActivityScore: 55,
      localSeoScore: 75,
      qrInteractiveScore: 30,
      ecommerceReadyScore: 40,
      whatsappCommerceScore: 65,
      overallIPD: 68
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 90,
    tags: ['Salud', 'Óptica', 'Príncipe'],
    hasSmartAgent: true,
    agentName: 'OptiBot Vigo',
    crmStatus: 'demo',
    metrics: {
      estimatedFootfallDaily: 4900,
      googleRating: 4.9,
      googleReviewsCount: 98,
      lastAuditDate: '2026-08-05'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-05',
    name: 'Joyería & Platería Laxe',
    tradeName: 'Joyería Laxe',
    category: 'Artesanía y Diseño',
    subcategory: 'Orfebrería gallega tradicional y contemporánea',
    description: 'Taller propio de joyería en plata y azabache, diseños inspirados en la ría de Vigo.',
    address: 'Rúa Policarpo Sanz, 8',
    street: 'Rúa Policarpo Sanz',
    neighborhood: 'Centro / Príncipe',
    city: 'Vigo',
    coordinates: { lat: 42.2396, lng: -8.7220 },
    phone: '986 43 12 77',
    schedules: [
      { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Tarde Comercial', hours: '17:00 - 20:30', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'OBSERVADO' }
    ],
    digitalPresence: {
      googleMapsScore: 65,
      websiteQualityScore: 35,
      socialMediaActivityScore: 40,
      localSeoScore: 40,
      qrInteractiveScore: 10,
      ecommerceReadyScore: 20,
      whatsappCommerceScore: 25,
      overallIPD: 38
    },
    honestyMap: {
      identity: 'OBSERVADO',
      schedule: 'OBSERVADO',
      contact: 'OBSERVADO',
      catalog: 'SIN_CONFIRMAR',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'OBSERVED',
    confidenceScore: 70,
    tags: ['Joyería', 'Artesanía', 'Policarpo Sanz'],
    hasSmartAgent: false,
    crmStatus: 'investigado',
    metrics: {
      estimatedFootfallDaily: 4200,
      googleRating: 4.5,
      googleReviewsCount: 32,
      lastAuditDate: '2026-07-28'
    },
    isDemo: true
  },

  // 2. Casco Vello
  {
    id: 'biz-vigo-06',
    name: 'Taberna da Pedra Casco Vello',
    tradeName: 'Taberna da Pedra',
    category: 'Hostelería y Restauración',
    subcategory: 'Ostras da ría, tapas marineras y albariño',
    description: 'En plena Rúa da Pescadería (Rúa das Ostras). Ambiente marinero con producto fresco de la lonja de Vigo.',
    address: 'Rúa da Pescadería, 6',
    street: 'Rúa da Pescadería',
    neighborhood: 'Casco Vello',
    city: 'Vigo',
    coordinates: { lat: 42.2405, lng: -8.7268 },
    phone: '986 22 99 11',
    whatsapp: '600 88 99 00',
    instagram: '@tabernadapedra_vigo',
    schedules: [
      { slotName: 'Mañanas', hours: '11:30 - 16:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: '19:30 - 23:30', isOpen: true, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 92,
      websiteQualityScore: 30,
      socialMediaActivityScore: 75,
      localSeoScore: 80,
      qrInteractiveScore: 60,
      ecommerceReadyScore: 0,
      whatsappCommerceScore: 50,
      overallIPD: 62
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 94,
    tags: ['Ostras', 'Casco Vello', 'Turismo', 'Gastronomía'],
    hasSmartAgent: true,
    agentName: 'TascaBot Berbés',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 5800,
      googleRating: 4.7,
      googleReviewsCount: 540,
      lastAuditDate: '2026-08-14'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-07',
    name: 'Cerámica & Arte Atlántico Berbés',
    tradeName: 'Cerámica Atlántica',
    category: 'Artesanía y Diseño',
    subcategory: 'Piezas artesanales de gres y souvenir de autor',
    description: 'Taller y tienda de cerámica contemporánea inspirada en el océano y las rías baixas.',
    address: 'Praza do Berbés, 14',
    street: 'Praza do Berbés',
    neighborhood: 'Casco Vello',
    city: 'Vigo',
    coordinates: { lat: 42.2399, lng: -8.7285 },
    phone: '986 11 44 22',
    instagram: '@ceramicaatlantica_vigo',
    schedules: [
      { slotName: 'Mañanas', hours: '10:30 - 14:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '17:00 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 70,
      websiteQualityScore: 50,
      socialMediaActivityScore: 80,
      localSeoScore: 45,
      qrInteractiveScore: 40,
      ecommerceReadyScore: 35,
      whatsappCommerceScore: 45,
      overallIPD: 55
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'VERIFIED',
    confidenceScore: 85,
    tags: ['Artesanía', 'Berbés', 'Cerámica', 'Turismo'],
    hasSmartAgent: false,
    crmStatus: 'propuesta',
    metrics: {
      estimatedFootfallDaily: 2900,
      googleRating: 4.9,
      googleReviewsCount: 78,
      lastAuditDate: '2026-08-08'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-08',
    name: 'Vinoteca O Peinador',
    tradeName: 'O Peinador Vinoteca',
    category: 'Hostelería y Restauración',
    subcategory: 'Vinos D.O. gallegos y conservas gourmet',
    description: 'Espacio de degustación de vinos de pequeñas bodegas gallegas y quesos artesanales.',
    address: 'Rúa Real, 21',
    street: 'Rúa Real',
    neighborhood: 'Casco Vello',
    city: 'Vigo',
    coordinates: { lat: 42.2401, lng: -8.7260 },
    phone: '986 21 88 55',
    schedules: [
      { slotName: 'Mañanas', hours: '12:00 - 15:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: '19:30 - 00:00', isOpen: true, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 88,
      websiteQualityScore: 25,
      socialMediaActivityScore: 65,
      localSeoScore: 60,
      qrInteractiveScore: 50,
      ecommerceReadyScore: 15,
      whatsappCommerceScore: 35,
      overallIPD: 53
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 89,
    tags: ['Vinos', 'Casco Vello', 'Gourmet'],
    hasSmartAgent: true,
    agentName: 'Sommelier O Peinador',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 3400,
      googleRating: 4.8,
      googleReviewsCount: 210,
      lastAuditDate: '2026-08-11'
    },
    isDemo: true
  },

  // 3. Urzáiz
  {
    id: 'biz-vigo-09',
    name: 'Boutique Textil Urzáiz',
    tradeName: 'Urzáiz Moda & Tendencias',
    category: 'Moda y Textil',
    subcategory: 'Moda mujer multimarca europea',
    description: 'Prendas seleccionadas con atención al tejido y corte impecable en la principal arteria comercial.',
    address: 'Rúa de Urzáiz, 67',
    street: 'Rúa de Urzáiz',
    neighborhood: 'Urzáiz',
    city: 'Vigo',
    coordinates: { lat: 42.2355, lng: -8.7180 },
    phone: '986 42 10 99',
    whatsapp: '600 22 33 44',
    instagram: '@urzaizmoda_vigo',
    schedules: [
      { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 78,
      websiteQualityScore: 60,
      socialMediaActivityScore: 85,
      localSeoScore: 70,
      qrInteractiveScore: 20,
      ecommerceReadyScore: 50,
      whatsappCommerceScore: 70,
      overallIPD: 66
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 91,
    tags: ['Moda', 'Urzáiz', 'Tendencias'],
    hasSmartAgent: true,
    agentName: 'FashionAgent Urzáiz',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 6200,
      googleRating: 4.6,
      googleReviewsCount: 115,
      lastAuditDate: '2026-08-15'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-10',
    name: 'Floristería As Lilas Vigo',
    tradeName: 'As Lilas Flores',
    category: 'Comercio Minorista',
    subcategory: 'Arte floral, ramos de temporada y plantas de interior',
    description: 'Diseño floral vanguardista, suscripciones para oficinas y eventos.',
    address: 'Rúa de Urzáiz, 82',
    street: 'Rúa de Urzáiz',
    neighborhood: 'Urzáiz',
    city: 'Vigo',
    coordinates: { lat: 42.2348, lng: -8.7169 },
    phone: '986 48 33 21',
    whatsapp: '600 55 66 77',
    website: 'https://aslilasflores-demo.vigo.local',
    schedules: [
      { slotName: 'Mañanas', hours: '09:30 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 85,
      websiteQualityScore: 65,
      socialMediaActivityScore: 70,
      localSeoScore: 60,
      qrInteractiveScore: 35,
      ecommerceReadyScore: 40,
      whatsappCommerceScore: 75,
      overallIPD: 64
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 88,
    tags: ['Flores', 'Regalos', 'Urzáiz'],
    hasSmartAgent: true,
    agentName: 'FloraBot Urzáiz',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 5100,
      googleRating: 4.9,
      googleReviewsCount: 142,
      lastAuditDate: '2026-08-09'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-11',
    name: 'Café Babel Urzáiz',
    tradeName: 'Café Babel',
    category: 'Hostelería y Restauración',
    subcategory: 'Café literario, tartas caseras y desayunos saludables',
    description: 'Punto de encuentro cultural en Urzáiz con exposiciones temporales y repostería artesana.',
    address: 'Rúa de Urzáiz, 94',
    street: 'Rúa de Urzáiz',
    neighborhood: 'Urzáiz',
    city: 'Vigo',
    coordinates: { lat: 42.2341, lng: -8.7158 },
    phone: '986 44 99 22',
    schedules: [
      { slotName: 'Mañanas', hours: '08:00 - 14:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:00 - 21:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 88,
      websiteQualityScore: 30,
      socialMediaActivityScore: 70,
      localSeoScore: 65,
      qrInteractiveScore: 50,
      ecommerceReadyScore: 10,
      whatsappCommerceScore: 30,
      overallIPD: 55
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 90,
    tags: ['Cafetería', 'Urzáiz', 'Desayunos'],
    hasSmartAgent: false,
    crmStatus: 'interesado',
    metrics: {
      estimatedFootfallDaily: 4800,
      googleRating: 4.7,
      googleReviewsCount: 290,
      lastAuditDate: '2026-08-11'
    },
    isDemo: true
  },

  // 4. O Calvario
  {
    id: 'biz-vigo-12',
    name: 'Frutería & Huerta Sagunto O Calvario',
    tradeName: 'Huerta Sagunto',
    category: 'Alimentación Tradicional',
    subcategory: 'Frutas y verduras de proximidad, huerta del Val Miñor',
    description: 'Producto fresco seleccionado cada madrugada, reparto a domicilio en el barrio y cestas semanales.',
    address: 'Rúa Sagunto, 12 (Peatonal O Calvario)',
    street: 'Rúa Sagunto',
    neighborhood: 'O Calvario',
    city: 'Vigo',
    coordinates: { lat: 42.2310, lng: -8.7085 },
    phone: '986 37 44 11',
    whatsapp: '600 77 11 22',
    schedules: [
      { slotName: 'Mañanas', hours: '08:30 - 14:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '17:00 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 75,
      websiteQualityScore: 10,
      socialMediaActivityScore: 30,
      localSeoScore: 40,
      qrInteractiveScore: 15,
      ecommerceReadyScore: 10,
      whatsappCommerceScore: 80,
      overallIPD: 41
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'VERIFIED',
    confidenceScore: 87,
    tags: ['Alimentación', 'Calvario', 'Km0', 'WhatsApp'],
    hasSmartAgent: true,
    agentName: 'FrutaBot Calvario',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4300,
      googleRating: 4.8,
      googleReviewsCount: 88,
      lastAuditDate: '2026-08-07'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-13',
    name: 'Ferretería & Brico Calvario',
    tradeName: 'Ferretería O Calvario',
    category: 'Comercio Minorista',
    subcategory: 'Menaje, cerrajería y bricolaje de proximidad',
    description: 'Ferretería de confianza con asesoramiento experto para reparaciones del hogar.',
    address: 'Rúa de Urzáiz, 178 (Peatonal O Calvario)',
    street: 'Rúa de Urzáiz',
    neighborhood: 'O Calvario',
    city: 'Vigo',
    coordinates: { lat: 42.2315, lng: -8.7072 },
    phone: '986 27 10 33',
    schedules: [
      { slotName: 'Mañanas', hours: '09:00 - 13:30', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:00', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'OBSERVADO' }
    ],
    digitalPresence: {
      googleMapsScore: 60,
      websiteQualityScore: 5,
      socialMediaActivityScore: 10,
      localSeoScore: 35,
      qrInteractiveScore: 0,
      ecommerceReadyScore: 0,
      whatsappCommerceScore: 20,
      overallIPD: 21
    },
    honestyMap: {
      identity: 'OBSERVADO',
      schedule: 'OBSERVADO',
      contact: 'OBSERVADO',
      catalog: 'SIN_CONFIRMAR',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'OBSERVED',
    confidenceScore: 68,
    tags: ['Ferretería', 'Calvario', 'Hogar'],
    hasSmartAgent: false,
    crmStatus: 'contacto_pendiente',
    metrics: {
      estimatedFootfallDaily: 3900,
      googleRating: 4.4,
      googleReviewsCount: 52,
      lastAuditDate: '2026-07-25'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-14',
    name: 'Panadería & Tahona Tradicional Ramón Nieto',
    tradeName: 'Tahona Ramón Nieto',
    category: 'Alimentación Tradicional',
    subcategory: 'Pan de Cea, empanadas gallegas de maíz y trigo',
    description: 'Horno de leña tradicional con masas madre y empanadas artesanas de zamburiñas, bacalao y lomo.',
    address: 'Av. de Ramón Nieto, 24',
    street: 'Av. de Ramón Nieto',
    neighborhood: 'O Calvario',
    city: 'Vigo',
    coordinates: { lat: 42.2305, lng: -8.7055 },
    phone: '986 26 44 88',
    whatsapp: '600 33 22 11',
    schedules: [
      { slotName: 'Mañanas', hours: '07:30 - 15:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '17:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 82,
      websiteQualityScore: 15,
      socialMediaActivityScore: 50,
      localSeoScore: 50,
      qrInteractiveScore: 20,
      ecommerceReadyScore: 10,
      whatsappCommerceScore: 60,
      overallIPD: 48
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 91,
    tags: ['Panadería', 'Empanadas', 'Calvario'],
    hasSmartAgent: true,
    agentName: 'FornoBot Calvario',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4600,
      googleRating: 4.9,
      googleReviewsCount: 165,
      lastAuditDate: '2026-08-13'
    },
    isDemo: true
  },

  // 5. Bouzas
  {
    id: 'biz-vigo-15',
    name: 'Marisquería & Arrocería Porto de Bouzas',
    tradeName: 'Porto de Bouzas',
    category: 'Hostelería y Restauración',
    subcategory: 'Mariscos de la ría, pescados al horno y arroces marineros',
    description: 'Frente al paseo marítimo de la villa de Bouzas. Terraza histórica con producto de primera calidad.',
    address: 'Rúa de Santo Cristo, 8',
    street: 'Rúa de Santo Cristo',
    neighborhood: 'Bouzas',
    city: 'Vigo',
    coordinates: { lat: 42.2285, lng: -8.7540 },
    phone: '986 29 11 33',
    website: 'https://portodebouzas-demo.vigo.local',
    instagram: '@portodebouzas_vigo',
    schedules: [
      { slotName: 'Mañanas', hours: '12:30 - 16:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: '20:00 - 23:45', isOpen: true, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 94,
      websiteQualityScore: 75,
      socialMediaActivityScore: 80,
      localSeoScore: 85,
      qrInteractiveScore: 70,
      ecommerceReadyScore: 20,
      whatsappCommerceScore: 55,
      overallIPD: 74
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 95,
    tags: ['Marisquería', 'Bouzas', 'Gastronomía', 'Vistas'],
    hasSmartAgent: true,
    agentName: 'PortoBot Bouzas',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 3800,
      googleRating: 4.7,
      googleReviewsCount: 680,
      lastAuditDate: '2026-08-16'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-16',
    name: 'Náutica & Efectos Navales Alborán',
    tradeName: 'Náutica Alborán',
    category: 'Comercio Minorista',
    subcategory: 'Ropa náutica técnica, acastillaje y accesorios marinos',
    description: 'Referente náutico en Bouzas para regatistas, embarcaciones de recreo y amantes del mar.',
    address: 'Av. da Beiramar, 142',
    street: 'Av. da Beiramar',
    neighborhood: 'Bouzas',
    city: 'Vigo',
    coordinates: { lat: 42.2295, lng: -8.7515 },
    phone: '986 20 88 44',
    website: 'https://nauticaalboran-demo.vigo.local',
    schedules: [
      { slotName: 'Mañanas', hours: '09:00 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:00 - 19:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 80,
      websiteQualityScore: 70,
      socialMediaActivityScore: 50,
      localSeoScore: 65,
      qrInteractiveScore: 25,
      ecommerceReadyScore: 60,
      whatsappCommerceScore: 50,
      overallIPD: 61
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 89,
    tags: ['Náutica', 'Bouzas', 'Moda Marina'],
    hasSmartAgent: true,
    agentName: 'NautiBot Vigo',
    crmStatus: 'piloto',
    metrics: {
      estimatedFootfallDaily: 2200,
      googleRating: 4.6,
      googleReviewsCount: 94,
      lastAuditDate: '2026-08-04'
    },
    isDemo: true
  },

  // 6. As Travesas
  {
    id: 'biz-vigo-17',
    name: 'Deportes Praza América Vigo',
    tradeName: 'Deportes Praza América',
    category: 'Comercio Minorista',
    subcategory: 'Calzado running, equipamiento montaña y textil deportivo',
    description: 'Tienda técnica especializada en running, senderismo por el Monte do Castro y equipamiento Celta de Vigo.',
    address: 'Praza de América, 3',
    street: 'Praza de América',
    neighborhood: 'As Travesas',
    city: 'Vigo',
    coordinates: { lat: 42.2195, lng: -8.7360 },
    phone: '986 24 55 66',
    whatsapp: '600 99 88 77',
    schedules: [
      { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 82,
      websiteQualityScore: 40,
      socialMediaActivityScore: 65,
      localSeoScore: 60,
      qrInteractiveScore: 30,
      ecommerceReadyScore: 35,
      whatsappCommerceScore: 55,
      overallIPD: 55
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 88,
    tags: ['Deporte', 'Travesas', 'Running', 'Celta'],
    hasSmartAgent: true,
    agentName: 'RunnerBot Travesas',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4900,
      googleRating: 4.7,
      googleReviewsCount: 130,
      lastAuditDate: '2026-08-06'
    },
    isDemo: true
  },
  {
    id: 'biz-vigo-18',
    name: 'Café & Cervecería Castelao',
    tradeName: 'Cervecería Castelao',
    category: 'Hostelería y Restauración',
    subcategory: 'Cervezas artesanas gallegas y tostas variadas',
    description: 'Enclave animado en As Travesas para el aperitivo y tardeo con amplia carta de cervezas de autor.',
    address: 'Av. de Castelao, 18',
    street: 'Av. de Castelao',
    neighborhood: 'As Travesas',
    city: 'Vigo',
    coordinates: { lat: 42.2205, lng: -8.7390 },
    phone: '986 20 15 44',
    schedules: [
      { slotName: 'Mañanas', hours: '09:00 - 15:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '17:00 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: '20:30 - 00:30', isOpen: true, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 86,
      websiteQualityScore: 20,
      socialMediaActivityScore: 70,
      localSeoScore: 55,
      qrInteractiveScore: 60,
      ecommerceReadyScore: 0,
      whatsappCommerceScore: 40,
      overallIPD: 54
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'OBSERVADO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 90,
    tags: ['Hostelería', 'Travesas', 'Tardeo'],
    hasSmartAgent: true,
    agentName: 'Castelao TardeoBot',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4200,
      googleRating: 4.6,
      googleReviewsCount: 245,
      lastAuditDate: '2026-08-10'
    },
    isDemo: true
  },

  // 7. Teis
  {
    id: 'biz-vigo-19',
    name: 'Ultramarinos & Tenda Sanjurjo Badía',
    tradeName: 'Ultramarinos Sanjurjo',
    category: 'Alimentación Tradicional',
    subcategory: 'Quesos D.O., legumbres a granel y embutidos gallegos',
    description: 'La tienda de toda la vida en Teis con producto de aldea y cercanía insuperable.',
    address: 'Rúa de Sanjurjo Badía, 88',
    street: 'Rúa de Sanjurjo Badía',
    neighborhood: 'Teis',
    city: 'Vigo',
    coordinates: { lat: 42.2505, lng: -8.6980 },
    phone: '986 37 11 88',
    schedules: [
      { slotName: 'Mañanas', hours: '09:00 - 14:00', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Tarde Comercial', hours: '17:00 - 20:30', isOpen: true, honesty: 'OBSERVADO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'OBSERVADO' }
    ],
    digitalPresence: {
      googleMapsScore: 55,
      websiteQualityScore: 0,
      socialMediaActivityScore: 15,
      localSeoScore: 30,
      qrInteractiveScore: 0,
      ecommerceReadyScore: 0,
      whatsappCommerceScore: 30,
      overallIPD: 22
    },
    honestyMap: {
      identity: 'OBSERVADO',
      schedule: 'OBSERVADO',
      contact: 'OBSERVADO',
      catalog: 'SIN_CONFIRMAR',
      pricing: 'SIN_CONFIRMAR'
    },
    provenance: 'OBSERVED',
    confidenceScore: 72,
    tags: ['Alimentación', 'Teis', 'Tradicional'],
    hasSmartAgent: false,
    crmStatus: 'investigado',
    metrics: {
      estimatedFootfallDaily: 3100,
      googleRating: 4.7,
      googleReviewsCount: 42,
      lastAuditDate: '2026-07-20'
    },
    isDemo: true
  },

  // 8. Torrecedeira
  {
    id: 'biz-vigo-20',
    name: 'Copistería & Imprenta Universitaria Torrecedeira',
    tradeName: 'CopyCenter Torrecedeira',
    category: 'Servicios Profesionales',
    subcategory: 'Impresión digital, encuadernación y material técnico',
    description: 'Servicio de reprografía junto a las facultades e ingenierías con entrega rápida y pedidos online.',
    address: 'Rúa de Torrecedeira, 38',
    street: 'Rúa de Torrecedeira',
    neighborhood: 'Torrecedeira',
    city: 'Vigo',
    coordinates: { lat: 42.2320, lng: -8.7310 },
    phone: '986 21 00 55',
    whatsapp: '600 12 34 56',
    website: 'https://copycentertorrecedeira-demo.vigo.local',
    schedules: [
      { slotName: 'Mañanas', hours: '08:30 - 14:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:00 - 20:00', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 84,
      websiteQualityScore: 60,
      socialMediaActivityScore: 40,
      localSeoScore: 70,
      qrInteractiveScore: 65,
      ecommerceReadyScore: 50,
      whatsappCommerceScore: 85,
      overallIPD: 68
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'DICHO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 93,
    tags: ['Estudiantes', 'Impresión', 'Torrecedeira'],
    hasSmartAgent: true,
    agentName: 'CopyBot Universitario',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 4400,
      googleRating: 4.8,
      googleReviewsCount: 190,
      lastAuditDate: '2026-08-08'
    },
    isDemo: true
  },

  // 9. Navia
  {
    id: 'biz-vigo-21',
    name: 'Clínica Veterinaria & Boutique Pet Navia',
    tradeName: 'PetCare Navia',
    category: 'Salud y Bienestar',
    subcategory: 'Medicina preventiva, peluquería canina y nutrición natural',
    description: 'Atención integral para mascotas en el barrio joven de Navia con planes de salud y nutrición ecológica.',
    address: 'Rúa Teixugueiras, 19',
    street: 'Rúa Teixugueiras',
    neighborhood: 'Navia',
    city: 'Vigo',
    coordinates: { lat: 42.2085, lng: -8.7650 },
    phone: '986 12 77 44',
    whatsapp: '600 66 77 88',
    website: 'https://petcarenavia-demo.vigo.local',
    schedules: [
      { slotName: 'Mañanas', hours: '09:30 - 13:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
      { slotName: 'Ocio / Nocturno', hours: 'Urgencias 24h', isOpen: true, honesty: 'DICHO' }
    ],
    digitalPresence: {
      googleMapsScore: 90,
      websiteQualityScore: 75,
      socialMediaActivityScore: 80,
      localSeoScore: 75,
      qrInteractiveScore: 50,
      ecommerceReadyScore: 40,
      whatsappCommerceScore: 80,
      overallIPD: 73
    },
    honestyMap: {
      identity: 'DICHO',
      schedule: 'DICHO',
      contact: 'DICHO',
      catalog: 'DICHO',
      pricing: 'OBSERVADO'
    },
    provenance: 'VERIFIED',
    confidenceScore: 94,
    tags: ['Mascotas', 'Navia', 'Salud Animal', 'Familias'],
    hasSmartAgent: true,
    agentName: 'PetBot Navia',
    crmStatus: 'cliente',
    metrics: {
      estimatedFootfallDaily: 3600,
      googleRating: 4.9,
      googleReviewsCount: 155,
      lastAuditDate: '2026-08-12'
    },
    isDemo: true
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-vigo-01',
    title: 'Sinergia Cultural + Café Especialidad en Rúa do Príncipe',
    description: 'Librería Mendinho y Café Princesa comparten la misma acera peatonal con alto tránsito familiar y juvenil, pero carecen de una dinámica de recomendación cruzada o ticket combinado.',
    category: 'cross_selling',
    zone: 'Centro / Príncipe',
    street: 'Rúa do Príncipe',
    affectedBusinessIds: ['biz-vigo-01', 'biz-vigo-02'],
    beneficiaryBusinessNames: ['Librería Mendinho', 'Café Princesa'],
    originalSignal: 'Flujo peatonal continuo en Príncipe entre las 17:30 y 19:30 sin interconexión de compras',
    evidence: '92% de coincidencia en perfil de comprador (lectores, profesionales y familias).',
    confidence: 88,
    provenance: 'ESTIMATED',
    estimatedEconomicImpactEur: 3200,
    urgency: 'alta',
    difficulty: 'facil',
    recommendedAction: 'Activar campaña "Pausa con Lectura": 10% descuento en café al mostrar ticket de libro o marcapáginas QR.',
    status: 'propuesta',
    createdAt: '2026-08-14',
    updatedAt: '2026-08-18',
    whyExplanation: 'Proximidad inmediata (30 metros), complementariedad natural de consumo y nulo coste de implementación técnica.'
  },
  {
    id: 'opp-vigo-02',
    title: 'Ruta Gastronómica Marinera + Artesanía en Casco Vello',
    description: 'Afluencia de cruceristas y turistas en el Berbés y Rúa da Pescadería que visitan la zona de ostras pero no descubren las tiendas artesanas de la parte alta.',
    category: 'turismo',
    zone: 'Casco Vello',
    street: 'Rúa da Pescadería',
    affectedBusinessIds: ['biz-vigo-06', 'biz-vigo-07', 'biz-vigo-08'],
    beneficiaryBusinessNames: ['Taberna da Pedra', 'Cerámica Atlántica', 'Vinoteca O Peinador'],
    originalSignal: 'Desembarque de 4.000 cruceristas semanales con concentración del 75% en solo dos calles',
    evidence: 'Dispersión nula del gasto hacia comercio no hostelero.',
    confidence: 84,
    provenance: 'ESTIMATED',
    estimatedEconomicImpactEur: 5400,
    urgency: 'alta',
    difficulty: 'media',
    recommendedAction: 'Crear el Pasaporte QR "Esencia Casco Vello": cata + regalo artesano cerámico con 3 sellos digitales.',
    status: 'activa',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-17',
    whyExplanation: 'Permite desestacionalizar el consumo turístico y repartir el impacto económico en talleres locales.'
  },
  {
    id: 'opp-vigo-03',
    title: 'Brecha de Escaparate Interactivo 24/7 en Rúa Urzáiz',
    description: 'Comercios textiles de Urzáiz apagan su comunicación comercial al cerrar a las 20:30, desaprovechando el paso peatonal nocturno y de ocio.',
    category: 'digitalizacion',
    zone: 'Urzáiz',
    street: 'Rúa de Urzáiz',
    affectedBusinessIds: ['biz-vigo-09', 'biz-vigo-10'],
    beneficiaryBusinessNames: ['Urzáiz Moda & Tendencias', 'Floristería As Lilas'],
    originalSignal: 'Más de 1.800 transeúntes/hora entre las 20:30 y 23:00 con escaparates estáticos a oscuras',
    evidence: '0% de captación digital nocturna de transeúntes.',
    confidence: 80,
    provenance: 'ESTIMATED',
    estimatedEconomicImpactEur: 2800,
    urgency: 'media',
    difficulty: 'facil',
    recommendedAction: 'Instalar QR Inteligente en Escaparate con reserva exprés y catálogo WhatsApp con 5% de descuento nocturno.',
    status: 'detectada',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-18',
    whyExplanation: 'Convierte el escaparate físico en un canal de venta continua sin necesidad de personal nocturno.'
  },
  {
    id: 'opp-vigo-04',
    title: 'Cesta Fresca Semanal y Reparto Conjunto en O Calvario',
    description: 'Frutería Sagunto y Tahona Ramón Nieto disponen de clientes fieles en la peatonal de Calvario pero ambos gestionan repartos aislados.',
    category: 'cluster_calle',
    zone: 'O Calvario',
    street: 'Rúa Sagunto',
    affectedBusinessIds: ['biz-vigo-12', 'biz-vigo-14'],
    beneficiaryBusinessNames: ['Huerta Sagunto', 'Tahona Ramón Nieto'],
    originalSignal: 'Demanda de familias trabajadoras de O Calvario que solicitan pan artesanal junto a fruta fresca',
    evidence: '68% de clientes de la frutería compran pan en el mismo radio de 100m.',
    confidence: 86,
    provenance: 'ESTIMATED',
    estimatedEconomicImpactEur: 2100,
    urgency: 'media',
    difficulty: 'media',
    recommendedAction: 'Lanzar el "Pack Almorzo & Horta do Calvario" con pedido único por WhatsApp y entrega unificada.',
    status: 'propuesta',
    createdAt: '2026-08-12',
    updatedAt: '2026-08-16',
    whyExplanation: 'Reduce costes logísticos a la mitad y aumenta la retención semanal de clientes del barrio.'
  },
  {
    id: 'opp-vigo-05',
    title: 'Pack Bienestar & Running en Praza de América',
    description: 'Deportes Praza América atrae deportistas que demandan nutrición saludable y recuperación tras entrenar en Castrelos.',
    category: 'cross_selling',
    zone: 'As Travesas',
    street: 'Praza de América',
    affectedBusinessIds: ['biz-vigo-17', 'biz-vigo-18'],
    beneficiaryBusinessNames: ['Deportes Praza América', 'Cervecería Castelao'],
    originalSignal: 'Afluencia de 1.200 corredores semanales en el Parque de Castrelos próximo',
    evidence: 'Inexistencia de packs de hidratación y recuperación para grupos deportivos.',
    confidence: 79,
    provenance: 'ESTIMATED',
    estimatedEconomicImpactEur: 1900,
    urgency: 'baja',
    difficulty: 'facil',
    recommendedAction: 'Crear el club "After-Run Castrelos": avituallamiento artesano y ventajas en equipamiento.',
    status: 'detectada',
    createdAt: '2026-08-11',
    updatedAt: '2026-08-15',
    whyExplanation: 'Fomenta el sentido de comunidad deportiva local e incrementa el ticket medio en hostelería.'
  }
];

export const INITIAL_COOPERATION_LINKS: CooperationLink[] = [
  {
    id: 'coop-link-01',
    sourceBusinessId: 'biz-vigo-01',
    sourceBusinessName: 'Librería Mendinho',
    targetBusinessId: 'biz-vigo-02',
    targetBusinessName: 'Café Princesa',
    type: 'cross_selling',
    strength: 92,
    rationale: 'Complementariedad perfecta de lectura y café en el eje peatonal más concurrido de Vigo.',
    sharedAudience: 'Lectores urbanos, profesionales y público cultural',
    estimatedSynergyEur: 3200,
    confidence: 90,
    provenance: 'INFERRED',
    status: 'propuesta'
  },
  {
    id: 'coop-link-02',
    sourceBusinessId: 'biz-vigo-06',
    sourceBusinessName: 'Taberna da Pedra',
    targetBusinessId: 'biz-vigo-07',
    targetBusinessName: 'Cerámica Atlántica',
    type: 'ruta_tematica',
    strength: 85,
    rationale: 'Ruta de experiencia marinera: degustación gastronómica + recuerdo artesanal de autor.',
    sharedAudience: 'Visitantes, cruceristas y gastrónomos de fin de semana',
    estimatedSynergyEur: 4100,
    confidence: 85,
    provenance: 'INFERRED',
    status: 'activa'
  },
  {
    id: 'coop-link-03',
    sourceBusinessId: 'biz-vigo-12',
    sourceBusinessName: 'Huerta Sagunto',
    targetBusinessId: 'biz-vigo-14',
    targetBusinessName: 'Tahona Ramón Nieto',
    type: 'bundle',
    strength: 88,
    rationale: 'Cesta básica de productos frescos y pan artesano para familias de O Calvario.',
    sharedAudience: 'Familias y vecinos de consumo cotidiano de proximidad',
    estimatedSynergyEur: 2400,
    confidence: 87,
    provenance: 'INFERRED',
    status: 'propuesta'
  },
  {
    id: 'coop-link-04',
    sourceBusinessId: 'biz-vigo-15',
    sourceBusinessName: 'Porto de Bouzas',
    targetBusinessId: 'biz-vigo-16',
    targetBusinessName: 'Náutica Alborán',
    type: 'campana_conjunta',
    strength: 81,
    rationale: 'Alianza de la villa marinera: regatas, paseo histórico y gastronomía atlántica.',
    sharedAudience: 'Aficionados a la náutica, visitantes costeros y parejas',
    estimatedSynergyEur: 3600,
    confidence: 82,
    provenance: 'INFERRED',
    status: 'acordada'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-vigo-01',
    name: 'Ruta dos Libros & Café Príncipe',
    objective: 'Fidelizar a 500 lectores locales y dinamizar la tarde comercial en Rúa do Príncipe',
    zone: 'Centro / Príncipe',
    street: 'Rúa do Príncipe',
    participatingBusinessIds: ['biz-vigo-01', 'biz-vigo-02'],
    targetAudience: 'Lectores, estudiantes y profesionales del centro de Vigo',
    durationDays: 30,
    offerDetails: 'Marcapáginas inteligente con QR: 10% en consumición en Café Princesa tras comprar en Mendinho.',
    channels: ['qr_escaparate', 'whatsapp', 'local_pass'],
    qrCodeId: 'QR-VIGO-PRIN-01',
    status: 'activa',
    startDate: '2026-08-01',
    simulatedMetrics: {
      pedestrianImpressions: 18400,
      qrScans: 642,
      conversions: 188,
      totalRevenueEur: 4280
    },
    provenance: 'SIMULATED'
  },
  {
    id: 'camp-vigo-02',
    name: 'Pasaporte Mariñeiro Casco Vello',
    objective: 'Dirigir el flujo turístico hacia talleres de artesanía y vinotecas históricas',
    zone: 'Casco Vello',
    street: 'Rúa da Pescadería',
    participatingBusinessIds: ['biz-vigo-06', 'biz-vigo-07', 'biz-vigo-08'],
    targetAudience: 'Cruceristas y visitantes nacionales de fin de semana',
    durationDays: 45,
    offerDetails: '3 sellos QR en comercios del Casco Vello = degustación gratuita de albariño y pieza de cerámica.',
    channels: ['qr_escaparate', 'social', 'local_pass'],
    qrCodeId: 'QR-VIGO-CV-02',
    status: 'activa',
    startDate: '2026-08-05',
    simulatedMetrics: {
      pedestrianImpressions: 24500,
      qrScans: 980,
      conversions: 312,
      totalRevenueEur: 8750
    },
    provenance: 'SIMULATED'
  },
  {
    id: 'camp-vigo-03',
    name: 'Cesta Km0 Peatonal O Calvario',
    objective: 'Aumentar la cuota de compra recurrente en tiendas tradicionales frente a hipermercados',
    zone: 'O Calvario',
    street: 'Rúa Sagunto',
    participatingBusinessIds: ['biz-vigo-12', 'biz-vigo-14'],
    targetAudience: 'Vecinos y familias de O Calvario',
    durationDays: 60,
    offerDetails: 'Pack semanal Fruta + Pan de Cea con pedido automático vía WhatsApp y 5% de descuento.',
    channels: ['whatsapp', 'qr_escaparate'],
    qrCodeId: 'QR-VIGO-CALV-03',
    status: 'programada',
    startDate: '2026-09-01',
    simulatedMetrics: {
      pedestrianImpressions: 12000,
      qrScans: 310,
      conversions: 94,
      totalRevenueEur: 2350
    },
    provenance: 'SIMULATED'
  }
];

export const INITIAL_DEMAND_SIGNALS: DemandSignal[] = [
  {
    id: 'sig-vigo-01',
    title: 'Alta demanda desatendida de libros infantiles en gallego los sábados tarde',
    category: 'Cultura y Educación',
    zone: 'Centro / Príncipe',
    street: 'Rúa do Príncipe',
    signalOrigin: 'Análisis de búsquedas locales y consultas a pie de calle en zona peatonal',
    intensityScore: 88,
    potentialMarketValueEur: 4800,
    affectedCategories: ['Librería y Papelería', 'Hostelería y Restauración'],
    suggestedAction: 'Programar cuentacuentos mensuales conjuntos entre Librería Mendinho y cafeterías próximas.',
    provenance: 'INFERRED',
    detectedAt: '2026-08-16'
  },
  {
    id: 'sig-vigo-02',
    title: 'Falta de opciones de cena temprana (19:30-21:00) para cruceristas en Casco Vello',
    category: 'Hostelería y Turismo',
    zone: 'Casco Vello',
    street: 'Praza do Berbés',
    signalOrigin: 'Horarios de retorno a buques en el Muelle de Trasatlánticos',
    intensityScore: 92,
    potentialMarketValueEur: 9200,
    affectedCategories: ['Hostelería y Restauración'],
    suggestedAction: 'Adaptar carta de tapas marineras con apertura continuada a las 19:00.',
    provenance: 'OBSERVED',
    detectedAt: '2026-08-14'
  },
  {
    id: 'sig-vigo-03',
    title: 'Creciente demanda de servicios para mascotas y nutrición natural en Navia',
    category: 'Salud y Bienestar',
    zone: 'Navia',
    street: 'Rúa Teixugueiras',
    signalOrigin: 'Densidad censal de mascotas más alta de Vigo con baja oferta especializada',
    intensityScore: 84,
    potentialMarketValueEur: 6100,
    affectedCategories: ['Salud y Bienestar', 'Comercio Minorista'],
    suggestedAction: 'Activar talleres de nutrición canina y pedidos periódicos automáticos vía WhatsApp.',
    provenance: 'INFERRED',
    detectedAt: '2026-08-12'
  }
];

export const INITIAL_OBSERVATORY_INDICES: ObservatoryIndex[] = [
  {
    code: 'IMC',
    name: 'Índice de Madurez Comercial',
    subtitle: 'Nivel medio de digitalización, resiliencia y profesionalización',
    currentValue: 58.4,
    previousValue: 56.1,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Media ponderada del IPD, presencia omnicanal, tasa de digitalización de catálogos y protocolos de atención.',
    formula: 'IMC = 0.35 * IPD_Medio + 0.25 * Omnicanalidad + 0.20 * Resiliencia + 0.20 * ReseñasAuditadas',
    variables: [
      { name: 'IPD Medio de la Zona', weight: 0.35, value: 58.2 },
      { name: 'Disponibilidad WhatsApp/Web', weight: 0.25, value: 62.0 },
      { name: 'Actualización de Horarios', weight: 0.20, value: 54.0 },
      { name: 'Puntuación y Reseñas', weight: 0.20, value: 59.4 }
    ],
    limitations: 'Modelo experimental AhorraAI basado en muestras de comercios auditados en Vigo.',
    confidence: 86
  },
  {
    code: 'IVC',
    name: 'Índice de Visibilidad Comercial',
    subtitle: 'Presencia en mapas, posicionamiento local y tráfico transeúnte',
    currentValue: 66.8,
    previousValue: 64.5,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Evaluación de fichas Google Business, densidad de reseñas verificadas y afluencia peatonal estimada.',
    formula: 'IVC = 0.40 * GoogleMapsIndex + 0.30 * AfluenciaPeatonal + 0.30 * RedesSociales',
    variables: [
      { name: 'Optimización Google Business', weight: 0.40, value: 74.0 },
      { name: 'Tráfico Peatonal Calibrado', weight: 0.30, value: 68.5 },
      { name: 'Actividad en Redes', weight: 0.30, value: 55.4 }
    ],
    limitations: 'El tráfico peatonal procede de calibraciones horarias por zonas piloto.',
    confidence: 84
  },
  {
    code: 'ICC',
    name: 'Índice de Cooperación Comercial',
    subtitle: 'Densidad y efectividad de acuerdos entre comercios locales',
    currentValue: 41.2,
    previousValue: 38.0,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Grafo de conexiones comerciales activas, campañas cooperativas y promociones cruzadas.',
    formula: 'ICC = 0.50 * DensidadGrafoCoop + 0.30 * CampañasActivas + 0.20 * SinergiasConvertidas',
    variables: [
      { name: 'Densidad de Enlaces Cooperativos', weight: 0.50, value: 38.0 },
      { name: 'Participación en Campañas Multinegocio', weight: 0.30, value: 44.5 },
      { name: 'Conversión de Sinergias', weight: 0.20, value: 44.2 }
    ],
    limitations: 'Mide la adopción del protocolo cooperativo AhorraAI en las zonas monitorizadas.',
    confidence: 89
  },
  {
    code: 'IEC',
    name: 'Índice de Evolución Comercial',
    subtitle: 'Velocidad de adaptación y modernización del tejido urbano',
    currentValue: 52.7,
    previousValue: 51.2,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Tasa trimestral de apertura/cierre de canales digitales y nuevos servicios implementados.',
    formula: 'IEC = 0.40 * TasaModernizacion + 0.35 * NuevosCanales + 0.25 * RetenciónComercial',
    variables: [
      { name: 'Modernización Tecnológica', weight: 0.40, value: 50.0 },
      { name: 'Nuevos Canales Activos', weight: 0.35, value: 54.0 },
      { name: 'Supervivencia Comercial', weight: 0.25, value: 55.2 }
    ],
    limitations: 'Requiere histórico trimestral continuo.',
    confidence: 81
  },
  {
    code: 'ISB',
    name: 'Índice Smart Business',
    subtitle: 'Grado de automatización con agentes IA y escaparates inteligentes',
    currentValue: 34.5,
    previousValue: 28.0,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Proporción de comercios con nodo inteligente delegado, QR interactivo y respuestas automatizadas.',
    formula: 'ISB = 0.40 * NodosAgenteActivos + 0.35 * QREscaparates + 0.25 * RespuestasAuto',
    variables: [
      { name: 'Negocios con Agente Delegado', weight: 0.40, value: 36.0 },
      { name: 'Escaparates con QR Dinámico', weight: 0.35, value: 32.0 },
      { name: 'Automatización de Solicitudes', weight: 0.25, value: 35.6 }
    ],
    limitations: 'Índice propio de AhorraAI en fase de despliegue temprano.',
    confidence: 92
  },
  {
    code: 'IOP',
    name: 'Índice de Oportunidad',
    subtitle: 'Volumen de valor económico latente desbloqueable en la ciudad',
    currentValue: 78.9,
    previousValue: 75.4,
    trend: 'up',
    provenance: 'ESTIMATED',
    calculationMethod: 'Suma de oportunidades detectadas por el Opportunity Engine normalizada por número de comercios.',
    formula: 'IOP = 0.45 * OportunidadesNoConvertidas + 0.35 * DemandasInsatisfechas + 0.20 * PotencialSinergias',
    variables: [
      { name: 'Oportunidades de Alto Impacto', weight: 0.45, value: 82.0 },
      { name: 'Señales de Demanda Activas', weight: 0.35, value: 76.5 },
      { name: 'Sinergias No Explotadas', weight: 0.20, value: 76.0 }
    ],
    limitations: 'Calculado a partir de las heurísticas del Opportunity Engine.',
    confidence: 87
  }
];

export const INITIAL_STREETS: StreetIntelligence[] = [
  {
    streetName: 'Rúa do Príncipe',
    zone: 'Centro / Príncipe',
    totalBusinesses: 68,
    streetIntelligenceScore: 84,
    dominantCategories: ['Moda y Textil', 'Joyería y Accesorios', 'Librería y Cultura', 'Cafeterías'],
    cooperationDensity: 65,
    activeOpportunitiesCount: 6,
    activeCampaignsCount: 2,
    digitalMaturityScore: 72,
    pedestrianTrafficRating: 'Muy Alto',
    provenance: 'ESTIMATED',
    calculationExplanation: 'Arteria 100% peatonal con alta concentración de primeras marcas y comercios tradicionales emblemáticos.'
  },
  {
    streetName: 'Rúa de Urzáiz',
    zone: 'Urzáiz',
    totalBusinesses: 94,
    streetIntelligenceScore: 76,
    dominantCategories: ['Moda y Calzado', 'Floristerías', 'Tecnología', 'Servicios'],
    cooperationDensity: 48,
    activeOpportunitiesCount: 8,
    activeCampaignsCount: 1,
    digitalMaturityScore: 64,
    pedestrianTrafficRating: 'Muy Alto',
    provenance: 'ESTIMATED',
    calculationExplanation: 'Eje comercial continuo que une Gran Vía con O Calvario, con gran volumen de paso y alta rotación de clientes.'
  },
  {
    streetName: 'Rúa da Pescadería (Rúa das Ostras)',
    zone: 'Casco Vello',
    totalBusinesses: 32,
    streetIntelligenceScore: 78,
    dominantCategories: ['Hostelería y Restauración', 'Artesanía', 'Comercio Turístico'],
    cooperationDensity: 72,
    activeOpportunitiesCount: 4,
    activeCampaignsCount: 2,
    digitalMaturityScore: 68,
    pedestrianTrafficRating: 'Alto',
    provenance: 'ESTIMATED',
    calculationExplanation: 'Enclave turístico emblemático con fuerte estacionalidad y gran potencial para rutas gastronómicas.'
  },
  {
    streetName: 'Peatonal do Calvario (Rúa Urzáiz alta / Sagunto)',
    zone: 'O Calvario',
    totalBusinesses: 82,
    streetIntelligenceScore: 70,
    dominantCategories: ['Alimentación Tradicional', 'Mercado de Abastos', 'Ferreterías', 'Comercio Textil'],
    cooperationDensity: 52,
    activeOpportunitiesCount: 7,
    activeCampaignsCount: 1,
    digitalMaturityScore: 54,
    pedestrianTrafficRating: 'Alto',
    provenance: 'ESTIMATED',
    calculationExplanation: 'Barrio con fuerte identidad vecinal, mercado tradicional muy activo y fidelidad de compra diaria.'
  },
  {
    streetName: 'Paseo de Bouzas & Praza da Alameda',
    zone: 'Bouzas',
    totalBusinesses: 45,
    streetIntelligenceScore: 74,
    dominantCategories: ['Restauración Marinera', 'Náutica', 'Comercio de Proximidad'],
    cooperationDensity: 58,
    activeOpportunitiesCount: 5,
    activeCampaignsCount: 1,
    digitalMaturityScore: 66,
    pedestrianTrafficRating: 'Medio',
    provenance: 'ESTIMATED',
    calculationExplanation: 'Zona marítima histórica con gran afluencia de fin de semana y tapeo costero.'
  }
];

export const INITIAL_NEIGHBORHOODS: NeighborhoodIntelligence[] = [
  {
    neighborhoodName: 'Centro / Príncipe',
    totalBusinesses: 145,
    neighborhoodScore: 82,
    diversityIndex: 88,
    cooperationIndex: 64,
    unmetDemandCount: 4,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Mayor densidad comercial y tráfico de la ciudad.'
  },
  {
    neighborhoodName: 'Casco Vello',
    totalBusinesses: 88,
    neighborhoodScore: 79,
    diversityIndex: 75,
    cooperationIndex: 70,
    unmetDemandCount: 5,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Foco turístico y gastronómico con talleres de autor.'
  },
  {
    neighborhoodName: 'Urzáiz',
    totalBusinesses: 160,
    neighborhoodScore: 75,
    diversityIndex: 82,
    cooperationIndex: 50,
    unmetDemandCount: 6,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Eje neurálgico comercial de alta conectividad urbana.'
  },
  {
    neighborhoodName: 'O Calvario',
    totalBusinesses: 130,
    neighborhoodScore: 71,
    diversityIndex: 79,
    cooperationIndex: 54,
    unmetDemandCount: 5,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Comercio vecinal de proximidad y producto fresco.'
  },
  {
    neighborhoodName: 'Bouzas',
    totalBusinesses: 65,
    neighborhoodScore: 73,
    diversityIndex: 70,
    cooperationIndex: 56,
    unmetDemandCount: 3,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Identidad marinera, náutica y ocio gastronómico.'
  },
  {
    neighborhoodName: 'As Travesas',
    totalBusinesses: 110,
    neighborhoodScore: 69,
    diversityIndex: 76,
    cooperationIndex: 46,
    unmetDemandCount: 4,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Nodo urbano confluente hacia Castrelos y Balaídos.'
  },
  {
    neighborhoodName: 'Navia',
    totalBusinesses: 58,
    neighborhoodScore: 68,
    diversityIndex: 65,
    cooperationIndex: 42,
    unmetDemandCount: 7,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Barrio joven residencial con oportunidades en servicios familiares y mascotas.'
  },
  {
    neighborhoodName: 'Teis',
    totalBusinesses: 72,
    neighborhoodScore: 65,
    diversityIndex: 68,
    cooperationIndex: 40,
    unmetDemandCount: 4,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Comercio tradicional en Sanjurjo Badía.'
  },
  {
    neighborhoodName: 'Torrecedeira',
    totalBusinesses: 52,
    neighborhoodScore: 67,
    diversityIndex: 64,
    cooperationIndex: 45,
    unmetDemandCount: 3,
    provenance: 'ESTIMATED',
    calculationExplanation: 'Entorno universitario y servicios técnicos.'
  }
];

export const INITIAL_AGENTS: AgentDefinition[] = [
  { id: 'ag-01', code: 'SCOUT', name: 'Scout de Datos', roleDescription: 'Rastrea y recopila información pública, horarios y presencia digital de comercios.', status: 'completed', runsCount: 48, estimatedCostEur: 0.12, tokensConsumed: 24500 },
  { id: 'ag-02', code: 'CLEANER', name: 'Data Cleaner & Normalizer', roleDescription: 'Normaliza direcciones, categorizaciones y elimina inconsistencias lógicas.', status: 'completed', runsCount: 48, estimatedCostEur: 0.08, tokensConsumed: 18200 },
  { id: 'ag-03', code: 'BI', name: 'Business Intelligence', roleDescription: 'Genera diagnósticos FODA, calcula el IPD y redacta hojas de ruta a 30/90 días.', status: 'idle', runsCount: 36, estimatedCostEur: 0.35, tokensConsumed: 72000 },
  { id: 'ag-04', code: 'DEMAND', name: 'Analista de Demanda', roleDescription: 'Detecta señales tempranas de demanda insatisfecha y flujos peatonales en Vigo.', status: 'idle', runsCount: 22, estimatedCostEur: 0.19, tokensConsumed: 38400 },
  { id: 'ag-05', code: 'OPPORTUNITY', name: 'Opportunity Engine', roleDescription: 'Transforma señales en oportunidades comerciales estructuradas y cuantificadas.', status: 'idle', runsCount: 29, estimatedCostEur: 0.28, tokensConsumed: 56000 },
  { id: 'ag-06', code: 'COOPERATION', name: 'Cooperation Agent', roleDescription: 'Descubre complementariedades entre negocios y crea propuestas de colaboración.', status: 'idle', runsCount: 25, estimatedCostEur: 0.31, tokensConsumed: 62000 },
  { id: 'ag-07', code: 'OFFER', name: 'Generador de Ofertas', roleDescription: 'Redacta textos persuasivos para escaparates, WhatsApp comercial y redes.', status: 'idle', runsCount: 19, estimatedCostEur: 0.14, tokensConsumed: 28000 },
  { id: 'ag-08', code: 'CAMPAIGN', name: 'Campaign Agent', roleDescription: 'Coordina la activación de campañas con QR dinámicos y seguimiento de conversiones.', status: 'idle', runsCount: 15, estimatedCostEur: 0.22, tokensConsumed: 44000 },
  { id: 'ag-09', code: 'CUSTOMER', name: 'Customer Agent', roleDescription: 'Resuelve dudas de ciudadanos y recomienda comercios locales afines a sus necesidades.', status: 'idle', runsCount: 64, estimatedCostEur: 0.45, tokensConsumed: 91000 },
  { id: 'ag-10', code: 'OBSERVATORY', name: 'Observatory Agent', roleDescription: 'Calcula periódicamente los índices IMC, IVC, ICC, IEC, ISB e IOP.', status: 'completed', runsCount: 12, estimatedCostEur: 0.18, tokensConsumed: 36000 },
  { id: 'ag-11', code: 'EVALUATION', name: 'Evaluation Agent', roleDescription: 'Evalúa el impacto real de las acciones frente a las estimaciones iniciales.', status: 'idle', runsCount: 14, estimatedCostEur: 0.15, tokensConsumed: 30000 },
  { id: 'ag-12', code: 'GOVERNANCE', name: 'Governance & Truthfulness', roleDescription: 'Supervisa la honestidad estructural (DICHO/OBSERVADO/SIN_CONFIRMAR) y la privacidad.', status: 'completed', runsCount: 52, estimatedCostEur: 0.16, tokensConsumed: 32000 }
];

export const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-01',
    title: 'Impacto de QR con Mensaje Dinámico vs QR Estático en Escaparates',
    hypothesis: 'Un código QR con texto que cambia según la franja horaria (Mañanas/Tardes/Noches) incrementa un 40% los escaneos frente a un QR genérico.',
    targetZone: 'Centro / Príncipe',
    variables: [
      { name: 'Mensaje de Escaparate', controlValue: 'Escanea para ver catálogo', variantValue: '🌙 ¿Vienes de noche? Reserva para mañana y ahorra un 10%' },
      { name: 'Llamada a la Acción (CTA)', controlValue: 'Más información', variantValue: 'Desbloquear Oferta Nocturna' }
    ],
    durationDays: 14,
    status: 'concluido',
    scansControl: 142,
    scansVariant: 268,
    conversionControlPercent: 12.4,
    conversionVariantPercent: 21.8,
    conclusion: 'Hipótesis validada: Los mensajes nocturnos contextuales aumentaron los escaneos en un 88.7% y la conversión en un 75.8%.',
    provenance: 'SIMULATED'
  },
  {
    id: 'exp-02',
    title: 'Efecto de Ticket Cruzado (Librería + Cafetería) en Retención Local',
    hypothesis: 'Ofrecer un vale de 1€ de café al comprar un libro genera una tasa de canje superior al 25% y atrae clientes en horas valle.',
    targetZone: 'Centro / Príncipe',
    variables: [
      { name: 'Incentivo Cruzado', controlValue: 'Sin incentivo', variantValue: '1€ descuento en Café Princesa' },
      { name: 'Soporte', controlValue: 'Ticket térmico convencional', variantValue: 'Marcapáginas con QR interactivo' }
    ],
    durationDays: 21,
    status: 'en_ejecucion',
    scansControl: 50,
    scansVariant: 188,
    conversionControlPercent: 5.0,
    conversionVariantPercent: 29.2,
    conclusion: 'En curso: Tendencia muy positiva con un 29.2% de redención efectiva en la primera quincena.',
    provenance: 'SIMULATED'
  }
];
