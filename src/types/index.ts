// AhorraAI v4 - Local Intelligence & Cooperative Commerce OS Types

export type HonestyStatus = 'DICHO' | 'OBSERVADO' | 'SIN_CONFIRMAR';

export type DataProvenance = 
  | 'VERIFIED'    // Dato verificado oficialmente
  | 'OBSERVED'    // Dato observado por rastreo o en calle
  | 'INFERRED'    // Inferencia analítica de IA
  | 'ESTIMATED'   // Estimación numérica heurística
  | 'HYPOTHESIS'  // Hipótesis experimental
  | 'SIMULATED';  // Dato sintético de simulación

export type OpportunityStatus = 
  | 'detectada' 
  | 'en_analisis'
  | 'analizando' 
  | 'en_negociacion'
  | 'propuesta' 
  | 'aprobada' 
  | 'en_marcha'
  | 'activa' 
  | 'medida'
  | 'convertida' 
  | 'descartada' 
  | 'archivada'
  | 'cerrada';

export type OpportunityUrgency = 'baja' | 'media' | 'alta' | 'critica';
export type OpportunityDifficulty = 'facil' | 'media' | 'compleja';

export type CooperationType = 
  | 'complementario' 
  | 'cross_selling' 
  | 'bundle' 
  | 'ruta_tematica' 
  | 'proveedor_local' 
  | 'flujo_peatonal' 
  | 'campana_conjunta'
  | 'afinidad_demanda';

export type CampaignStatus = 
  | 'borrador' 
  | 'revision' 
  | 'programada' 
  | 'activa' 
  | 'pausada' 
  | 'finalizada';

export type VigoZone = 
  | 'Centro / Príncipe'
  | 'Urzáiz'
  | 'Casco Vello'
  | 'O Calvario'
  | 'As Travesas'
  | 'Bouzas'
  | 'Teis'
  | 'Torrecedeira'
  | 'Navia';

export type BusinessCategory = 
  | 'Comercio Minorista'
  | 'Hostelería y Restauración'
  | 'Librería y Papelería'
  | 'Moda y Textil'
  | 'Salud y Bienestar'
  | 'Alimentación Tradicional'
  | 'Servicios Profesionales'
  | 'Artesanía y Diseño'
  | 'Cultura y Ocio'
  | 'Tecnología y Reparación';

export interface ScheduleSlot {
  slotName: 'Mañanas' | 'Tarde Comercial' | 'Ocio / Nocturno';
  hours: string;
  isOpen: boolean;
  honesty: HonestyStatus;
}

export interface DigitalPresenceBreakdown {
  googleMapsScore: number;       // 0-100
  websiteQualityScore: number;    // 0-100
  socialMediaActivityScore: number; // 0-100
  localSeoScore: number;         // 0-100
  qrInteractiveScore: number;    // 0-100
  ecommerceReadyScore: number;   // 0-100
  whatsappCommerceScore: number; // 0-100
  overallIPD: number;            // 0-100 (Índice de Presencia Digital)
}

export interface Business {
  id: string;
  name: string;
  tradeName: string;
  category: BusinessCategory;
  subcategory: string;
  description: string;
  address: string;
  street: string;
  neighborhood: VigoZone;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  instagram?: string;
  googleMapsUrl?: string;
  schedules: ScheduleSlot[];
  digitalPresence: DigitalPresenceBreakdown;
  honestyMap: {
    identity: HonestyStatus;
    schedule: HonestyStatus;
    contact: HonestyStatus;
    catalog: HonestyStatus;
    pricing: HonestyStatus;
  };
  provenance: DataProvenance;
  confidenceScore: number; // 0 - 100
  tags: string[];
  hasSmartAgent: boolean;
  agentName?: string;
  crmStatus: 'descubierto' | 'investigado' | 'contacto_pendiente' | 'contactado' | 'interesado' | 'demo' | 'propuesta' | 'piloto' | 'cliente' | 'descartado';
  metrics: {
    estimatedFootfallDaily: number;
    googleRating: number;
    googleReviewsCount: number;
    lastAuditDate: string;
  };
  isDemo: boolean;
}

export interface BusinessDiagnostic {
  businessId: string;
  businessName: string;
  generatedAt: string;
  provenance: DataProvenance;
  confidence: number;
  overallHealthScore: number; // 0-100
  strengths: { point: string; evidence: string; confidence: number }[];
  weaknesses: { point: string; evidence: string; confidence: number }[];
  opportunities: { point: string; potentialGain: string; confidence: number }[];
  threats: { point: string; riskLevel: string; confidence: number }[];
  actionPlan: {
    immediate: { action: string; impact: 'Alto' | 'Medio' | 'Bajo'; effort: 'Bajo' | 'Medio' | 'Alto'; provenance: DataProvenance }[];
    day30: { action: string; impact: 'Alto' | 'Medio' | 'Bajo'; effort: 'Bajo' | 'Medio' | 'Alto'; provenance: DataProvenance }[];
    day90: { action: string; impact: 'Alto' | 'Medio' | 'Bajo'; effort: 'Bajo' | 'Medio' | 'Alto'; provenance: DataProvenance }[];
  };
  explanation: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'trafico' | 'cross_selling' | 'digitalizacion' | 'turismo' | 'estacional' | 'cluster_calle' | 'demanda_insatisfecha';
  zone: VigoZone;
  street: string;
  affectedBusinessIds: string[];
  beneficiaryBusinessNames: string[];
  originalSignal: string;
  evidence: string;
  confidence: number; // 0 - 100
  provenance: DataProvenance;
  estimatedEconomicImpactEur: number;
  urgency: OpportunityUrgency;
  difficulty: OpportunityDifficulty;
  recommendedAction: string;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
  whyExplanation: string;
}

export interface CooperationLink {
  id: string;
  sourceBusinessId: string;
  sourceBusinessName: string;
  targetBusinessId: string;
  targetBusinessName: string;
  type: CooperationType;
  strength: number; // 0-100
  rationale: string;
  sharedAudience: string;
  estimatedSynergyEur: number;
  confidence: number;
  provenance: DataProvenance;
  status: 'detectada' | 'propuesta' | 'acordada' | 'activa';
}

export interface CooperationProposal {
  id: string;
  title: string;
  participatingBusinessIds: string[];
  participatingBusinessNames: string[];
  zone: VigoZone;
  objective: string;
  targetPublic: string;
  jointOfferDescription: string;
  incentive: string;
  durationWeeks: number;
  channels: string[];
  qrPayloadUrl: string;
  whatsappPitchText: string;
  shopWindowText: string;
  provenance: DataProvenance;
  whyComplementary: string;
  status: 'borrador' | 'enviada' | 'aceptada' | 'en_marcha';
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  zone: VigoZone;
  street: string;
  participatingBusinessIds: string[];
  targetAudience: string;
  durationDays: number;
  offerDetails: string;
  channels: ('qr_escaparate' | 'whatsapp' | 'social' | 'local_pass' | 'tarjeta_fidelidad_cruzada')[];
  qrCodeId: string;
  status: CampaignStatus;
  startDate: string;
  simulatedMetrics: {
    pedestrianImpressions: number;
    qrScans: number;
    conversions: number;
    totalRevenueEur: number;
  };
  provenance: DataProvenance;
}

export interface SmartShopWindowConfig {
  businessId: string;
  businessName: string;
  headline: string;
  subheadline: string;
  activePromoText: string;
  qrDestinationUrl: string;
  qrLabel: string;
  currentScheduleSlot: 'Mañanas' | 'Tarde Comercial' | 'Ocio / Nocturno';
  themeColor: string;
  displayActive: boolean;
  metrics: {
    pedestriansExposed: number;
    pedestriansStopped: number;
    scansCount: number;
    conversionsCount: number;
  };
  provenance: DataProvenance;
}

export interface DemandSignal {
  id: string;
  title: string;
  category: string;
  zone: VigoZone;
  street?: string;
  signalOrigin: string; // e.g. "Búsquedas de productos sin stock local", "Tráfico de cruceros en Casco Vello"
  intensityScore: number; // 0-100
  potentialMarketValueEur: number;
  affectedCategories: string[];
  suggestedAction: string;
  provenance: DataProvenance;
  detectedAt: string;
}

export interface ObservatoryIndex {
  code: 'IMC' | 'IVC' | 'ICC' | 'IEC' | 'ISB' | 'IOP';
  name: string;
  subtitle: string;
  currentValue: number; // 0 - 100
  previousValue: number;
  trend: 'up' | 'down' | 'neutral';
  provenance: DataProvenance;
  calculationMethod: string;
  formula: string;
  variables: { name: string; weight: number; value: number }[];
  limitations: string;
  confidence: number;
}

export interface AgentDefinition {
  id: string;
  code: string;
  name: string;
  roleDescription: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  lastRun?: string;
  runsCount: number;
  estimatedCostEur: number;
  tokensConsumed: number;
}

export interface AgentExecutionLog {
  id: string;
  agentCode: string;
  agentName: string;
  startedAt: string;
  endedAt?: string;
  status: 'running' | 'success' | 'failed';
  inputSummary: string;
  outputSummary: string;
  details?: Record<string, any>;
  costTokens: number;
  costEur: number;
  provenance: DataProvenance;
}

export interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  targetZone: VigoZone;
  variables: {
    name: string;
    controlValue: string;
    variantValue: string;
  }[];
  durationDays: number;
  status: 'diseño' | 'en_ejecucion' | 'concluido';
  scansControl: number;
  scansVariant: number;
  conversionControlPercent: number;
  conversionVariantPercent: number;
  conclusion: string;
  provenance: DataProvenance;
}

export interface SimulationParams {
  businessCount: number;
  averageDailyFootfall: number;
  windowScanRatePercent: number;
  scanToCustomerConversionPercent: number;
  averageTicketEur: number;
  cooperationAdoptionRatePercent: number;
  repeatPurchaseFrequency: number;
  networkEffectCoefficient: number;
}

export interface SimulationResult {
  conservative: {
    monthlyGrossVolumeEur: number;
    monthlyParticipatingShopsIncome: number;
    activeInteractions: number;
    cooperativePairsActive: number;
  };
  baseline: {
    monthlyGrossVolumeEur: number;
    monthlyParticipatingShopsIncome: number;
    activeInteractions: number;
    cooperativePairsActive: number;
  };
  optimistic: {
    monthlyGrossVolumeEur: number;
    monthlyParticipatingShopsIncome: number;
    activeInteractions: number;
    cooperativePairsActive: number;
  };
  provenance: DataProvenance;
}

export interface StreetIntelligence {
  streetName: string;
  zone: VigoZone;
  totalBusinesses: number;
  streetIntelligenceScore: number; // 0 - 100
  dominantCategories: string[];
  cooperationDensity: number; // 0 - 100
  activeOpportunitiesCount: number;
  activeCampaignsCount: number;
  digitalMaturityScore: number;
  pedestrianTrafficRating: 'Muy Alto' | 'Alto' | 'Medio' | 'Bajo';
  provenance: DataProvenance;
  calculationExplanation: string;
}

export interface NeighborhoodIntelligence {
  neighborhoodName: VigoZone;
  totalBusinesses: number;
  neighborhoodScore: number; // 0-100
  diversityIndex: number; // 0-100
  cooperationIndex: number; // 0-100
  unmetDemandCount: number;
  provenance: DataProvenance;
  calculationExplanation: string;
}

export interface CommercialProposalExport {
  businessName: string;
  contactName: string;
  date: string;
  detectedPainPoints: string[];
  ahorraAiInterventions: string[];
  cooperationOpportunities: string[];
  actionRoadmap: { timeframe: string; action: string; expectedOutcome: string }[];
  metricsToTrack: string[];
  disclaimer: string;
}
