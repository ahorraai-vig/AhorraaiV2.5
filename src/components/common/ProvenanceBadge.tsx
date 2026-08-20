import React from 'react';
import { DataProvenance } from '../../types';

interface ProvenanceBadgeProps {
  provenance: DataProvenance;
  size?: 'xs' | 'sm' | 'md';
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ 
  provenance, 
  size = 'xs' 
}) => {
  const config = {
    VERIFIED: {
      label: 'VERIFIED',
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tooltip: 'Dato contrastado y verificado oficialmente.'
    },
    OBSERVED: {
      label: 'OBSERVED',
      bg: 'bg-sky-100 text-sky-800 border-sky-300',
      tooltip: 'Dato observado en calle o canales públicos.'
    },
    INFERRED: {
      label: 'INFERRED (IA)',
      bg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      tooltip: 'Inferencia analítica generada por modelos de IA.'
    },
    ESTIMATED: {
      label: 'ESTIMATED',
      bg: 'bg-purple-100 text-purple-800 border-purple-300',
      tooltip: 'Estimación matemática calculada mediante modelos heurísticos.'
    },
    HYPOTHESIS: {
      label: 'HYPOTHESIS',
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      tooltip: 'Hipótesis de trabajo sujeta a validación experimental.'
    },
    SIMULATED: {
      label: 'SIMULATED',
      bg: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
      tooltip: 'Dato sintético generado para propósitos de simulación y demo.'
    }
  }[provenance] || {
    label: provenance,
    bg: 'bg-stone-100 text-stone-700 border-stone-300',
    tooltip: 'Procedencia de datos'
  };

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.2 tracking-wider',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1'
  }[size];

  return (
    <span
      id={`provenance-${(provenance || 'unknown').toLowerCase()}`}
      title={config.tooltip}
      className={`inline-flex items-center uppercase font-mono border rounded ${config.bg} ${sizeClasses} cursor-help transition-all`}
    >
      {config.label}
    </span>
  );
};
