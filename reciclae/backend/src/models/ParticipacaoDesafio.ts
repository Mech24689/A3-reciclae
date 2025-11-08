// src/models/ParticipacaoDesafio.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'ParticipacaoDesafio'.
 * A combinação de pessoa_id e desafio_id deve ser única.
 */
export interface ParticipacaoDesafio {
    id: number;
    pessoa_id: number; // FOREIGN KEY, NOT NULL
    desafio_id: number; // FOREIGN KEY, NOT NULL
    data_inscricao: Date; // NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id' e geralmente 'data_inscricao' 
 * (que pode ser preenchida no backend).
 */
export type ParticipacaoDesafioCreate = Omit<ParticipacaoDesafio, 'id' | 'data_inscricao'>;

/**
 * Interface para representar o resultado de um JOIN (detalhes da participação).
 */
export interface ParticipacaoDetalhada extends ParticipacaoDesafio {
    pessoa_nome: string;
    desafio_titulo: string;
}