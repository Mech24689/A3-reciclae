import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT", "PATCH","DELETE"],

    allowedHeaders: [
        'Content-Type', 
        'Authorization' // ESSENCIAL para rotas autenticadas
    ],
    
  }));


app.use(express.json());

// const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rotas ---
// Todas as rotas serão prefixadas com /api (opcional, mas comum)
app.use('/api', routes);

// --- Tratamento de Erros Global (Middleware de Erro) ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Erro Global capturado: ${err.message}`);
    // Em produção, você pode ocultar o erro interno para o cliente
    res.status(500).json({
        message: 'Ocorreu um erro interno no servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app; // EXPORTE A INSTÂNCIA DO APP AQUI!