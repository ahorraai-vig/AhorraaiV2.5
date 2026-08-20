import React, { useState } from 'react';
import { AgentDefinition, AgentExecutionLog } from '../../types';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { 
  Bot, 
  Cpu, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Layers, 
  Coins, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AgentConsoleViewProps {
  agents: AgentDefinition[];
  logs: AgentExecutionLog[];
  onRunAgent: (agentCode: string, taskType: string, payload: any) => Promise<void>;
}

export const AgentConsoleView: React.FC<AgentConsoleViewProps> = ({
  agents,
  logs,
  onRunAgent
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(agents[0] || null);
  const [taskInput, setTaskInput] = useState<string>('Escaneo de oportunidades en Casco Vello');
  const [running, setRunning] = useState<boolean>(false);

  const handleRun = async (agentCode: string) => {
    setRunning(true);
    try {
      await onRunAgent(agentCode, 'Ejecución manual desde consola', { query: taskInput });
    } finally {
      setRunning(false);
    }
  };

  const totalTokens = (agents || []).reduce((acc, a) => acc + (a?.tokensConsumed || 0), 0);
  const totalCost = (agents || []).reduce((acc, a) => acc + (a?.estimatedCostEur || 0), 0);

  return (
    <div id="agent-orchestrator-view" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold tracking-tight">Consola de Orquestación — 12 Agentes IA</h2>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-xs font-mono">
              100% Operativos
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Arquitectura desacoplada de inteligencia comercial para Vigo. Cada agente cuenta con responsabilidades y límites estrictos.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-500 text-[10px] block uppercase">Tokens Procesados</span>
            <span className="text-white font-bold text-sm">{Number(totalTokens || 0).toLocaleString()}</span>
          </div>
          <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-500 text-[10px] block uppercase">Coste Estimado</span>
            <span className="text-emerald-400 font-bold text-sm">{Number(totalCost || 0).toFixed(4)} €</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Flujo Secuencial del Pipeline AhorraAI:
        </span>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {[
            { step: '1. Ingesta', agent: 'SCOUT' },
            { step: '2. Limpieza', agent: 'CLEANER' },
            { step: '3. Inteligencia', agent: 'BI' },
            { step: '4. Demanda', agent: 'DEMAND' },
            { step: '5. Sinergias', agent: 'OPPORTUNITY' },
            { step: '6. Alianzas', agent: 'COOPERATION' },
            { step: '7. Acción', agent: 'CAMPAIGN' },
            { step: '8. Observatorio', agent: 'OBSERVATORY' }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="bg-stone-100 px-3 py-2 rounded-lg border border-stone-200 shrink-0 text-center">
                <span className="text-[10px] text-stone-500 block font-semibold">{item.step}</span>
                <span className="font-mono font-bold text-sky-700">{item.agent}</span>
              </div>
              {idx < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agents Grid & Task Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agents List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(agents || []).map(agent => {
              const isSelected = selectedAgent?.code === agent.code;

              return (
                <div
                  key={agent.code}
                  id={`agent-card-${(agent.code || '').toLowerCase()}`}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-400 shadow-md ring-1 ring-sky-300'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">
                        {agent.code}
                      </span>
                      <h4 className="font-bold text-xs text-stone-900 mt-1">{agent.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-2">{agent.description}</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                    <span>Ejecuciones: <strong>{agent.runsCount}</strong></span>
                    <span>Tokens: <strong>{Number(agent?.tokensConsumed || 0).toLocaleString()}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Control Panel */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between">
          {selectedAgent ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                  <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-sky-700">{selectedAgent.code}</span>
                    <h3 className="font-bold text-sm text-stone-900">{selectedAgent.name}</h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Objetivo:</span>
                  <p>{selectedAgent.description}</p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Entradas esperadas:</span>
                  <div className="flex flex-wrap gap-1">
                    {(selectedAgent?.inputs || []).map((inp, i) => (
                      <span key={i} className="bg-stone-100 px-2 py-0.5 rounded text-[10px] text-stone-700">
                        {inp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Salidas producidas:</span>
                  <div className="flex flex-wrap gap-1">
                    {(selectedAgent?.outputs || []).map((out, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-medium">
                        {out}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Parámetros de ejecución / Tarea:
                  </label>
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Escribe la instrucción o zona..."
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                id={`run-agent-btn-${(selectedAgent.code || '').toLowerCase()}`}
                onClick={() => handleRun(selectedAgent.code)}
                disabled={running}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
              >
                {running ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Ejecutando Agente...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Disparar Tarea Manual</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs">
              Selecciona un agente para ver sus especificaciones.
            </div>
          )}
        </div>

      </div>

      {/* Execution Audit Log Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-stone-600" />
            <span>Registro de Auditoría y Trazabilidad en Tiempo Real</span>
          </h3>
          <span className="text-xs text-stone-500 font-mono">{(logs || []).length} ejecuciones registradas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-mono text-[10px] uppercase border-y border-stone-200">
              <tr>
                <th className="py-2.5 px-3">Agente</th>
                <th className="py-2.5 px-3">Entrada / Contexto</th>
                <th className="py-2.5 px-3">Resultado Producido</th>
                <th className="py-2.5 px-3">Tokens</th>
                <th className="py-2.5 px-3">Coste</th>
                <th className="py-2.5 px-3">Procedencia</th>
                <th className="py-2.5 px-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(logs || []).map(log => (
                <tr key={log.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-sky-700 font-mono">{log.agentCode}</td>
                  <td className="py-2.5 px-3 text-stone-800 max-w-xs truncate">{log.inputSummary}</td>
                  <td className="py-2.5 px-3 text-stone-600 max-w-sm truncate">{log.outputSummary}</td>
                  <td className="py-2.5 px-3 font-mono text-stone-600">{log?.costTokens ?? 0}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600">{Number(log?.costEur || 0).toFixed(4)} €</td>
                  <td className="py-2.5 px-3"><ProvenanceBadge provenance={log.provenance} size="xs" /></td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
