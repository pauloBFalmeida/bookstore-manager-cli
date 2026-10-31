import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { ErroDeNegocio } from "../utils/ErroDeNegocio";
import { validarTextoObrigatorio } from "../utils/validacoes";

export class AutorService {
  constructor(private readonly autorRepository: AutorRepository) {}

  async cadastrar(nome: string): Promise<Autor> {
    const nomeValido = validarTextoObrigatorio(nome, "nome do autor");
    const id = await this.autorRepository.gerarProximoId();
    const autor = new Autor(id, nomeValido);
    return this.autorRepository.inserir(autor);
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.autorRepository.remover(id);
  }

  async listar(): Promise<Autor[]> {
    return this.autorRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) {
      throw new ErroDeNegocio(`Autor com id ${id} não encontrado.`);
    }
    return autor;
  }

  async atualizar(id: number, novoNome: string): Promise<Autor> {
    const autor = await this.buscarPorId(id);
    autor.nome = validarTextoObrigatorio(novoNome, "nome do autor");
    await this.autorRepository.atualizar(autor);
    return autor;
  }
}