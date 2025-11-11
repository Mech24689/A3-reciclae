// src/services/usuario.service.ts

import knex, { Tabela } from '../knex';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioCreate, UsuarioDBInsert, UsuarioUpdate } from '../models/Usuario';

const SALT_ROUNDS = 10; // Custo do hash (quanto maior, mais seguro, mas mais lento)

/**
 * Funções CRUD para a tabela Usuario, utilizando Knex.js e tipagem TypeScript.
 */

// 1. CREATE (Registrar um novo Usuário)
export async function createUsuario(data: UsuarioCreate): Promise<Usuario> {
  const { senha_texto_puro, ...usuarioData } = data;

  try {

  console.log('Criando usuário com dados:', data);


    // 1. Gerar o hash da senha
    const senha_hash = await bcrypt.hash(senha_texto_puro, SALT_ROUNDS);

    // 2. Montar o objeto para inserção no DB
    const usuarioParaDB: UsuarioDBInsert = {
      ...usuarioData,
      senha: senha_hash,
    };

    // 3. Inserir no banco de dados
    const [novoUsuario] = await knex(Tabela.USUARIO)
      .insert(usuarioParaDB)
      .returning('*');

    // 4. Retornar o usuário, mas omitindo o hash da senha por segurança
    const { senha, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha as Usuario;
  } catch (err) {
    console.error('Erro ao criar Usuário (Knex):', err);
    console.error('->', err);
    throw err;
  }
}

// 2. READ (Buscar Usuário por Login para autenticação)
export async function getUsuarioByLogin(login: string): Promise<Usuario | undefined> {
  try {
    // Aqui retornamos o hash da senha, pois será usado para comparação
    const usuario = await knex(Tabela.USUARIO)
      .where('login', login)
      .first();

    return usuario as Usuario | undefined;
  } catch (err) {
    console.error('Erro ao buscar Usuário por login (Knex):', err);
    throw err;
  }
}

// 3. Método para verificar a senha (Lógica do Controller/Auth Service)
export async function verifyPassword(senhaTextoPuro: string, senhaHash: string): Promise<boolean> {
  // Compara a senha em texto puro fornecida pelo usuário com o hash armazenado no DB
  return bcrypt.compare(senhaTextoPuro, senhaHash);
}

// 4. UPDATE (Atualizar Usuário por ID)
// Inclui lógica para atualizar a senha, se fornecida
export async function updateUsuario(id: number, data: UsuarioUpdate): Promise<Usuario | undefined> {
    // 1. FORÇA a inclusão da propriedade 'senha' na desestruturação
    const { senha, ...updates } = data as { senha?: string } & UsuarioUpdate;

  try {
    if (senha) {
      // Se a senha for fornecida, gere um novo hash
      (updates as any).senha = await bcrypt.hash(senha, SALT_ROUNDS);
    }

    const [usuarioAtualizado] = await knex(Tabela.USUARIO)
      .where('id', id)
      .update(updates)
      .returning('*');

    if (!usuarioAtualizado) return undefined;

    // Retornar o objeto sem o hash da senha
    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha as Usuario;
  } catch (err) {
    console.error(`Erro ao atualizar Usuário ID ${id} (Knex):`, err);
    throw err;
  }
}

// 5. DELETE (Deletar Usuário por ID)
export async function deleteUsuario(id: number): Promise<boolean> {
  try {
    const linhasDeletadas: number = await knex(Tabela.USUARIO)
      .where('id', id)
      .del();

    return linhasDeletadas > 0;
  } catch (err) {
    console.error(`Erro ao deletar Usuário ID ${id} (Knex):`, err);
    throw err;
  }
}

export default {
  createUsuario,
  getUsuarioByLogin,
  verifyPassword,
  updateUsuario,
  deleteUsuario,
};