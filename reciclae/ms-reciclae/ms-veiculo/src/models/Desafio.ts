// src/models/Desafio.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Desafio'.
 */
export interface Desafio {
    id: number;
    titulo: string; // NOT NULL
    descricao: string | null;
    recompensa: string | null; // O que o cidadão ganha (descrição, não FK)
    data_inicio: Date; // NOT NULL
    data_fim: Date; // NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type DesafioCreate = Omit<Desafio, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type DesafioUpdate = Partial<DesafioCreate>;