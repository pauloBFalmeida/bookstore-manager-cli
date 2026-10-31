-- DDL (definicao da estrutura)
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

-- DML (Manipulacao de dados)
-- ----------------------------------------------

INSERT INTO autores (id, nome) VALUES
    (1, 'Milton Nascimento'),
    (2, 'Caetano Veloso'),
    (3, 'Gilberto Gil'),
    (4, 'Chico Buarque'),
    (5, 'Elis Regina');

INSERT INTO clientes (id, nome, email) VALUES
    (1, 'Ana Souza',     'ana.souza@email.com'),
    (2, 'Bruno Lima',    'bruno.lima@email.com'),
    (3, 'Carla Mendes',  'carla.mendes@email.com'),
    (4, 'Diego Rocha',   'diego.rocha@email.com'),
    (5, 'Elisa Martins', 'elisa.martins@email.com');