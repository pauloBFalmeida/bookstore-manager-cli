import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { ErroDeNegocio } from "../utils/ErroDeNegocio";
import { validarEmail, validarTextoObrigatorio } from "../utils/validacoes";

export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async cadastrar(nome: string, email: string): Promise<Cliente> {
    const nomeValido = validarTextoObrigatorio(nome, "nome do cliente");
    const emailValido = validarEmail(email);
    await this.garantirEmailDisponivel(emailValido);

    const id = await this.clienteRepository.gerarProximoId();
    const cliente = new Cliente(id, nomeValido, emailValido);
    return this.clienteRepository.inserir(cliente);
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.clienteRepository.remover(id);
  }

  async listar(): Promise<Cliente[]> {
    return this.clienteRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new ErroDeNegocio(`Cliente com id ${id} não encontrado.`);
    }
    return cliente;
  }

  async atualizar(id: number, novoNome: string, novoEmail: string): Promise<Cliente> {
    const cliente = await this.buscarPorId(id);
    const nomeValido = validarTextoObrigatorio(novoNome, "nome do cliente");
    const emailValido = validarEmail(novoEmail);
    await this.garantirEmailDisponivel(emailValido, id);

    cliente.nome = nomeValido;
    cliente.email = emailValido;
    await this.clienteRepository.atualizar(cliente);
    return cliente;
  }

  private async garantirEmailDisponivel(email: string, idIgnorado?: number): Promise<void> {
    const existente = await this.clienteRepository.buscarPorEmail(email);
    if (existente && existente.id !== idIgnorado) {
      throw new ErroDeNegocio(`Já existe um cliente cadastrado com o e-mail ${email}.`);
    }
  }
}