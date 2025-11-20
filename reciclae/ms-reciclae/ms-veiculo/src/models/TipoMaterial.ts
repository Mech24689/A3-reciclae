// src/models/TipoMaterial.ts

/**
 * Interface que representa a estrutura de dados da tabela 'TipoMaterial'.
 * Nota: No seu diagrama, há uma FK opcional para 'RegistroColeta', 
 * mas para fins práticos (classificação de materiais), ela será uma tabela de catálogo.
 */
export interface TipoMaterial {
    id: number;
    nome: string; // Ex: 'Plástico', 'Papel', 'Vidro'
    descricao: string | null;
    registrocoleta_id: number | null; // FK para RegistroColeta (opcional)
}

export type TipoMaterialCreate = Omit<TipoMaterial, 'id' | 'registrocoleta_id'>; // Excluímos a FK para simplificar o catálogo inicial
export type TipoMaterialUpdate = Partial<TipoMaterialCreate>;