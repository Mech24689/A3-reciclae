// src/__tests__/usuario.spec.ts

import request from 'supertest';
import app from '../server'; // Certifique-se de que seu server.ts exporte o app (ver nota abaixo!)
import knex, { Tabela }   from '../knex'; // Acesso direto ao BD para setup/teardown

// --- DADOS MOCKADOS ---
const TEST_PREFEITURA_ID = 1; 
const TEST_PREFEITURA = {
    nome: 'Prefeitura de Teste',
    cnpj: '00.000.000/0001-00',
    contato_email: 'teste@prefeitura.com',
};

const TEST_USER_DATA = {
    pessoa: {
        nome: 'João Teste',
        cpf_cnpj: '111.111.111-11',
        tipo_pessoa: 'CIDADAO',
        email: 'joao.teste@email.com',
        prefeitura_id: TEST_PREFEITURA_ID,
    },
    usuario: {
        username: 'joaoteste',
        senha_texto_puro: 'SenhaSegura123',
        role: 'CIDADAO',
    }
};

// --- SETUP E TEARDOWN DO BANCO DE DADOS DE TESTE ---

beforeAll(async () => {
    // 1. Limpar as tabelas principais
    await knex(Tabela.USUARIO).del();
    await knex(Tabela.PESSOA).del();
    await knex(Tabela.PREFEITURA).del();

    // 2. Inserir a prefeitura de dependência
    await knex(Tabela.PREFEITURA).insert(TEST_PREFEITURA);
});

afterAll(async () => {
    // 3. Limpar após todos os testes e fechar a conexão
    await knex(Tabela.USUARIO).del();
    await knex(Tabela.PESSOA).del();
    await knex(Tabela.PREFEITURA).del();
    await knex.destroy();
});


// --- TESTES DA API ---

describe('USUARIO & AUTHENTICATION FLOW', () => {
    
    // Testa o Registro (POST /api/pessoas, que chama createUsuario)
    it('should register a new user and return status 201', async () => {
        const response = await request(app)
            .post('/api/pessoas') // Assumindo que a rota de registro está em /api/pessoas
            .send(TEST_USER_DATA);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Usuário registrado com sucesso.');
        expect(response.body.usuario).toHaveProperty('id');
        expect(response.body.usuario).not.toHaveProperty('senha_hash'); // Nunca deve retornar o hash
    });

    // Testa o Login (POST /api/usuarios/login)
    it('should login the user and return a JWT token', async () => {
        const loginData = {
            username: TEST_USER_DATA.usuario.username,
            senha: TEST_USER_DATA.usuario.senha_texto_puro // Senha em texto puro
        };

        // A rota de login deve ser exposta no controller de usuário
        const response = await request(app)
            .post('/api/usuarios/login')
            .send(loginData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
        expect(response.body.user.role).toBe('CIDADAO');
    });

    // Testa falha de login (senha incorreta)
    it('should fail login with incorrect password and return 401', async () => {
        const response = await request(app)
            .post('/api/usuarios/login')
            .send({
                username: TEST_USER_DATA.usuario.username,
                senha: 'SenhaErrada'
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Credenciais inválidas.');
    });

});