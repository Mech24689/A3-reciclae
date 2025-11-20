// src/models/Feedback.ts

/**
 * Define os valores permitidos para o campo 'tipo_feedback'.
 */
export type TipoFeedback = 'SUGESTAO' | 'RECLAMACAO' | 'PROBLEMA' | 'OUTRO';

/**
 * Interface que representa a estrutura completa de dados da tabela 'Feedback'.
 */
export interface Feedback {
    id: number;
    tipo_feedback: TipoFeedback; // NOT NULL
    conteudo: string; // NOT NULL
    data_envio: Date; // TIMESTAMP, NOT NULL
    status_processamento: 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDO'; // NOT NULL
    pessoa_id: number; // FOREIGN KEY, NOT NULL (Remetente)
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id', 'data_envio', e 'status_processamento' 
 * (que será 'PENDENTE' por padrão no backend/DB).
 */
export type FeedbackCreate = Omit<Feedback, 'id' | 'data_envio' | 'status_processamento'>;

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Principalmente para mudar o status ou conteúdo.
 */
export type FeedbackUpdate = Partial<Omit<Feedback, 'id' | 'pessoa_id' | 'data_envio'>>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome do remetente.
 */
export interface FeedbackComPessoa extends Feedback {
    pessoa_nome: string;
}