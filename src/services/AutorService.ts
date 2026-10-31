import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
  constructor(private readonly autorRepository: AutorRepository) {}

  async cadastrar(nome: string): Promise<Autor> {
    const id = 1;
    const autor = new Autor(id, nome);
    return this.autorRepository.inserir(autor);
  }

  async listar(): Promise<Autor[]> {
    return this.autorRepository.listarTodos();
  }

}