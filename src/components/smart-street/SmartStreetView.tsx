import React from 'react';
import { StreetIntelligence, NeighborhoodIntelligence } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Building, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface SmartStreetViewProps {
  streets: StreetIntelligence[];
  neighborhoods: NeighborhoodIntelligence[];
  selectedZone: string;
}

export const SmartStreetView: React.FC<SmartStreetViewProps> = ({
  streets,
  neighborhoods,
  selectedZone
}) => {
  const filteredStreets = (streets || []).filter(s => {
    if (!s) return false;
    if (selectedZone !== 'all' && s.neighborhood !== selectedZone) return false;
    return true;
  });

  return (
    <div id="smart-street-intelligence-view" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Inteligencia Urbana de Calles & Barrios (Vigo)</h2>
            <ProvenanceBadge provenance="ESTIMATED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Afluencia peatonal, ratio de locales vacíos y propuestas de intervención para la dinamización de ejes comerciales.
          </p>
        </div>
      </div>

      {/* Neighborhoods Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(neighborhoods || []).map((n, idx) => {
          const name = n.neighborhoodName || (n as any).name || `Barrio-${idx}`;
          const key = n.neighborhoodName || (n as any).id || `neighborhood-${idx}`;
          const score = n.neighborhoodScore ?? (n as any).averageDigitalPresenceIPD ?? 0;
          const description = n.calculationExplanation || (n as any).description || '';
          const count = n.totalBusinesses ?? (n as any).activeBusinessesCount ?? 0;
          const coop = n.cooperationIndex ?? (n as any).cooperationDensityScore ?? 0;

          return (
            <div key={key} id={`neighborhood-card-${idx}`} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-xs text-stone-900">{name}</span>
                <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">
                  Score {score}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-2">{description}</p>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-[10px] text-stone-600">
                <span>Locales: <strong>{count}</strong></span>
                <span className="text-emerald-700 font-semibold">Cooperación: {coop}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Streets Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-stone-900">Ejes Comerciales Clave ({(filteredStreets || []).length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(filteredStreets || []).map((street, idx) => {
            const streetName = street.streetName || (street as any).name || `Calle-${idx}`;
            const streetKey = street.streetName || (street as any).id || `street-${idx}`;
            const zone = street.zone || (street as any).neighborhood || 'Vigo';
            const traffic = street.pedestrianTrafficRating || `${Number((street as any)?.pedestrianDailyTraffic || 0).toLocaleString()} personas/día`;
            const categories = street.dominantCategories ? street.dominantCategories.join(', ') : (street as any).predominantCategory || 'Comercio Local';
            const totalBiz = street.totalBusinesses ?? (street as any).commercialPremisesCount ?? 0;
            const coopScore = street.cooperationDensity ?? (street as any).cooperationDensityScore ?? 0;
            const explanation = street.calculationExplanation || (street as any).recommendedIntervention || '';

            return (
              <div
                key={streetKey}
                id={`street-card-${idx}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] uppercase font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      {zone}
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-900">
                      {traffic}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-stone-900 mt-2">{streetName}</h4>
                  <p className="text-xs text-stone-500 mt-1">Ejes: {categories}</p>
                </div>

                {/* Vacancy and Health */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Locales Comerciales:</span>
                    <strong>{totalBiz}</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Densidad Cooperativa:</span>
                    <strong className="text-emerald-700">{coopScore} / 100</strong>
                  </div>
                </div>

                {/* Intervention Action */}
                <div className="pt-2 border-t border-stone-100 text-xs">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Diagnóstico Comercial:</span>
                  <p className="font-semibold text-stone-800 text-[11px]">{explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
