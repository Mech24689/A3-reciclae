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
    
// src/types/estrutura.ts (Exemplo)

export interface VeiculoData {
    pessoa_id: number; // ID da pessoa logada
    marca: string;
    modelo: string;
    placa: string;
    ano: number;
    cor: string;
    tipo_veiculo: 'CARRO' | 'MOTO' | 'CAMINHAO'; 
}

export interface VeiculoResponse {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    tipo_veiculo: 'CARRO' | 'MOTO' | 'CAMINHAO'; 
    
}