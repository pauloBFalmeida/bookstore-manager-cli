export interface ICliente {
  id: number;
  nome: string;
  email: string;
}

export class Cliente implements ICliente {
  constructor(
    public readonly id: number,
    public nome: string,
    public email: string,
  ) {}
}