import React from 'react';
import { HonestyStatus } from '../../types';
import { ShieldCheck, Eye, HelpCircle } from 'lucide-react';

interface HonestyBadgeProps {
  status: HonestyStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const HonestyBadge: React.FC<HonestyBadgeProps> = ({ 
  status, 
  size = 'sm',
  showLabel = true 
}) => {
  const config = {
    DICHO: {
      label: 'DICHO (Validado)',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      desc: 'Dato aportado y confirmado directamente por el comerciante.'
    },
    OBSERVADO: {
      label: 'OBSERVADO (En calle/web)',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Eye,
      desc: 'Dato detectado mediante rastreo público o inspección física en calle.'
    },
    SIN_CONFIRMAR: {
      label: 'SIN CONFIRMAR (Vacío)',
      color: 'bg-stone-100 text-stone-500 border-stone-200',
      icon: HelpCircle,
      desc: 'Dato no confirmado. Por rigor ético, AhorraAI no inventa estimaciones.'
    }
  }[status] || {
    label: 'SIN CONFIRMAR',
    color: 'bg-stone-100 text-stone-500 border-stone-200',
    icon: HelpCircle,
    desc: 'Sin verificar'
  };

  const Icon = config.icon;
  const isSm = size === 'sm';

  return (
    <span 
      id={`honesty-badge-${(status || 'sin_confirmar').toLowerCase()}`}
      title={config.desc}
      className={`inline-flex items-center gap-1.5 font-medium border rounded-md transition-colors cursor-help ${config.color} ${
        isSm ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
      }`}
    >
      <Icon className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
