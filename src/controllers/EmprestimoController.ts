import { EmprestimoDetalhado } from "../models/Emprestimo";
import { EmprestimoService } from "../services/EmprestimoService";
import { perguntarNumero } from "../utils/entrada";
import { formatarData } from "../utils/formatacao";
import { tratarErro } from "../utils/tratarErro";

export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  async realizar(): Promise<void> {
    try {
      const livroId = await perguntarNumero("Id do livro: ");
      const clienteId = await perguntarNumero("Id do cliente: ");
      const emprestimo = await this.emprestimoService.realizar(livroId, clienteId);
      console.log(`\nEmpréstimo registrado com sucesso! (id ${emprestimo.id})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async devolver(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do empréstimo a devolver: ");
      await this.emprestimoService.devolver(id);
      console.log("\nDevolução registrada com sucesso!");
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async listar(): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.listar();
      if (emprestimos.length === 0) {
        console.log("\nNenhum empréstimo registrado.");
        return;
      }
      console.log("\n--- Empréstimos ---");
      emprestimos.forEach((emprestimo) => this.exibirEmprestimo(emprestimo));
    } catch (erro) {
      tratarErro(erro);
    }
  }

  private exibirEmprestimo(emprestimo: EmprestimoDetalhado): void {
    const situacao = emprestimo.dataDevolucao
      ? `Devolvido em ${formatarData(emprestimo.dataDevolucao)}`
      : "Ativo";

    console.log(
      `${emprestimo.id} - Livro: ${emprestimo.tituloLivro} | Cliente: ${emprestimo.nomeCliente} | ` +
        `Emprestado em ${formatarData(emprestimo.dataEmprestimo)} | ${situacao}`,
    );
  }
}