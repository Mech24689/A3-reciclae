"use strict";
// db/seeds/initial_data.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
// Dados iniciais para a tabela Prefeitura
const prefeituras = [
    {
        nome: 'Prefeitura Municipal de Ecoville',
        cnpj: '12.345.678/0001-90',
        contato_email: 'contato@ecoville.gov.br',
        ativo: true,
    },
    {
        nome: 'Prefeitura de Cidade Verde',
        cnpj: '98.765.432/0001-01',
        contato_email: 'faleconosco@cidadeverde.gov.br',
        ativo: true,
    },
];
// Dados iniciais para a tabela TipoMaterial
const tiposMaterial = [
    {
        nome: 'Papel',
        descricao: 'Jornais, revistas, caixas de papelão, embalagens longa vida.',
        cor_identificacao: 'AZUL',
        pontuacao_por_unidade: 1.50, // 1.50 pontos por kg (exemplo)
    },
    {
        nome: 'Plástico',
        descricao: 'Garrafas PET, embalagens de produtos de limpeza, sacolas.',
        cor_identificacao: 'VERMELHO',
        pontuacao_por_unidade: 2.00, // 2.00 pontos por kg (exemplo)
    },
    {
        nome: 'Vidro',
        descricao: 'Garrafas, potes, frascos de conserva.',
        cor_identificacao: 'VERDE',
        pontuacao_por_unidade: 0.80, // 0.80 pontos por kg (exemplo)
    },
    {
        nome: 'Metal',
        descricao: 'Latas de alumínio, ferragens, arames, panelas sem cabo de plástico.',
        cor_identificacao: 'AMARELO',
        pontuacao_por_unidade: 3.50, // 3.50 pontos por kg (exemplo)
    },
    {
        nome: 'Óleo de Cozinha Usado',
        descricao: 'Óleo vegetal usado em frituras.',
        cor_identificacao: 'LARANJA',
        pontuacao_por_unidade: 5.00, // 5.00 pontos por litro (exemplo)
    },
];
/**
 * Insere os dados iniciais nas tabelas.
 * A ordem é importante para respeitar as chaves estrangeiras, mas neste caso
 * as duas tabelas são independentes.
 */
async function seed(knex) {
    // Deleta os dados existentes para garantir um estado limpo
    await knex('Prefeitura').del();
    await knex('TipoMaterial').del();
    // 1. Insere as Prefeituras
    await knex('Prefeitura').insert(prefeituras);
    // 2. Insere os Tipos de Material
    await knex('TipoMaterial').insert(tiposMaterial);
    console.log('Dados iniciais (Prefeitura e TipoMaterial) inseridos com sucesso.');
}
// Nota: Não é necessário uma função `down` para seeds, mas alguns preferem
// export async function down(knex: Knex): Promise<void> {
//     // Opcional: Deleta os dados que foram inseridos
//     await knex('Prefeitura').del();
//     await knex('TipoMaterial').del();
// }
