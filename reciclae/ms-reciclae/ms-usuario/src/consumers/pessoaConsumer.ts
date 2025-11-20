// src/consumers/pessoaConsumer.ts (MS-Usuário)

import { subscribe } from '../event-bus/inMemoryBus'; // Importa o in-memory bus
import * as usuarioService from '../services/Usuario.service';
import { TipoUsuarioValores, UsuarioCreate } from '../models/Usuario'; 

/**
 * Função que será executada ao receber o evento 'pessoa.criada'.
 */
export async function handlePessoaCriada(eventData: any) {
    console.log(`[MS-Usuário] Evento 'pessoa.criada' recebido para Pessoa ID: ${eventData.pessoaId}`);
    
    if (!eventData.senha_texto_puro) {
        console.error('[MS-Usuário] Evento recebido sem senha. Não é possível criar o usuário.');
        return; // Sai da função, ignorando o evento inválido
    }

    const usuarioPayload: UsuarioCreate = {
        login: eventData.email,
        username: eventData.email.split('@')[0], // Nome de usuário simples
        senha_texto_puro: eventData.senha_texto_puro, // Senha passada no evento
        role: TipoUsuarioValores.CIDADAO,
        prefeitura_id: eventData.prefeituraId || 1, // Assumindo default se não vier
        pessoa_id: eventData.pessoaId,
    };

    try {
        await usuarioService.createUsuario(usuarioPayload);
        console.log(`[MS-Usuário] Conta de usuário criada com sucesso para ${eventData.email}.`);
        // Aqui você poderia publicar um evento 'usuario.criado'
    } catch (error: any) {
        // Tratar erros, como duplicidade de login (e-mail)
        if (error.code === '23505') { 
             console.error(`[MS-Usuário] Erro de duplicidade de login (email já em uso): ${eventData.email}`);
        } else {
             console.error('[MS-Usuário] Erro ao criar usuário no DB:', error);
        }
    }
}

/**
 * Inicializa a subscrição ao barramento.
 */
export function startConsumers() {
    subscribe('[startConsumers] pessoa.criada', handlePessoaCriada);
    console.log('[startConsumers] Ouvinte para "pessoa.criada" REGISTRADO com sucesso.');
}