import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
  private emprestimos: Map<number, Emprestimo> = new Map();

  async inserir(emprestimo: Emprestimo): Promise<Emprestimo> {
    this.emprestimos.set(emprestimo.id, emprestimo);
    return emprestimo;
  }

  async listarTodos(): Promise<Emprestimo[]> {
    return Array.from(this.emprestimos.values());
  }

  async buscarPorId(id: number): Promise<Emprestimo | undefined> {
    return this.emprestimos.get(id);
  }

  async listarPorLivro(livroId: number): Promise<Emprestimo[]> {
    return Array.from(this.emprestimos.values()).filter(
      (emprestimo) => emprestimo.livroId === livroId,
    );
  }

  async listarPorCliente(clienteId: number): Promise<Emprestimo[]> {
    return Array.from(this.emprestimos.values()).filter(
      (emprestimo) => emprestimo.clienteId === clienteId,
    );
  }

  async atualizar(emprestimo: Emprestimo): Promise<boolean> {
    if (!this.emprestimos.has(emprestimo.id)) {
      return false;
    }
    this.emprestimos.set(emprestimo.id, emprestimo);
    return true;
  }

  async gerarProximoId(): Promise<number> {
    const ids = Array.from(this.emprestimos.keys());
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}