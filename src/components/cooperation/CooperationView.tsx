import React, { useState } from 'react';
import { Business, CooperationLink, CooperationProposal, VigoZone } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Share2, 
  Sparkles, 
  Store, 
  ArrowRight, 
  QrCode, 
  MessageSquare, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw,
  Building2,
  Gift
} from 'lucide-react';

interface CooperationViewProps {
  businesses: Business[];
  cooperationLinks: CooperationLink[];
  proposals: CooperationProposal[];
  onGenerateProposal: (businessIds: string[], zone: string) => Promise<CooperationProposal | null>;
  selectedZone: string;
  onSelectZone: (zone: string) => void;
}

export const CooperationView: React.FC<CooperationViewProps> = ({
  businesses,
  cooperationLinks,
  proposals,
  onGenerateProposal,
  selectedZone,
  onSelectZone
}) => {
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [activeProposal, setActiveProposal] = useState<CooperationProposal | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleBusinessSelection = (id: string) => {
    if (selectedBusinesses.includes(id)) {
      setSelectedBusinesses(selectedBusinesses.filter(bId => bId !== id));
    } else {
      if (selectedBusinesses.length < 3) {
        setSelectedBusinesses([...selectedBusinesses, id]);
      }
    }
  };

  const handleGenerate = async () => {
    if (selectedBusinesses.length < 2) return;
    setGenerating(true);
    try {
      const res = await onGenerateProposal(
        selectedBusinesses, 
        selectedZone === 'all' ? 'Centro / Príncipe' : selectedZone
      );
      if (res) setActiveProposal(res);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div id="cooperation-ecosystem-view" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Protocolo de Cooperación Intercomercial</h2>
            <ProvenanceBadge provenance="INFERRED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Alianzas de ticket conjunto, rutas temáticas y fidelización compartida entre negocios de Vigo.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-stone-600">Negocios seleccionados para alianza:</span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg">
            {selectedBusinesses.length} / 3
          </span>
        </div>
      </div>

      {/* Cooperation Generator Console */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-6 rounded-2xl border border-stone-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Generador de Alianzas Comerciales con IA</h3>
              <p className="text-xs text-stone-400">Selecciona al menos 2 comercios para diseñar una propuesta conjunta completa.</p>
            </div>
          </div>

          <button
            id="trigger-coop-generation-btn"
            onClick={handleGenerate}
            disabled={selectedBusinesses.length < 2 || generating}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Estructurando Alianza...</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Generar Propuesta Cooperativa</span>
              </>
            )}
          </button>
        </div>

        {/* Business Selector Pills */}
        <div className="space-y-2">
          <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
            Elige comercios complementarios (ej. Librería + Café, Zapatería + Moda, Frutería + Panadería):
          </span>
          
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
            {(businesses || []).map(b => {
              const isSelected = selectedBusinesses.includes(b.id);
              return (
                <button
                  key={b.id}
                  id={`select-biz-coop-${b.id}`}
                  onClick={() => toggleBusinessSelection(b.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold shadow-md'
                      : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:border-stone-500'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">({b.neighborhood})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generated Proposal Output View */}
      {activeProposal && (
        <div id="active-proposal-card" className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-5 animate-fadeIn">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">
                  Alianza Generada con Éxito
                </span>
                <span className="text-stone-400">•</span>
                <ProvenanceBadge provenance={activeProposal.provenance} size="xs" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">{activeProposal.title}</h3>
              <p className="text-xs text-stone-500 mt-1">
                Comercios: <strong>{(activeProposal?.participatingBusinessNames || []).join(' ↔ ')}</strong> ({activeProposal.zone})
              </p>
            </div>

            <button
              onClick={() => setActiveProposal(null)}
              className="text-stone-400 hover:text-stone-800 p-1"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offer details & Incentive */}
            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Oferta Conjunta Diseñada</span>
                <p className="font-semibold text-stone-900 text-sm">{activeProposal.jointOfferDescription}</p>
                <div className="flex items-center gap-2 text-emerald-700 font-medium pt-1">
                  <Gift className="w-4 h-4" />
                  <span>Incentivo: {activeProposal.incentive}</span>
                </div>
              </div>

              <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200 space-y-1">
                <span className="text-[10px] font-bold text-sky-800 uppercase">Por qué es complementaria</span>
                <p className="text-stone-700">{activeProposal.whyComplementary}</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Texto para Cartel / Escaparate</span>
                  <button
                    onClick={() => handleCopy(activeProposal.shopWindowText, 'window')}
                    className="text-[11px] text-sky-600 font-semibold flex items-center gap-1 hover:underline"
                  >
                    {copiedText === 'window' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedText === 'window' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <p className="italic text-stone-800 bg-white p-2.5 rounded border border-stone-200 font-mono text-[11px]">
                  "{activeProposal.shopWindowText}"
                </p>
              </div>
            </div>

            {/* WhatsApp Pitch & QR Link */}
            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Mensaje WhatsApp para Comerciantes
                  </span>
                  <button
                    onClick={() => handleCopy(activeProposal.whatsappPitchText, 'whatsapp')}
                    className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
                  >
                    {copiedText === 'whatsapp' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedText === 'whatsapp' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <p className="bg-white p-3 rounded-lg border border-emerald-200 text-stone-800 font-sans leading-relaxed">
                  {activeProposal.whatsappPitchText}
                </p>
              </div>

              {/* QR Node payload */}
              <div className="p-4 bg-stone-900 text-white rounded-xl flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg text-stone-900 shrink-0">
                  <QrCode className="w-16 h-16" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Enlace QR Dinámico</span>
                  <p className="text-xs font-semibold text-white mt-0.5">{activeProposal.qrPayloadUrl}</p>
                  <p className="text-[10px] text-stone-400 mt-1">Listo para imprimir en pegatinas NFC o cartelería de mostrador.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Active Cooperation Links */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-stone-900">Alianzas y Enlaces Activos en Vigo ({(cooperationLinks || []).length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(cooperationLinks || []).map(link => (
            <div key={link.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                  {(link.linkType || 'alianza').replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-mono font-bold text-sky-700">Afinidad {link.affinityScore}%</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <span className="truncate">{link.sourceBusinessName}</span>
                <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">{link.targetBusinessName}</span>
              </div>

              <p className="text-[11px] text-stone-500">{link.jointOfferTitle}</p>
              
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                <span>Distancia: <strong>{link.distanceMeters}m</strong></span>
                <span className="text-emerald-600 font-semibold font-mono">+{link.estimatedMonthlyFlowIncreaseEur} €/mes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
