// src/models/Conquista.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Conquista'.
 */
export interface Conquista {
    id: number;
    nome: string; // NOT NULL
    pontuacao_minima: number; // NOT NULL
    descricao: string | null;
    data_conquista: Date | null;
    pessoa_id: number; // FOREIGN KEY, NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'. 
 * A 'data_conquista' pode ser definida no backend no momento da criação.
 */
export type ConquistaCreate = Omit<Conquista, 'id' | 'data_conquista'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type ConquistaUpdate = Partial<Omit<Conquista, 'id'>>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome da Pessoa.
 */
export interface ConquistaComPessoa extends Conquista {
    pessoa_nome: string;
}