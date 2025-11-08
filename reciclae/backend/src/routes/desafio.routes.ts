// src/routes/desafio.routes.ts

import { Router } from 'express';
import * as desafioController from '../controllers/desafio.controller';

const desafioRouter = Router();

// Rota principal: /desafios
desafioRouter.route('/')
    .get(desafioController.getAllDesafios) // GET /desafios
    .post(desafioController.createDesafio); // POST /desafios

// Rotas com ID: /desafios/:id
desafioRouter.route('/:id')
    .get(desafioController.getDesafioById) // GET /desafios/:id
    .put(desafioController.updateDesafio) // PUT /desafios/:id
    .delete(desafioController.deleteDesafio); // DELETE /desafios/:id

export default desafioRouter;