import React, { useState } from 'react';
import { Campaign, VigoZone } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Megaphone, 
  QrCode, 
  Plus, 
  TrendingUp, 
  Eye, 
  Users, 
  Euro, 
  Calendar, 
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

interface CampaignsViewProps {
  campaigns: Campaign[];
  onCreateCampaign: (data: Partial<Campaign>) => Promise<void>;
  onUpdateStatus: (id: string, status: any) => Promise<void>;
  selectedZone: string;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  onCreateCampaign,
  onUpdateStatus,
  selectedZone
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [objective, setObjective] = useState<string>('Dinamización comercial');
  const [zone, setZone] = useState<VigoZone>('Centro / Príncipe');
  const [offerDetails, setOfferDetails] = useState<string>('');

  const filtered = (campaigns || []).filter(c => {
    if (!c) return false;
    if (selectedZone !== 'all' && c.zone !== selectedZone) return false;
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onCreateCampaign({
      name,
      objective,
      zone,
      offerDetails: offerDetails || 'Promoción cruzada AhorraAI con QR dinámico',
      channels: ['qr_escaparate', 'whatsapp']
    });
    setShowCreateModal(false);
    setName('');
    setOfferDetails('');
  };

  return (
    <div id="campaigns-view-container" className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Campañas Comerciales & Escaparates Dinámicos</h2>
            <ProvenanceBadge provenance="SIMULATED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            Activación de soportes QR, pases de barrio y dinámicas cooperativas en rúas de Vigo.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Campaña QR</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(campaign => (
          <div
            key={campaign.id}
            id={`campaign-card-${campaign.id}`}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                  {campaign.zone}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                  campaign.status === 'activa' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                }`}>
                  {campaign.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-stone-900">{campaign.name}</h3>
              <p className="text-xs text-stone-500 mt-1">{campaign.objective}</p>
              <p className="text-xs text-stone-700 font-medium mt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                {campaign.offerDetails}
              </p>
            </div>

            {/* QR and Metrics */}
            <div className="bg-stone-900 text-white p-3 rounded-xl flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg text-stone-950 shrink-0">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="text-xs">
                <span className="font-mono text-[10px] text-emerald-400 font-bold">{campaign.qrCodeId}</span>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-stone-300">
                  <span>{campaign.simulatedMetrics.qrScans} escaneos</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">+{campaign.simulatedMetrics.totalRevenueEur} €</span>
                </div>
              </div>
            </div>

            {/* Status toggle */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px]">Canales: {campaign.channels.join(', ')}</span>
              <button
                onClick={() => onUpdateStatus(campaign.id, campaign.status === 'activa' ? 'pausada' : 'activa')}
                className="text-sky-600 hover:text-sky-800 font-semibold"
              >
                {campaign.status === 'activa' ? 'Pausar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="bg-stone-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm">Lanzar Campaña QR en Vigo</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nombre de la Campaña:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Ruta Gastronómica Casco Vello"
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Zona Comercial:</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as VigoZone)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                >
                  <option value="Centro / Príncipe">Centro / Príncipe</option>
                  <option value="Urzáiz">Urzáiz</option>
                  <option value="Casco Vello">Casco Vello</option>
                  <option value="O Calvario">O Calvario</option>
                  <option value="Bouzas">Bouzas</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Detalle de la Ventaja / Oferta:</label>
                <textarea
                  rows={2}
                  value={offerDetails}
                  onChange={(e) => setOfferDetails(e.target.value)}
                  placeholder="Ej. 10% de descuento en la segunda parada escaneando el código..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold"
                >
                  Activar Campaña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
