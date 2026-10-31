import { ErroDeNegocio } from "./ErroDeNegocio";

export function validarTextoObrigatorio(valor: string, nomeCampo: string): string {
  const valorLimpo = valor.trim();
  if (valorLimpo === "") {
    throw new ErroDeNegocio(`O ${nomeCampo} não pode ser vazio.`);
  }
  return valorLimpo;
}