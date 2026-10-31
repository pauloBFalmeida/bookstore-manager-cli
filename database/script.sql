-- DDL (definicao da estrutura)
-- ----------------------------------------------

-- Remove as tabelas, para executar o script mais de uma vez
-- filhas primeiro, por chaves estrangeiras
DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS autores CASCADE;

-- Cria as tabelas

CREATE TABLE autores (
    id   INTEGER      NOT NULL,
    nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_autores PRIMARY KEY (id)
);

CREATE TABLE clientes (
    id    INTEGER      NOT NULL,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT pk_clientes PRIMARY KEY (id),
    CONSTRAINT uq_clientes_email UNIQUE (email)
);

CREATE TABLE livros (
    id                    INTEGER      NOT NULL,
    titulo                VARCHAR(100) NOT NULL,
    quantidade_disponivel INTEGER      NOT NULL DEFAULT 0,
    autor_id              INTEGER      NOT NULL,
    CONSTRAINT pk_livros PRIMARY KEY (id),
    CONSTRAINT fk_livros_autor FOREIGN KEY (autor_id) REFERENCES autores (id),
    CONSTRAINT ck_livros_quantidade CHECK (quantidade_disponivel >= 0)
);

CREATE TABLE emprestimos (
    id              INTEGER NOT NULL,
    livro_id        INTEGER NOT NULL,
    cliente_id      INTEGER NOT NULL,
    data_emprestimo DATE    NOT NULL,
    data_devolucao  DATE,
    CONSTRAINT pk_emprestimos PRIMARY KEY (id),
    CONSTRAINT fk_emprestimos_livro FOREIGN KEY (livro_id) REFERENCES livros (id),
    CONSTRAINT fk_emprestimos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id),
    CONSTRAINT ck_emprestimos_datas CHECK (
        data_devolucao IS NULL OR data_devolucao >= data_emprestimo
    )
);

-- DML (Manipulacao de dados)
-- ----------------------------------------------

-- Insert

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

INSERT INTO livros (id, titulo, quantidade_disponivel, autor_id) VALUES
    (1, 'Travessia',          2, 1),
    (2, 'Maria, Maria',       1, 1),
    (3, 'Sampa',              0, 2),
    (4, 'Aquele Abraço',      3, 3),
    (5, 'Andar com Fé',       2, 3),
    (6, 'Construção',         1, 4);

INSERT INTO emprestimos (id, livro_id, cliente_id, data_emprestimo, data_devolucao) VALUES
    (1, 1, 1, '2026-10-01', '2026-10-08'),
    (2, 3, 2, '2026-10-10', NULL),
    (3, 2, 3, '2026-10-12', NULL),
    (4, 1, 2, '2026-10-15', NULL),
    (5, 4, 1, '2026-10-05', '2026-10-12'),
    (6, 1, 4, '2026-09-20', '2026-09-27');

-- SELECT

SELECT * FROM autores ORDER BY id;
SELECT * FROM clientes ORDER BY id;
SELECT * FROM livros ORDER BY id;
SELECT * FROM emprestimos ORDER BY id;

-- UPDATE

-- Troca o email de um cliente
UPDATE clientes
SET email = 'diego.rocha@update.com'
WHERE id = 4;

-- Adiciona mais exemplares no estoque
UPDATE livros
SET quantidade_disponivel = 9
WHERE id = 4;

-- DELETE

-- Remover um cliente que não possui emprestimos
DELETE FROM clientes
WHERE id = 5;

-- Remocao que deve ser recusada, pois o livro possui emprestimos
-- DELETE FROM livros WHERE id = 1;