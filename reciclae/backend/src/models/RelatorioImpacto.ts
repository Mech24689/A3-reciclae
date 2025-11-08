// src/models/RelatorioImpacto.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'RelatorioImpacto'.
 */
export interface RelatorioImpacto {
    id: number;
    data_geracao: Date; // TIMESTAMP, NOT NULL
    material_reciclado_total: number; // Métrica: volume/peso total de material reciclado
    reducao_carbono: number | null; // Métrica: estimada (em kg de CO2, por exemplo)
    economias_agua_energia: string | null; // Métrica: string descritiva ou JSON
    total_pontos_distribuidos: number | null; // Métrica: total de pontos distribuídos
    descricao_metrica: string | null;
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id' e 'data_geracao' (que é gerada no backend).
 */
export type RelatorioImpactoCreate = Omit<RelatorioImpacto, 'id' | 'data_geracao'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */
export type RelatorioImpactoUpdate = Partial<RelatorioImpactoCreate>;