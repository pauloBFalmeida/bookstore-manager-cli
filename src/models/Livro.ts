export interface ILivro {
  id: number;
  titulo: string;
  quantidadeDisponivel: number;
  autorId: number;
}

export class Livro implements ILivro {
  constructor(
    public readonly id: number,
    public titulo: string,
    public quantidadeDisponivel: number,
    public readonly autorId: number,
  ) {}
}