// src/routes/pontoColeta.routes.ts

import { Router } from 'express';
import * as pontoColetaController from '../controllers/pontoColeta.controller';

const pontoColetaRouter = Router();

// Rota principal: /pontos-coleta
pontoColetaRouter.route('/')
    .get(pontoColetaController.getAllPontoColetas) // GET /pontos-coleta
    .post(pontoColetaController.createPontoColeta); // POST /pontos-coleta

// Rotas com ID: /pontos-coleta/:id
pontoColetaRouter.route('/:id')
    .get(pontoColetaController.getPontoColetaById) // GET /pontos-coleta/:id
    .put(pontoColetaController.updatePontoColeta) // PUT /pontos-coleta/:id
    .delete(pontoColetaController.deletePontoColeta); // DELETE /pontos-coleta/:id

export default pontoColetaRouter;