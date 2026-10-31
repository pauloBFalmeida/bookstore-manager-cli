import { ErroDeNegocio } from "./ErroDeNegocio";

// input.js de AngularJS 
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export function validarTextoObrigatorio(valor: string, nomeCampo: string): string {
  const valorLimpo = valor.trim();
  if (valorLimpo === "") {
    throw new ErroDeNegocio(`O ${nomeCampo} não pode ser vazio.`);
  }
  return valorLimpo;
}

export function validarEmail(email: string): string {
  const emailValido = validarTextoObrigatorio(email, "e-mail").toLowerCase();
  if (!EMAIL_REGEXP.test(emailValido)) {
    throw new ErroDeNegocio("O e-mail informado não é válido.");
  }
  return emailValido;
}