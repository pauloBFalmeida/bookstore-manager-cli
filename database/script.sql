-- DDL 
-- ----------------------------------------------

-- Remove as tabelas, para executar o script mais de uma vez
DROP TABLE IF EXISTS autores CASCADE;

-- Cria as tabelas

CREATE TABLE autores (
    id   INTEGER      NOT NULL,
    nome VARCHAR(150) NOT NULL,
    CONSTRAINT pk_autores PRIMARY KEY (id)
);
