-- ----------------------------------------
-- 1. TABELAS BASE (Sem dependências externas)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.prefeitura (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cnpj VARCHAR(18),
    cep VARCHAR(9),
    ramo_ativ VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.desafio (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    recompensa VARCHAR(100),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

-- ----------------------------------------
-- 2. TABELAS DE NÍVEL 1 (Dependem apenas de PREFEITURA)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE, -- Garantir que CPF/CNPJ seja único
    data_nasc DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    enderecos VARCHAR(255), -- Melhor prática seria TEXT, mas mantendo o tamanho
    sexo VARCHAR(20), -- Alterado de CHAR(20) para VARCHAR(20)
    copia_cnh_rg BYTEA,
    prefeitura_id INTEGER,
    tipo_pessoa VARCHAR(50), -- Alterado de CHAR(50) para VARCHAR(50)
    termos TEXT,
    CONSTRAINT pessoa_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.recompensa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    pontuacao_necessaria INTEGER NOT NULL,
    descricao TEXT,
    prefeitura_id INTEGER,
    CONSTRAINT recompensa_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.notificacao (
    id SERIAL PRIMARY KEY,
    nome_mensagem VARCHAR(50),
    mensagem TEXT NOT NULL,
    descricao TEXT,
    data_envio DATE NOT NULL,
    data_prazo DATE,
    prefeitura_id INTEGER,
    CONSTRAINT notificacao_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ----------------------------------------
-- 3. TABELAS DE NÍVEL 2 (Dependem de PESSOA ou PREFEITURA)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.usuario (
    id SERIAL PRIMARY KEY,
    login VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    prefeitura_id INTEGER NOT NULL,
    pessoa_id INTEGER, -- FK para Pessoa (pode ser null se for um usuário de sistema não-pessoa)
    role VARCHAR(50), -- Alterado de CHAR(50) para VARCHAR(50)
    username VARCHAR(100), -- Alterado de CHAR(100) para VARCHAR(100)
    CONSTRAINT usuario_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.agendacoleta (
    id SERIAL PRIMARY KEY,
    data_semana VARCHAR(3) NOT NULL,
    periodo_coleta VARCHAR(30),
    horario_inicio TIME WITHOUT TIME ZONE,
    horario_fim TIME WITHOUT TIME ZONE,
    prefeitura_id INTEGER NOT NULL,
    CONSTRAINT agendacoleta_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT agendacoleta_data_semana_check CHECK (data_semana IN ('DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'))
);

CREATE TABLE IF NOT EXISTS public.pontocoleta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    latitude NUMERIC(10,8),
    longitude NUMERIC(10,8),
    horario_funcionamento VARCHAR(100),
    pessoa_id INTEGER, -- Pessoa responsável pelo Ponto de Coleta
    CONSTRAINT pontocoleta_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.relatorioimpacto (
    id SERIAL PRIMARY KEY,
    data_criacao DATE NOT NULL,
    data_prazo DATE,
    conteudo TEXT,
    prefeitura_id INTEGER NOT NULL,
    CONSTRAINT relatorioimpacto_prefeitura_id_fkey FOREIGN KEY (prefeitura_id)
        REFERENCES public.prefeitura (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ----------------------------------------
-- 4. TABELAS DE NÍVEL 3 (Dependem de PESSOA, DESAFIO, PONTOCOLETA)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.veiculo (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    modelo VARCHAR(30),
    marca VARCHAR(30),
    categoria VARCHAR(30),
    data_aquisicao DATE,
    quilometragem INTEGER,
    pessoa_id INTEGER NOT NULL, -- Pessoa proprietária do veículo
    ano INTEGER,
    cor VARCHAR(200), -- Alterado de CHAR(200) para VARCHAR(200)
    tipo_veiculo VARCHAR(200), -- Alterado de CHAR(200) para VARCHAR(200)
    CONSTRAINT veiculo_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.endereco (
    id SERIAL PRIMARY KEY,
    logradouro TEXT,
    cep VARCHAR(9),
    numero VARCHAR(20),
    complemento VARCHAR(30),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    tipo VARCHAR(50),
    pessoa_id INTEGER NOT NULL,
    CONSTRAINT endereco_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT endereco_tipo_check CHECK (tipo IN ('RUA', 'AV', 'TRAVESSA', 'OUTRO'))
);

CREATE TABLE IF NOT EXISTS public.conquista (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pontuacao_minima INTEGER NOT NULL,
    descricao TEXT,
    data_conquista DATE,
    pessoa_id INTEGER NOT NULL,
    CONSTRAINT conquista_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.participacaodesafio (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER NOT NULL,
    desafio_id INTEGER NOT NULL,
    data_inscricao DATE NOT NULL,
    CONSTRAINT participacaodesafio_pessoa_id_desafio_id_key UNIQUE (pessoa_id, desafio_id),
    CONSTRAINT participacaodesafio_desafio_id_fkey FOREIGN KEY (desafio_id)
        REFERENCES public.desafio (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT participacaodesafio_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.agendacoletarelacionamento (
    id SERIAL PRIMARY KEY,
    agendacoleta_id INTEGER NOT NULL,
    pontocoleta_id INTEGER NOT NULL,
    flag_coleta_forcada BOOLEAN DEFAULT FALSE,
    dt_hora_coleta TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT agendacoletarelacionamento_agendacoleta_id_pontocoleta_id_key UNIQUE (agendacoleta_id, pontocoleta_id),
    CONSTRAINT agendacoletarelacionamento_agendacoleta_id_fkey FOREIGN KEY (agendacoleta_id)
        REFERENCES public.agendacoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT agendacoletarelacionamento_pontocoleta_id_fkey FOREIGN KEY (pontocoleta_id)
        REFERENCES public.pontocoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ----------------------------------------
-- 5. TABELAS DE NÍVEL 4 (Dependem de VEICULO, PESSOA, PONTOCOLETA)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.registrocoleta (
    id SERIAL PRIMARY KEY,
    data_coleta DATE NOT NULL,
    hora_inicio TIME WITHOUT TIME ZONE,
    hora_fim TIME WITHOUT TIME ZONE,
    quantidade_descartada INTEGER,
    tipo_material VARCHAR(50),
    veiculo_id INTEGER NOT NULL,
    pessoa_id INTEGER NOT NULL,
    ponto_coleta_id INTEGER NOT NULL,
    CONSTRAINT registrocoleta_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT registrocoleta_ponto_coleta_id_fkey FOREIGN KEY (ponto_coleta_id)
        REFERENCES public.pontocoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT registrocoleta_veiculo_id_fkey FOREIGN KEY (veiculo_id)
        REFERENCES public.veiculo (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ----------------------------------------
-- 6. TABELAS DE NÍVEL 5 (Dependem de REGISTROCOLETA)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.tipomaterial (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    registrocoleta_id INTEGER, -- FK para Registro Coleta (pode ser null)
    CONSTRAINT tipomaterial_registrocoleta_id_fkey FOREIGN KEY (registrocoleta_id)
        REFERENCES public.registrocoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- ----------------------------------------
-- 7. TABELAS DE NÍVEL 6 (Dependem de REGISTROCOLETA, PONTOCOLETA, PESSOA, TIPOMATERIAL)
-- ----------------------------------------

CREATE TABLE IF NOT EXISTS public.feedback (
    id SERIAL PRIMARY KEY,
    registrocoleta_id INTEGER,
    ponto_coleta_id INTEGER,
    avaliacao INTEGER,
    comentario TEXT,
    pessoa_id INTEGER NOT NULL,
    CONSTRAINT feedback_pessoa_id_fkey FOREIGN KEY (pessoa_id)
        REFERENCES public.pessoa (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT feedback_ponto_coleta_id_fkey FOREIGN KEY (ponto_coleta_id)
        REFERENCES public.pontocoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT feedback_registrocoleta_id_fkey FOREIGN KEY (registrocoleta_id)
        REFERENCES public.registrocoleta (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT feedback_avaliacao_check CHECK (avaliacao >= 1 AND avaliacao <= 5)
);

CREATE TABLE ContagemDescarte (
    id SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,
    data_descarte DATE,
    pessoa_id INT NOT NULL, -- Cidadão que descartou
    tipomaterial_id INT NOT NULL,
    ponto_coleta_id INT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id),
    FOREIGN KEY (tipomaterial_id) REFERENCES TipoMaterial(id),
    FOREIGN KEY (ponto_coleta_id) REFERENCES PontoColeta(id)
);
