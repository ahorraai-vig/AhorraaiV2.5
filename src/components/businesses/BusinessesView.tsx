import React, { useState, useMemo } from 'react';
import { Business, VigoZone } from '../../types';
import { HonestyBadge } from '../common/HonestyBadge';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Store, 
  Eye, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Columns
} from 'lucide-react';

interface BusinessesViewProps {
  businesses: Business[];
  onSelectBusiness: (business: Business) => void;
  onCreateBusiness: (data: Partial<Business>) => Promise<void>;
  selectedZone: string;
  onSelectZone: (zone: string) => void;
}

export const BusinessesView: React.FC<BusinessesViewProps> = ({
  businesses,
  onSelectBusiness,
  onCreateBusiness,
  selectedZone,
  onSelectZone
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIPDLevel, setSelectedIPDLevel] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  
  // New Business Form State
  const [newBizName, setNewBizName] = useState<string>('');
  const [newBizCategory, setNewBizCategory] = useState<string>('Comercio Minorista');
  const [newBizZone, setNewBizZone] = useState<VigoZone>('Centro / Príncipe');
  const [newBizStreet, setNewBizStreet] = useState<string>('Rúa Urzáiz, 12');
  const [newBizPhone, setNewBizPhone] = useState<string>('+34 986 00 00 00');
  const [newBizDesc, setNewBizDesc] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    (businesses || []).forEach(b => {
      if (b?.category) set.add(b.category);
    });
    return Array.from(set);
  }, [businesses]);

  const filtered = useMemo(() => {
    return (businesses || []).filter(b => {
      if (!b) return false;
      if (selectedZone !== 'all' && b.neighborhood !== selectedZone) return false;
      if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
      const ipd = b.digitalPresence?.overallIPD ?? 0;
      if (selectedIPDLevel === 'high' && ipd < 70) return false;
      if (selectedIPDLevel === 'medium' && (ipd < 45 || ipd >= 70)) return false;
      if (selectedIPDLevel === 'low' && ipd >= 45) return false;
      if (searchTerm) {
        const q = (searchTerm || '').toLowerCase();
        const matchesName = (b.name || '').toLowerCase().includes(q) || (b.tradeName || '').toLowerCase().includes(q);
        const matchesStreet = (b.street || '').toLowerCase().includes(q) || (b.address || '').toLowerCase().includes(q);
        const matchesTag = Array.isArray(b.tags) && b.tags.some(t => (t || '').toLowerCase().includes(q));
        if (!matchesName && !matchesStreet && !matchesTag) return false;
      }
      return true;
    });
  }, [businesses, selectedZone, selectedCategory, selectedIPDLevel, searchTerm]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName.trim()) return;
    await onCreateBusiness({
      name: newBizName,
      tradeName: newBizName,
      category: newBizCategory,
      neighborhood: newBizZone,
      street: newBizStreet,
      address: `${newBizStreet}, ${newBizZone}`,
      phone: newBizPhone,
      description: newBizDesc || `Comercio local en ${newBizZone} auditado por AhorraAI`,
      digitalPresence: {
        googleMapsScore: 50,
        websiteQualityScore: 20,
        socialMediaActivityScore: 30,
        localSeoScore: 30,
        qrInteractiveScore: 10,
        ecommerceReadyScore: 10,
        whatsappCommerceScore: 40,
        overallIPD: 35
      },
      honestyMap: {
        identity: 'DICHO',
        schedule: 'DICHO',
        contact: 'DICHO',
        catalog: 'SIN_CONFIRMAR',
        pricing: 'SIN_CONFIRMAR'
      }
    });
    setShowCreateModal(false);
    setNewBizName('');
    setNewBizDesc('');
  };

  return (
    <div id="businesses-catalog-view" className="space-y-6">
      
      {/* Header & Stats */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-stone-900">Directorio de Gemelos Digitales de Vigo</h2>
            <ProvenanceBadge provenance="VERIFIED" size="xs" />
          </div>
          <p className="text-xs text-stone-500">
            {filtered.length} comercios auditados con desglose de IPD, 3 franjas de horarios y honestidad estructural.
          </p>
        </div>

        <button
          id="add-business-modal-btn"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Auditar Nuevo Comercio</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, rúa o especialidad..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:border-sky-500"
        >
          <option value="all">Todas las categorías ({(businesses || []).length})</option>
          {(categories || []).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* IPD Level */}
        <select
          value={selectedIPDLevel}
          onChange={(e) => setSelectedIPDLevel(e.target.value)}
          className="text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:border-sky-500"
        >
          <option value="all">Cualquier nivel IPD</option>
          <option value="high">IPD Alto (≥70)</option>
          <option value="medium">IPD Medio (45-69)</option>
          <option value="low">IPD en Desarrollo (&lt;45)</option>
        </select>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(filtered || []).map(business => {
          const ipd = business?.digitalPresence?.overallIPD ?? 0;
          const ipdColor = ipd >= 70 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : ipd >= 50 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-amber-700 bg-amber-50 border-amber-200';

          return (
            <div
              key={business.id}
              id={`biz-card-${business.id}`}
              onClick={() => onSelectBusiness(business)}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      {business.neighborhood}
                    </span>
                    <h3 className="font-bold text-sm text-stone-900 mt-0.5 line-clamp-1">{business.name}</h3>
                  </div>

                  <div className={`px-2.5 py-1 rounded-xl border font-mono font-bold text-xs shrink-0 ${ipdColor}`}>
                    IPD {ipd}
                  </div>
                </div>

                <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{business.address}</span>
                </p>

                <p className="text-xs text-stone-600 line-clamp-2">{business.description}</p>
              </div>

              {/* Schedules & Honesty Badges */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-medium">Horario Mañanas:</span>
                  <span className="font-mono text-stone-800">{business.schedules[0]?.hours || '10:00 - 13:30'}</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-medium">Tarde Comercial:</span>
                  <span className="font-mono text-stone-800">{business.schedules[1]?.hours || '16:30 - 20:30'}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <HonestyBadge status={business.honestyMap.schedule} size="sm" />
                  <span className="text-[11px] text-stone-500 font-medium">★ {business.metrics.googleRating} ({business.metrics.googleReviewsCount})</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between text-xs text-sky-600 font-semibold">
                <span>Ver Diagnóstico & Escaparate</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Business Modal */}
      {showCreateModal && (
        <div id="add-business-modal" className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
            <div className="bg-stone-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-base">Auditar & Registrar Comercio en Vigo</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Nombre Comercial:</label>
                <input
                  type="text"
                  required
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  placeholder="Ej. Zapatería Bouzas"
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Zona de Vigo:</label>
                  <select
                    value={newBizZone}
                    onChange={(e) => setNewBizZone(e.target.value as VigoZone)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-sky-500"
                  >
                    <option value="Centro / Príncipe">Centro / Príncipe</option>
                    <option value="Urzáiz">Urzáiz</option>
                    <option value="Casco Vello">Casco Vello</option>
                    <option value="O Calvario">O Calvario</option>
                    <option value="As Travesas">As Travesas</option>
                    <option value="Bouzas">Bouzas</option>
                    <option value="Teis">Teis</option>
                    <option value="Torrecedeira">Torrecedeira</option>
                    <option value="Navia">Navia</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Categoría:</label>
                  <input
                    type="text"
                    value={newBizCategory}
                    onChange={(e) => setNewBizCategory(e.target.value)}
                    placeholder="Ej. Moda & Calzado"
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Dirección / Rúa:</label>
                <input
                  type="text"
                  value={newBizStreet}
                  onChange={(e) => setNewBizStreet(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Descripción Breve:</label>
                <textarea
                  rows={2}
                  value={newBizDesc}
                  onChange={(e) => setNewBizDesc(e.target.value)}
                  placeholder="Especialidad y propuesta de valor..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold shadow-md"
                >
                  Registrar Comercio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
