// src/routes/index.ts

import { Router } from 'express';
import pessoaRouter from './pessoa.routes'; // Importa o novo router

const routes = Router();

console.log('Registrando rotas da API...');

// Define os prefixos de rota
routes.use('/pessoas', pessoaRouter);

// Rota de saúde (Health Check)
routes.get('/', (req, res) => {
    res.json({ message: 'API Reciclagem Cidadã rodando perfeitamente!' });
});

export default routes;