import React, { useState, useMemo } from 'react';
import { Business, Opportunity, CooperationLink, VigoZone } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { HonestyBadge } from '../common/HonestyBadge';
import { 
  MapPin, 
  Sparkles, 
  Share2, 
  Layers, 
  Filter, 
  Compass, 
  Building2, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface InteractiveMapProps {
  businesses: Business[];
  opportunities: Opportunity[];
  cooperationLinks: CooperationLink[];
  selectedZone: string;
  onSelectZone: (zone: string) => void;
  onSelectBusiness: (business: Business) => void;
  onSelectOpportunity?: (opp: Opportunity) => void;
}

interface MapZoneCoord {
  name: VigoZone;
  x: number; // percentage in SVG viewBox
  y: number;
  label: string;
  color: string;
}

const VIGO_ZONES_COORDS: MapZoneCoord[] = [
  { name: 'Casco Vello', x: 260, y: 190, label: 'Casco Vello & Berbés', color: '#f59e0b' },
  { name: 'Centro / Príncipe', x: 330, y: 220, label: 'Príncipe & Centro', color: '#0284c7' },
  { name: 'Urzáiz', x: 410, y: 260, label: 'Eje Urzáiz', color: '#0d9488' },
  { name: 'O Calvario', x: 500, y: 290, label: 'Peatonal Calvario', color: '#16a34a' },
  { name: 'Torrecedeira', x: 290, y: 290, label: 'Torrecedeira', color: '#6366f1' },
  { name: 'As Travesas', x: 270, y: 380, label: 'Praza América / Travesas', color: '#8b5cf6' },
  { name: 'Bouzas', x: 130, y: 310, label: 'Villa de Bouzas', color: '#ec4899' },
  { name: 'Teis', x: 560, y: 150, label: 'Teis & Guía', color: '#ea580c' },
  { name: 'Navia', x: 140, y: 460, label: 'PAU de Navia', color: '#059669' }
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  businesses,
  opportunities,
  cooperationLinks,
  selectedZone,
  onSelectZone,
  onSelectBusiness,
  onSelectOpportunity
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'businesses' | 'opportunities' | 'cooperation'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<{ type: 'business' | 'opportunity' | 'zone'; data: any } | null>(null);
  const [selectedMapBusiness, setSelectedMapBusiness] = useState<Business | null>(null);

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return (businesses || []).filter(b => {
      if (!b) return false;
      if (selectedZone !== 'all' && b.neighborhood !== selectedZone) return false;
      if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
      return true;
    });
  }, [businesses, selectedZone, selectedCategory]);

  // Position businesses within their zone coordinate cluster
  const mappedBusinesses = useMemo(() => {
    return (filteredBusinesses || []).map((b, idx) => {
      const zoneCoord = VIGO_ZONES_COORDS.find(z => z.name === b.neighborhood) || { x: 330, y: 220 };
      // Distribute businesses around zone center
      const angle = (idx * 55 * Math.PI) / 180;
      const radius = 18 + ((idx % 3) * 12);
      const x = zoneCoord.x + Math.cos(angle) * radius;
      const y = zoneCoord.y + Math.sin(angle) * radius;
      return { ...b, mapX: x, mapY: y };
    });
  }, [filteredBusinesses]);

  // Filter opportunities for map
  const mappedOpportunities = useMemo(() => {
    return (opportunities || []).filter(o => {
      if (!o) return false;
      if (selectedZone !== 'all' && o.zone !== selectedZone) return false;
      return true;
    }).map((opp, idx) => {
      const zoneCoord = VIGO_ZONES_COORDS.find(z => z.name === opp.zone) || { x: 330, y: 220 };
      return {
        ...opp,
        mapX: zoneCoord.x - 12 + (idx * 16),
        mapY: zoneCoord.y - 25
      };
    });
  }, [opportunities, selectedZone]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    (businesses || []).forEach(b => {
      if (b?.category) set.add(b.category);
    });
    return Array.from(set);
  }, [businesses]);

  return (
    <div id="vigo-urban-map-container" className="relative w-full bg-stone-900 rounded-xl border border-stone-800 shadow-xl overflow-hidden text-stone-100 flex flex-col min-h-[680px]">
      
      {/* Top Map Toolbar */}
      <div className="bg-stone-950/90 backdrop-blur border-b border-stone-800 p-3.5 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-sky-950/80 border border-sky-600/30 rounded-lg text-sky-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm tracking-wide text-white">Gemelo Digital Urbano — Vigo</h3>
              <ProvenanceBadge provenance="SIMULATED" size="xs" />
            </div>
            <p className="text-xs text-stone-400">9 micro-zonas comerciales y {mappedBusinesses.length} nodos activos</p>
          </div>
        </div>

        {/* Filters and Layers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer switch */}
          <div className="inline-flex bg-stone-900 border border-stone-800 p-0.5 rounded-lg text-xs">
            <button
              id="map-layer-all"
              onClick={() => setActiveLayer('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeLayer === 'all' ? 'bg-sky-600 text-white shadow' : 'text-stone-400 hover:text-white'
              }`}
            >
              Todo
            </button>
            <button
              id="map-layer-businesses"
              onClick={() => setActiveLayer('businesses')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                activeLayer === 'businesses' ? 'bg-sky-600 text-white shadow' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3 h-3" />
              Comercios
            </button>
            <button
              id="map-layer-opps"
              onClick={() => setActiveLayer('opportunities')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                activeLayer === 'opportunities' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Oportunidades
            </button>
            <button
              id="map-layer-coop"
              onClick={() => setActiveLayer('cooperation')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                activeLayer === 'cooperation' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Share2 className="w-3 h-3" />
              Cooperación
            </button>
          </div>

          {/* Category Filter */}
          <select
            id="map-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
          >
            <option value="all">Todas las categorías ({businesses.length})</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map SVG Canvas */}
      <div className="relative flex-1 bg-[#10141b] flex items-center justify-center p-4 overflow-hidden select-none">
        
        {/* Background Map Graphic for Vigo Ría and Coastline */}
        <svg 
          viewBox="0 0 700 550" 
          className="w-full h-full max-h-[620px] filter drop-shadow"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="riaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.4" />
            </linearGradient>
            
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.2" />
            </pattern>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid */}
          <rect width="700" height="550" fill="url(#gridPattern)" />

          {/* Ría de Vigo (Water body) */}
          <path
            d="M 0,0 L 700,0 L 700,100 Q 560,90 480,120 T 300,130 Q 180,140 100,200 T 0,260 Z"
            fill="url(#riaGradient)"
            stroke="#0284c7"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="80" y="70" fill="#38bdf8" opacity="0.4" fontSize="13" fontWeight="bold" letterSpacing="3">
            RÍA DE VIGO (ATLÁNTICO)
          </text>
          <text x="18" y="240" fill="#38bdf8" opacity="0.4" fontSize="9" letterSpacing="1">
            PORTO DE VIGO / BERBÉS
          </text>

          {/* Urban Land Outline of Vigo */}
          <path
            d="M 0,260 Q 100,200 180,140 T 300,130 Q 480,120 560,90 T 700,100 L 700,550 L 0,550 Z"
            fill="url(#landGradient)"
            stroke="#475569"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Main Urban Roads Network (Vigo Spine: Guixar -> Urzáiz -> Gran Vía -> Castrelos -> Navia) */}
          <g opacity="0.3" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
            {/* Travesía de Vigo / Sanjurjo Badía */}
            <path d="M 680,130 Q 560,150 430,220" fill="none" />
            {/* Urzáiz & Príncipe */}
            <path d="M 430,220 L 330,220 L 260,190" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Gran Vía to As Travesas */}
            <path d="M 430,220 L 370,300 L 270,380" fill="none" />
            {/* Peatonal Calvario */}
            <path d="M 430,220 L 500,290 L 580,340" fill="none" stroke="#4ade80" strokeWidth="2" />
            {/* Beiramar to Bouzas */}
            <path d="M 260,190 Q 200,220 130,310" fill="none" stroke="#f472b6" strokeWidth="2" />
            {/* Castelao to Navia */}
            <path d="M 270,380 Q 200,420 140,460" fill="none" />
            {/* Torrecedeira / Pi y Margall */}
            <path d="M 260,190 L 290,290 L 270,380" fill="none" />
          </g>

          {/* Cooperation Links Vectors */}
          {(activeLayer === 'all' || activeLayer === 'cooperation') && (cooperationLinks || []).map((link) => {
            const srcBiz = (mappedBusinesses || []).find(b => b.id === link.sourceBusinessId);
            const tgtBiz = (mappedBusinesses || []).find(b => b.id === link.targetBusinessId);
            if (!srcBiz || !tgtBiz) return null;

            return (
              <g key={link.id} className="cursor-pointer">
                <line
                  x1={srcBiz.mapX}
                  y1={srcBiz.mapY}
                  x2={tgtBiz.mapX}
                  y2={tgtBiz.mapY}
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  opacity="0.8"
                />
                <circle
                  cx={(srcBiz.mapX + tgtBiz.mapX) / 2}
                  cy={(srcBiz.mapY + tgtBiz.mapY) / 2}
                  r="5"
                  fill="#10b981"
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* Zone Areas and Labels */}
          {(VIGO_ZONES_COORDS || []).map((zone) => {
            const isSelected = selectedZone === zone.name;
            const zoneBizCount = (businesses || []).filter(b => b?.neighborhood === zone.name).length;

            return (
              <g 
                key={zone.name}
                id={`map-zone-${(zone?.name || 'zone').toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="cursor-pointer transition-all"
                onClick={() => onSelectZone(selectedZone === zone.name ? 'all' : zone.name)}
                onMouseEnter={() => setHoveredNode({ type: 'zone', data: zone })}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Zone Area Glow / Circle */}
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={isSelected ? 48 : 38}
                  fill={zone.color}
                  fillOpacity={isSelected ? 0.22 : 0.08}
                  stroke={zone.color}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeOpacity={isSelected ? 0.9 : 0.4}
                  strokeDasharray={isSelected ? 'none' : '3 3'}
                />

                {/* Zone Name Label */}
                <text
                  x={zone.x}
                  y={zone.y + 36}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#cbd5e1'}
                  fontSize={isSelected ? '11' : '10'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow"
                >
                  {zone.label}
                </text>
                <text
                  x={zone.x}
                  y={zone.y + 47}
                  textAnchor="middle"
                  fill={zone.color}
                  fontSize="8.5"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {zoneBizCount} nodos
                </text>
              </g>
            );
          })}

          {/* Business Markers */}
          {(activeLayer === 'all' || activeLayer === 'businesses') && (mappedBusinesses || []).map((b) => {
            const isSelected = selectedMapBusiness?.id === b.id;
            const overallIPD = b.digitalPresence?.overallIPD ?? 50;
            const ipdColor = overallIPD >= 70 ? '#10b981' : overallIPD >= 50 ? '#0284c7' : '#f59e0b';

            return (
              <g
                key={b.id}
                id={`marker-${b.id}`}
                transform={`translate(${b.mapX}, ${b.mapY})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => {
                  setSelectedMapBusiness(b);
                  onSelectBusiness(b);
                }}
                onMouseEnter={() => setHoveredNode({ type: 'business', data: b })}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Pin Circle */}
                <circle
                  r={isSelected ? 10 : 7}
                  fill={ipdColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="drop-shadow-md"
                />
                {/* IPD Mini Pill */}
                <rect
                  x="-10"
                  y="-16"
                  width="20"
                  height="9"
                  rx="3"
                  fill="#0f172a"
                  stroke={ipdColor}
                  strokeWidth="0.8"
                />
                <text
                  x="0"
                  y="-9.5"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="6.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {overallIPD}
                </text>
              </g>
            );
          })}

          {/* Opportunity Hotspot Markers */}
          {(activeLayer === 'all' || activeLayer === 'opportunities') && (mappedOpportunities || []).map((opp) => (
            <g
              key={opp.id}
              id={`opp-marker-${opp.id}`}
              transform={`translate(${opp.mapX}, ${opp.mapY})`}
              className="cursor-pointer hover:scale-125 transition-transform"
              onClick={() => onSelectOpportunity && onSelectOpportunity(opp)}
              onMouseEnter={() => setHoveredNode({ type: 'opportunity', data: opp })}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle r="12" fill="#f59e0b" fillOpacity="0.3" className="animate-ping" />
              <polygon
                points="0,-8 7,5 -7,5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip / Floating Card */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 bg-stone-900/95 backdrop-blur border border-stone-700 p-3 rounded-lg shadow-2xl max-w-xs text-xs z-20 pointer-events-none animate-fadeIn">
            {hoveredNode.type === 'business' && (
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-white truncate">{hoveredNode.data.name}</span>
                  <span className="bg-sky-950 text-sky-400 px-1.5 py-0.5 rounded font-mono text-[10px]">
                    IPD {hoveredNode.data.digitalPresence.overallIPD}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px] mb-1.5">{hoveredNode.data.address}</p>
                <div className="flex items-center gap-1.5">
                  <HonestyBadge status={hoveredNode.data.honestyMap.schedule} size="sm" />
                  <span className="text-[10px] text-stone-400">★ {hoveredNode.data.metrics.googleRating}</span>
                </div>
              </div>
            )}

            {hoveredNode.type === 'opportunity' && (
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Oportunidad Detectada</span>
                </div>
                <p className="font-medium text-white mb-1">{hoveredNode.data.title}</p>
                <p className="text-stone-400 text-[10px]">{hoveredNode.data.recommendedAction}</p>
                <div className="mt-1 text-emerald-400 font-mono text-[10px]">
                  Impacto est.: +{Number(hoveredNode.data?.estimatedEconomicImpactEur || 0).toLocaleString()} €
                </div>
              </div>
            )}

            {hoveredNode.type === 'zone' && (
              <div>
                <span className="font-semibold text-white block mb-0.5">{hoveredNode.data.label}</span>
                <span className="text-stone-400 text-[11px]">Haz clic para filtrar comercios y sinergias en esta zona de Vigo.</span>
              </div>
            )}
          </div>
        )}

        {/* Legend Overlay */}
        <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur border border-stone-800 p-2.5 rounded-lg text-[11px] text-stone-300 space-y-1.5 hidden md:block">
          <div className="font-semibold text-stone-100 text-xs mb-1">Leyenda del Gemelo Digital</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span>IPD Alto (≥70)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
            <span>IPD Medio (50-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span>IPD en Desarrollo (&lt;50)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
            <span>Enlace Cooperativo Activo</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Oportunidad Clave</span>
          </div>
        </div>
      </div>

      {/* Selected Business Bottom Bar */}
      {selectedMapBusiness && (
        <div className="bg-stone-950 border-t border-stone-800 p-3.5 flex flex-wrap items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-600/30 flex items-center justify-center text-sky-400 font-bold">
              {selectedMapBusiness.digitalPresence.overallIPD}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-white text-sm">{selectedMapBusiness.name}</h4>
                <span className="text-xs text-stone-400">({selectedMapBusiness.category})</span>
                <HonestyBadge status={selectedMapBusiness.honestyMap.identity} size="sm" />
              </div>
              <p className="text-xs text-stone-400">{selectedMapBusiness.address} • {selectedMapBusiness.neighborhood}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="map-view-full-profile-btn"
              onClick={() => onSelectBusiness(selectedMapBusiness)}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>Ver Ficha Inteligente & Diagnóstico</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="map-close-selected-btn"
              onClick={() => setSelectedMapBusiness(null)}
              className="p-1.5 text-stone-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
