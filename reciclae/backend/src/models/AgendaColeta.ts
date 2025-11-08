// src/models/AgendaColeta.ts

/**
 * Define os valores permitidos para o campo 'data_semana' no agendamento.
 */
export type DiaSemana = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';

/**
 * Interface que representa a estrutura completa de dados da tabela 'AgendaColeta'.
 */
export interface AgendaColeta {
    id: number;
    data_semana: DiaSemana; // NOT NULL
    periodo_coleta: string | null;
    horario_inicio: string | null; // TIME no DB, string no JS (ex: "08:00:00")
    horario_fim: string | null; // TIME no DB, string no JS
    prefeitura_id: number; // FOREIGN KEY, NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type AgendaColetaCreate = Omit<AgendaColeta, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type AgendaColetaUpdate = Partial<AgendaColetaCreate>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome da Prefeitura.
 */
export interface AgendaColetaComPrefeitura extends AgendaColeta {
    prefeitura_nome: string;
}