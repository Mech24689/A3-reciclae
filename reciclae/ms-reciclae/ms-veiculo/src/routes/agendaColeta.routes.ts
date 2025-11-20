// src/routes/agendaColeta.routes.ts

import { Router } from 'express';
import * as agendaColetaController from '../controllers/agendaColeta.controller';
import * as relacionamentoController from '../controllers/agendaColetaRelacionamento.controller';

const agendaColetaRouter = Router();

// Rota principal: /agendas-coleta
agendaColetaRouter.route('/')
    .get(agendaColetaController.getAllAgendaColetas) // GET /agendas-coleta
    .post(agendaColetaController.createAgendaColeta); // POST /agendas-coleta

// Rotas com ID: /agendas-coleta/:id
agendaColetaRouter.route('/:id')
    .get(agendaColetaController.getAgendaColetaById) // GET /agendas-coleta/:id
    .put(agendaColetaController.updateAgendaColeta) // PUT /agendas-coleta/:id
    .delete(agendaColetaController.deleteAgendaColeta); // DELETE /agendas-coleta/:id

// Rota aninhada para ver os Pontos de Coleta associados a uma Agenda
// GET /agendas-coleta/:agendaId/pontos
agendaColetaRouter.route('/:agendaId/pontos')
    .get(relacionamentoController.getRelacionamentosByAgendaId);

export default agendaColetaRouter;