import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { ErroDeNegocio } from "../utils/ErroDeNegocio";
import { validarTextoObrigatorio } from "../utils/validacoes";
import { AutorService } from "./AutorService";

export class LivroService {
  constructor(
    private readonly livroRepository: LivroRepository,
    private readonly autorService: AutorService,
  ) {}

  async cadastrar(titulo: string,
                  quantidadeDisponivel: number,
                  autorId: number,
                ): Promise<Livro> {
    const tituloValido = validarTextoObrigatorio(titulo, "título do livro");
    this.validarQuantidade(quantidadeDisponivel);
    await this.autorService.buscarPorId(autorId);

    const id = await this.livroRepository.gerarProximoId();
    const livro = new Livro(id, tituloValido, quantidadeDisponivel, autorId);
    return this.livroRepository.inserir(livro);
  }

  async listar(): Promise<Livro[]> {
    return this.livroRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new ErroDeNegocio(`Livro com id ${id} não encontrado.`);
    }
    return livro;
  }

  async atualizar(id: number,
                  novoTitulo: string,
                  novaQuantidade: number,
                ): Promise<Livro> {
    const livro = await this.buscarPorId(id);
    livro.titulo = validarTextoObrigatorio(novoTitulo, "título do livro");
    this.validarQuantidade(novaQuantidade);
    livro.quantidadeDisponivel = novaQuantidade;
    await this.livroRepository.atualizar(livro);
    return livro;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.livroRepository.remover(id);
  }

  async reduzirDisponivel(id: number): Promise<void> {
    const livro = await this.buscarPorId(id);
    // se nao tiver disponivel
    if (livro.quantidadeDisponivel <= 0) {
      throw new ErroDeNegocio(
        `O livro "${livro.titulo}" não esta disponível.`,
      );
    }
    // se estiver disponivel, retire 1 da quantidade
    livro.quantidadeDisponivel -= 1;
    await this.livroRepository.atualizar(livro);
  }

  async aumentarDisponivel(id: number): Promise<void> {
    const livro = await this.buscarPorId(id);
    livro.quantidadeDisponivel += 1;
    await this.livroRepository.atualizar(livro);
  }

  private validarQuantidade(quantidade: number): void {
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new ErroDeNegocio(
        "A quantidade disponível deve ser um número inteiro >= 0.",
      );
    }
  }
}