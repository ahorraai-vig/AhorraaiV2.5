import React, { useState, useEffect } from 'react';
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
  VigoZone
} from './types';

// Components
import { MainDashboardView } from './components/dashboard/MainDashboardView';
import { InteractiveMap } from './components/map/InteractiveMap';
import { BusinessesView } from './components/businesses/BusinessesView';
import { BusinessDetailModal } from './components/businesses/BusinessDetailModal';
import { OpportunityPipeline } from './components/opportunities/OpportunityPipeline';
import { CooperationView } from './components/cooperation/CooperationView';
import { ObservatoryView } from './components/observatory/ObservatoryView';
import { AgentConsoleView } from './components/agents/AgentConsoleView';
import { EconomicSimulatorView } from './components/simulator/EconomicSimulatorView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { SmartStreetView } from './components/smart-street/SmartStreetView';
import { DataHubView } from './components/data-hub/DataHubView';
import { CrmView } from './components/crm/CrmView';
import { GuidedDemoTourModal } from './components/tour/GuidedDemoTourModal';
import { AIAssistantDrawer } from './components/chat/AIAssistantDrawer';
import { HonestyBadge } from './components/common/HonestyBadge';
import { ProvenanceBadge } from './components/common/ProvenanceBadge';

// Icons
import { 
  LayoutDashboard, 
  Map, 
  MapPin,
  Store, 
  Sparkles, 
  Share2, 
  TrendingUp, 
  Megaphone, 
  Cpu, 
  BarChart3, 
  Building, 
  Calculator, 
  Database, 
  Users, 
  Bot, 
  Compass, 
  Search, 
  Play, 
  RefreshCw, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Data State
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [cooperationLinks, setCooperationLinks] = useState<CooperationLink[]>([]);
  const [cooperationProposals, setCooperationProposals] = useState<CooperationProposal[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [demandSignals, setDemandSignals] = useState<DemandSignal[]>([]);
  const [observatoryIndices, setObservatoryIndices] = useState<ObservatoryIndex[]>([]);
  const [streets, setStreets] = useState<StreetIntelligence[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodIntelligence[]>([]);
  const [agents, setAgents] = useState<AgentDefinition[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentExecutionLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals & Drawers State
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [demoTourOpen, setDemoTourOpen] = useState<boolean>(false);
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);

  // Initial Data Fetch
  const loadAllData = async () => {
    try {
      const [
        bRes, oRes, cRes, cpRes, campRes, dRes, obsRes, sRes, nRes, aRes, lRes
      ] = await Promise.all([
        fetch('/api/businesses').then(r => r.json()),
        fetch('/api/opportunities').then(r => r.json()),
        fetch('/api/cooperation/links').then(r => r.json()),
        fetch('/api/cooperation/proposals').then(r => r.json()),
        fetch('/api/campaigns').then(r => r.json()),
        fetch('/api/demand-signals').then(r => r.json()),
        fetch('/api/observatory/indices').then(r => r.json()),
        fetch('/api/streets').then(r => r.json()),
        fetch('/api/neighborhoods').then(r => r.json()),
        fetch('/api/agents').then(r => r.json()),
        fetch('/api/agents/logs').then(r => r.json())
      ]);

      setBusinesses(Array.isArray(bRes) ? bRes : []);
      setOpportunities(Array.isArray(oRes) ? oRes : []);
      setCooperationLinks(Array.isArray(cRes) ? cRes : []);
      setCooperationProposals(Array.isArray(cpRes) ? cpRes : []);
      setCampaigns(Array.isArray(campRes) ? campRes : []);
      setDemandSignals(Array.isArray(dRes) ? dRes : []);
      setObservatoryIndices(Array.isArray(obsRes) ? obsRes : []);
      setStreets(Array.isArray(sRes) ? sRes : []);
      setNeighborhoods(Array.isArray(nRes) ? nRes : []);
      setAgents(Array.isArray(aRes) ? aRes : []);
      setAgentLogs(Array.isArray(lRes) ? lRes : []);
    } catch (err) {
      console.error('Error fetching data from AhorraAI server:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Business Handlers
  const handleCreateBusiness = async (data: Partial<Business>) => {
    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const created = await res.json();
        setBusinesses(prev => [created, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDiagnoseBusiness = async (id: string): Promise<BusinessDiagnostic | null> => {
    try {
      const res = await fetch(`/api/businesses/${id}/diagnose`, { method: 'POST' });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  // Opportunity Handlers
  const handleUpdateOpportunityStatus = async (id: string, status: any) => {
    try {
      const res = await fetch(`/api/opportunities/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setOpportunities(prev => prev.map(o => o.id === id ? updated : o));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDiscoverOpportunities = async (zone: string) => {
    try {
      const res = await fetch('/api/opportunities/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone })
      });
      if (res.ok) {
        const discovered = await res.json();
        setOpportunities(prev => [...discovered, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Cooperation Handlers
  const handleGenerateCooperation = async (businessIds: string[], zone: string): Promise<CooperationProposal | null> => {
    try {
      const res = await fetch('/api/cooperation/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessIds, zone })
      });
      if (res.ok) {
        const prop = await res.json();
        setCooperationProposals(prev => [prop, ...prev]);
        return prop;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  // Campaign Handlers
  const handleCreateCampaign = async (data: Partial<Campaign>) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const created = await res.json();
        setCampaigns(prev => [created, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCampaignStatus = async (id: string, status: any) => {
    try {
      const res = await fetch(`/api/campaigns/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setCampaigns(prev => prev.map(c => c.id === id ? updated : c));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Observatory Handlers
  const handleUpdateObservatoryWeights = async (code: string, variables: any) => {
    try {
      const res = await fetch(`/api/observatory/indices/${code}/weights`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables })
      });
      if (res.ok) {
        const updated = await res.json();
        setObservatoryIndices(prev => prev.map(i => i.code === code ? updated : i));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Agent Handlers
  const handleRunAgent = async (agentCode: string, taskType: string, payload: any) => {
    try {
      const res = await fetch('/api/agents/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentCode, taskType, payload })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.log) {
          setAgentLogs(prev => [data.log, ...prev]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Simulator Handlers
  const handleRunSimulation = async (params: SimulationParams): Promise<SimulationResult | null> => {
    try {
      const res = await fetch('/api/simulator/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  // Reset Seed
  const handleResetSeed = async () => {
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      await loadAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = (view: string, payload?: any) => {
    setCurrentView(view);
    if (payload?.zone) setSelectedZone(payload.zone);
    if (payload?.id && view === 'businesses') {
      const b = businesses.find(item => item.id === payload.id);
      if (b) setSelectedBusiness(b);
    }
    setMobileMenuOpen(false);
  };

  // Nav Items
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Inicio / Panel Principal', icon: LayoutDashboard },
    { id: 'map', label: 'Gemelo Urbano Vigo', icon: Map },
    { id: 'businesses', label: 'Comercios & IPD', icon: Store },
    { id: 'opportunities', label: 'Pipeline Oportunidades', icon: Sparkles },
    { id: 'cooperation', label: 'Protocolo Cooperativo', icon: Share2 },
    { id: 'campaigns', label: 'Campañas & QR 24/7', icon: Megaphone },
    { id: 'observatory', label: 'Observatorio de Vigo', icon: BarChart3 },
    { id: 'agents', label: '12 Agentes IA (Consola)', icon: Cpu },
    { id: 'smart-street', label: 'Rúas & Barrios', icon: Building },
    { id: 'simulator', label: 'Simulador Económico', icon: Calculator },
    { id: 'crm', label: 'CRM de Adopción', icon: Users },
    { id: 'data-hub', label: 'Gobernanza & Datos', icon: Database }
  ];

  return (
    <div id="ahorraai-application-root" className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased selection:bg-sky-200 selection:text-sky-900">
      
      {/* Top Global Navigation Bar */}
      <header className="bg-stone-950 text-white border-b border-stone-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-md">
        
        {/* Left: Brand Identity & Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="toggle-sidebar-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 hidden md:flex"
            title="Contraer / Expandir menú lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            id="toggle-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-sky-600/30">
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white">AhorraAI</span>
                <span className="text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-600/30 px-1.5 py-0.2 rounded font-semibold">
                  v4.0
                </span>
              </div>
              <p className="text-[10px] text-stone-400 leading-none">Vigo Pilot Ecosystem</p>
            </div>
          </div>
        </div>

        {/* Center: Global Zone Filter */}
        <div className="hidden lg:flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs">
          <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="text-stone-400 font-medium">Zona:</span>
          <select
            id="global-zone-selector"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-stone-900 text-white">Todo Vigo (9 Zonas)</option>
            <option value="Centro / Príncipe" className="bg-stone-900 text-white">Centro / Príncipe</option>
            <option value="Urzáiz" className="bg-stone-900 text-white">Urzáiz</option>
            <option value="Casco Vello" className="bg-stone-900 text-white">Casco Vello</option>
            <option value="O Calvario" className="bg-stone-900 text-white">O Calvario</option>
            <option value="As Travesas" className="bg-stone-900 text-white">As Travesas</option>
            <option value="Bouzas" className="bg-stone-900 text-white">Bouzas</option>
            <option value="Teis" className="bg-stone-900 text-white">Teis</option>
            <option value="Torrecedeira" className="bg-stone-900 text-white">Torrecedeira</option>
            <option value="Navia" className="bg-stone-900 text-white">Navia</option>
          </select>
        </div>

        {/* Right: Actions & Demo Tour */}
        <div className="flex items-center gap-2.5">
          
          <button
            id="topbar-demo-tour-btn"
            onClick={() => setDemoTourOpen(true)}
            className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span className="hidden sm:inline">Caso Piloto (3 min)</span>
            <span className="sm:hidden">Demo</span>
          </button>

          <button
            id="topbar-assistant-toggle-btn"
            onClick={() => setAssistantOpen(true)}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Asistente IA</span>
          </button>

        </div>
      </header>

      {/* Main App Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar */}
        <aside
          id="ahorraai-desktop-sidebar"
          className={`bg-stone-900 text-stone-300 border-r border-stone-800 transition-all duration-300 flex flex-col justify-between hidden md:flex shrink-0 ${
            sidebarOpen ? 'w-64' : 'w-18'
          }`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentView(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-stone-800 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-stone-200">Honestidad Estructural</span>
              </div>
              <p className="text-[10.5px] leading-tight text-stone-500">
                DICHO • OBSERVADO • SIN CONFIRMAR
              </p>
            </div>
          )}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 md:hidden flex">
            <div className="w-64 bg-stone-900 text-stone-200 h-full p-4 flex flex-col justify-between shadow-2xl animate-slideRight">
              <div className="space-y-1">
                <div className="flex justify-between items-center pb-3 border-b border-stone-800 mb-3">
                  <span className="font-bold text-sm text-white">Menú AhorraAI</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {NAV_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-sky-600 text-white' : 'text-stone-400 hover:bg-stone-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400">
                AhorraAI Vigo • 2026
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {loading ? (
            <div className="py-24 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-sky-600 animate-spin mx-auto" />
              <p className="font-bold text-base text-stone-800">Cargando Ecosistema AhorraAI Vigo...</p>
              <p className="text-xs text-stone-500">Iniciando gemelos digitales, índices del observatorio y agentes cooperativos.</p>
            </div>
          ) : (
            <>
              {currentView === 'dashboard' && (
                <MainDashboardView
                  businesses={businesses}
                  opportunities={opportunities}
                  cooperationLinks={cooperationLinks}
                  campaigns={campaigns}
                  observatoryIndices={observatoryIndices}
                  onNavigateToView={handleNavigate}
                  onSelectBusiness={setSelectedBusiness}
                  onOpenDemoTour={() => setDemoTourOpen(true)}
                  onOpenAssistant={() => setAssistantOpen(true)}
                />
              )}

              {currentView === 'map' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <h2 className="text-lg font-bold text-stone-900">Gemelo Digital Urbano & Nodos Comerciales</h2>
                    <p className="text-xs text-stone-500">
                      Visualización espacial de los 9 ejes comerciales de Vigo, densidades de IPD, oportunidades activas y vectores de cooperación.
                    </p>
                  </div>

                  <InteractiveMap
                    businesses={businesses}
                    opportunities={opportunities}
                    cooperationLinks={cooperationLinks}
                    selectedZone={selectedZone}
                    onSelectZone={setSelectedZone}
                    onSelectBusiness={setSelectedBusiness}
                    onSelectOpportunity={(opp) => handleNavigate('opportunities', { zone: opp.zone })}
                  />
                </div>
              )}

              {currentView === 'businesses' && (
                <BusinessesView
                  businesses={businesses}
                  onSelectBusiness={setSelectedBusiness}
                  onCreateBusiness={handleCreateBusiness}
                  selectedZone={selectedZone}
                  onSelectZone={setSelectedZone}
                />
              )}

              {currentView === 'opportunities' && (
                <OpportunityPipeline
                  opportunities={opportunities}
                  onUpdateStatus={handleUpdateOpportunityStatus}
                  onDiscover={handleDiscoverOpportunities}
                  selectedZone={selectedZone}
                  onSelectZone={setSelectedZone}
                />
              )}

              {currentView === 'cooperation' && (
                <CooperationView
                  businesses={businesses}
                  cooperationLinks={cooperationLinks}
                  proposals={cooperationProposals}
                  onGenerateProposal={handleGenerateCooperation}
                  selectedZone={selectedZone}
                  onSelectZone={setSelectedZone}
                />
              )}

              {currentView === 'campaigns' && (
                <CampaignsView
                  campaigns={campaigns}
                  onCreateCampaign={handleCreateCampaign}
                  onUpdateStatus={handleUpdateCampaignStatus}
                  selectedZone={selectedZone}
                />
              )}

              {currentView === 'observatory' && (
                <ObservatoryView
                  indices={observatoryIndices}
                  onUpdateWeights={handleUpdateObservatoryWeights}
                />
              )}

              {currentView === 'agents' && (
                <AgentConsoleView
                  agents={agents}
                  logs={agentLogs}
                  onRunAgent={handleRunAgent}
                />
              )}

              {currentView === 'smart-street' && (
                <SmartStreetView
                  streets={streets}
                  neighborhoods={neighborhoods}
                  selectedZone={selectedZone}
                />
              )}

              {currentView === 'simulator' && (
                <EconomicSimulatorView
                  onRunSimulation={handleRunSimulation}
                />
              )}

              {currentView === 'crm' && (
                <CrmView
                  businesses={businesses}
                  onSelectBusiness={setSelectedBusiness}
                  onUpdateCrmStatus={async (id, status) => {}}
                />
              )}

              {currentView === 'data-hub' && (
                <DataHubView
                  onResetSeed={handleResetSeed}
                  businessesCount={businesses.length}
                />
              )}
            </>
          )}

        </main>
      </div>

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <BusinessDetailModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onDiagnose={handleDiagnoseBusiness}
          onCreateCooperation={(biz) => {
            setSelectedBusiness(null);
            handleNavigate('cooperation');
          }}
        />
      )}

      {/* 3-Minute Guided Demo Tour Modal */}
      {demoTourOpen && (
        <GuidedDemoTourModal
          onClose={() => setDemoTourOpen(false)}
          onNavigateToView={handleNavigate}
        />
      )}

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onNavigateToView={handleNavigate}
        contextData={{
          currentView,
          selectedZone,
          activeBusinessesCount: businesses.length,
          activeOpportunitiesCount: opportunities.length,
          pilotBusiness: 'Librería Mendinho Vigo'
        }}
      />

    </div>
  );
}
export default App;
