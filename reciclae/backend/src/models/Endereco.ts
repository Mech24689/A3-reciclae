// src/models/Endereco.ts

/**
 * Define os valores permitidos para o campo 'tipo' no endereço.
 */
export type TipoEndereco = 'RUA' | 'AV' | 'TRAVESSA' | 'OUTRO';

/**
 * Interface que representa a estrutura completa de dados da tabela 'Endereco'.
 */
export interface Endereco {
    id: number;
    logradouro: string | null;
    cep: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    tipo: TipoEndereco | null;
    pessoa_id: number; // FOREIGN KEY (Geralmente NOT NULL, obrigatório ter uma pessoa)
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type EnderecoCreate = Omit<Endereco, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type EnderecoUpdate = Partial<EnderecoCreate>;

/**
 * Interface para representar o resultado de um JOIN com o nome da Pessoa.
 */
export interface EnderecoComPessoa extends Endereco {
    pessoa_nome: string;
}