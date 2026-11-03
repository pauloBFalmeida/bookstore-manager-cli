import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { ErroDeNegocio } from "./ErroDeNegocio";

const interfaceLeitura = createInterface({ input, output });

export async function perguntar(texto: string): Promise<string> {
  return interfaceLeitura.question(texto);
}

export async function perguntarNumero(texto: string): Promise<number> {
  const resposta = (await perguntar(texto)).trim();
  const numero = Number(resposta);
  if (resposta === "" || !Number.isInteger(numero)) {
    throw new ErroDeNegocio("Digite um número inteiro válido.");
  }
  return numero;
}

export function encerrarEntrada(): void {
  interfaceLeitura.close();
}