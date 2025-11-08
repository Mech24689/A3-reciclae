// src/models/PontoColeta.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'PontoColeta'.
 */
export interface PontoColeta {
    id: number;
    nome: string;
    descricao: string | null;
    latitude: number | null; // NUMERIC(10,8) no DB
    longitude: number | null; // NUMERIC(10,8) no DB
    horario_funcionamento: string | null;
    pessoa_id: number | null; // FOREIGN KEY opcional para um responsável
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type PontoColetaCreate = Omit<PontoColeta, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type PontoColetaUpdate = Partial<PontoColetaCreate>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome da pessoa responsável (se houver).
 */
export interface PontoColetaComPessoa extends PontoColeta {
    responsavel_nome: string | null;
}