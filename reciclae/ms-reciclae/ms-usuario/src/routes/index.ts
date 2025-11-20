// src/routes/index.ts

import { Router } from 'express';

import usuarioRouter from './usuario.routes';

const routes = Router();

console.log('Registrando rotas da API...');

// Define os prefixos de rota
routes.use('/usuarios', usuarioRouter);

// Rota de saúde (Health Check)
routes.get('/', (req, res) => {
    res.json({ message: 'API Reciclagem Cidadã rodando perfeitamente!' });
});

export default routes;