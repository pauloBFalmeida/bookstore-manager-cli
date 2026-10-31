import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

interface Repositorios {
  autorRepository: AutorRepository;
}

export async function carregarDadosIniciais(
  repositorios: Repositorios,
): Promise<void> {

  const autores = [
    new Autor(1, "Milton Nascimento"),
    new Autor(2, "Caetano Veloso"),
    new Autor(3, "Gilberto Gil"),
    new Autor(4, "Chico Buarque"),
    new Autor(5, "Elis Regina"),
  ];

  for (const autor of autores) {
    await repositorios.autorRepository.inserir(autor);
  }
}