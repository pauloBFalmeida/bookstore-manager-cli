import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { ErroDeNegocio } from "../utils/ErroDeNegocio";
import { validarTextoObrigatorio } from "../utils/validacoes";
import { LivroRepository } from "../repositories/LivroRepository";

export class AutorService {
    constructor(
        private readonly autorRepository: AutorRepository,
        private readonly livroRepository: LivroRepository,
    ) {}

  async cadastrar(nome: string): Promise<Autor> {
    const nomeValido = validarTextoObrigatorio(nome, "nome do autor");
    const id = await this.autorRepository.gerarProximoId();
    const autor = new Autor(id, nomeValido);
    return this.autorRepository.inserir(autor);
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    // verifica se o autor possui livros cadastrados a ele, entao nao remove se for o caso
    const livros = await this.livroRepository.listarPorAutor(id);
    if (livros.length > 0) {
      throw new ErroDeNegocio(
        `Não é possível remover o autor: ele possui ${livros.length} livros cadastrados.`,
      );
    }
    
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