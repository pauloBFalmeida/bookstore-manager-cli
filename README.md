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
git clone https://github.com/pauloBFalmeida/bookstore-manager-cli.git
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

Para encerrar, quando estiver no menu principal (`=== BookStore Manager CLI ===`) só escolher a opção `0` (`0 - Encerrar aplicação`).


# Arquitetura do projeto

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


## Estrutura de pastas

### Raiz do projeto

| Pasta / arquivo | Descrição |
| :---- | :---- |
| `database/` | Projeto do banco de dados: imagem do DER e `script.sql` (estrutura, dados de exemplo, consultas em PostgreSQL) |
| `src/` | Código-fonte da aplicação em TypeScript |
| `.gitignore` | Lista do que o Git deve ignorar, como `node_modules/` e `dist/` |
| `package.json` | Dependências do projeto e scripts (`dev`, `build`, `start`) |
| `package-lock.json` | Versões exatas das dependências instaladas |
| `tsconfig.json` | Configuração do compilador TypeScript |
| `README.md` | Documentação do projeto |

### Dentro de `src/`

| Pasta / arquivo | Descrição | Arquivos |
| :---- | :---- | :---- |
| `main.ts` | **Ponto de entrada**, cria os repositories, services, controllers e menus, carrega os dados iniciais e abre o menu principal | `main.ts` |
| `controllers/` | Camada de apresentação: recebem as entradas do usuário, chamam os services e exibem resultados e mensagens | `AutorController.ts`, `ClienteController.ts`, `EmprestimoController.ts`, `LivroController.ts` |
| `services/` | Regras de negócio e validações (autor existe, livro disponível, e-mail único etc.) | `AutorService.ts`, `ClienteService.ts`, `EmprestimoService.ts`, `LivroService.ts` |
| `repositories/` | Acesso aos dados: guardam e recuperam as informações em memória | `AutorRepository.ts`, `ClienteRepository.ts`, `EmprestimoRepository.ts`, `LivroRepository.ts` |
| `models/` | Classes e interfaces que representam as entidades do sistema | `Autor.ts`, `Cliente.ts`, `Emprestimo.ts`, `Livro.ts` |
| `menus/` | Exibição dos menus e navegação entre as opções no terminal | `MenuAutores.ts`, `MenuClientes.ts`, `MenuEmprestimos.ts`, `MenuLivros.ts`, `MenuPrincipal.ts` |
| `utils/` | Funções auxiliares reutilizadas pelas outras camadas: leitura do terminal, validações, formatação de datas e tratamento de erros | `ErroDeNegocio.ts`, `entrada.ts`, `formatacao.ts`, `tratarErro.ts`, `validacoes.ts` |
| `data/` | Dados iniciais carregados ao iniciar a aplicação, iguais aos `INSERT` do `script.sql` | `seed.ts` |


## Versionamento

Uma branch por funcionalidade, integradas à `develop` e, ao final na `main`:

| Branch | Conteúdo |
| :---- | :---- |
| `main` | Versão estável |
| `develop` | Integração das funcionalidades |
| `feat/autores` | Módulo de autores |
| `feat/livros` | Módulo de livros |
| `feat/clientes` | Módulo de clientes |
| `feat/emprestimos` | Módulo de empréstimos |
| `feat/banco-dados` | `script.sql`, DER e dados iniciais |
| `docs/readme` | Documentação |



# Exemplos de utilização

### Cadastrar Livro

**Menu principal:**
```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
```
Input: `1`
(Autores)

**Menu Autores:**
```
-=- Autores -=-
1 - Cadastrar autor
2 - Listar autores
3 - Consultar autor por id
4 - Atualizar autor
5 - Remover autor
0 - Voltar
Escolha uma opção:
```
Input: `2`
(Listar autores)

**Lista Autores:**
```
--- Autores ---
1 - Milton Nascimento
2 - Caetano Veloso
3 - Gilberto Gil
4 - Chico Buarque
5 - Elis Regina

-=- Autores -=-
1 - Cadastrar autor
2 - Listar autores
3 - Consultar autor por id
4 - Atualizar autor
5 - Remover autor
0 - Voltar
Escolha uma opção: 
```

Input: `0`
(Voltar ao menu principal)

**Menu principal:**
```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
```
Input: `2`
(Livros)

**Menu Livros:**
```
-=- Livros -=-
1 - Cadastrar livro
2 - Listar livros
3 - Consultar livro por id
4 - Atualizar livro
5 - Remover livro
0 - Voltar
Escolha uma opção:
```
Input: `2`
(Listar livros)

**Listar Livros:**
```
--- Livros ---
1 - Travessia | Autor: Milton Nascimento | Disponíveis: 2
2 - Maria, Maria | Autor: Milton Nascimento | Disponíveis: 1
3 - Sampa | Autor: Caetano Veloso | Disponíveis: 0
4 - Aquele Abraço | Autor: Gilberto Gil | Disponíveis: 3
5 - Andar com Fé | Autor: Gilberto Gil | Disponíveis: 2
6 - Construção | Autor: Chico Buarque | Disponíveis: 1

-=- Livros -=-
1 - Cadastrar livro
2 - Listar livros
3 - Consultar livro por id
4 - Atualizar livro
5 - Remover livro
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Cadastrar livro)

**Cadastrar Livro:**
```
Título do livro:
```
Input: `Bailes da Vida`

```
Quantidade disponível:
```
Input: `2`
(2 Livros)

```
Id do autor:
```
Input: `1`
(Milton Nascimento)
 
```
Livro cadastrado com sucesso! (id 7)

-=- Livros -=-
1 - Cadastrar livro
2 - Listar livros
3 - Consultar livro por id
4 - Atualizar livro
5 - Remover livro
0 - Voltar
Escolha uma opção:
```
Input: `2`
(Listar livros)

**Listar Livros: Adicionado 7 - Bailes da Vida**

```
--- Livros ---
1 - Travessia | Autor: Milton Nascimento | Disponíveis: 2
2 - Maria, Maria | Autor: Milton Nascimento | Disponíveis: 1
3 - Sampa | Autor: Caetano Veloso | Disponíveis: 0
4 - Aquele Abraço | Autor: Gilberto Gil | Disponíveis: 3
5 - Andar com Fé | Autor: Gilberto Gil | Disponíveis: 2
6 - Construção | Autor: Chico Buarque | Disponíveis: 1
7 - Bailes da Vida | Autor: Milton Nascimento | Disponíveis: 2
```

---
### Cadastrar Cliente

**Menu Principal:**
```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
```
Input: `3`
(menu Clientes)

**Menu Clientes:**
```
-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção:
``` 
Input: `2`
(Listar Clientes)

**Listar Clientes:**
```
--- Clientes ---
1 - Ana Souza | ana.souza@email.com
2 - Bruno Lima | bruno.lima@email.com
3 - Carla Mendes | carla.mendes@email.com
4 - Diego Rocha | diego.rocha@email.com
5 - Elisa Martins | elisa.martins@email.com

-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção: 
```
Input: `1`
(Cadastrar cliente)

**Cadastrar Clientes:**
```
Nome do cliente:
``` 
Input: `Paulo`

```
E-mail do cliente: 
```
Input: `paulo@gmail.com`

```
Cliente cadastrado com sucesso! (id 6)

-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção: 
```
Input: `3`
(Consultar cliente por id)

**Consultar cliente por id:**
```
Id do cliente: 
```
Input: `6`
(Id 6 que acabou de ser cadastrado)

```
--- Cliente encontrado ---
6 - Paulo | paulo@gmail.com
```

---
### Cadastrar Empréstimo

**Menu Principal:**
```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
```
Input: `4`
(Menu Empréstimos)

**Menu Empréstimos:**
```
-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `3`
(Listar empréstimos)


**Lista Empréstimos:**
```
--- Empréstimos ---
1 - Livro: Travessia | Cliente: Ana Souza | Emprestado em 01/10/2026 | Devolvido em 08/10/2026
2 - Livro: Sampa | Cliente: Bruno Lima | Emprestado em 10/10/2026 | Ativo
3 - Livro: Maria, Maria | Cliente: Carla Mendes | Emprestado em 12/10/2026 | Ativo
4 - Livro: Travessia | Cliente: Bruno Lima | Emprestado em 15/10/2026 | Ativo
5 - Livro: Aquele Abraço | Cliente: Ana Souza | Emprestado em 05/10/2026 | Devolvido em 12/10/2026
6 - Livro: Travessia | Cliente: Diego Rocha | Emprestado em 20/09/2026 | Devolvido em 27/09/2026

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo:**
```
Id do livro: 
```
Input: `7`
(_Bailes da Vida_ criado anteriormente)

```
Id do cliente: 
```
Input: `6`
(_Paulo_ cadastrado anteriormente)

```
Empréstimo registrado com sucesso! (id 7)

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
``` 
Input: `3`
(Listar empréstimos)


**Lista Empréstimos:**
```
--- Empréstimos ---
1 - Livro: Travessia | Cliente: Ana Souza | Emprestado em 01/10/2026 | Devolvido em 08/10/2026
2 - Livro: Sampa | Cliente: Bruno Lima | Emprestado em 10/10/2026 | Ativo
3 - Livro: Maria, Maria | Cliente: Carla Mendes | Emprestado em 12/10/2026 | Ativo
4 - Livro: Travessia | Cliente: Bruno Lima | Emprestado em 15/10/2026 | Ativo
5 - Livro: Aquele Abraço | Cliente: Ana Souza | Emprestado em 05/10/2026 | Devolvido em 12/10/2026
6 - Livro: Travessia | Cliente: Diego Rocha | Emprestado em 20/09/2026 | Devolvido em 27/09/2026
7 - Livro: Bailes da Vida | Cliente: Paulo | Emprestado em 02/11/2026 | Ativo

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo de novo:**
```
Id do livro: 
```
Input: `7`
(_Bailes da Vida_ igual anterior)

```
Id do cliente: 
```
Input: `1`
(_Ana Souza_ outra cliente)

```
Empréstimo registrado com sucesso! (id 8)

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção: 
```
Input: `3`
(Listar empréstimos)


**Lista Empréstimos:**
```
--- Empréstimos ---
1 - Livro: Travessia | Cliente: Ana Souza | Emprestado em 01/10/2026 | Devolvido em 08/10/2026
2 - Livro: Sampa | Cliente: Bruno Lima | Emprestado em 10/10/2026 | Ativo
3 - Livro: Maria, Maria | Cliente: Carla Mendes | Emprestado em 12/10/2026 | Ativo
4 - Livro: Travessia | Cliente: Bruno Lima | Emprestado em 15/10/2026 | Ativo
5 - Livro: Aquele Abraço | Cliente: Ana Souza | Emprestado em 05/10/2026 | Devolvido em 12/10/2026
6 - Livro: Travessia | Cliente: Diego Rocha | Emprestado em 20/09/2026 | Devolvido em 27/09/2026
7 - Livro: Bailes da Vida | Cliente: Paulo | Emprestado em 02/11/2026 | Ativo
8 - Livro: Bailes da Vida | Cliente: Ana Souza | Emprestado em 02/11/2026 | Ativo

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo de novo:**
```
Id do livro: 
```
Input: `7`
(_Bailes da Vida_ igual anterior)

```
Id do cliente: 
```
Input: `6`
(_Paulo_ outra vez)

```
Aviso: O livro "Bailes da Vida" não esta disponível.

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `2`
(Registrar devolução)

**Realizar Devolução:**
```
Id do empréstimo a devolver:
```
Input: `7`
(id do primeiro emprestimo do paulo)

```
Devolução registrada com sucesso!

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `3`
(Listar empréstimos)


**Lista Empréstimos:**
```
--- Empréstimos ---
1 - Livro: Travessia | Cliente: Ana Souza | Emprestado em 01/10/2026 | Devolvido em 08/10/2026
2 - Livro: Sampa | Cliente: Bruno Lima | Emprestado em 10/10/2026 | Ativo
3 - Livro: Maria, Maria | Cliente: Carla Mendes | Emprestado em 12/10/2026 | Ativo
4 - Livro: Travessia | Cliente: Bruno Lima | Emprestado em 15/10/2026 | Ativo
5 - Livro: Aquele Abraço | Cliente: Ana Souza | Emprestado em 05/10/2026 | Devolvido em 12/10/2026
6 - Livro: Travessia | Cliente: Diego Rocha | Emprestado em 20/09/2026 | Devolvido em 27/09/2026
7 - Livro: Bailes da Vida | Cliente: Paulo | Emprestado em 02/11/2026 | Devolvido em 02/11/2026
8 - Livro: Bailes da Vida | Cliente: Ana Souza | Emprestado em 02/11/2026 | Ativo

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo de novo:**
```
Id do livro: 
```
Input: `7`
(_Bailes da Vida_ igual anterior)

```
Id do cliente: 
```
Input: `6`
(_Paulo_ outra vez)

```
Empréstimo registrado com sucesso! (id 9)

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção: 
```
Input: `3`
(Listar empréstimos)

**Lista Empréstimos:**
```
--- Empréstimos ---
1 - Livro: Travessia | Cliente: Ana Souza | Emprestado em 01/10/2026 | Devolvido em 08/10/2026
2 - Livro: Sampa | Cliente: Bruno Lima | Emprestado em 10/10/2026 | Ativo
3 - Livro: Maria, Maria | Cliente: Carla Mendes | Emprestado em 12/10/2026 | Ativo
4 - Livro: Travessia | Cliente: Bruno Lima | Emprestado em 15/10/2026 | Ativo
5 - Livro: Aquele Abraço | Cliente: Ana Souza | Emprestado em 05/10/2026 | Devolvido em 12/10/2026
6 - Livro: Travessia | Cliente: Diego Rocha | Emprestado em 20/09/2026 | Devolvido em 27/09/2026
7 - Livro: Bailes da Vida | Cliente: Paulo | Emprestado em 02/11/2026 | Devolvido em 02/11/2026
8 - Livro: Bailes da Vida | Cliente: Ana Souza | Emprestado em 02/11/2026 | Ativo
9 - Livro: Bailes da Vida | Cliente: Paulo | Emprestado em 02/11/2026 | Ativo
```

---
### Realizar um Erro durante o Empréstimo

**Menu Empréstimos:**
```
-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo:**
```
Id do livro: 
```
Input: `9`
(NÃO cadastrado)

```
Id do cliente: 
```
Input: `1`
(cadastrado)

```
Aviso: Livro com id 9 não encontrado.

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção:
``` 
Input: `1`
(Realizar empréstimo)

**Realizar Empréstimo:**
```
Id do livro: 
```
Input: `7`
(cadastrado)

```
Id do cliente: 
```
Input: `9`
(NÃO cadastrado)

```
Aviso: Cliente com id 9 não encontrado.

-=- Empréstimos -=-
1 - Realizar empréstimo
2 - Registrar devolução
3 - Listar empréstimos
0 - Voltar
Escolha uma opção: 
```

---
### Remover um Cliente

**Menu Principal:**
```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
``` 
Input: `3`
(Menu Clientes)

**Menu Clientes:**
```
-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção:
``` 
Input: `5`
(Remover cliente)

**Remover Cliente:**
``` 
Id do cliente a remover: 
``` 
Input: `6`
(id Paulo)

``` 
Aviso: Não é possível remover o cliente, ele possui 3 emprestimos.

-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção:
``` 
Input: `1`
(Cadastrar cliente)

**Cadastrar Cliente:**
``` 
Nome do cliente: 
``` 
Input: `Fogaca`

``` 
E-mail do cliente: 
``` 
Input: `fogaca.com`
(email invalido)

``` 
Aviso: O e-mail informado não é válido.

-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção:
```
Input: `1`
(Cadastrar cliente)

**Cadastrar Cliente:**
``` 
Nome do cliente: 
```
Input: `Fogaca`

``` 
E-mail do cliente:
```  
Input: `fogaca@email.com`
(email correto)

``` 
Cliente cadastrado com sucesso! (id 7)

-=- Clientes -=-
1 - Cadastrar cliente
2 - Listar clientes
3 - Consultar cliente por id
4 - Atualizar cliente
5 - Remover cliente
0 - Voltar
Escolha uma opção:
``` 
Input: `5`
(Remover cliente)

**Remover Cliente:**
``` 
Id do cliente a remover: 
``` 
Input: `7`
(id Fogaca)

``` 
Cliente removido com sucesso!
``` 

---
## Sair do Programa

```
=== BookStore Manager CLI ===
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
0 - Encerrar aplicação
Escolha uma opção:
``` 
Input: `0` (Encerrar)

```
Aplicação encerrada.
```

# Integrantes da equipe

- **Paulo Barbato Fogaça de Almeida** - desenvolvimento individual

## Vídeo Explicativo

Vídeo Explicativo: [Link do Drive com Vídeo](https://drive.google.com/drive/folders/1rBo29QbbndeQy6hfiCWZk2FRLXzAl_Cp)

## Kanban

Acompanhamento das tarefas no Kanban: [Link do Kanban](https://github.com/users/pauloBFalmeida/projects/2/views/1)
