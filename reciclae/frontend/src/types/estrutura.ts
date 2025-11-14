// Tipos de Retorno da API (Login)
export type UserRole = 'CIDADAO' | 'FUNCIONARIO' | 'ADMIN';

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        username: string;
        role: UserRole;
        pessoaId: number;
        prefeituraId: number;
        pessoa_id: number;
    };
}

// Tipos de Dados para Envio (Login e Registro)
export interface LoginData {
    username: string;
    senha: string;
}

export interface RegistrationData {
    pessoa: {
        prefeitura_id: number;
        nome: string;
        cpf_cnpj: string;
        tipo_pessoa: 'CIDADAO' | 'FUNCIONARIO' | 'COOPERATIVA';
        data_nasc?: Date | null;
        email: string;
        telefone: string;
        enderecos: string | null; 
        sexo?: string | null; 
        termos: string;
    };
    usuario: {
        username: string;
        senha_texto_puro: string;
        role: UserRole;
        prefeitura_id: number;
        
    };
}
    
