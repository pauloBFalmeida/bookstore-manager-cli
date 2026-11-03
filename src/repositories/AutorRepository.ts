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
  
  async buscarPorId(id: number): Promise<Autor | undefined> {
    return this.autores.get(id);
  }

  async atualizar(autor: Autor): Promise<boolean> {
    // se nao estiver presente
    if (!this.autores.has(autor.id)) {
      return false;
    }
    // se estiver presente, atualiza os dados do autor
    this.autores.set(autor.id, autor);
    return true;
  }

  // Gera o proximo id pro autor de forma sequencial
  async gerarProximoId(): Promise<number> {
    const ids = Array.from(this.autores.keys());
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }

}