import { Livro } from "../models/Livro";
import { AutorService } from "../services/AutorService";
import { LivroService } from "../services/LivroService";
import { perguntar, perguntarNumero } from "../utils/entrada";
import { tratarErro } from "../utils/tratarErro";

export class LivroController {
  constructor(
    private readonly livroService: LivroService,
    private readonly autorService: AutorService,
  ) {}

  async cadastrar(): Promise<void> {
    try {
      const titulo = await perguntar("Título do livro: ");
      const quantidade = await perguntarNumero("Quantidade disponível: ");
      const autorId = await perguntarNumero("Id do autor: ");
      const livro = await this.livroService.cadastrar(titulo, quantidade, autorId);
      console.log(`\nLivro cadastrado com sucesso! (id ${livro.id})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do livro a remover: ");
      await this.livroService.remover(id);
      console.log("\nLivro removido com sucesso!");
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listar();
      if (livros.length === 0) {
        console.log("\nNenhum livro cadastrado.");
        return;
      }
      console.log("\n--- Livros ---");
      for (const livro of livros) {
        await this.exibirLivro(livro);
      }
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async consultar(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do livro: ");
      const livro = await this.livroService.buscarPorId(id);
      console.log("\n--- Livro encontrado ---");
      await this.exibirLivro(livro);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do livro a atualizar: ");
      const livroAtual = await this.livroService.buscarPorId(id);
      const novoTitulo = await perguntar(`Novo título (atual: ${livroAtual.titulo}): `);
      const novaQuantidade = await perguntarNumero(
        `Nova quantidade disponível (atual: ${livroAtual.quantidadeDisponivel}): `,
      );
      const livro = await this.livroService.atualizar(id, novoTitulo, novaQuantidade);
      console.log(`\nLivro atualizado com sucesso! (${livro.id} - ${livro.titulo})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  private async exibirLivro(livro: Livro): Promise<void> {
    const autor = await this.autorService.buscarPorId(livro.autorId);
    console.log(
      `${livro.id} - ${livro.titulo} | Autor: ${autor.nome} | Disponíveis: ${livro.quantidadeDisponivel}`,
    );
  }
}