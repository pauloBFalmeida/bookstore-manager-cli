import { Emprestimo, EmprestimoDetalhado } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { ErroDeNegocio } from "../utils/ErroDeNegocio";
import { ClienteService } from "./ClienteService";
import { LivroService } from "./LivroService";

export class EmprestimoService {
  constructor(
    private readonly emprestimoRepository: EmprestimoRepository,
    private readonly livroService: LivroService,
    private readonly clienteService: ClienteService,
  ) {}

  async realizar(livroId: number, clienteId: number): Promise<Emprestimo> {
    await this.livroService.buscarPorId(livroId);
    await this.clienteService.buscarPorId(clienteId);
    await this.livroService.reduzirDisponivel(livroId);

    const id = await this.emprestimoRepository.gerarProximoId();
    const emprestimo = new Emprestimo(id, livroId, clienteId, new Date());
    return this.emprestimoRepository.inserir(emprestimo);
  }

  async devolver(id: number): Promise<Emprestimo> {
    const emprestimo = await this.buscarPorId(id);
    if (!emprestimo.ativo) {
      throw new ErroDeNegocio(`O empréstimo ${id} já foi devolvido.`);
    }

    emprestimo.dataDevolucao = new Date();
    await this.emprestimoRepository.atualizar(emprestimo);
    await this.livroService.aumentarDisponivel(emprestimo.livroId);
    return emprestimo;
  }

  async buscarPorId(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new ErroDeNegocio(`Empréstimo id ${id} não encontrado.`);
    }
    return emprestimo;
  }

  // Lista os emprestimos de forma detalhada
  async listar(): Promise<EmprestimoDetalhado[]> {
    const emprestimos = await this.emprestimoRepository.listarTodos();
    const detalhados: EmprestimoDetalhado[] = [];

    for (const emprestimo of emprestimos) {
      const livro = await this.livroService.buscarPorId(emprestimo.livroId);
      const cliente = await this.clienteService.buscarPorId(emprestimo.clienteId);
      detalhados.push({
        id: emprestimo.id,
        tituloLivro: livro.titulo,
        nomeCliente: cliente.nome,
        dataEmprestimo: emprestimo.dataEmprestimo,
        dataDevolucao: emprestimo.dataDevolucao,
      });
    }

    return detalhados;
  }
}