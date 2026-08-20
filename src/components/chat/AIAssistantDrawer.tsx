import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw, 
  ArrowRight, 
  Lightbulb,
  Building2,
  Compass
} from 'lucide-react';
import { ProvenanceBadge } from '../common/ProvenanceBadge';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: string, payload?: any) => void;
  contextData: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredAction?: any;
}

const QUICK_PROMPTS = [
  '¿Qué oportunidades hay en Casco Vello?',
  '¿Cómo mejorar el IPD de Librería Mendinho?',
  '¿Cuál es la fórmula del Índice de Cooperación (ICC)?',
  '¿Cómo activar una campaña de ticket cruzado en O Calvario?'
];

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToView,
  contextData
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: '¡Hola! Soy el Asistente Inteligente de **AhorraAI** para el comercio local de Vigo.\n\nPuedo analizar cualquier negocio, proponerte alianzas de cooperación o explicarte los índices del Observatorio.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: contextData
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: data.replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          structuredAction: data.structuredAction
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Error al conectar con el asistente');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Disculpa, no he podido procesar la consulta en este instante. ¿Deseas intentarlo de nuevo?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div id="ai-assistant-drawer" className="fixed inset-y-0 right-0 w-full max-w-md bg-stone-900 text-stone-100 shadow-2xl z-50 flex flex-col border-l border-stone-800 animate-slideLeft">
      
      {/* Drawer Header */}
      <div className="bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 border border-sky-500/30 rounded-xl text-sky-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">Asistente AhorraAI</h3>
              <ProvenanceBadge provenance="INFERRED" size="xs" />
            </div>
            <p className="text-[11px] text-stone-400">Inteligencia contextual para Vigo</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {(messages || []).map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                  isUser
                    ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                    : 'bg-stone-800 text-stone-200 border border-stone-700/70 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line text-xs">{msg.text}</div>

                {msg.structuredAction && (
                  <div className="pt-2 border-t border-stone-700/60">
                    <button
                      onClick={() => {
                        if (msg.structuredAction.payload?.view) {
                          onNavigateToView(msg.structuredAction.payload.view, msg.structuredAction.payload);
                        }
                      }}
                      className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors border border-sky-500/30"
                    >
                      <span>Abrir vista en la plataforma</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className={`text-[9px] ${isUser ? 'text-sky-200' : 'text-stone-500'} text-right`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-stone-400 text-xs py-2">
            <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
            <span>Consultando inteligencia de Vigo...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="bg-stone-950/60 p-3 border-t border-stone-800/80 space-y-1.5">
        <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          Sugerencias rápidas:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {(QUICK_PROMPTS || []).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10.5px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-1 rounded-lg border border-stone-700/60 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Pregunta sobre comercios, zonas de Vigo, alianzas..."
          className="flex-1 bg-stone-900 border border-stone-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-500 placeholder-stone-500"
        />
        <button
          id="send-chat-msg-btn"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || loading}
          className="p-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-xl transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
