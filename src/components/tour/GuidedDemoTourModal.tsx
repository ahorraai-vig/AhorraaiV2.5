import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Store, 
  TrendingUp, 
  Share2, 
  QrCode, 
  BarChart3, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ProvenanceBadge } from '../common/ProvenanceBadge';

interface GuidedDemoTourModalProps {
  onClose: () => void;
  onNavigateToView: (view: string) => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: '1. Selección del Comercio Piloto',
    subtitle: 'Librería Mendinho Vigo (Rúa do Príncipe, 34)',
    icon: Store,
    content: 'Comercio emblemático e independiente fundado en 1988 en el corazón comercial peatonal de Vigo. Dispone de un flujo peatonal elevado (4.800 transeúntes/día), pero su escaparate queda inerte tras el cierre de las 20:30.',
    actionLabel: 'Analizar Presencia Digital'
  },
  {
    step: 2,
    title: '2. Diagnóstico del Gemelo Digital & IPD',
    subtitle: 'Índice de Presencia Digital: 51 / 100',
    icon: TrendingUp,
    content: 'AhorraAI analiza su huella pública: excelente reputación en Google (4.8★ con 340 reseñas), pero nula interactividad digital fuera de horario (IPD QR: 15/100). Gran potencial de monetización nocturna.',
    actionLabel: 'Detectar Oportunidades'
  },
  {
    step: 3,
    title: '3. Motor de Oportunidades IA',
    subtitle: '7 oportunidades detectadas en el eje Príncipe',
    icon: Sparkles,
    content: 'El agente OPPORTUNITY identifica que el 40% del paso peatonal entre 20:30 y 23:00 se dirige hacia hostelería y ocio en las inmediaciones, sin ninguna opción de interacción con la librería.',
    actionLabel: 'Buscar Comercio Complementario'
  },
  {
    step: 4,
    title: '4. Descubrimiento de Sinergia Local',
    subtitle: 'Socio ideal: Café Princesa (a 30 metros)',
    icon: Share2,
    content: 'Café Princesa cuenta con clientela lectora en terraza. El agente COOPERATION sugiere una alianza simbiótica: no compiten, comparten público y están a menos de 1 minuto a pie.',
    actionLabel: 'Generar Propuesta Cooperativa'
  },
  {
    step: 5,
    title: '5. Alianza "Pausa con Lectura"',
    subtitle: 'Protocolo de Cooperación Intercomercial',
    icon: Sparkles,
    content: 'AhorraAI redacta el pacto en 3 segundos: "Al pedir café especial en Princesa, recibe un 10% en tu próximo libro en Mendinho; al comprar libro, recibe café de cortesía con tu lectura."',
    actionLabel: 'Crear Escaparate Inteligente'
  },
  {
    step: 6,
    title: '6. Escaparate Inteligente 24/7 con QR',
    subtitle: 'Captación de pedidos nocturnos y reservas',
    icon: QrCode,
    content: 'Se despliega el QR dinámico en la vitrina de Mendinho. Durante la noche, los transeúntes escanean, reservan novedades editoriales por WhatsApp y obtienen el pase de lectura para la cafetería vecina.',
    actionLabel: 'Simular Impacto Económico'
  },
  {
    step: 7,
    title: '7. Impacto Económico Medido',
    subtitle: '+3.200 €/año de ventas cruzadas generadas',
    icon: TrendingUp,
    content: 'La simulación MPDA-AI proyecta 150 escaneos/mes, 45 compras cruzadas y un incremento del 14% en la retención de clientes locales en Rúa do Príncipe.',
    actionLabel: 'Ver Observatorio de Vigo'
  },
  {
    step: 8,
    title: '8. Actualización del Observatorio Urbano',
    subtitle: 'Incremento del ICC (Índice de Cooperación) a 68/100',
    icon: BarChart3,
    content: 'El Observatorio de Vigo registra el nuevo enlace cooperativo, mejorando el Índice de Cooperación (ICC) y la Vitalidad de Calle (IVC) del barrio con total transparencia algorítmica.',
    actionLabel: 'Finalizar Tour y Explorar'
  }
];

export const GuidedDemoTourModal: React.FC<GuidedDemoTourModalProps> = ({
  onClose,
  onNavigateToView
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const currentStep = TOUR_STEPS[currentStepIdx];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      onClose();
      onNavigateToView('dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  return (
    <div id="guided-demo-tour-overlay" className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-fadeIn flex flex-col">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex justify-between items-start border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-full text-xs font-mono font-bold uppercase">
                Modo Demostración Guiada
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-400 text-xs">Caso Real Vigo</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">El Viaje de AhorraAI en 3 Minutos</h2>
          </div>

          <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-1.5 flex">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all ${
                i <= currentStepIdx ? 'bg-sky-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 flex-1 text-stone-800">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-sky-700 uppercase">Paso {currentStep.step} de 8</span>
              <h3 className="text-lg font-bold text-stone-900">{currentStep.title}</h3>
              <p className="text-xs font-semibold text-emerald-700">{currentStep.subtitle}</p>
            </div>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
            <p>{currentStep.content}</p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
              <ProvenanceBadge provenance="VERIFIED" size="xs" />
              <span>Gobernanza ética con Honestidad Estructural</span>
            </div>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="bg-stone-100 p-5 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="px-4 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentStepIdx ? 'w-6 bg-sky-600' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>

          <button
            id="tour-next-btn"
            onClick={handleNext}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>{currentStep.actionLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
