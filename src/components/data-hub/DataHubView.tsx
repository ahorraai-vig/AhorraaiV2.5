import React, { useState } from 'react';
import { HonestyBadge } from '../common/HonestyBadge';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  ShieldCheck, 
  Database, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  FileSpreadsheet, 
  AlertCircle,
  HardDrive
} from 'lucide-react';

interface DataHubViewProps {
  onResetSeed: () => Promise<void>;
  businessesCount: number;
}

export const DataHubView: React.FC<DataHubViewProps> = ({
  onResetSeed,
  businessesCount
}) => {
  const [resetting, setResetting] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const handleReset = async () => {
    setResetting(true);
    try {
      await onResetSeed();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    } finally {
      setResetting(false);
    }
  };

  const downloadJSON = async () => {
    try {
      const res = await fetch('/api/businesses');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ahorraai-vigo-dataset-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="data-hub-governance-view" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Gobernanza de Datos & Honestidad Estructural</h2>
            <ProvenanceBadge provenance="VERIFIED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Principios éticos de AhorraAI: ningún dato se inventa; trazabilidad exhaustiva de procedencias y fuentes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadJSON}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
          >
            <Download className="w-4 h-4" />
            Exportar Dataset (JSON)
          </button>
        </div>
      </div>

      {/* 3 Honesty States Framework Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <h4 className="font-bold text-sm text-emerald-950">1. Estado 'DICHO'</h4>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Dato aportado, confirmado o verificado en primera persona por el comerciante o propietario. Nivel de confianza máxima (95-100%).
          </p>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600" />
            <h4 className="font-bold text-sm text-amber-950">2. Estado 'OBSERVADO'</h4>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Dato extraído de fuentes públicas abiertas (Google Business, cartelería de calle, web corporativa). Sujeto a comprobación periódica.
          </p>
        </div>

        <div className="bg-stone-100 p-5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-stone-500" />
            <h4 className="font-bold text-sm text-stone-900">3. Estado 'SIN_CONFIRMAR'</h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            Dato vacío o no comprobado. Queda estrictamente prohibido simular o inventar valores como si fueran hechos reales.
          </p>
        </div>
      </div>

      {/* Data Integrity Card & Reset */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              <span>Base de Datos Demo de Vigo ({businessesCount} registros)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Reinicia el entorno a su estado semilla inicial con datos reales y verificados de comercios en Vigo.
            </p>
          </div>

          <button
            onClick={handleReset}
            disabled={resetting}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>{resetting ? 'Reiniciando...' : 'Restablecer Datos Semilla'}</span>
          </button>
        </div>

        {resetSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Datos restablecidos con éxito a la configuración inicial de Vigo.</span>
          </div>
        )}
      </div>

    </div>
  );
};
