// src/models/Prefeitura.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Prefeitura' 
 * (incluindo o ID gerado pelo banco de dados).
 */
export interface Prefeitura {
    id: number;
    nome: string;
    cnpj: string | null;
    cep: string | null;
    ramo_ativ: string | null;
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). O ID é omitido pois é gerado pelo banco.
 */
export type PrefeituraCreate = Omit<Prefeitura, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto o ID, 
 * são opcionais (Partial), pois você só precisa enviar os campos que quer alterar.
 */
export type PrefeituraUpdate = Partial<PrefeituraCreate>;