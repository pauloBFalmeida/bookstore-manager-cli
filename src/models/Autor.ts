export interface IAutor {
  id: number;
  nome: string;
}

export class Autor implements IAutor {
  constructor(
    public readonly id: number,
    public nome: string,
  ) {}
}