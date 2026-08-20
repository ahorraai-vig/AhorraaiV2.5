import React, { useState } from 'react';
import { Opportunity, OpportunityStatus, VigoZone } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Plus, 
  RefreshCw,
  Building2,
  ChevronRight,
  Filter
} from 'lucide-react';

interface OpportunityPipelineProps {
  opportunities: Opportunity[];
  onUpdateStatus: (id: string, newStatus: OpportunityStatus) => void;
  onDiscover: (zone: string) => Promise<void>;
  selectedZone: string;
  onSelectZone: (zone: string) => void;
}

const STAGES: { status: OpportunityStatus; label: string; color: string }[] = [
  { status: 'detectada', label: '1. Detectada', color: 'border-sky-500 bg-sky-50/40 text-sky-900' },
  { status: 'en_analisis', label: '2. En Análisis', color: 'border-amber-500 bg-amber-50/40 text-amber-900' },
  { status: 'en_negociacion', label: '3. En Negociación', color: 'border-purple-500 bg-purple-50/40 text-purple-900' },
  { status: 'en_marcha', label: '4. En Marcha', color: 'border-emerald-500 bg-emerald-50/40 text-emerald-900' },
  { status: 'medida', label: '5. Medida', color: 'border-blue-500 bg-blue-50/40 text-blue-900' }
];

export const OpportunityPipeline: React.FC<OpportunityPipelineProps> = ({
  opportunities,
  onUpdateStatus,
  onDiscover,
  selectedZone,
  onSelectZone
}) => {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [discovering, setDiscovering] = useState<boolean>(false);

  const handleDiscover = async () => {
    setDiscovering(true);
    try {
      await onDiscover(selectedZone === 'all' ? 'Centro / Príncipe' : selectedZone);
    } finally {
      setDiscovering(false);
    }
  };

  return (
    <div id="opportunities-pipeline-view" className="space-y-6">
      
      {/* Header & AI Discovery bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Pipeline de Oportunidades Comerciales</h2>
            <ProvenanceBadge provenance="ESTIMATED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Detección continua de sinergias, asimetrías de horario y colaboraciones cruzadas en Vigo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="discover-opps-ai-btn"
            onClick={handleDiscover}
            disabled={discovering}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            {discovering ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Explorando Ecosistema con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Descubrir Nuevas Oportunidades</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Kanban Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageOpps = opportunities.filter(o => o.status === stage.status);

          return (
            <div 
              key={stage.status}
              id={`pipeline-stage-${stage.status}`}
              className="bg-stone-100/70 rounded-xl p-3 border border-stone-200/80 min-w-[260px] flex flex-col h-full"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-bold text-xs text-stone-800">{stage.label}</span>
                <span className="bg-stone-200 text-stone-700 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {stageOpps.length}
                </span>
              </div>

              {/* Stage Cards */}
              <div className="space-y-3 flex-1">
                {stageOpps.map(opp => (
                  <div
                    key={opp.id}
                    id={`opp-card-${opp.id}`}
                    onClick={() => setSelectedOpp(opp)}
                    className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                        {opp.zone}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        +{Number(opp?.estimatedEconomicImpactEur || 0).toLocaleString()} €
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">{opp.title}</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">{opp.description}</p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                      <span>Confianza: <strong>{opp.confidence}%</strong></span>
                      <span className={`capitalize font-semibold ${
                        opp.urgency === 'alta' ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        Urgencia {opp.urgency}
                      </span>
                    </div>
                  </div>
                ))}

                {stageOpps.length === 0 && (
                  <div className="py-8 text-center border-2 border-dashed border-stone-200 rounded-lg text-stone-400 text-xs">
                    Sin elementos
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Opportunity Detail Modal */}
      {selectedOpp && (
        <div id="opportunity-detail-modal" className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-5 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-amber-400 font-bold uppercase">{selectedOpp.zone}</span>
                  <span className="text-stone-500">•</span>
                  <ProvenanceBadge provenance={selectedOpp.provenance} size="xs" />
                </div>
                <h3 className="text-lg font-bold">{selectedOpp.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedOpp(null)}
                className="text-stone-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700">
              
              {/* Signal -> Problem -> Action Pipeline Breakdown */}
              <div className="space-y-3">
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1">1. Señal Original Detectada</span>
                  <p className="font-medium text-stone-900">{selectedOpp.originalSignal}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">Evidencia: {selectedOpp.evidence}</p>
                </div>

                <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-200">
                  <span className="text-[10px] font-bold text-sky-800 uppercase block mb-1">2. Oportunidad & Por Qué Funciona</span>
                  <p className="font-semibold text-stone-900">{selectedOpp.description}</p>
                  <p className="text-stone-600 text-[11px] mt-0.5">{selectedOpp.whyExplanation}</p>
                </div>

                <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">3. Acción Recomendada AhorraAI</span>
                  <p className="font-semibold text-stone-900">{selectedOpp.recommendedAction}</p>
                </div>
              </div>

              {/* Economic & Feasibility stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Impacto Estimado</span>
                  <span className="text-base font-black text-emerald-600">+{Number(selectedOpp?.estimatedEconomicImpactEur || 0).toLocaleString()} € / año</span>
                </div>
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Nivel de Confianza</span>
                  <span className="text-base font-bold text-sky-700">{selectedOpp.confidence}%</span>
                </div>
                <div className="p-3 bg-stone-100 rounded-xl">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Dificultad</span>
                  <span className="text-base font-bold text-stone-800 capitalize">{selectedOpp.difficulty}</span>
                </div>
              </div>

              {/* Status Transition Controls */}
              <div className="pt-4 border-t border-stone-200">
                <span className="text-[11px] font-bold text-stone-700 block mb-2">Mover a otra etapa del pipeline:</span>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map(s => (
                    <button
                      key={s.status}
                      onClick={() => {
                        onUpdateStatus(selectedOpp.id, s.status);
                        setSelectedOpp({ ...selectedOpp, status: s.status });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedOpp.status === s.status
                          ? 'bg-stone-900 text-white shadow'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedOpp(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
