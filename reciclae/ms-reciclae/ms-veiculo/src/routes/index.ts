// src/routes/index.ts

import { Router } from 'express';

// Importa todas as rotas criadas
import prefeituraRouter from './prefeitura.routes';
import pessoaRouter from './pessoa.routes';
import enderecoRouter from './endereco.routes';
import veiculoRouter from './veiculo.routes';
import usuarioRouter from './usuario.routes';
import pontoColetaRouter from './pontoColeta.routes';
import registroColetaRouter from './registroColeta.routes';
import agendaColetaRouter from './agendaColeta.routes';
import desafioRouter from './desafio.routes';
import participacaoDesafioRouter from './participacaoDesafio.routes';
import recompensaRouter from './recompensa.routes';
import conquistaRouter from './conquista.routes';
import contagemDescarteRouter from './contagemDescarte.routes';
import notificacaoRouter from './notificacao.routes';
import relatorioImpactoRouter from './relatorioImpacto.routes';
import feedbackRouter from './feedback.routes';
import tipoMaterialRouter from './tipoMaterial.routes';
import relacionamentoRouter from './agendaColetaRelacionamento.routes';

const routes = Router();

console.log('Registrando rotas da API...');

// Define os prefixos de rota
routes.use('/prefeituras', prefeituraRouter);
routes.use('/usuarios', usuarioRouter);
routes.use('/pessoas', pessoaRouter);
routes.use('/enderecos', enderecoRouter);
routes.use('/veiculos', veiculoRouter);
routes.use('/pontos-coleta', pontoColetaRouter);
routes.use('/registros-coleta', registroColetaRouter);
routes.use('/agendas-coleta', agendaColetaRouter);
routes.use('/desafios', desafioRouter);
routes.use('/participacoes', participacaoDesafioRouter);
routes.use('/recompensas', recompensaRouter);
routes.use('/conquistas', conquistaRouter);
routes.use('/contagens-descarte', contagemDescarteRouter);
routes.use('/notificacoes', notificacaoRouter);
routes.use('/relatorios-impacto', relatorioImpactoRouter);
routes.use('/feedbacks', feedbackRouter);
routes.use('/tipos-material', tipoMaterialRouter);
routes.use('/agenda-relacionamentos', relacionamentoRouter);


// Rota de saúde (Health Check)
routes.get('/', (req, res) => {
    res.json({ message: 'API Reciclagem Cidadã rodando perfeitamente!' });
});

export default routes;