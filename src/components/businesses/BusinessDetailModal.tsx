import React, { useState } from 'react';
import { Business, BusinessDiagnostic, CommercialProposalExport } from '../../types';
import { HonestyBadge } from '../common/HonestyBadge';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Clock, 
  Globe, 
  Phone, 
  MessageSquare, 
  FileText, 
  Store, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Share2, 
  Printer, 
  RefreshCw,
  QrCode,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface BusinessDetailModalProps {
  business: Business;
  onClose: () => void;
  onDiagnose: (businessId: string) => Promise<BusinessDiagnostic | null>;
  onGenerateProposal?: (business: Business) => void;
  onCreateCooperation?: (business: Business) => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  onClose,
  onDiagnose,
  onGenerateProposal,
  onCreateCooperation
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'ipd' | 'diagnostic' | 'smart_window' | 'proposal'>('diagnostic');
  const [diagnostic, setDiagnostic] = useState<BusinessDiagnostic | null>(null);
  const [loadingDiagnostic, setLoadingDiagnostic] = useState<boolean>(false);
  const [activeWindowSlot, setActiveWindowSlot] = useState<'Mañanas' | 'Tarde Comercial' | 'Ocio / Nocturno'>('Tarde Comercial');

  // Trigger diagnostic if not loaded
  const handleLoadDiagnostic = async () => {
    setLoadingDiagnostic(true);
    try {
      const res = await onDiagnose(business.id);
      if (res) setDiagnostic(res);
    } finally {
      setLoadingDiagnostic(false);
    }
  };

  React.useEffect(() => {
    handleLoadDiagnostic();
  }, [business.id]);

  const ipd = business.digitalPresence;

  return (
    <div id="business-detail-modal-overlay" className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        id="business-detail-modal-content"
        className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-start justify-between gap-4 border-b border-stone-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-lg shrink-0">
              {ipd.overallIPD}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-bold tracking-tight text-white">{business.name}</h2>
                <HonestyBadge status={business.honestyMap.identity} size="sm" />
                <ProvenanceBadge provenance="VERIFIED" size="xs" />
              </div>
              <p className="text-xs text-stone-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                {business.address}, {business.neighborhood} (Vigo)
                <span className="text-stone-500">•</span>
                <span>{business.category}</span>
              </p>
            </div>
          </div>

          <button
            id="close-business-detail-modal"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 flex overflow-x-auto text-xs font-medium gap-1">
          <button
            id="tab-btn-diagnostic"
            onClick={() => setActiveTab('diagnostic')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'diagnostic' 
                ? 'border-sky-600 text-sky-700 bg-white font-semibold' 
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            Diagnóstico IA
          </button>

          <button
            id="tab-btn-ipd"
            onClick={() => setActiveTab('ipd')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ipd' 
                ? 'border-sky-600 text-sky-700 bg-white font-semibold' 
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Índice IPD ({ipd.overallIPD}/100)
          </button>

          <button
            id="tab-btn-smart-window"
            onClick={() => setActiveTab('smart_window')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'smart_window' 
                ? 'border-sky-600 text-sky-700 bg-white font-semibold' 
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Store className="w-4 h-4 text-indigo-600" />
            Escaparate Inteligente
          </button>

          <button
            id="tab-btn-identity"
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'identity' 
                ? 'border-sky-600 text-sky-700 bg-white font-semibold' 
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            Ficha & Horarios
          </button>

          <button
            id="tab-btn-proposal"
            onClick={() => setActiveTab('proposal')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'proposal' 
                ? 'border-sky-600 text-sky-700 bg-white font-semibold' 
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-600" />
            Propuesta Comercial
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-stone-50/50 space-y-6">

          {/* TAB 1: DIAGNOSTIC */}
          {activeTab === 'diagnostic' && (
            <div className="space-y-6 animate-fadeIn">
              {loadingDiagnostic ? (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-stone-800">Generando Diagnóstico Inteligente AhorraAI...</p>
                  <p className="text-xs text-stone-500">Analizando presencia digital, reseñas de Google, 3 franjas horarias y afluencia en {business.neighborhood}</p>
                </div>
              ) : diagnostic ? (
                <>
                  {/* Health Score Banner */}
                  <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Salud Comercial Global</span>
                        <ProvenanceBadge provenance={diagnostic.provenance} size="xs" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-stone-900">{diagnostic.overallHealthScore}</span>
                        <span className="text-stone-400 text-sm">/ 100</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 max-w-md">{diagnostic.explanation}</p>
                    <button
                      id="re-diagnose-btn"
                      onClick={handleLoadDiagnostic}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Recalcular
                    </button>
                  </div>

                  {/* FODA Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fortalezas */}
                    <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Fortalezas Detectadas</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(diagnostic?.strengths || []).map((s, idx) => (
                          <li key={idx} className="text-xs space-y-0.5 border-l-2 border-emerald-500 pl-2.5">
                            <p className="font-semibold text-stone-800">{s.point}</p>
                            <p className="text-stone-500">{s.evidence}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Debilidades */}
                    <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                      <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-3">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Debilidades Operativas</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(diagnostic?.weaknesses || []).map((w, idx) => (
                          <li key={idx} className="text-xs space-y-0.5 border-l-2 border-amber-500 pl-2.5">
                            <p className="font-semibold text-stone-800">{w.point}</p>
                            <p className="text-stone-500">{w.evidence}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Oportunidades */}
                    <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-sm">
                      <div className="flex items-center gap-2 text-sky-800 font-semibold text-sm mb-3">
                        <Sparkles className="w-4 h-4 text-sky-600" />
                        <span>Oportunidades Inmediatas</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(diagnostic?.opportunities || []).map((o, idx) => (
                          <li key={idx} className="text-xs space-y-0.5 border-l-2 border-sky-500 pl-2.5">
                            <p className="font-semibold text-stone-800">{o.point}</p>
                            <p className="text-emerald-700 font-medium">{o.potentialGain}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amenazas / Riesgos */}
                    <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                      <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm mb-3">
                        <HelpCircle className="w-4 h-4 text-rose-600" />
                        <span>Riesgos de Mercado</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(diagnostic?.threats || []).map((t, idx) => (
                          <li key={idx} className="text-xs space-y-0.5 border-l-2 border-rose-500 pl-2.5">
                            <p className="font-semibold text-stone-800">{t.point}</p>
                            <p className="text-rose-600 font-medium">Nivel de riesgo: {t.riskLevel}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 3-Phase Action Plan */}
                  <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                        <span>Hoja de Ruta Accionable AhorraAI</span>
                        <ProvenanceBadge provenance="INFERRED" size="xs" />
                      </h3>
                      <span className="text-xs text-stone-500">Priorizado por impacto/esfuerzo</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Hoy / Inmediato */}
                      <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                        <div className="font-bold text-xs text-emerald-900 mb-2">⚡ Fase 1: Hoy (Inmediato)</div>
                        <ul className="space-y-2">
                          {(diagnostic?.actionPlan?.immediate || []).map((act, i) => (
                            <li key={i} className="text-xs text-stone-700 space-y-1">
                              <p className="font-medium">• {act.action}</p>
                              <div className="flex gap-1.5 text-[10px]">
                                <span className="bg-emerald-200/70 text-emerald-800 px-1.5 py-0.2 rounded">Impacto: {act.impact}</span>
                                <span className="bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded">Esfuerzo: {act.effort}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 30 Días */}
                      <div className="bg-sky-50/60 p-3.5 rounded-lg border border-sky-200">
                        <div className="font-bold text-xs text-sky-900 mb-2">📅 Fase 2: Próximos 30 Días</div>
                        <ul className="space-y-2">
                          {(diagnostic?.actionPlan?.day30 || []).map((act, i) => (
                            <li key={i} className="text-xs text-stone-700 space-y-1">
                              <p className="font-medium">• {act.action}</p>
                              <div className="flex gap-1.5 text-[10px]">
                                <span className="bg-sky-200/70 text-sky-800 px-1.5 py-0.2 rounded">Impacto: {act.impact}</span>
                                <span className="bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded">Esfuerzo: {act.effort}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 90 Días */}
                      <div className="bg-purple-50/60 p-3.5 rounded-lg border border-purple-200">
                        <div className="font-bold text-xs text-purple-900 mb-2">🚀 Fase 3: Próximos 90 Días</div>
                        <ul className="space-y-2">
                          {(diagnostic?.actionPlan?.day90 || []).map((act, i) => (
                            <li key={i} className="text-xs text-stone-700 space-y-1">
                              <p className="font-medium">• {act.action}</p>
                              <div className="flex gap-1.5 text-[10px]">
                                <span className="bg-purple-200/70 text-purple-800 px-1.5 py-0.2 rounded">Impacto: {act.impact}</span>
                                <span className="bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded">Esfuerzo: {act.effort}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* TAB 2: IPD (ÍNDICE DE PRESENCIA DIGITAL) */}
          {activeTab === 'ipd' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base text-stone-900">Índice de Presencia Digital (IPD)</h3>
                    <ProvenanceBadge provenance="ESTIMATED" size="xs" />
                  </div>
                  <p className="text-xs text-stone-500">Estimación heurística AhorraAI basada en 7 variables públicas auditadas.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-sky-600">{ipd.overallIPD} <span className="text-sm font-normal text-stone-400">/ 100</span></div>
                  <span className="text-[11px] font-medium text-emerald-600">Nivel Comercial Medio-Alto</span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Google Maps & Reseñas', score: ipd.googleMapsScore, desc: 'Ficha verificada, respuestas a reseñas y fotos actualizadas' },
                  { label: 'Calidad Web & Catálogo', score: ipd.websiteQualityScore, desc: 'Velocidad, adaptación móvil y catálogo navegable' },
                  { label: 'Actividad en Redes Sociales', score: ipd.socialMediaActivityScore, desc: 'Publicaciones recientes y engagement en Instagram/Facebook' },
                  { label: 'SEO Local en Vigo', score: ipd.localSeoScore, desc: 'Posicionamiento en búsquedas geolocalizadas de la zona' },
                  { label: 'Interactividad QR / Escaparate', score: ipd.qrInteractiveScore, desc: 'Soportes de escaneo dinámicos fuera de horario' },
                  { label: 'Canal WhatsApp Comercial', score: ipd.whatsappCommerceScore, desc: 'Catálogo activo y rapidez de respuesta por mensajería' },
                  { label: 'Preparación para Comercio Digital', score: ipd.ecommerceReadyScore, desc: 'Capacidad de pago y reserva directa online' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-stone-800">{item.label}</span>
                      <span className="font-bold text-sky-700">{item.score} / 100</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.score >= 70 ? 'bg-emerald-500' : item.score >= 40 ? 'bg-sky-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${item.score}%` }} 
                      />
                    </div>
                    <p className="text-[11px] text-stone-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SMART SHOP WINDOW */}
          {activeTab === 'smart_window' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                      <span>Simulador de Escaparate Inteligente 24/7</span>
                      <ProvenanceBadge provenance="SIMULATED" size="xs" />
                    </h3>
                    <p className="text-xs text-stone-500">Convierte el escaparate físico en un nodo de interacción continua mediante QR contextual según la franja horaria.</p>
                  </div>

                  {/* Franja selector */}
                  <div className="flex bg-stone-100 p-1 rounded-lg text-xs">
                    {(['Mañanas', 'Tarde Comercial', 'Ocio / Nocturno'] as const).map(slot => (
                      <button
                        key={slot}
                        onClick={() => setActiveWindowSlot(slot)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                          activeWindowSlot === slot ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visual Mockup of Shop Window Display */}
                <div className={`p-8 rounded-2xl border-4 text-center transition-all ${
                  activeWindowSlot === 'Ocio / Nocturno' 
                    ? 'bg-stone-950 border-sky-500 text-white' 
                    : 'bg-gradient-to-b from-sky-50 to-white border-stone-800 text-stone-900'
                }`}>
                  <div className="max-w-md mx-auto space-y-4">
                    <span className="inline-block px-3 py-1 bg-sky-600 text-white font-mono text-[10px] uppercase tracking-widest rounded-full font-bold">
                      {activeWindowSlot === 'Ocio / Nocturno' ? '🌙 Modo Noche Activo' : '☀️ Escaparate Interactivo'}
                    </span>
                    
                    <h4 className="text-xl font-black">
                      {activeWindowSlot === 'Ocio / Nocturno' 
                        ? `¿Te gustó algo de ${business.name}?` 
                        : `Bienvenido a ${business.name}`}
                    </h4>

                    <p className="text-xs opacity-80">
                      {activeWindowSlot === 'Ocio / Nocturno'
                        ? 'Escanea ahora, reserva tu pedido para mañana a primera hora y consigue un 10% de ventaja directa en tu compra.'
                        : 'Escanea para consultar catálogo digital, pedir cita previa o acceder a las ventajas exclusivas de la Rúa.'}
                    </p>

                    {/* QR Mockup */}
                    <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-xl mx-auto border-2 border-sky-400 flex flex-col items-center justify-center">
                      <QrCode className="w-24 h-24 text-stone-900" />
                      <span className="text-[9px] font-mono text-stone-600 mt-1 font-bold">AHORRA.AI / {business.id.toUpperCase().slice(-6)}</span>
                    </div>

                    <p className="text-[11px] font-medium text-sky-400">
                      📲 Compatible con cualquier cámara móvil • Sin descargas
                    </p>
                  </div>
                </div>

                {/* Simulated Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div className="bg-stone-100 p-3 rounded-lg text-center">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Transeúntes Expuestos</span>
                    <span className="text-lg font-bold text-stone-900">{Number(business?.metrics?.estimatedFootfallDaily || 0).toLocaleString()}</span>
                  </div>
                  <div className="bg-stone-100 p-3 rounded-lg text-center">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Personas Detenidas</span>
                    <span className="text-lg font-bold text-stone-900">~{Math.round(Number(business?.metrics?.estimatedFootfallDaily || 0) * 0.08)}</span>
                  </div>
                  <div className="bg-stone-100 p-3 rounded-lg text-center">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Escaneos Estimados</span>
                    <span className="text-lg font-bold text-sky-600">~{Math.round(Number(business?.metrics?.estimatedFootfallDaily || 0) * 0.015)} / día</span>
                  </div>
                  <div className="bg-stone-100 p-3 rounded-lg text-center">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Conversión Digital</span>
                    <span className="text-lg font-bold text-emerald-600">22.4%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IDENTITY & SCHEDULES */}
          {activeTab === 'identity' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Identity & Contact Card */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-stone-900">Identidad & Contacto</h3>
                <p className="text-xs text-stone-600">{business.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                    <Phone className="w-4 h-4 text-stone-500" />
                    <span>Teléfono: {business.phone || 'No registrado'}</span>
                    <HonestyBadge status={business.honestyMap.contact} size="sm" showLabel={false} />
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp: {business.whatsapp || 'No registrado'}</span>
                    <HonestyBadge status={business.honestyMap.contact} size="sm" showLabel={false} />
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                    <Globe className="w-4 h-4 text-sky-600" />
                    <span>Web: {business.website || 'Sin web oficial'}</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Última auditoría: {business.metrics.lastAuditDate}</span>
                  </div>
                </div>
              </div>

              {/* 3 Schedule Slots (Commercial Context for Vigo) */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-stone-900">Horarios Optimizados en 3 Franjas (Vigo)</h3>
                  <HonestyBadge status={business.honestyMap.schedule} size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(business?.schedules || []).map((slot, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${slot?.isOpen ? 'bg-sky-50/50 border-sky-200' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-xs text-stone-900">{slot?.slotName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${slot?.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                          {slot?.isOpen ? 'ABIERTO' : 'CERRADO'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 font-mono">{slot?.hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMMERCIAL PROPOSAL */}
          {activeTab === 'proposal' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5 print:p-0 print:border-none">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="font-black text-lg text-stone-900">Propuesta de Integración AhorraAI</h3>
                    <p className="text-xs text-stone-500">Documento de demostración para presentar al titular de {business.name}</p>
                  </div>
                  <button
                    id="print-proposal-btn"
                    onClick={() => window.print()}
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir / Guardar PDF
                  </button>
                </div>

                <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">1. Qué hemos detectado en tu negocio</h4>
                    <p>{business.name} cuenta con una sólida reputación local ({business.metrics.googleRating}★) en {business.neighborhood}, pero su índice de interactividad fuera de horario ({ipd.qrInteractiveScore}/100) y su ausencia de fidelización cruzada con comercios vecinos limitan la captación de nuevos clientes.</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">2. Qué puede hacer AhorraAI por ti</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Habilitar tu <strong>Escaparate Inteligente 24/7</strong> para no perder ventas cuando la persiana está bajada.</li>
                      <li>Conectarte con otros comercios de {business.neighborhood} para crear promociones cruzadas y rutas temáticas.</li>
                      <li>Desplegar tu <strong>Agente Inteligente Delegado</strong> para atender consultas en WhatsApp y Google automáticamente.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">3. Hoja de ruta recomendada</h4>
                    <p>Semana 1: Activación de QR dinámico de escaparate. Semana 2: Campaña piloto de ticket conjunto con comercio complementario. Semana 4: Medición de resultados en el Observatorio AhorraAI.</p>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-lg text-[11px] text-stone-600">
                    <strong>Compromiso Ético AhorraAI:</strong> AhorraAI no sustituye al comerciante, amplifica su capacidad. Todos los datos respetan el principio de Honestidad Estructural (DICHO vs OBSERVADO vs SIN CONFIRMAR).
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-stone-900 border-t border-stone-800 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">Estado CRM:</span>
            <span className="px-2.5 py-1 bg-stone-800 text-stone-200 border border-stone-700 rounded-md text-xs font-semibold capitalize">
              {(business?.crmStatus || 'activo').replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onCreateCooperation && (
              <button
                id="modal-create-coop-btn"
                onClick={() => onCreateCooperation(business)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
              >
                <Share2 className="w-3.5 h-3.5" />
                Buscar Colaborador
              </button>
            )}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
