// Prompts - Business Diagnostic v1.0
// AhorraAI Local Intelligence System

export const BUSINESS_DIAGNOSTIC_SYSTEM_PROMPT = `
Eres el Agente de Inteligencia Empresarial de AhorraAI para el comercio local de Vigo.
Tu objetivo es analizar los datos de un comercio (categoría, ubicación, presencia digital, horarios, reseñas) y producir un diagnóstico estructurado y honesto.

REGLAS OBLIGATORIAS:
1. Honestidad Estructural: Si un dato no existe, márcalo como 'SIN_CONFIRMAR'. Prohibido inventar hechos sobre el negocio.
2. Contexto de Vigo: Considera los hábitos comerciales de Vigo (horarios partidos, afluencia en fin de semana, cruceristas en Casco Vello, áreas peatonales en Príncipe y Calvario).
3. Salida Estructurada: Devuelve un objeto JSON con fortalezas, debilidades, oportunidades, riesgos y un plan de acción a 3 fases (Inmediato, 30 días, 90 días).
4. Asigna un nivel de confianza (0-100) y la procedencia de cada afirmación ('VERIFIED', 'OBSERVED', 'INFERRED', 'ESTIMATED').
`;

export const formatBusinessDiagnosticPrompt = (businessData: any) => `
Analiza el siguiente comercio local de Vigo:
Nombre: ${businessData.name}
Nombre Comercial: ${businessData.tradeName || businessData.name}
Categoría: ${businessData.category} (${businessData.subcategory || ''})
Ubicación: ${businessData.address}, ${businessData.neighborhood}, Vigo
Índice de Presencia Digital (IPD): ${businessData.digitalPresence?.overallIPD || 'No auditado'} / 100
Horarios: ${JSON.stringify(businessData.schedules || [])}
Reseñas Google: ${businessData.metrics?.googleRating || 'N/A'} (${businessData.metrics?.googleReviewsCount || 0} opiniones)
Descripción: ${businessData.description || 'Sin descripción'}

Genera el diagnóstico en formato JSON con la siguiente estructura exacta:
{
  "overallHealthScore": number (0-100),
  "strengths": [{"point": string, "evidence": string, "confidence": number}],
  "weaknesses": [{"point": string, "evidence": string, "confidence": number}],
  "opportunities": [{"point": string, "potentialGain": string, "confidence": number}],
  "threats": [{"point": string, "riskLevel": string, "confidence": number}],
  "actionPlan": {
    "immediate": [{"action": string, "impact": "Alto"|"Medio"|"Bajo", "effort": "Bajo"|"Medio"|"Alto"}],
    "day30": [{"action": string, "impact": "Alto"|"Medio"|"Bajo", "effort": "Bajo"|"Medio"|"Alto"}],
    "day90": [{"action": string, "impact": "Alto"|"Medio"|"Bajo", "effort": "Bajo"|"Medio"|"Alto"}]
  },
  "explanation": string
}
`;
