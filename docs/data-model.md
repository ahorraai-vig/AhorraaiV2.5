# AhorraAI v4 — Data Model & Entities

## Entidades Principales
- **Business**: Identidad, coordenadas, franjas horarias (3 franjas), IPD, honestyMap, métricas de afluencia y reseñas.
- **Opportunity**: Señal de origen, evidencia, urgencia, dificultad, impacto económico estimado, recomendación de acción.
- **CooperationLink**: Conexión ponderada entre 2 comercios (tipo de sinergia, público compartido, estimación económica).
- **CooperationProposal**: Propuesta estructurada de acción conjunta con copies para escaparate, QR y WhatsApp.
- **Campaign**: Campaña multidifusión con seguimiento de impresiones y conversiones estimadas.
- **DemandSignal**: Anomalía o necesidad detectada en zona o franja horaria.
- **ObservatoryIndex**: Modelos matemáticos de los 6 índices con desglose de ponderaciones y variables.
- **AgentExecutionLog**: Registro de auditoría con costes de tokens, tiempos de inicio/fin y salidas estructuradas.
- **Experiment**: Laboratorio A/B para contrastar hipótesis comerciales con métricas de conversión.
