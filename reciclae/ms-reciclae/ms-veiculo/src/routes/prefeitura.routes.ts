// src/routes/prefeitura.routes.ts

import { Router } from 'express';
import * as prefeituraController from '../controllers/prefeitura.controller';

const prefeituraRouter = Router();

// Rota principal: /prefeituras
prefeituraRouter.route('/')
    .get(prefeituraController.getAllPrefeituras) // GET /prefeituras
    .post(prefeituraController.createPrefeitura); // POST /prefeituras

// Rotas com ID: /prefeituras/:id
prefeituraRouter.route('/:id')
    .get(prefeituraController.getPrefeituraById) // GET /prefeituras/:id
    .put(prefeituraController.updatePrefeitura) // PUT /prefeituras/:id
    .delete(prefeituraController.deletePrefeitura); // DELETE /prefeituras/:id

export default prefeituraRouter;