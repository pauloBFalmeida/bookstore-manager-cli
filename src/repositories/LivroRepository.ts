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
}