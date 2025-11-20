// src/server.ts (MS-USUÁRIO - Adaptado para Consumidor de Eventos)

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes'; // Rotas do MS-Usuário (login, update, delete)
// 🚨 NOVO: Importa a função que inicia a escuta de eventos
import { startConsumers } from './consumers/pessoaConsumer'; 

const app = express();
// 🚨 NOVO: Defina uma porta diferente para cada MS. Exemplo: 3000 para o MS-Usuário
const PORT = process.env.PORT || 3001; 

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT", "PATCH","DELETE"],
    allowedHeaders: [
        'Content-Type', 
        'Authorization'
    ],
}));

app.use(express.json());

// --- Rotas --
// Rotas de Autenticação e CRUD de Usuário
app.use('/api', routes);

// --- Tratamento de Erros Global ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Erro Global capturado: ${err.message}`);
    res.status(500).json({
        message: 'Ocorreu um erro interno no servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 🚨 NOVO: Inicia a escuta de eventos
// Idealmente, você faria isso após a conexão bem-sucedida com o DB (não mostrado aqui, mas essencial).


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    startConsumers();
    console.log(`🚀 MS-USUÁRIO rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});