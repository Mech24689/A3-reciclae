import knex from 'knex';

// 1. Configurações de Conexão (Adaptadas para seu PostgreSQL)
const dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost', // Será 'db' no Docker
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    database: process.env.DB_NAME || 'reciclae',
    port: Number(process.env.DB_PORT) || 5432,
  },
  pool: { min: 2, max: 10 }
};

// 2. Inicializa o Knex
const knexInstance = knex(dbConfig);

// 3. Define a Tabela (Constante para evitar erros de digitação)
export const Tabela = {
  PREFEITURA: 'prefeitura',
  PESSOA: 'pessoa',
  USUARIO: 'usuario',
  VEICULO: 'veiculo',
  ENDERECO: 'endereco',
  PONTO_COLETA: 'pontoColeta',
  NOTIFICACAO: 'notificacao',
  AGENDA_COLETA: 'agendaColeta',
  DESAFIO: 'desafio',
  RECICLAGEM: 'reciclagem',
  RECOMPENSA: 'recompensa',
  CONQUISTA: 'conquista',
  REGISTRO_COLETA: 'registroColeta',
  AGENDA_COLETA_RELACIONAMENTO: 'agendaColetaRelacionamento',
  TIPO_MATERIAL: 'tipoMaterial',
  CONTAGEM_DESCARTE: 'contagemDescarte',
  PARTICIPACAO_DESAFIO: 'participacaoDesafio',
  RELATORIO_IMPACTO: 'relatorioImpacto',
  FEEDBACK: 'feedback'
  // Adicione outras tabelas conforme necessário
};

export default knexInstance;