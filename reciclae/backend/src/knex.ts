// src/knex.ts

import knex from 'knex';

// 1. Configurações de Conexão (Adaptadas para seu PostgreSQL)
const dbConfig = {
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'reciclae',
    password: 'mysecretpassword',
    port: 5432,
  },
  pool: {
    min: 2,
    max: 10
  }
};

// 2. Inicializa o Knex
const knexInstance = knex(dbConfig);

// 3. Define a Tabela (Constante para evitar erros de digitação)
export const Tabela = {
    PREFEITURA: 'Prefeitura',
    PESSOA: 'Pessoa',
    USUARIO: 'Usuario',
    VEICULO: 'Veiculo',
    ENDERECO: 'Endereco',
    PONTO_COLETA: 'PontoColeta',
    NOTIFICACAO: 'Notificacao',
    AGENDA_COLETA: 'AgendaColeta',
    DESAFIO: 'Desafio',
    RECICLAGEM: 'Reciclagem',
    RECOMPENSA: 'Recompensa',
    CONQUISTA: 'Conquista',
    REGISTRO_COLETA : 'RegistroColeta',
    AGENDA_COLETA_RELACIONAMENTO : 'AgendaColetaRelacionamento',
    TIPO_MATERIAL : 'TipoMaterial',
    CONTAGEM_DESCARTE : 'ContagemDescarte',
    PARTICIPACAO_DESAFIO : 'ParticipacaoDesafio',
    RELATORIO_IMPACTO : 'RelatorioImpacto',
    FEEDBACK : 'Feedback'
    // Adicione outras tabelas conforme necessário
};

export default knexInstance;