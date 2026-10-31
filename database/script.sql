-- DDL 
-- ----------------------------------------------

-- Remove as tabelas, para executar o script mais de uma vez
-- filhas primeiro, por chaves estrangeiras
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS autores CASCADE;

-- Cria as tabelas

CREATE TABLE autores (
    id   INTEGER      NOT NULL,
    nome VARCHAR(150) NOT NULL,
    CONSTRAINT pk_autores PRIMARY KEY (id)
);

CREATE TABLE clientes (
    id    INTEGER      NOT NULL,
    nome  VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    CONSTRAINT pk_clientes PRIMARY KEY (id),
    CONSTRAINT uq_clientes_email UNIQUE (email)
);
