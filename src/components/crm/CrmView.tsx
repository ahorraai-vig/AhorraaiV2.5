import React from 'react';
import { Business } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Users, 
  CheckCircle, 
  Send, 
  Award, 
  HelpCircle, 
  Store,
  ChevronRight
} from 'lucide-react';

interface CrmViewProps {
  businesses: Business[];
  onSelectBusiness: (business: Business) => void;
  onUpdateCrmStatus: (businessId: string, status: any) => Promise<void>;
}

const CRM_STAGES = [
  { key: 'descubierto', label: '1. Descubierto', color: 'border-stone-300 bg-stone-50' },
  { key: 'contactado', label: '2. Contactado', color: 'border-sky-300 bg-sky-50/50' },
  { key: 'demo_realizada', label: '3. Demo Realizada', color: 'border-amber-300 bg-amber-50/50' },
  { key: 'propuesta_enviada', label: '4. Propuesta Enviada', color: 'border-purple-300 bg-purple-50/50' },
  { key: 'activo', label: '5. Activo (Comercio Piloto)', color: 'border-emerald-300 bg-emerald-50/50' },
  { key: 'embajador', label: '6. Embajador de Barrio', color: 'border-teal-300 bg-teal-50/50' }
];

export const CrmView: React.FC<CrmViewProps> = ({
  businesses,
  onSelectBusiness,
  onUpdateCrmStatus
}) => {
  return (
    <div id="crm-pipeline-view" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">CRM de Adopción & Despliegue en Vigo</h2>
            <ProvenanceBadge provenance="VERIFIED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Seguimiento de comercios desde su descubrimiento en calle hasta su consolidación como embajadores de barrio.
          </p>
        </div>
      </div>

      {/* CRM Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
        {(CRM_STAGES || []).map(stage => {
          const stageBiz = (businesses || []).filter(b => b?.crmStatus === stage.key);

          return (
            <div
              key={stage.key}
              className={`rounded-2xl border p-3 flex flex-col min-w-[210px] space-y-3 ${stage.color}`}
            >
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-xs text-stone-800">{stage.label}</span>
                <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-stone-200 shadow-sm">
                  {stageBiz.length}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {(stageBiz || []).map(b => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBusiness(b)}
                    className="bg-white p-3 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-sky-800 truncate">{b.neighborhood}</span>
                      <span className="text-[10px] font-mono font-bold text-stone-500">IPD {b.digitalPresence.overallIPD}</span>
                    </div>

                    <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{b.name}</h4>
                    <p className="text-[10px] text-stone-500 truncate">{b.street}</p>

                    <div className="pt-1.5 border-t border-stone-100 flex justify-between items-center text-[10px] text-sky-600 font-semibold">
                      <span>Ver Ficha</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}

                {stageBiz.length === 0 && (
                  <div className="py-6 text-center text-stone-400 text-xs border-2 border-dashed border-stone-200/80 rounded-xl">
                    Vacío
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
