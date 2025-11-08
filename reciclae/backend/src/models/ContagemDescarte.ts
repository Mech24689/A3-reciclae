// src/models/ContagemDescarte.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'ContagemDescarte'.
 */
export interface ContagemDescarte {
    id: number;
    quantidade: number; // NOT NULL (peso, volume, ou unidade)
    data_descarte: Date | null;
    pessoa_id: number; // FOREIGN KEY (Cidadão), NOT NULL
    tipomaterial_id: number; // FOREIGN KEY, NOT NULL
    ponto_coleta_id: number; // FOREIGN KEY, NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type ContagemDescarteCreate = Omit<ContagemDescarte, 'id' | 'data_descarte'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type ContagemDescarteUpdate = Partial<ContagemDescarteCreate>;

/**
 * Interface para representar o resultado de um JOIN com os nomes das FKs.
 */
export interface ContagemDescarteDetalhada extends ContagemDescarte {
    pessoa_nome: string;
    material_nome: string;
    ponto_coleta_nome: string;
}