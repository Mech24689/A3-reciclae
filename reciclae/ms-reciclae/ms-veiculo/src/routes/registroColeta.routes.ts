// src/routes/registroColeta.routes.ts

import { Router } from 'express';
import * as registroColetaController from '../controllers/registroColeta.controller';

const registroColetaRouter = Router();

// Rota principal: /registros-coleta
registroColetaRouter.route('/')
    .get(registroColetaController.getAllRegistrosColeta) // GET /registros-coleta
    .post(registroColetaController.createRegistroColeta); // POST /registros-coleta

// Rotas com ID: /registros-coleta/:id
registroColetaRouter.route('/:id')
    .get(registroColetaController.getRegistroColetaById) // GET /registros-coleta/:id
    .put(registroColetaController.updateRegistroColeta) // PUT /registros-coleta/:id
    .delete(registroColetaController.deleteRegistroColeta); // DELETE /registros-coleta/:id

export default registroColetaRouter;