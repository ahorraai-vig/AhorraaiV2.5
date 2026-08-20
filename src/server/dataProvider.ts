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
  AgentExecutionLog,
  Experiment,
  SimulationParams,
  SimulationResult,
  BusinessDiagnostic,
  CommercialProposalExport,
  VigoZone
} from '../types';

import { 
  INITIAL_BUSINESSES, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_COOPERATION_LINKS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_DEMAND_SIGNALS, 
  INITIAL_OBSERVATORY_INDICES, 
  INITIAL_STREETS, 
  INITIAL_NEIGHBORHOODS, 
  INITIAL_AGENTS, 
  INITIAL_EXPERIMENTS 
} from '../data/vigo-demo-data';

export interface IDataProvider {
  getBusinesses(zone?: string, category?: string, search?: string): Promise<Business[]>;
  getBusinessById(id: string): Promise<Business | null>;
  createBusiness(business: Partial<Business>): Promise<Business>;
  updateBusiness(id: string, updates: Partial<Business>): Promise<Business | null>;
  deleteBusiness(id: string): Promise<boolean>;
  
  getOpportunities(zone?: string, status?: string): Promise<Opportunity[]>;
  getOpportunityById(id: string): Promise<Opportunity | null>;
  updateOpportunityStatus(id: string, status: any): Promise<Opportunity | null>;
  createOpportunity(opp: Partial<Opportunity>): Promise<Opportunity>;

  getCooperationLinks(zone?: string): Promise<CooperationLink[]>;
  getCooperationProposals(): Promise<CooperationProposal[]>;
  createCooperationProposal(proposal: Partial<CooperationProposal>): Promise<CooperationProposal>;

  getCampaigns(zone?: string): Promise<Campaign[]>;
  getCampaignById(id: string): Promise<Campaign | null>;
  createCampaign(campaign: Partial<Campaign>): Promise<Campaign>;
  updateCampaignStatus(id: string, status: any): Promise<Campaign | null>;

  getDemandSignals(zone?: string): Promise<DemandSignal[]>;
  getObservatoryIndices(): Promise<ObservatoryIndex[]>;
  updateObservatoryWeights(code: string, variables: { name: string; weight: number; value: number }[]): Promise<ObservatoryIndex | null>;

  getStreets(zone?: string): Promise<StreetIntelligence[]>;
  getNeighborhoods(): Promise<NeighborhoodIntelligence[]>;

  getAgents(): Promise<AgentDefinition[]>;
  getAgentLogs(): Promise<AgentExecutionLog[]>;
  addAgentLog(log: Omit<AgentExecutionLog, 'id'>): Promise<AgentExecutionLog>;

  getExperiments(): Promise<Experiment[]>;
  createExperiment(exp: Partial<Experiment>): Promise<Experiment>;

  runEconomicSimulation(params: SimulationParams): Promise<SimulationResult>;

  resetToSeed(): Promise<void>;
}

class InMemoryDataProvider implements IDataProvider {
  private businesses: Business[] = JSON.parse(JSON.stringify(INITIAL_BUSINESSES));
  private opportunities: Opportunity[] = JSON.parse(JSON.stringify(INITIAL_OPPORTUNITIES));
  private cooperationLinks: CooperationLink[] = JSON.parse(JSON.stringify(INITIAL_COOPERATION_LINKS));
  private cooperationProposals: CooperationProposal[] = [];
  private campaigns: Campaign[] = JSON.parse(JSON.stringify(INITIAL_CAMPAIGNS));
  private demandSignals: DemandSignal[] = JSON.parse(JSON.stringify(INITIAL_DEMAND_SIGNALS));
  private observatoryIndices: ObservatoryIndex[] = JSON.parse(JSON.stringify(INITIAL_OBSERVATORY_INDICES));
  private streets: StreetIntelligence[] = JSON.parse(JSON.stringify(INITIAL_STREETS));
  private neighborhoods: NeighborhoodIntelligence[] = JSON.parse(JSON.stringify(INITIAL_NEIGHBORHOODS));
  private agents: AgentDefinition[] = JSON.parse(JSON.stringify(INITIAL_AGENTS));
  private agentLogs: AgentExecutionLog[] = [
    {
      id: 'log-01',
      agentCode: 'SCOUT',
      agentName: 'Scout de Datos',
      startedAt: '2026-08-19T10:00:00Z',
      endedAt: '2026-08-19T10:00:15Z',
      status: 'success',
      inputSummary: 'Escaneo de comercios en Rúa do Príncipe y Casco Vello',
      outputSummary: 'Actualizados 21 perfiles con horarios y presencia en Google Maps',
      costTokens: 1450,
      costEur: 0.003,
      provenance: 'OBSERVED'
    },
    {
      id: 'log-02',
      agentCode: 'BI',
      agentName: 'Business Intelligence',
      startedAt: '2026-08-19T10:05:00Z',
      endedAt: '2026-08-19T10:05:22Z',
      status: 'success',
      inputSummary: 'Diagnóstico FODA para Librería Mendinho',
      outputSummary: 'Generado plan de acción inmediato a 3 fases con IPD 51/100',
      costTokens: 2100,
      costEur: 0.005,
      provenance: 'INFERRED'
    }
  ];
  private experiments: Experiment[] = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));

  async getBusinesses(zone?: string, category?: string, search?: string): Promise<Business[]> {
    return this.businesses.filter(b => {
      if (!b) return false;
      if (zone && zone !== 'all' && b.neighborhood !== zone) return false;
      if (category && category !== 'all' && b.category !== category) return false;
      if (search) {
        const query = (search || '').toLowerCase();
        const matchesName = (b.name || '').toLowerCase().includes(query) || (b.tradeName || '').toLowerCase().includes(query);
        const matchesStreet = (b.street || '').toLowerCase().includes(query) || (b.address || '').toLowerCase().includes(query);
        const matchesDesc = (b.description || '').toLowerCase().includes(query);
        const matchesTag = Array.isArray(b.tags) && b.tags.some(t => (t || '').toLowerCase().includes(query));
        if (!matchesName && !matchesStreet && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }

  async getBusinessById(id: string): Promise<Business | null> {
    return this.businesses.find(b => b.id === id) || null;
  }

  async createBusiness(data: Partial<Business>): Promise<Business> {
    const newBiz: Business = {
      id: `biz-vigo-${Date.now()}`,
      name: data.name || 'Nuevo Negocio',
      tradeName: data.tradeName || data.name || 'Nuevo Negocio',
      category: data.category || 'Comercio Minorista',
      subcategory: data.subcategory || 'Especialidad local',
      description: data.description || 'Comercio en proceso de auditoría AhorraAI',
      address: data.address || 'Vigo, Galicia',
      street: data.street || 'Rúa Urzáiz',
      neighborhood: data.neighborhood || 'Centro / Príncipe',
      city: 'Vigo',
      coordinates: data.coordinates || { lat: 42.2384, lng: -8.7231 },
      phone: data.phone,
      whatsapp: data.whatsapp,
      website: data.website,
      instagram: data.instagram,
      schedules: data.schedules || [
        { slotName: 'Mañanas', hours: '10:00 - 13:30', isOpen: true, honesty: 'DICHO' },
        { slotName: 'Tarde Comercial', hours: '16:30 - 20:30', isOpen: true, honesty: 'DICHO' },
        { slotName: 'Ocio / Nocturno', hours: 'Cerrado', isOpen: false, honesty: 'DICHO' }
      ],
      digitalPresence: data.digitalPresence || {
        googleMapsScore: 50,
        websiteQualityScore: 20,
        socialMediaActivityScore: 30,
        localSeoScore: 30,
        qrInteractiveScore: 10,
        ecommerceReadyScore: 10,
        whatsappCommerceScore: 40,
        overallIPD: 35
      },
      honestyMap: data.honestyMap || {
        identity: 'DICHO',
        schedule: 'DICHO',
        contact: 'DICHO',
        catalog: 'SIN_CONFIRMAR',
        pricing: 'SIN_CONFIRMAR'
      },
      provenance: 'OBSERVED',
      confidenceScore: 75,
      tags: data.tags || ['Nuevo', 'Vigo'],
      hasSmartAgent: false,
      crmStatus: 'descubierto',
      metrics: {
        estimatedFootfallDaily: 2500,
        googleRating: 4.5,
        googleReviewsCount: 10,
        lastAuditDate: new Date().toISOString().split('T')[0]
      },
      isDemo: true
    };
    this.businesses.unshift(newBiz);
    return newBiz;
  }

  async updateBusiness(id: string, updates: Partial<Business>): Promise<Business | null> {
    const idx = this.businesses.findIndex(b => b.id === id);
    if (idx === -1) return null;
    this.businesses[idx] = { ...this.businesses[idx], ...updates };
    return this.businesses[idx];
  }

  async deleteBusiness(id: string): Promise<boolean> {
    const prevLen = this.businesses.length;
    this.businesses = this.businesses.filter(b => b.id !== id);
    return this.businesses.length < prevLen;
  }

  async getOpportunities(zone?: string, status?: string): Promise<Opportunity[]> {
    return this.opportunities.filter(o => {
      if (zone && zone !== 'all' && o.zone !== zone) return false;
      if (status && status !== 'all' && o.status !== status) return false;
      return true;
    });
  }

  async getOpportunityById(id: string): Promise<Opportunity | null> {
    return this.opportunities.find(o => o.id === id) || null;
  }

  async updateOpportunityStatus(id: string, status: any): Promise<Opportunity | null> {
    const opp = this.opportunities.find(o => o.id === id);
    if (!opp) return null;
    opp.status = status;
    opp.updatedAt = new Date().toISOString().split('T')[0];
    return opp;
  }

  async createOpportunity(opp: Partial<Opportunity>): Promise<Opportunity> {
    const newOpp: Opportunity = {
      id: `opp-vigo-${Date.now()}`,
      title: opp.title || 'Nueva Oportunidad Comercial',
      description: opp.description || '',
      category: opp.category || 'cross_selling',
      zone: opp.zone || 'Centro / Príncipe',
      street: opp.street || 'Rúa do Príncipe',
      affectedBusinessIds: opp.affectedBusinessIds || [],
      beneficiaryBusinessNames: opp.beneficiaryBusinessNames || [],
      originalSignal: opp.originalSignal || 'Señal de demanda detectada por AhorraAI',
      evidence: opp.evidence || 'Evidencia heurística',
      confidence: opp.confidence || 85,
      provenance: 'ESTIMATED',
      estimatedEconomicImpactEur: opp.estimatedEconomicImpactEur || 2500,
      urgency: opp.urgency || 'media',
      difficulty: opp.difficulty || 'facil',
      recommendedAction: opp.recommendedAction || '',
      status: 'detectada',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      whyExplanation: opp.whyExplanation || 'Oportunidad identificada por afinidad geográfica y de clientela.'
    };
    this.opportunities.unshift(newOpp);
    return newOpp;
  }

  async getCooperationLinks(zone?: string): Promise<CooperationLink[]> {
    return this.cooperationLinks;
  }

  async getCooperationProposals(): Promise<CooperationProposal[]> {
    return this.cooperationProposals;
  }

  async createCooperationProposal(data: Partial<CooperationProposal>): Promise<CooperationProposal> {
    const newProp: CooperationProposal = {
      id: `prop-coop-${Date.now()}`,
      title: data.title || 'Propuesta de Cooperación Comercial',
      participatingBusinessIds: data.participatingBusinessIds || [],
      participatingBusinessNames: data.participatingBusinessNames || [],
      zone: data.zone || 'Centro / Príncipe',
      objective: data.objective || 'Incrementar afluencia y compras cruzadas',
      targetPublic: data.targetPublic || 'Vecinos y visitantes',
      jointOfferDescription: data.jointOfferDescription || '',
      incentive: data.incentive || 'Beneficio cruzado con código QR',
      durationWeeks: data.durationWeeks || 4,
      channels: data.channels || ['qr_escaparate', 'whatsapp'],
      qrPayloadUrl: data.qrPayloadUrl || `https://ahorra.ai/coop/${Date.now()}`,
      whatsappPitchText: data.whatsappPitchText || '',
      shopWindowText: data.shopWindowText || '',
      provenance: 'INFERRED',
      whyComplementary: data.whyComplementary || 'Complementariedad natural en la misma zona de influencia',
      status: 'borrador'
    };
    this.cooperationProposals.unshift(newProp);
    return newProp;
  }

  async getCampaigns(zone?: string): Promise<Campaign[]> {
    return this.campaigns.filter(c => {
      if (zone && zone !== 'all' && c.zone !== zone) return false;
      return true;
    });
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    return this.campaigns.find(c => c.id === id) || null;
  }

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    const newCamp: Campaign = {
      id: `camp-vigo-${Date.now()}`,
      name: data.name || 'Nueva Campaña Comercial',
      objective: data.objective || 'Dinamización comercial',
      zone: data.zone || 'Centro / Príncipe',
      street: data.street || 'Rúa do Príncipe',
      participatingBusinessIds: data.participatingBusinessIds || [],
      targetAudience: data.targetAudience || 'Vecinos de la zona',
      durationDays: data.durationDays || 30,
      offerDetails: data.offerDetails || 'Promoción cruzada AhorraAI',
      channels: data.channels || ['qr_escaparate', 'whatsapp'],
      qrCodeId: `QR-VIGO-${Date.now().toString().slice(-4)}`,
      status: 'programada',
      startDate: new Date().toISOString().split('T')[0],
      simulatedMetrics: {
        pedestrianImpressions: 5000,
        qrScans: 150,
        conversions: 45,
        totalRevenueEur: 1200
      },
      provenance: 'SIMULATED'
    };
    this.campaigns.unshift(newCamp);
    return newCamp;
  }

  async updateCampaignStatus(id: string, status: any): Promise<Campaign | null> {
    const camp = this.campaigns.find(c => c.id === id);
    if (!camp) return null;
    camp.status = status;
    return camp;
  }

  async getDemandSignals(zone?: string): Promise<DemandSignal[]> {
    return this.demandSignals.filter(s => {
      if (zone && zone !== 'all' && s.zone !== zone) return false;
      return true;
    });
  }

  async getObservatoryIndices(): Promise<ObservatoryIndex[]> {
    return this.observatoryIndices;
  }

  async updateObservatoryWeights(code: string, variables: { name: string; weight: number; value: number }[]): Promise<ObservatoryIndex | null> {
    const idx = this.observatoryIndices.find(i => i.code === code);
    if (!idx) return null;
    idx.variables = variables;
    // recalculate value as sum of weight * value
    const totalWeight = variables.reduce((acc, v) => acc + v.weight, 0);
    const weightedSum = variables.reduce((acc, v) => acc + (v.weight * v.value), 0);
    idx.currentValue = totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(1)) : idx.currentValue;
    return idx;
  }

  async getStreets(zone?: string): Promise<StreetIntelligence[]> {
    return this.streets.filter(s => {
      if (zone && zone !== 'all' && s.zone !== zone) return false;
      return true;
    });
  }

  async getNeighborhoods(): Promise<NeighborhoodIntelligence[]> {
    return this.neighborhoods;
  }

  async getAgents(): Promise<AgentDefinition[]> {
    return this.agents;
  }

  async getAgentLogs(): Promise<AgentExecutionLog[]> {
    return this.agentLogs;
  }

  async addAgentLog(logData: Omit<AgentExecutionLog, 'id'>): Promise<AgentExecutionLog> {
    const newLog: AgentExecutionLog = {
      id: `log-${Date.now()}`,
      ...logData
    };
    this.agentLogs.unshift(newLog);
    // update agent runsCount
    const agent = this.agents.find(a => a.code === logData.agentCode);
    if (agent) {
      agent.runsCount += 1;
      agent.tokensConsumed += logData.costTokens;
      agent.estimatedCostEur += logData.costEur;
      agent.lastRun = logData.endedAt || new Date().toISOString();
    }
    return newLog;
  }

  async getExperiments(): Promise<Experiment[]> {
    return this.experiments;
  }

  async createExperiment(data: Partial<Experiment>): Promise<Experiment> {
    const newExp: Experiment = {
      id: `exp-${Date.now()}`,
      title: data.title || 'Nuevo Experimento Comercial',
      hypothesis: data.hypothesis || '',
      targetZone: data.targetZone || 'Centro / Príncipe',
      variables: data.variables || [],
      durationDays: data.durationDays || 14,
      status: 'en_ejecucion',
      scansControl: 0,
      scansVariant: 0,
      conversionControlPercent: 0,
      conversionVariantPercent: 0,
      conclusion: 'En fase inicial de toma de datos.',
      provenance: 'SIMULATED'
    };
    this.experiments.unshift(newExp);
    return newExp;
  }

  async runEconomicSimulation(params: SimulationParams): Promise<SimulationResult> {
    const baseDailyInteractions = params.businessCount * (params.averageDailyFootfall * (params.windowScanRatePercent / 100));
    const monthlyInteractions = baseDailyInteractions * 30;
    
    // Conservative: low repeat, low network boost
    const consInteractions = Math.round(monthlyInteractions * 0.7);
    const consConversions = Math.round(consInteractions * (params.scanToCustomerConversionPercent / 100) * 0.8);
    const consGross = Math.round(consConversions * params.averageTicketEur * (1 + (params.repeatPurchaseFrequency - 1) * 0.4));
    
    // Baseline: standard adoption
    const baseConversions = Math.round(monthlyInteractions * (params.scanToCustomerConversionPercent / 100));
    const networkFactor = 1 + ((params.businessCount * params.networkEffectCoefficient) / 100);
    const baseGross = Math.round(baseConversions * params.averageTicketEur * params.repeatPurchaseFrequency * networkFactor);

    // Optimistic: high cooperation adoption & virality
    const optInteractions = Math.round(monthlyInteractions * 1.5 * networkFactor);
    const optConversions = Math.round(optInteractions * ((params.scanToCustomerConversionPercent * 1.3) / 100));
    const optGross = Math.round(optConversions * params.averageTicketEur * params.repeatPurchaseFrequency * 1.4);

    return {
      conservative: {
        monthlyGrossVolumeEur: consGross,
        monthlyParticipatingShopsIncome: Math.round(consGross * 0.92),
        activeInteractions: consInteractions,
        cooperativePairsActive: Math.max(1, Math.round(params.businessCount * 0.2))
      },
      baseline: {
        monthlyGrossVolumeEur: baseGross,
        monthlyParticipatingShopsIncome: Math.round(baseGross * 0.92),
        activeInteractions: Math.round(monthlyInteractions),
        cooperativePairsActive: Math.max(2, Math.round(params.businessCount * 0.4))
      },
      optimistic: {
        monthlyGrossVolumeEur: optGross,
        monthlyParticipatingShopsIncome: Math.round(optGross * 0.92),
        activeInteractions: optInteractions,
        cooperativePairsActive: Math.max(3, Math.round(params.businessCount * 0.7))
      },
      provenance: 'SIMULATED'
    };
  }

  async resetToSeed(): Promise<void> {
    this.businesses = JSON.parse(JSON.stringify(INITIAL_BUSINESSES));
    this.opportunities = JSON.parse(JSON.stringify(INITIAL_OPPORTUNITIES));
    this.cooperationLinks = JSON.parse(JSON.stringify(INITIAL_COOPERATION_LINKS));
    this.cooperationProposals = [];
    this.campaigns = JSON.parse(JSON.stringify(INITIAL_CAMPAIGNS));
    this.demandSignals = JSON.parse(JSON.stringify(INITIAL_DEMAND_SIGNALS));
    this.observatoryIndices = JSON.parse(JSON.stringify(INITIAL_OBSERVATORY_INDICES));
    this.streets = JSON.parse(JSON.stringify(INITIAL_STREETS));
    this.neighborhoods = JSON.parse(JSON.stringify(INITIAL_NEIGHBORHOODS));
    this.agents = JSON.parse(JSON.stringify(INITIAL_AGENTS));
    this.experiments = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
  }
}

export const dataProvider: IDataProvider = new InMemoryDataProvider();
