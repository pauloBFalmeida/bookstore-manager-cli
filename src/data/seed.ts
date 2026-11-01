import { Autor } from "../models/Autor";
import { Livro } from "../models/Livro";
import { Cliente } from "../models/Cliente";
import { Emprestimo } from "../models/Emprestimo";

import { AutorRepository } from "../repositories/AutorRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

interface Repositorios {
  autorRepository: AutorRepository;
  livroRepository: LivroRepository;
  clienteRepository: ClienteRepository;
  emprestimoRepository: EmprestimoRepository;
}

// Os dados sao iguais no script.sql
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

  const livros = [
    new Livro(1, "Travessia", 2, 1),
    new Livro(2, "Maria, Maria", 1, 1),
    new Livro(3, "Sampa", 0, 2),
    new Livro(4, "Aquele Abraço", 3, 3),
    new Livro(5, "Andar com Fé", 2, 3),
    new Livro(6, "Construção", 1, 4),
  ];

  const clientes = [
    new Cliente(1, "Ana Souza", "ana.souza@email.com"),
    new Cliente(2, "Bruno Lima", "bruno.lima@email.com"),
    new Cliente(3, "Carla Mendes", "carla.mendes@email.com"),
    new Cliente(4, "Diego Rocha", "diego.rocha@email.com"),
    new Cliente(5, "Elisa Martins", "elisa.martins@email.com"),
  ];

  for (const autor of autores) {
    await repositorios.autorRepository.inserir(autor);
  }
  for (const livro of livros) {
    await repositorios.livroRepository.inserir(livro);
  }
  for (const cliente of clientes) {
    await repositorios.clienteRepository.inserir(cliente);
  }
}