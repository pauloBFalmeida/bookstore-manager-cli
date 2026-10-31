import { Cliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";
import { perguntar, perguntarNumero } from "../utils/entrada";
import { tratarErro } from "../utils/tratarErro";

export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  async cadastrar(): Promise<void> {
    try {
      const nome = await perguntar("Nome do cliente: ");
      const email = await perguntar("E-mail do cliente: ");
      const cliente = await this.clienteService.cadastrar(nome, email);
      console.log(`\nCliente cadastrado com sucesso! (id ${cliente.id})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do cliente a remover: ");
      await this.clienteService.remover(id);
      console.log("\nCliente removido com sucesso!");
    } catch (erro) {
      tratarErro(erro);
    }
  }
  
  async listar(): Promise<void> {
    try {
      const clientes = await this.clienteService.listar();
      if (clientes.length === 0) {
        console.log("\nNenhum cliente cadastrado.");
        return;
      }
      console.log("\n--- Clientes ---");
      clientes.forEach((cliente) => this.exibirCliente(cliente));
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async consultar(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do cliente: ");
      const cliente = await this.clienteService.buscarPorId(id);
      console.log("\n--- Cliente encontrado ---");
      this.exibirCliente(cliente);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do cliente a atualizar: ");
      const clienteAtual = await this.clienteService.buscarPorId(id);
      const novoNome = await perguntar(`Novo nome (atual: ${clienteAtual.nome}): `);
      const novoEmail = await perguntar(`Novo e-mail (atual: ${clienteAtual.email}): `);
      const cliente = await this.clienteService.atualizar(id, novoNome, novoEmail);
      console.log(`\nCliente atualizado com sucesso! (${cliente.id} - ${cliente.nome})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  private exibirCliente(cliente: Cliente): void {
    console.log(`${cliente.id} - ${cliente.nome} | ${cliente.email}`);
  }
}