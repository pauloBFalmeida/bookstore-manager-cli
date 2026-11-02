# BookStore Manager CLI

Aplicação de linha de comando para gerenciar o acervo e os empréstimos de uma biblioteca criado para o Projeto Avaliativo do curso de Back-end Node.

Desenvolvida em **Node.js** e **TypeScript**, com banco de dados relacional em **PostgreSQL**.

# Descrição

**BookStore Manager CLI** é uma aplicação que permite cadastrar autores, livros, clientes e controlar os empréstimos e devoluções do acervo, através de menus interativos no terminal de comando.

O projeto é dividido em duas partes:

1. **Aplicação em TypeScript:** armazena os dados em memória (nos repositories). Os dados são carregados no início a partir de `src/data/seed.ts`. A aplicação não guarda novos dados apos ser encerrada.
2. **Banco de dados:** o arquivo `database/script.sql` e o DER descrevem o modelo relacional em PostgreSQL. A aplicação não se conecta ao banco, porém o `src/data/seed.ts` possui os mesmos dados de exemplo que o `database/script.sql`.

Para a criação do exemplo com autores, livros, clientes e empréstimos, foram usadas músicas MPB, em que cada **autor** é um cantor, e cada **livro** é uma **música**. Apenas para diversificar os exemplos, porém os nomes das tabelas e das classes continuam sendo `autores`, `livros`, `clientes` e `emprestimos`. 

## Objetivo

Praticar a criação e design de um sistema.

- programação orientada a objetos com TypeScript.
- organização de código em camadas (controllers, services, repositories).
- programação assíncrona com `async`/`await` e `Promise`.
- tratamento de erros para não quebrar o sistema.
- modelagem e consulta de dados relacionais com SQL.
- commits padronizados e utilização do Git.


## Tecnologias utilizadas

| Tecnologia | Uso |
| :---- | :---- |
| Node.js | Ambiente de execução da aplicação |
| TypeScript | Linguagem de programação |
| PostgreSQL | Banco de dados |
| draw.io | Elaboração do diagrama |
| GitHub | Versionamento do código |


## Requisitos para execução

- **Node.js** 18 e **npm**
- **PostgreSQL** 12 ou superior - para executar o `script.sql`
- **Código** desse repositório


## Execução do script SQL no PostgreSQL

O arquivo `database/script.sql` cria o banco de dados relacional. Primeiro começa com a criação das tabelas (DDL). Em sequência (DML) insere os dados de exemplo e executa atualizações, remoções e depois consultas relacionais.

Ele pode ser executado várias vezes, pois no início as tabelas anteriores são deletadas, para poderem ser recriadas a cada execução.

**1. Criar o banco de dados**

Em Linux (com PostgreSQL):

```bash
sudo -u postgres createdb bookstore
```

**2. Executar o script**

```bash
sudo -u postgres psql -d bookstore < database/script.sql
```

Devem aparecer os livros cadastrados. Na saída da execução completa também aparecem os resultados das consultas relacionais.


## DER do banco de dados

![DER do banco de dados](database/DER.png)

| Tabela | Campos |
| :---- | :---- |
| `autores` | `id` (PK), `nome` |
| `clientes` | `id` (PK), `nome`, `email` (único) |
| `livros` | `id` (PK), `titulo`, `quantidade_disponivel` (>= 0), `autor_id` (FK) |
| `emprestimos` | `id` (PK), `livro_id` (FK), `cliente_id` (FK), `data_emprestimo`, `data_devolucao` (null enquanto o empréstimo está ativo) |

Relacionamentos:

- 1 **autor** possui N **livros** (1:N).
- 1 **livro** está em N **empréstimos** (1:N).
- 1 **cliente** pode fazer N **empréstimos** (1:N).


# Instalação

```bash
git clone https://github.com/SEU_USUARIO/bookstore-manager-cli.git
cd bookstore-manager-cli
npm install
```

O `npm install` baixa as dependências listadas no `package.json` e cria a pasta `node_modules/`.

## Execução da aplicação

**Modo desenvolvimento** (executa o TypeScript diretamente):

```bash
npm run dev
```

**Modo produção** (compila para JavaScript e executa o resultado):

```bash
npm run build
npm start
```

| Script | Descrição |
| :---- | :---- |
| `npm run dev` | Executa `src/main.ts` com o `tsx` |
| `npm run build` | Compila o projeto com `tsc` para a pasta `dist/` |
| `npm start` | Executa a versão compilada (`dist/main.js`) |

Ao iniciar, a aplicação carrega os dados iniciais (do `src/data/seed.ts`) e exibe o menu principal. 

Para encerrar, só escolher a opção `0` (Encerrar aplicação).


## Arquitetura do projeto

O código é organizado em camadas, cada uma com uma responsabilidade:

```
Usuário (no terminal) -> menus -> controllers -> services -> repositories -> Dados em memória

data/seed.ts (dados iniciais) -> repositories 
```

| Camada | Responsabilidade |
| :---- | :---- |
| `menus/` | Exibe os menus e realiza a navegação e interação |
| `controllers/` | Recebe as entradas do usuário, chama os services e exibe os resultados e mensagens |
| `services/` | Regras de negócio e validações |
| `repositories/` | Armazenamento e recuperação dos dados em memória (`Map`), com métodos assíncronos |
| `models/` | Classes e interfaces das entidades (`Autor`, `Livro`, `Cliente`, `Emprestimo`) |
| `utils/` | Funções auxiliares: leitura do terminal, validações, formatação de datas e tratamento de erros |
| `data/` | Dados iniciais (`seed.ts`) |

Decisões de projeto:

- **Dependências na Main:** os repositories e services são criados na `main.ts` e passados para quem precisa deles, de modo que todos compartilham as mesmas instâncias.
- **Coleções privadas:** só o repository acessa os dados em memória, as outras camadas acessam o dados através dos métodos.
- **Erros de regra de negócio:** os services lançam `ErroDeNegocio`. Os controllers capturam o erro e exibem uma mensagem clara, sem interromper a aplicação.
- **Sem duplicação:** validações reutilizáveis (texto obrigatório, email válido) ficam em `utils/validacoes.ts`.

## Funcionalidades implementadas

**Autores**
- Cadastrar, listar, consultar por id, atualizar e remover.

**Livros**
- Cadastrar (vinculado a um autor existente), listar (com o nome do autor e a quantidade disponível), consultar por id, atualizar e remover.

**Clientes**
- Cadastrar, listar, consultar por id, atualizar e remover, com email único e validado.

**Empréstimos**
- Registrar empréstimo (diminui a quantidade disponível do livro).
- Registrar devolução (aumenta a quantidade disponível e registra a data).
- Listar empréstimos com livro, cliente, data do empréstimo e situação (ativo ou devolvido).

**Regras de negócio e validações**

| Situação | Comportamento |
| :---- | :---- |
| Nome, título ou e-mail vazio | Recusado |
| E-mail com formato inválido | Recusado |
| E-mail já cadastrado para outro cliente | Recusado |
| Quantidade negativa ou não inteira | Recusada |
| Cadastro de livro com autor inexistente | Recusado |
| Operação com autor, livro, cliente ou empréstimo inexistente | Recusada, com mensagem informando o id |
| Empréstimo de livro sem exemplares disponíveis | Recusado |
| Devolução de empréstimo já devolvido | Recusada |
| Remoção de autor que possui livros | Recusada |
| Remoção de livro ou cliente que possui empréstimos registrados (ativos ou devolvidos) | Recusada, para preservar o histórico |
| Entrada não numérica onde se espera um id | Recusada, e o menu continua funcionando |

**Banco de dados (PostgreSQL)**
- Com chaves primárias e estrangeiras e restrições `NOT NULL`, `UNIQUE` e `CHECK`.
- Dados de exemplo, atualização e remoção de registros.
- Consultas relacionais.

