import { Livro } from "../models/Livro";

export class LivroRepository {
  private livros: Map<number, Livro> = new Map();

  async inserir(livro: Livro): Promise<Livro> {
    this.livros.set(livro.id, livro);
    return livro;
  }

  async listarTodos(): Promise<Livro[]> {
    return Array.from(this.livros.values());
  }

  async remover(id: number): Promise<boolean> {
    return this.livros.delete(id);
  }

  async buscarPorId(id: number): Promise<Livro | undefined> {
    return this.livros.get(id);
  }

  // Retorna uma lista de livros para dado Autor Id
  async listarPorAutor(autorId: number): Promise<Livro[]> {
    return Array.from(this.livros.values()).filter(
      (livro) => livro.autorId === autorId,
    );
  }

  async atualizar(livro: Livro): Promise<boolean> {
    if (!this.livros.has(livro.id)) {
      return false;
    }
    this.livros.set(livro.id, livro);
    return true;
  }

  async gerarProximoId(): Promise<number> {
    const ids = Array.from(this.livros.keys());
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}