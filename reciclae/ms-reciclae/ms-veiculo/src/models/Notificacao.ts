// src/models/Notificacao.ts

/**
 * Interface que representa a estrutura completa de dados da tabela 'Notificacao'.
 */
export interface Notificacao {
    id: number;
    titulo: string; // NOT NULL
    conteudo: string | null;
    data_envio: Date; // TIMESTAMP, NOT NULL
    lida: boolean; // BOOLEAN, padrão FALSE
    pessoa_id: number; // FOREIGN KEY, NOT NULL (Destinatário)
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id' e 'data_envio' (que é gerada no backend).
 * 'lida' é opcional e geralmente assume FALSE por padrão.
 */
export type NotificacaoCreate = Omit<Notificacao, 'id' | 'data_envio' | 'lida'> & {
    lida?: boolean;
};

/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Principalmente usado para marcar como lida.
 */
export type NotificacaoUpdate = Partial<Omit<Notificacao, 'id' | 'pessoa_id'>>;

/**
 * Interface para representar o resultado de um JOIN, incluindo o nome do destinatário.
 */
export interface NotificacaoComPessoa extends Notificacao {
    pessoa_nome: string;
}