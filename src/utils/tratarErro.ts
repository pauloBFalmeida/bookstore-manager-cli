import { ErroDeNegocio } from "./ErroDeNegocio";

export function tratarErro(erro: unknown): void {
  if (erro instanceof ErroDeNegocio) {
    console.log(`\nAviso: ${erro.message}`);
  } else {
    console.log("\nOcorreu um erro inesperado. Tente novamente.");
  }
}