// src/models/RegistroColeta.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'RegistroColeta'.
 */
export interface RegistroColeta {
    id: number;
    data_coleta: Date; // NOT NULL
    hora_inicio: string | null; // TIME no DB, string no JS
    hora_fim: string | null; // TIME no DB, string no JS
    quantidade_descartada: number | null;
    tipo_material: string | null;
    veiculo_id: number; // FOREIGN KEY, NOT NULL
    pessoa_id: number; // FOREIGN KEY (Responsável), NOT NULL
    ponto_coleta_id: number; // FOREIGN KEY, NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 */
export type RegistroColetaCreate = Omit<RegistroColeta, 'id'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type RegistroColetaUpdate = Partial<RegistroColetaCreate>;

/**
 * Interface para representar o resultado de um JOIN com todas as tabelas relacionadas.
 */
export interface RegistroColetaDetalhes extends RegistroColeta {
    veiculo_placa: string;
    responsavel_nome: string;
    ponto_coleta_nome: string;
}