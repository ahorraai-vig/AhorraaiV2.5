import React, { useState } from 'react';
import { ObservatoryIndex } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  BarChart3, 
  TrendingUp, 
  Settings2, 
  Sliders, 
  ShieldCheck, 
  HelpCircle, 
  RefreshCw,
  Info,
  CheckCircle2
} from 'lucide-react';

interface ObservatoryViewProps {
  indices: ObservatoryIndex[];
  onUpdateWeights: (code: string, variables: { name: string; weight: number; value: number }[]) => Promise<void>;
}

export const ObservatoryView: React.FC<ObservatoryViewProps> = ({
  indices,
  onUpdateWeights
}) => {
  const [editingIndex, setEditingIndex] = useState<ObservatoryIndex | null>(null);
  const [tempVariables, setTempVariables] = useState<{ name: string; weight: number; value: number }[]>([]);
  const [saving, setSaving] = useState<boolean>(false);

  const startEdit = (idx: ObservatoryIndex) => {
    setEditingIndex(idx);
    setTempVariables(JSON.parse(JSON.stringify(idx.variables)));
  };

  const handleWeightChange = (varIdx: number, newWeight: number) => {
    const next = [...tempVariables];
    next[varIdx].weight = newWeight;
    setTempVariables(next);
  };

  const handleSaveWeights = async () => {
    if (!editingIndex) return;
    setSaving(true);
    try {
      await onUpdateWeights(editingIndex.code, tempVariables);
      setEditingIndex(null);
    } finally {
      setSaving(false);
    }
  };

  // Calculated preview
  const calculatedPreview = React.useMemo(() => {
    if (!tempVariables || tempVariables.length === 0) return 0;
    const totalWeight = tempVariables.reduce((acc, v) => acc + v.weight, 0);
    if (totalWeight === 0) return 0;
    const weightedSum = tempVariables.reduce((acc, v) => acc + (v.weight * v.value), 0);
    return Number((weightedSum / totalWeight).toFixed(1));
  }, [tempVariables]);

  return (
    <div id="observatory-view-container" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Observatorio del Comercio Local de Vigo</h2>
            <ProvenanceBadge provenance="ESTIMATED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            6 índices transparentes de salud urbana y dinamización económica con fórmulas auditables y ponderaciones ajustables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Transparencia Metodológica Activa
          </span>
        </div>
      </div>

      {/* Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(indices || []).map(idx => {
          const isPositive = (idx.trend ?? 0) >= 0;

          return (
            <div
              key={idx.code}
              id={`observatory-index-${(idx.code || '').toLowerCase()}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              {/* Top */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[11px] font-mono font-bold rounded">
                    {idx.code}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <span className={isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                      {isPositive ? `+${idx.trend}` : idx.trend}%
                    </span>
                    <span className="text-stone-400 text-[10px]">vs mes anterior</span>
                  </div>
                </div>

                <h3 className="font-bold text-stone-900 text-sm">{idx.name}</h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{idx.description}</p>
              </div>

              {/* Value & Target Progress */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-stone-900">{idx.currentValue}</span>
                    <span className="text-xs text-stone-400">/ 100</span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">Meta: <strong>{idx.targetValue}</strong></span>
                </div>

                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${idx.currentValue}%` }}
                  />
                </div>
              </div>

              {/* Formula & Provenance */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-[11px]">
                <div className="font-mono text-[10px] text-stone-600 bg-stone-50 p-2 rounded border border-stone-200">
                  {idx.formula}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <ProvenanceBadge provenance={idx.provenance} size="xs" />
                  <button
                    id={`edit-weights-btn-${(idx.code || '').toLowerCase()}`}
                    onClick={() => startEdit(idx)}
                    className="text-sky-600 hover:text-sky-800 font-semibold text-xs flex items-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Ponderaciones ({idx.variables.length})</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Weights Modal */}
      {editingIndex && (
        <div id="weights-editor-modal" className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-xl flex flex-col overflow-hidden animate-fadeIn">
            
            {/* Header */}
            <div className="bg-stone-900 text-white p-5 flex justify-between items-start">
              <div>
                <span className="text-sky-400 font-mono font-bold text-xs">{editingIndex.code}</span>
                <h3 className="text-base font-bold">{editingIndex.name} — Ponderación de Variables</h3>
              </div>
              <button 
                onClick={() => setEditingIndex(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 flex items-center justify-between">
                <div>
                  <span className="text-sky-900 font-semibold block">Valor Resultante Recalculado:</span>
                  <span className="text-xs text-sky-700">En base a los pesos configurados</span>
                </div>
                <div className="text-2xl font-black text-sky-700">
                  {calculatedPreview} <span className="text-xs font-normal text-stone-500">/ 100</span>
                </div>
              </div>

              <div className="space-y-4">
                <span className="font-bold text-stone-800 block uppercase text-[10px] tracking-wider">
                  Variables que componen el índice:
                </span>

                {(tempVariables || []).map((v, i) => (
                  <div key={i} className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-stone-900">{v.name}</span>
                      <span className="font-mono text-stone-600">Valor actual: <strong>{v.value}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={v.weight}
                        onChange={(e) => handleWeightChange(i, parseFloat(e.target.value))}
                        className="flex-1 accent-sky-600"
                      />
                      <span className="w-12 text-right font-mono font-bold text-stone-800">
                        {Math.round(v.weight * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingIndex(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                id="save-weights-btn"
                onClick={handleSaveWeights}
                disabled={saving}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                Guardar Ponderaciones
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
