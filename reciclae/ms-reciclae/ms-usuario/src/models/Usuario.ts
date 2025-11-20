// src/models/Usuario.ts

/**
 * Define os valores permitidos para o campo 'tipo' de usuário.
 */
export const TipoUsuarioValores = {
    CIDADAO: 'CIDADAO',
    FUNCIONARIO: 'FUNCIONARIO',
    GESTOR: 'GESTOR',
} as const; // O 'as const' garante a imutabilidade e a precisão do tipo.

export type TipoUsuario = typeof TipoUsuarioValores[keyof typeof TipoUsuarioValores];

/**
 * Interface que representa a estrutura completa de dados da tabela 'Usuario'.
 * O campo 'senha' no DB armazena o HASH da senha.
 */
export interface Usuario {
    id: number;
    role: TipoUsuario; // NOT NULL
    username: string;
    login: string; // UNIQUE e NOT NULL
    senha: string; // Armazena o HASH da senha (e não a senha em texto puro)
    prefeitura_id: number; // FOREIGN KEY, NOT NULL
    pessoa_id: number; // FOREIGN KEY, NOT NULL
}

/**
 * Tipo para os dados de CRIAÇÃO (INSERT). Omitimos 'id'.
 * Para a criação, o campo senha é a senha em texto puro ANTES do hashing.
 */
export interface UsuarioCreate {
    username: string;
    role: TipoUsuario;
    login: string;
    senha_texto_puro: string; // Campo para receber a senha antes do hash
    prefeitura_id: number;
    pessoa_id: number; 
 
}

/**
 * Tipo para o objeto que será inserido no banco (após o hash).
 */
export type UsuarioDBInsert = Omit<Usuario, 'id'>;


/**
 * Tipo para os dados de ATUALIZAÇÃO (UPDATE). Todos os campos, exceto 'id', são opcionais.
 */

export type UsuarioUpdate = Partial<UsuarioDBInsert> & {
    // Sobrescrevemos o campo 'senha' para garantir que ele esteja presente
    // e tipado como string opcional (o que o Partial já faz, mas garantimos a visibilidade).
    senha?: string; 
    
    // Adicione outros campos opcionais que você possa querer atualizar,
    // como login (se permitido)
    login?: string;
};
