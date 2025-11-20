// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  // Define o ambiente de execução como 'node'
  testEnvironment: 'node', 
  
  // O que deve ser transformado pelo ts-jest (arquivos .ts)
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Padrão para encontrar arquivos de teste (ex: *.test.ts ou *.spec.ts)
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  
  // Extensões de arquivo que o Jest deve processar
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Onde o Jest deve procurar pelos arquivos de módulo (útil para Knex/DB)
  moduleDirectories: ['node_modules', 'src'],

  // Configurações para cobrir o ambiente Knex/BD (limpar depois de cada teste)
  setupFilesAfterEnv: [], // Adicionaremos um arquivo de setup aqui se usarmos DB em todos os testes

  // Pasta para resultados de cobertura de código
  coverageDirectory: 'coverage',

  // Ignorar node_modules, dist e a pasta de migrações Knex
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/db/migrations/'],
};

export default config;