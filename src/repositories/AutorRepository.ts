import { Autor } from "../models/Autor";

export class AutorRepository {
  private autores: Map<number, Autor> = new Map();

  async inserir(autor: Autor): Promise<Autor> {
    this.autores.set(autor.id, autor);
    return autor;
  }

  async remover(id: number): Promise<boolean> {
    return this.autores.delete(id);
  }

  async listarTodos(): Promise<Autor[]> {
    return Array.from(this.autores.values());
  }

}