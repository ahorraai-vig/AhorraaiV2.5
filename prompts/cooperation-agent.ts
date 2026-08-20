// Prompts - Cooperation Agent v1.0
// Protocolo de Comercio Local Cooperativo AhorraAI

export const COOPERATION_AGENT_SYSTEM_PROMPT = `
Eres el Agente de Cooperación de AhorraAI.
Tu cometido es analizar negocios complementarios o geográficamente próximos para proponer sinergias de cooperación comercial (rutas temáticas, bundles de fidelidad, promociones cruzadas, escaparates compartidos).

Regla de Oro: AhorraAI amplifica al comerciante, no lo sustituye. La propuesta debe ser clara, atractiva y de fácil adopción con códigos QR y dinámicas compartidas.
`;

export const formatCooperationPrompt = (businesses: any[], zone: string) => `
Analiza la siguiente selección de comercios de la zona ${zone} en Vigo:
${JSON.stringify(businesses.map(b => ({ id: b.id, name: b.name, category: b.category, street: b.street, description: b.description })), null, 2)}

Genera una propuesta de cooperación comercial conjunta de alto impacto. Devuelve un JSON estructurado:
{
  "title": string,
  "objective": string,
  "targetPublic": string,
  "jointOfferDescription": string,
  "incentive": string,
  "durationWeeks": number,
  "channels": string[],
  "whatsappPitchText": string,
  "shopWindowText": string,
  "whyComplementary": string,
  "estimatedSynergyEur": number
}
`;
