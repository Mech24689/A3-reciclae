// src/models/Veiculo.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Veiculo'.
 */
export interface Veiculo {
    id: number;
    placa: string; // ÚNICA e NOT NULL
    modelo: string | null;
    marca: string | null;
    categoria: string | null;
    data_aquisicao: Date | null;
    quilometragem: number | null;
    pessoa_id: number; // FOREIGN KEY (Geralmente NOT NULL)
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type VeiculoCreate = Omit<Veiculo, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type VeiculoUpdate = Partial<VeiculoCreate>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome da pessoa responsável.
 */
export interface VeiculoComPessoa extends Veiculo {
    pessoa_nome: string; // Nome do proprietário/responsável
    pessoa_cpf_cnpj: string | null;
}