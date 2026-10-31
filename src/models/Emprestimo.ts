export interface IEmprestimo {
  id: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo: Date;
  dataDevolucao: Date | null;
}

export class Emprestimo implements IEmprestimo {
  constructor(
    public readonly id: number,
    public readonly livroId: number,
    public readonly clienteId: number,
    public readonly dataEmprestimo: Date,
    public dataDevolucao: Date | null = null,
  ) {}

  get ativo(): boolean {
    return this.dataDevolucao === null;
  }
}

export interface EmprestimoDetalhado {
  id: number;
  tituloLivro: string;
  nomeCliente: string;
  dataEmprestimo: Date;
  dataDevolucao: Date | null;
}