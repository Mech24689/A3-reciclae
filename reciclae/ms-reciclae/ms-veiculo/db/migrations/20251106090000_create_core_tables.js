"use strict";
// db/migrations/20251106090000_create_all_tables.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// A função 'up' cria todas as tabelas
async function up(knex) {
    // --- TABELAS BASE (Sem dependências de FKs externas) ---
    // 1. TipoMaterial
    await knex.schema.createTable('TipoMaterial', (table) => {
        table.increments('id').primary();
        table.string('nome', 100).notNullable().unique();
        table.string('descricao', 500);
        table.string('cor_identificacao', 50); // Ex: Azul (Papel), Amarelo (Metal)
        table.decimal('pontuacao_por_unidade').notNullable().defaultTo(0);
        // Colunas de auditoria
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 2. Prefeitura
    await knex.schema.createTable('Prefeitura', (table) => {
        table.increments('id').primary();
        table.string('nome', 255).notNullable();
        table.string('cnpj', 18).unique().notNullable();
        table.string('contato_email', 100).unique();
        table.boolean('ativo').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // --- TABELAS DE NÍVEL 1 (Dependem apenas de Prefeitura e TipoMaterial) ---
    // 3. Pessoa
    await knex.schema.createTable('Pessoa', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('nome', 255).notNullable();
        table.string('cpf_cnpj', 18).unique().notNullable();
        table.enum('tipo_pessoa', ['CIDADAO', 'FUNCIONARIO', 'COOPERATIVA']).notNullable();
        table.string('telefone', 20);
        table.string('email', 100).unique().notNullable();
        table.boolean('ativo').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 4. Endereco
    await knex.schema.createTable('Endereco', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE') // Se a Pessoa for deletada, seus endereços são deletados
            .notNullable();
        table.string('cep', 10).notNullable();
        table.string('rua', 255).notNullable();
        table.string('numero', 50).notNullable();
        table.string('bairro', 150).notNullable();
        table.string('cidade', 150).notNullable();
        table.string('estado', 2).notNullable();
        table.string('complemento', 255);
        table.decimal('latitude', 10, 8);
        table.decimal('longitude', 11, 8);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 5. Veiculo
    await knex.schema.createTable('Veiculo', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('placa', 10).unique().notNullable();
        table.string('modelo', 100).notNullable();
        table.string('marca', 100);
        table.integer('ano');
        table.enum('tipo_combustivel', ['GASOLINA', 'DIESEL', 'ETANOL', 'ELETRICO', 'HIBRIDO']).notNullable();
        table.boolean('em_uso').notNullable().defaultTo(false);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 6. PontoColeta
    await knex.schema.createTable('PontoColeta', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('nome', 255).notNullable();
        table.string('cep', 10).notNullable();
        table.string('rua', 255).notNullable();
        table.string('numero', 50);
        table.decimal('latitude', 10, 8).notNullable();
        table.decimal('longitude', 11, 8).notNullable();
        table.text('horario_funcionamento');
        table.boolean('ativo').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 7. Desafio
    await knex.schema.createTable('Desafio', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('titulo', 255).notNullable();
        table.text('descricao').notNullable();
        table.timestamp('data_inicio').notNullable();
        table.timestamp('data_fim').notNullable();
        table.integer('pontos_recompensa').notNullable().defaultTo(0);
        table.boolean('ativo').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 8. Recompensa
    await knex.schema.createTable('Recompensa', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('nome', 255).notNullable();
        table.text('descricao');
        table.integer('pontos_necessarios').notNullable();
        table.integer('quantidade_disponivel').notNullable().defaultTo(-1); // -1 para ilimitado
        table.boolean('ativo').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 9. Conquista
    await knex.schema.createTable('Conquista', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('titulo', 255).notNullable();
        table.text('descricao').notNullable();
        table.string('criterio_tipo', 50).notNullable(); // Ex: 'TOTAL_PONTOS', 'TOTAL_COLETAS'
        table.decimal('criterio_valor').notNullable();
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // --- TABELAS DE NÍVEL 2 (Dependem de Nível 1 ou Base) ---
    // 10. Usuario (Login)
    await knex.schema.createTable('Usuario', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE') // Se a Pessoa for deletada, o usuário associado deve ser deletado
            .unique()
            .notNullable();
        table.string('username', 50).unique().notNullable();
        table.string('senha_hash', 255).notNullable(); // Armazenar o hash da senha
        table.enum('role', ['CIDADAO', 'FUNCIONARIO', 'ADMIN']).notNullable(); // Papel de acesso
        table.boolean('verificado').notNullable().defaultTo(false);
        table.timestamp('ultimo_login');
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 11. AgendaColeta
    await knex.schema.createTable('AgendaColeta', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('titulo', 255).notNullable();
        table.text('descricao');
        table.enum('frequencia', ['DIARIA', 'SEMANAL', 'QUINZENAL', 'MENSAL', 'UNICA']).notNullable();
        table.string('dia_semana', 15); // Ex: 'Segunda', 'Quarta'
        table.time('hora_inicio').notNullable();
        table.time('hora_fim').notNullable();
        table.boolean('ativa').notNullable().defaultTo(true);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 12. RegistroColeta
    await knex.schema.createTable('RegistroColeta', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id') // Quem fez o descarte (cidadão)
            .references('id').inTable('Pessoa')
            .onDelete('RESTRICT')
            .notNullable();
        table.integer('veiculo_id') // Qual veículo fez a coleta (funcionário) - Opcional se for descarte próprio
            .references('id').inTable('Veiculo')
            .onDelete('SET NULL');
        table.integer('ponto_coleta_id')
            .references('id').inTable('PontoColeta')
            .onDelete('RESTRICT'); // Opcional, pode ser coleta na casa do cidadão
        table.integer('tipo_material_id')
            .references('id').inTable('TipoMaterial')
            .onDelete('RESTRICT')
            .notNullable();
        table.decimal('peso_kg', 10, 2).notNullable();
        table.decimal('pontos_gerados', 10, 2).notNullable().defaultTo(0);
        table.timestamp('data_registro').notNullable().defaultTo(knex.fn.now());
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // --- TABELAS DE RELACIONAMENTO E AUDITORIA (Nível 3) ---
    // 13. ParticipacaoDesafio
    await knex.schema.createTable('ParticipacaoDesafio', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('desafio_id')
            .references('id').inTable('Desafio')
            .onDelete('CASCADE')
            .notNullable();
        table.enum('status', ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO']).notNullable().defaultTo('PENDENTE');
        table.timestamp('data_inscricao').notNullable().defaultTo(knex.fn.now());
        table.timestamp('data_conclusao');
        // Garante que uma pessoa só pode se inscrever uma vez em um desafio
        table.unique(['pessoa_id', 'desafio_id']);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 14. ContagemDescarte (Acumulado de descarte por material e por pessoa)
    await knex.schema.createTable('ContagemDescarte', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('tipo_material_id')
            .references('id').inTable('TipoMaterial')
            .onDelete('RESTRICT')
            .notNullable();
        table.decimal('peso_total_acumulado_kg', 12, 2).notNullable().defaultTo(0);
        // Garante que uma pessoa só tenha uma contagem por tipo de material
        table.unique(['pessoa_id', 'tipo_material_id']);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 15. Notificacao
    await knex.schema.createTable('Notificacao', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE')
            .notNullable();
        table.string('titulo', 255).notNullable();
        table.text('mensagem').notNullable();
        table.enum('tipo', ['ALERTA', 'PROMOCAO', 'LIDERANCA', 'OUTRO']).notNullable();
        table.boolean('lida').notNullable().defaultTo(false);
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 16. RelatorioImpacto
    await knex.schema.createTable('RelatorioImpacto', (table) => {
        table.increments('id').primary();
        table.integer('prefeitura_id')
            .references('id').inTable('Prefeitura')
            .onDelete('RESTRICT')
            .notNullable();
        table.string('titulo', 255).notNullable();
        table.text('conteudo').notNullable(); // Pode ser um JSON ou texto formatado
        table.timestamp('data_publicacao').notNullable().defaultTo(knex.fn.now());
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 17. Feedback
    await knex.schema.createTable('Feedback', (table) => {
        table.increments('id').primary();
        table.integer('pessoa_id')
            .references('id').inTable('Pessoa')
            .onDelete('CASCADE')
            .notNullable();
        table.enum('tipo', ['SUGESTAO', 'BUG', 'ELOGIO', 'OUTRO']).notNullable();
        table.text('mensagem').notNullable();
        table.enum('status', ['RECEBIDO', 'EM_ANALISE', 'RESOLVIDO']).notNullable().defaultTo('RECEBIDO');
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
    // 18. AgendaColetaRelacionamento (Tabela N:N entre AgendaColeta e PontoColeta)
    await knex.schema.createTable('AgendaColetaRelacionamento', (table) => {
        table.increments('id').primary();
        table.integer('agenda_coleta_id')
            .references('id').inTable('AgendaColeta')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('ponto_coleta_id')
            .references('id').inTable('PontoColeta')
            .onDelete('CASCADE')
            .notNullable();
        table.unique(['agenda_coleta_id', 'ponto_coleta_id']); // Evita duplicidade
        table.timestamp('criado_em').defaultTo(knex.fn.now());
        table.timestamp('atualizado_em').defaultTo(knex.fn.now());
    });
}
// A função 'down' reverte a criação, respeitando a ordem inversa das dependências
async function down(knex) {
    // --- Reversão em Ordem Inversa de Dependência ---
    // 1. Relacionamentos
    await knex.schema.dropTableIfExists('AgendaColetaRelacionamento');
    await knex.schema.dropTableIfExists('Feedback');
    await knex.schema.dropTableIfExists('RelatorioImpacto');
    await knex.schema.dropTableIfExists('Notificacao');
    await knex.schema.dropTableIfExists('ContagemDescarte');
    await knex.schema.dropTableIfExists('ParticipacaoDesafio');
    await knex.schema.dropTableIfExists('RegistroColeta');
    // 2. Nível 2
    await knex.schema.dropTableIfExists('AgendaColeta');
    await knex.schema.dropTableIfExists('Usuario');
    // 3. Nível 1
    await knex.schema.dropTableIfExists('Conquista');
    await knex.schema.dropTableIfExists('Recompensa');
    await knex.schema.dropTableIfExists('Desafio');
    await knex.schema.dropTableIfExists('PontoColeta');
    await knex.schema.dropTableIfExists('Veiculo');
    await knex.schema.dropTableIfExists('Endereco');
    await knex.schema.dropTableIfExists('Pessoa');
    // 4. Base
    await knex.schema.dropTableIfExists('Prefeitura');
    await knex.schema.dropTableIfExists('TipoMaterial');
}
