import React from 'react';
import { Business, Opportunity, CooperationLink, Campaign, ObservatoryIndex } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { HonestyBadge } from '../common/HonestyBadge';
import { 
  Building2, 
  Sparkles, 
  Share2, 
  Megaphone, 
  TrendingUp, 
  Euro, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Compass, 
  Play,
  QrCode,
  ShieldCheck
} from 'lucide-react';

interface MainDashboardViewProps {
  businesses: Business[];
  opportunities: Opportunity[];
  cooperationLinks: CooperationLink[];
  campaigns: Campaign[];
  observatoryIndices: ObservatoryIndex[];
  onNavigateToView: (view: string, payload?: any) => void;
  onSelectBusiness: (business: Business) => void;
  onOpenDemoTour: () => void;
  onOpenAssistant: () => void;
}

export const MainDashboardView: React.FC<MainDashboardViewProps> = ({
  businesses,
  opportunities,
  cooperationLinks,
  campaigns,
  observatoryIndices,
  onNavigateToView,
  onSelectBusiness,
  onOpenDemoTour,
  onOpenAssistant
}) => {
  const avgIPD = Math.round(
    (businesses || []).reduce((acc, b) => acc + (b?.digitalPresence?.overallIPD || 0), 0) / ((businesses || []).length || 1)
  );

  const totalImpactEur = (opportunities || []).reduce((acc, o) => acc + (o?.estimatedEconomicImpactEur || 0), 0);

  return (
    <div id="main-dashboard-view-content" className="space-y-6 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-sky-950 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              AhorraAI v4.0 • Ecosistema Vigo
            </span>
            <ProvenanceBadge provenance="VERIFIED" size="xs" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Infraestructura de Inteligencia Artificial & Cooperación Comercial
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Gemelos digitales, diagnósticos precisos en 3 franjas horarias y alianzas cruzadas para los comercios de Vigo con Honestidad Estructural.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <button
            id="hero-start-demo-tour-btn"
            onClick={onOpenDemoTour}
            className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Ver Caso Piloto en 3 Min</span>
          </button>

          <button
            id="hero-open-assistant-btn"
            onClick={onOpenAssistant}
            className="px-5 py-3 bg-stone-800/90 hover:bg-stone-700 text-stone-100 border border-stone-700 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span>Consultar Asistente IA</span>
          </button>
        </div>

        {/* Ambient decorative glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Businesses */}
        <div 
          onClick={() => onNavigateToView('businesses')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Comercios Auditados</span>
            <div className="p-2 bg-sky-50 text-sky-700 rounded-xl">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-900">{businesses.length}</span>
            <span className="text-xs text-stone-400 font-mono">9 zonas de Vigo</span>
          </div>
          <p className="text-[11px] text-stone-500">IPD promedio: <strong className="text-sky-700 font-mono">{avgIPD}/100</strong></p>
        </div>

        {/* KPI 2: Opportunities */}
        <div 
          onClick={() => onNavigateToView('opportunities')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Oportunidades</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">{(opportunities || []).length}</span>
            <span className="text-xs text-stone-400">detectadas</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold font-mono">+{Number(totalImpactEur || 0).toLocaleString()} € impacto est.</p>
        </div>

        {/* KPI 3: Cooperation Links */}
        <div 
          onClick={() => onNavigateToView('cooperation')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Pactos Cooperativos</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">{cooperationLinks.length}</span>
            <span className="text-xs text-stone-400">enlaces activos</span>
          </div>
          <p className="text-[11px] text-stone-500">Rutas de ticket conjunto</p>
        </div>

        {/* KPI 4: Active Campaigns */}
        <div 
          onClick={() => onNavigateToView('campaigns')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Escaparates QR</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-900">{campaigns.length}</span>
            <span className="text-xs text-stone-400">campañas</span>
          </div>
          <p className="text-[11px] text-stone-500">Captación 24/7 fuera de horario</p>
        </div>

      </div>

      {/* Two Column Section: Top Opportunities & Featured Pilot Business */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Opportunities List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-base text-stone-900">Oportunidades de Alto Impacto en Vigo</h3>
            </div>
            <button
              onClick={() => onNavigateToView('opportunities')}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              <span>Ver Pipeline Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {(opportunities || []).slice(0, 3).map(opp => (
              <div
                key={opp.id}
                onClick={() => onNavigateToView('opportunities')}
                className="p-4 bg-stone-50 hover:bg-sky-50/50 rounded-2xl border border-stone-200 hover:border-sky-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                      {opp.zone}
                    </span>
                    <span className="text-xs font-bold text-stone-900">{opp.title}</span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-1">{opp.recommendedAction}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-emerald-600 font-mono">
                    +{Number(opp?.estimatedEconomicImpactEur || 0).toLocaleString()} €
                  </span>
                  <span className="text-[10px] text-stone-400 block">estimado / año</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Pilot Showcase: Librería Mendinho */}
        <div className="bg-stone-900 text-white rounded-3xl border border-stone-800 shadow-xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                Comercio Piloto Destacado
              </span>
              <HonestyBadge status="DICHO" size="sm" />
            </div>

            <h4 className="text-lg font-bold text-white">Librería Mendinho Vigo</h4>
            <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Rúa do Príncipe, 34 • Centro
            </p>

            <div className="mt-4 p-3 bg-stone-800/80 rounded-xl border border-stone-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Presencia Digital:</span>
                <span className="text-sky-400 font-bold font-mono">IPD 51 / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Alianza Activa:</span>
                <span className="text-emerald-400 font-semibold">Café Princesa (30m)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Escaparate 24/7:</span>
                <span className="text-purple-400 font-semibold">Modo Noche Activo</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const mendinho = businesses.find(b => b.name.includes('Mendinho')) || businesses[0];
              onSelectBusiness(mendinho);
            }}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow"
          >
            <span>Ver Ficha Inteligente & Diagnóstico</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
