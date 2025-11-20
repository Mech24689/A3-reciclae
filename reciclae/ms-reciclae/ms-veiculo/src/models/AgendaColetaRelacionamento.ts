// src/models/AgendaColetaRelacionamento.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'AgendaColetaRelacionamento'.
 * A combinação de agendacoleta_id e pontocoleta_id deve ser única.
 */
export interface AgendaColetaRelacionamento {
    id: number;
    agendacoleta_id: number; // FOREIGN KEY, NOT NULL
    pontocoleta_id: number; // FOREIGN KEY, NOT NULL
    flag_coleta_forcada: boolean; // BOOLEAN no DB, padrão FALSE
    dt_hora_coleta: Date | null; // TIMESTAMP no DB
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 * 'flag_coleta_forcada' e 'dt_hora_coleta' podem ser opcionais.
 */
export type AgendaColetaRelacionamentoCreate = Omit<AgendaColetaRelacionamento, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type AgendaColetaRelacionamentoUpdate = Partial<AgendaColetaRelacionamentoCreate>;

/**
 * Interface para representar o resultado de um JOIN (detalhes do relacionamento).
 */
export interface AgendaRelacionamentoDetalhado extends AgendaColetaRelacionamento {
    agenda_dia_semana: string;
    ponto_coleta_nome: string;
}