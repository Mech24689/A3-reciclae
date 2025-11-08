// db/knexfile.ts

import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'node:path';

// Carrega as variáveis de ambiente do .env na raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Destrutura as variáveis do processo
const {
    DB_CLIENT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

// O Knex exige que a configuração seja exportada para ser lida pelos comandos CLI.
// Usamos a interface `Knex.Config` para tipagem.
const config: { [key: string]: Knex.Config } = {
    development: {
        client: DB_CLIENT || 'pg', // PostgreSQL
        connection: {
            host: DB_HOST || 'localhost',
            port: Number(DB_PORT) || 5432,
            user: DB_USER || 'postgres',
            password: DB_PASSWORD, // Importante: a senha vem do .env
            database: DB_NAME || 'reciclagem_cidada_db',
        },
        // Configurações para as migrations
        migrations: {
            directory: './migrations', // Onde o Knex irá procurar por seus arquivos de migração
            extension: 'ts',
        },
        // Configurações para seeds (população inicial de dados)
        seeds: {
            directory: './seeds', // Onde o Knex irá procurar pelos seeds
            extension: 'ts',
        },
        // Usamos pool de conexões para eficiência
        pool: {
            min: 2,
            max: 10
        }
    },

    // Você pode adicionar outras configurações aqui, como 'staging' ou 'production'
    // production: { ... } 
};

export default config;