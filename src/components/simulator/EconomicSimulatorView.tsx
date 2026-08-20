import React, { useState, useEffect } from 'react';
import { SimulationParams, SimulationResult } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Calculator, 
  TrendingUp, 
  Euro, 
  Users, 
  QrCode, 
  Share2, 
  Repeat, 
  Sparkles, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface EconomicSimulatorViewProps {
  onRunSimulation: (params: SimulationParams) => Promise<SimulationResult | null>;
}

export const EconomicSimulatorView: React.FC<EconomicSimulatorViewProps> = ({
  onRunSimulation
}) => {
  const [params, setParams] = useState<SimulationParams>({
    businessCount: 25,
    averageDailyFootfall: 4500,
    windowScanRatePercent: 1.5,
    scanToCustomerConversionPercent: 18,
    averageTicketEur: 28,
    repeatPurchaseFrequency: 1.6,
    networkEffectCoefficient: 1.8
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);

  const runSim = async () => {
    setCalculating(true);
    try {
      const res = await onRunSimulation(params);
      if (res) setResult(res);
    } finally {
      setCalculating(false);
    }
  };

  useEffect(() => {
    runSim();
  }, [params]);

  const updateParam = (key: keyof SimulationParams, val: number) => {
    setParams(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div id="economic-simulator-view" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Simulador Económico & Modelo de Difusión MPDA-AI</h2>
            <ProvenanceBadge provenance="SIMULATED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Proyección del impacto financiero y volumen de compras cruzadas generado por el protocolo cooperativo en Vigo.
          </p>
        </div>

        <button
          onClick={runSim}
          disabled={calculating}
          className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          {calculating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Calculator className="w-3.5 h-3.5" />}
          Recalcular Simulación
        </button>
      </div>

      {/* Sliders and Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Panel */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
            Parámetros de Entrada del Escenario:
          </h3>

          {/* Business Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                Comercios Adheridos
              </span>
              <span className="font-bold font-mono text-sky-800">{params.businessCount} negocios</span>
            </div>
            <input
              type="range"
              min="2"
              max="200"
              step="1"
              value={params.businessCount}
              onChange={(e) => updateParam('businessCount', parseInt(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          {/* Average Footfall */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700">Tránsito Peatonal Diario</span>
              <span className="font-bold font-mono text-stone-800">{Number(params?.averageDailyFootfall || 0).toLocaleString()} personas/día</span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="250"
              value={params.averageDailyFootfall}
              onChange={(e) => updateParam('averageDailyFootfall', parseInt(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          {/* Window Scan Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                Tasa Escaneo de Escaparate
              </span>
              <span className="font-bold font-mono text-indigo-800">{params.windowScanRatePercent}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="8"
              step="0.1"
              value={params.windowScanRatePercent}
              onChange={(e) => updateParam('windowScanRatePercent', parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Conversion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700">Conversión a Compra</span>
              <span className="font-bold font-mono text-emerald-800">{params.scanToCustomerConversionPercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={params.scanToCustomerConversionPercent}
              onChange={(e) => updateParam('scanToCustomerConversionPercent', parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Average Ticket */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-amber-600" />
                Ticket Medio
              </span>
              <span className="font-bold font-mono text-amber-800">{params.averageTicketEur} €</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="1"
              value={params.averageTicketEur}
              onChange={(e) => updateParam('averageTicketEur', parseInt(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          {/* Repeat purchase */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Repeat className="w-3.5 h-3.5 text-purple-600" />
                Frecuencia de Repetición
              </span>
              <span className="font-bold font-mono text-purple-800">{params.repeatPurchaseFrequency}x / mes</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={params.repeatPurchaseFrequency}
              onChange={(e) => updateParam('repeatPurchaseFrequency', parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Network Effect */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-teal-600" />
                Coeficiente Efecto Red
              </span>
              <span className="font-bold font-mono text-teal-800">{params.networkEffectCoefficient}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={params.networkEffectCoefficient}
              onChange={(e) => updateParam('networkEffectCoefficient', parseFloat(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>
        </div>

        {/* 3 Projections Display */}
        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Conservative */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Escenario 1</span>
                  <h4 className="font-bold text-sm text-stone-900">Conservador</h4>
                  <p className="text-[11px] text-stone-500">Adopción moderada sin aceleración viral.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-stone-800 font-mono">
                    {Number(result?.conservative?.monthlyGrossVolumeEur || 0).toLocaleString()} €
                  </span>
                  <span className="text-[11px] text-stone-500 block">volumen bruto / mes</span>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Ingreso Neto Comercios:</span>
                    <strong className="text-emerald-700 font-mono">{Number(result?.conservative?.monthlyParticipatingShopsIncome || 0).toLocaleString()} €</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Interacciones QR:</span>
                    <strong className="font-mono">{Number(result?.conservative?.activeInteractions || 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Baseline */}
              <div className="bg-sky-50/70 p-5 rounded-2xl border-2 border-sky-500 shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-800 block mb-1">Escenario 2 (Esperado)</span>
                  <h4 className="font-bold text-sm text-sky-950">Línea Base AhorraAI</h4>
                  <p className="text-[11px] text-sky-700">Comportamiento estándar de red cooperativa.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl font-black text-sky-950 font-mono">
                    {Number(result?.baseline?.monthlyGrossVolumeEur || 0).toLocaleString()} €
                  </span>
                  <span className="text-[11px] text-sky-800 block font-semibold">volumen bruto / mes</span>
                </div>

                <div className="pt-3 border-t border-sky-200 space-y-1 text-xs">
                  <div className="flex justify-between text-sky-900">
                    <span>Ingreso Neto Comercios:</span>
                    <strong className="text-emerald-800 font-mono">{Number(result?.baseline?.monthlyParticipatingShopsIncome || 0).toLocaleString()} €</strong>
                  </div>
                  <div className="flex justify-between text-sky-900">
                    <span>Interacciones QR:</span>
                    <strong className="font-mono">{Number(result?.baseline?.activeInteractions || 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Optimistic */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-300 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Escenario 3</span>
                  <h4 className="font-bold text-sm text-emerald-950">Optimista (Efecto Red)</h4>
                  <p className="text-[11px] text-emerald-700">Alta densidad y recomendación cruzada.</p>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-emerald-900 font-mono">
                    {Number(result?.optimistic?.monthlyGrossVolumeEur || 0).toLocaleString()} €
                  </span>
                  <span className="text-[11px] text-emerald-700 block">volumen bruto / mes</span>
                </div>

                <div className="pt-3 border-t border-emerald-200 space-y-1 text-xs">
                  <div className="flex justify-between text-emerald-900">
                    <span>Ingreso Neto Comercios:</span>
                    <strong className="text-emerald-800 font-mono">{Number(result?.optimistic?.monthlyParticipatingShopsIncome || 0).toLocaleString()} €</strong>
                  </div>
                  <div className="flex justify-between text-emerald-900">
                    <span>Interacciones QR:</span>
                    <strong className="font-mono">{Number(result?.optimistic?.activeInteractions || 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

            </div>
          ) : null}

          {/* Model Mathematical Explanation */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2 text-xs text-stone-600">
            <h4 className="font-bold text-stone-900 text-sm">Fórmula del Modelo MPDA-AI:</h4>
            <p className="font-mono text-[11px] bg-stone-50 p-2.5 rounded border border-stone-200 text-stone-800">
              Volumen = N_comercios × (Afluencia × Tasa_QR) × Tasa_Conv × Ticket × Freq_Rep × (1 + (N × Coef_Red)/100)
            </p>
            <p className="text-[11px] text-stone-500">
              *El efecto red formaliza que a mayor número de comercios adheridos en una misma rúa de Vigo, la probabilidad de conversión cruzada se multiplica exponencialmente.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
