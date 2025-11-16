--
-- 1. TABELAS DE BASE
--

-- Tabela: Prefeitura
CREATE TABLE Prefeitura (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cnpj VARCHAR(18),
    cep VARCHAR(9),
    ramo_ativ VARCHAR(255)
);

-- Tabela: Pessoa
CREATE TABLE Pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE,
    data_nasc DATE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    enderecos TEXT,
    sexo character(20),
    copia_cnh_rg BYTEA, -- BYTEA é o tipo comum para dados binários (BLOB) no PostgreSQL
    prefeitura_id INT,
    tipo_pessoa character(50),
    termos text COLLATE,	

    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);


-- Tabela: Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('CIDADAO', 'FUNCIONARIO', 'GESTOR')), -- Usando CHECK para simular ENUM
    login VARCHAR(45) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    prefeitura_id INT NOT NULL,
    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);

-- Tabela: Veiculo
CREATE TABLE Veiculo (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    modelo VARCHAR(30),
    marca VARCHAR(30),
    categoria VARCHAR(30),
    data_aquisicao DATE,
    quilometragem INT,
    pessoa_id INT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id)
);

-- Tabela: Endereco
CREATE TABLE Endereco (
    id SERIAL PRIMARY KEY,
    logradouro TEXT,
    cep VARCHAR(9),
    numero VARCHAR(20),
    complemento VARCHAR(30),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    tipo VARCHAR(50) CHECK (tipo IN ('RUA', 'AV', 'TRAVESSA', 'OUTRO')),
    pessoa_id INT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id)
);

-- Tabela: PontoColeta
CREATE TABLE PontoColeta (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    latitude NUMERIC(10,8), -- Usando NUMERIC para o DECIMAL
    longitude NUMERIC(10,8),
    horario_funcionamento VARCHAR(100),
    pessoa_id INT,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id)
);


--
-- 2. TABELAS DE PROCESSO E RELACIONAMENTOS
--

-- Tabela: Notificacao
CREATE TABLE Notificacao (
    id SERIAL PRIMARY KEY,
    nome_mensagem VARCHAR(50),
    mensagem TEXT NOT NULL,
    descricao TEXT,
    data_envio DATE NOT NULL,
    data_prazo DATE,
    prefeitura_id INT,
    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);

-- Tabela: AgendaColeta
CREATE TABLE AgendaColeta (
    id SERIAL PRIMARY KEY,
    data_semana VARCHAR(3) NOT NULL CHECK (data_semana IN ('DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB')),
    periodo_coleta VARCHAR(30),
    horario_inicio TIME,
    horario_fim TIME,
    prefeitura_id INT NOT NULL,
    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);

-- Tabela: Desafio
CREATE TABLE Desafio (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    recompensa VARCHAR(100),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

-- Tabela: Recompensa
CREATE TABLE Recompensa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    pontuacao_necessaria INT NOT NULL,
    descricao TEXT,
    prefeitura_id INT,
    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);

-- Tabela: Conquista
CREATE TABLE Conquista (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pontuacao_minima INT NOT NULL,
    descricao TEXT,
    data_conquista DATE,
    pessoa_id INT NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id)
);

-- Tabela: RegistroColeta
CREATE TABLE RegistroColeta (
    id SERIAL PRIMARY KEY,
    data_coleta DATE NOT NULL,
    hora_inicio TIME,
    hora_fim TIME,
    quantidade_descartada INT,
    tipo_material VARCHAR(50),
    veiculo_id INT NOT NULL,
    pessoa_id INT NOT NULL, -- Motorista/Responsável pela coleta
    ponto_coleta_id INT NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES Veiculo(id),
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id),
    FOREIGN KEY (ponto_coleta_id) REFERENCES PontoColeta(id)
);

-- Tabela: AgendaColetaRelacionamento (Relacionamento N:M entre AgendaColeta e PontoColeta)
CREATE TABLE AgendaColetaRelacionamento (
    id SERIAL PRIMARY KEY,
    agendacoleta_id INT NOT NULL,
    pontocoleta_id INT NOT NULL,
    flag_coleta_forcada BOOLEAN DEFAULT FALSE, -- BOOLEAN é o tipo de dado correto
    dt_hora_coleta TIMESTAMP WITHOUT TIME ZONE, -- TIMESTAMP é o tipo mais adequado para DATETIME
    FOREIGN KEY (agendacoleta_id) REFERENCES AgendaColeta(id),
    FOREIGN KEY (pontocoleta_id) REFERENCES PontoColeta(id),
    UNIQUE (agendacoleta_id, pontocoleta_id)
);

-- Tabela: TipoMaterial
CREATE TABLE TipoMaterial (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    registrocoleta_id INT,
    FOREIGN KEY (registrocoleta_id) REFERENCES RegistroColeta(id)
);

-- Tabela: ContagemDescarte
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

-- Tabela: ParticipacaoDesafio
CREATE TABLE ParticipacaoDesafio (
    id SERIAL PRIMARY KEY,
    pessoa_id INT NOT NULL,
    desafio_id INT NOT NULL,
    data_inscricao DATE NOT NULL,
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id),
    FOREIGN KEY (desafio_id) REFERENCES Desafio(id),
    UNIQUE (pessoa_id, desafio_id)
);

-- Tabela: RelatorioImpacto
CREATE TABLE RelatorioImpacto (
    id SERIAL PRIMARY KEY,
    data_criacao DATE NOT NULL,
    data_prazo DATE,
    conteudo TEXT,
    prefeitura_id INT NOT NULL,
    FOREIGN KEY (prefeitura_id) REFERENCES Prefeitura(id)
);

-- Tabela: Feedback
CREATE TABLE Feedback (
    id SERIAL PRIMARY KEY,
    registrocoleta_id INT,
    ponto_coleta_id INT,
    avaliacao INT CHECK (avaliacao >= 1 AND avaliacao <= 5),
    comentario TEXT,
    pessoa_id INT NOT NULL, -- Quem deu o feedback (Cidadão ou funcionário)
    FOREIGN KEY (registrocoleta_id) REFERENCES RegistroColeta(id),
    FOREIGN KEY (ponto_coleta_id) REFERENCES PontoColeta(id),
    FOREIGN KEY (pessoa_id) REFERENCES Pessoa(id)
);