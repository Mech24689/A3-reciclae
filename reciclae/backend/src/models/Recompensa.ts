// src/models/Recompensa.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Recompensa'.
 */
export interface Recompensa {
    id: number;
    nome: string; // NOT NULL
    pontuacao_necessaria: number; // NOT NULL
    descricao: string | null;
    prefeitura_id: number | null; // FOREIGN KEY opcional para vincular a uma prefeitura
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type RecompensaCreate = Omit<Recompensa, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type RecompensaUpdate = Partial<RecompensaCreate>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome da Prefeitura.
 */
export interface RecompensaComPrefeitura extends Recompensa {
    prefeitura_nome: string | null;
}