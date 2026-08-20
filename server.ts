import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { dataProvider } from './src/server/dataProvider';
import { 
  generateBusinessDiagnostic, 
  discoverOpportunitiesForZone, 
  generateCooperationProposal, 
  askAhorraAIAssistant 
} from './src/server/gemini';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AhorraAI Local Intelligence & Cooperative Commerce OS',
      version: '4.0.0-pilot.vigo',
      city: 'Vigo, Galicia',
      geminiConnected: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // Businesses
  app.get('/api/businesses', async (req, res) => {
    try {
      const { zone, category, search } = req.query;
      const businesses = await dataProvider.getBusinesses(
        zone as string, 
        category as string, 
        search as string
      );
      res.json(businesses);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener comercios', details: err.message });
    }
  });

  app.get('/api/businesses/:id', async (req, res) => {
    try {
      const business = await dataProvider.getBusinessById(req.params.id);
      if (!business) {
        return res.status(404).json({ error: 'Comercio no encontrado' });
      }
      res.json(business);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al buscar comercio', details: err.message });
    }
  });

  app.post('/api/businesses', async (req, res) => {
    try {
      const created = await dataProvider.createBusiness(req.body);
      await dataProvider.addAgentLog({
        agentCode: 'SCOUT',
        agentName: 'Scout de Datos',
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Alta de comercio: ${created.name} (${created.neighborhood})`,
        outputSummary: `Perfil creado con IPD inicial ${created.digitalPresence.overallIPD}/100`,
        costTokens: 450,
        costEur: 0.001,
        provenance: 'OBSERVED'
      });
      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al registrar comercio', details: err.message });
    }
  });

  app.put('/api/businesses/:id', async (req, res) => {
    try {
      const updated = await dataProvider.updateBusiness(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Comercio no encontrado' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al actualizar comercio', details: err.message });
    }
  });

  app.delete('/api/businesses/:id', async (req, res) => {
    try {
      const deleted = await dataProvider.deleteBusiness(req.params.id);
      res.json({ success: deleted });
    } catch (err: any) {
      res.status(500).json({ error: 'Error al eliminar comercio', details: err.message });
    }
  });

  // Business AI Diagnostic
  app.post('/api/businesses/:id/diagnose', async (req, res) => {
    try {
      const business = await dataProvider.getBusinessById(req.params.id);
      if (!business) {
        return res.status(404).json({ error: 'Comercio no encontrado' });
      }
      const diagnostic = await generateBusinessDiagnostic(business);
      await dataProvider.addAgentLog({
        agentCode: 'BI',
        agentName: 'Business Intelligence',
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Diagnóstico inteligente para ${business.name}`,
        outputSummary: `FODA generado con salud general ${diagnostic.overallHealthScore}/100`,
        costTokens: 1800,
        costEur: 0.004,
        provenance: 'INFERRED'
      });
      res.json(diagnostic);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al generar diagnóstico', details: err.message });
    }
  });

  // Opportunities
  app.get('/api/opportunities', async (req, res) => {
    try {
      const { zone, status } = req.query;
      const opportunities = await dataProvider.getOpportunities(zone as string, status as string);
      res.json(opportunities);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener oportunidades', details: err.message });
    }
  });

  app.post('/api/opportunities', async (req, res) => {
    try {
      const created = await dataProvider.createOpportunity(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al crear oportunidad', details: err.message });
    }
  });

  app.put('/api/opportunities/:id/status', async (req, res) => {
    try {
      const updated = await dataProvider.updateOpportunityStatus(req.params.id, req.body.status);
      if (!updated) return res.status(404).json({ error: 'Oportunidad no encontrada' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al actualizar estado', details: err.message });
    }
  });

  app.post('/api/opportunities/discover', async (req, res) => {
    try {
      const { zone } = req.body;
      const businesses = await dataProvider.getBusinesses(zone);
      const demandSignals = await dataProvider.getDemandSignals(zone);
      const discovered = await discoverOpportunitiesForZone(zone || 'Centro / Príncipe', businesses, demandSignals);
      
      for (const opp of discovered) {
        await dataProvider.createOpportunity(opp);
      }

      await dataProvider.addAgentLog({
        agentCode: 'OPPORTUNITY',
        agentName: 'Opportunity Engine',
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Búsqueda de oportunidades en ${zone || 'Vigo'} (${businesses.length} negocios analizados)`,
        outputSummary: `Descubiertas ${discovered.length} oportunidades comerciales`,
        costTokens: 2400,
        costEur: 0.006,
        provenance: 'ESTIMATED'
      });

      res.json(discovered);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al descubrir oportunidades', details: err.message });
    }
  });

  // Cooperation
  app.get('/api/cooperation/links', async (req, res) => {
    try {
      const links = await dataProvider.getCooperationLinks(req.query.zone as string);
      res.json(links);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener enlaces', details: err.message });
    }
  });

  app.get('/api/cooperation/proposals', async (req, res) => {
    try {
      const proposals = await dataProvider.getCooperationProposals();
      res.json(proposals);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener propuestas', details: err.message });
    }
  });

  app.post('/api/cooperation/generate', async (req, res) => {
    try {
      const { businessIds, zone } = req.body;
      const businesses: any[] = [];
      if (Array.isArray(businessIds)) {
        for (const id of businessIds) {
          const b = await dataProvider.getBusinessById(id);
          if (b) businesses.push(b);
        }
      }
      const proposal = await generateCooperationProposal(businesses, zone || 'Centro / Príncipe');
      const created = await dataProvider.createCooperationProposal(proposal);

      await dataProvider.addAgentLog({
        agentCode: 'COOPERATION',
        agentName: 'Cooperation Agent',
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Generación de propuesta cooperativa para ${businesses.map(b => b.name).join(', ')}`,
        outputSummary: `Propuesta "${created.title}" con incentivo QR y WhatsApp redactados`,
        costTokens: 2100,
        costEur: 0.005,
        provenance: 'INFERRED'
      });

      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al generar cooperación', details: err.message });
    }
  });

  // Campaigns
  app.get('/api/campaigns', async (req, res) => {
    try {
      const campaigns = await dataProvider.getCampaigns(req.query.zone as string);
      res.json(campaigns);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener campañas', details: err.message });
    }
  });

  app.post('/api/campaigns', async (req, res) => {
    try {
      const created = await dataProvider.createCampaign(req.body);
      await dataProvider.addAgentLog({
        agentCode: 'CAMPAIGN',
        agentName: 'Campaign Agent',
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Activación de campaña: ${created.name}`,
        outputSummary: `Código QR ${created.qrCodeId} generado con canales ${created.channels.join(', ')}`,
        costTokens: 1100,
        costEur: 0.002,
        provenance: 'SIMULATED'
      });
      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al crear campaña', details: err.message });
    }
  });

  app.put('/api/campaigns/:id/status', async (req, res) => {
    try {
      const updated = await dataProvider.updateCampaignStatus(req.params.id, req.body.status);
      if (!updated) return res.status(404).json({ error: 'Campaña no encontrada' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al cambiar estado de campaña', details: err.message });
    }
  });

  // Demand Signals
  app.get('/api/demand-signals', async (req, res) => {
    try {
      const signals = await dataProvider.getDemandSignals(req.query.zone as string);
      res.json(signals);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener señales de demanda', details: err.message });
    }
  });

  // Observatory
  app.get('/api/observatory/indices', async (req, res) => {
    try {
      const indices = await dataProvider.getObservatoryIndices();
      res.json(indices);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener índices', details: err.message });
    }
  });

  app.put('/api/observatory/indices/:code/weights', async (req, res) => {
    try {
      const updated = await dataProvider.updateObservatoryWeights(req.params.code, req.body.variables);
      if (!updated) return res.status(404).json({ error: 'Índice no encontrado' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al actualizar ponderaciones', details: err.message });
    }
  });

  // Streets & Neighborhoods
  app.get('/api/streets', async (req, res) => {
    try {
      const streets = await dataProvider.getStreets(req.query.zone as string);
      res.json(streets);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener calles', details: err.message });
    }
  });

  app.get('/api/neighborhoods', async (req, res) => {
    try {
      const neighborhoods = await dataProvider.getNeighborhoods();
      res.json(neighborhoods);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener barrios', details: err.message });
    }
  });

  // Agents
  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await dataProvider.getAgents();
      res.json(agents);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener agentes', details: err.message });
    }
  });

  app.get('/api/agents/logs', async (req, res) => {
    try {
      const logs = await dataProvider.getAgentLogs();
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener logs', details: err.message });
    }
  });

  app.post('/api/agents/run', async (req, res) => {
    try {
      const { agentCode, taskType, payload } = req.body;
      const startTime = new Date().toISOString();
      
      // Simulate task execution
      const costTokens = Math.floor(Math.random() * 1500) + 800;
      const costEur = Number((costTokens * 0.0000025).toFixed(4));
      
      const log = await dataProvider.addAgentLog({
        agentCode: agentCode || 'OPPORTUNITY',
        agentName: `Agente ${agentCode}`,
        startedAt: startTime,
        endedAt: new Date().toISOString(),
        status: 'success',
        inputSummary: `Ejecución de tarea: ${taskType || 'Análisis rutinario'}`,
        outputSummary: `Procesamiento completado con éxito para contexto: ${JSON.stringify(payload || {}).slice(0, 80)}`,
        costTokens,
        costEur,
        provenance: 'INFERRED'
      });

      res.json({ success: true, log });
    } catch (err: any) {
      res.status(500).json({ error: 'Error al ejecutar agente', details: err.message });
    }
  });

  // Experiments
  app.get('/api/experiments', async (req, res) => {
    try {
      const exps = await dataProvider.getExperiments();
      res.json(exps);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al obtener experimentos', details: err.message });
    }
  });

  app.post('/api/experiments', async (req, res) => {
    try {
      const created = await dataProvider.createExperiment(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al crear experimento', details: err.message });
    }
  });

  // Simulator
  app.post('/api/simulator/run', async (req, res) => {
    try {
      const result = await dataProvider.runEconomicSimulation(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al simular escenario', details: err.message });
    }
  });

  // Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, context } = req.body;
      const response = await askAhorraAIAssistant(message || '', context || {});
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: 'Error en asistente de chat', details: err.message });
    }
  });

  // Demo Reset
  app.post('/api/demo/reset', async (req, res) => {
    try {
      await dataProvider.resetToSeed();
      res.json({ success: true, message: 'Datos demo de Vigo reiniciados con éxito' });
    } catch (err: any) {
      res.status(500).json({ error: 'Error al reiniciar datos demo', details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AhorraAI Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch(err => {
  console.error('Failed to start AhorraAI server:', err);
});
