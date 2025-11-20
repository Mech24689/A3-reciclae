// src/routes/relatorioImpacto.routes.ts

import { Router } from 'express';
import * as relatorioController from '../controllers/relatorioImpacto.controller';

const relatorioImpactoRouter = Router();

// Rota principal: /relatorios-impacto
relatorioImpactoRouter.route('/')
    .get(relatorioController.getAllRelatoriosImpacto) // GET /relatorios-impacto
    .post(relatorioController.createRelatorioImpacto); // POST /relatorios-impacto

// Rotas com ID: /relatorios-impacto/:id
relatorioImpactoRouter.route('/:id')
    .get(relatorioController.getRelatorioImpactoById) // GET /relatorios-impacto/:id
    .put(relatorioController.updateRelatorioImpacto) // PUT /relatorios-impacto/:id
    .delete(relatorioController.deleteRelatorioImpacto); // DELETE /relatorios-impacto/:id

export default relatorioImpactoRouter;