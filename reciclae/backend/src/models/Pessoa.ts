// src/models/Pessoa.ts

import { s } from "vite/dist/node/chunks/moduleRunnerTransport";

/**
 * Interface que representa a estrutura completa de dados da tabela 'Pessoa'.
 */
export interface Pessoa {
    id: number;
    nome: string;
    cpf_cnpj: string | null; // Pode ser CPF ou CNPJ, permitindo NULL
    data_nasc: Date | null;
    telefone: string | null;
    email: string | null;
    enderecos: string | null; // TEXT no DB
    sexo: 'M' | 'F' | 'O' | null; // CHAR(1) com possíveis valores
    copia_cnh_rg: Buffer | null; // BYTEA no DB é representado como Buffer no Node.js/pg
    prefeitura_id: number | null; // FOREIGN KEY (Permitindo NULL caso a pessoa não esteja vinculada a uma prefeitura específica inicialmente)
    tipo_pessoa : 'CIDADAO' | 'FUNCIONARIO' | 'COOPERATIVA'; // Tipo da pessoa
    termos : string | null; // Texto dos termos aceitos pela pessoa

}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type PessoaCreate = Omit<Pessoa, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type PessoaUpdate = Partial<PessoaCreate>;

/**
 * Interface para representar o resultado de um JOIN com a Prefeitura.
 */
export interface PessoaComPrefeitura extends Pessoa {
    prefeitura_nome: string | null;
    prefeitura_cnpj: string | null;
}