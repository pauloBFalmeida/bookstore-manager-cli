import { Cliente } from "../models/Cliente";

export class ClienteRepository {
  private clientes: Map<number, Cliente> = new Map();

  async inserir(cliente: Cliente): Promise<Cliente> {
    this.clientes.set(cliente.id, cliente);
    return cliente;
  }

  async remover(id: number): Promise<boolean> {
    return this.clientes.delete(id);
  }

  async listarTodos(): Promise<Cliente[]> {
    return Array.from(this.clientes.values());
  }

  async buscarPorId(id: number): Promise<Cliente | undefined> {
    return this.clientes.get(id);
  }

  async buscarPorEmail(email: string): Promise<Cliente | undefined> {
    // transforma todo texto em minusculo
    const emailBuscado = email.toLowerCase();
    // busca nos emails considerando minusculos 
    return Array.from(this.clientes.values()).find(
      (cliente) => cliente.email.toLowerCase() === emailBuscado,
    );
  }

  async atualizar(cliente: Cliente): Promise<boolean> {
    if (!this.clientes.has(cliente.id)) {
      return false;
    }
    this.clientes.set(cliente.id, cliente);
    return true;
  }

  async gerarProximoId(): Promise<number> {
    const ids = Array.from(this.clientes.keys());
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}