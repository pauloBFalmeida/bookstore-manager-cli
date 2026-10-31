import { Autor } from "../models/Autor";
import { AutorService } from "../services/AutorService";
import { perguntar, perguntarNumero } from "../utils/entrada";
import { tratarErro } from "../utils/tratarErro";

export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  async cadastrar(): Promise<void> {
    try {
      const nome = await perguntar("Nome do autor: ");
      const autor = await this.autorService.cadastrar(nome);
      console.log(`\nAutor cadastrado com sucesso! (id ${autor.id})`);
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = await perguntarNumero("Id do autor a remover: ");
      await this.autorService.remover(id);
      console.log("\nAutor removido com sucesso!");
    } catch (erro) {
      tratarErro(erro);
    }
  }

  async listar(): Promise<void> {
    try {
      const autores = await this.autorService.listar();
      if (autores.length === 0) {
        console.log("\nNenhum autor cadastrado.");
        return;
      }
      console.log("\n--- Autores ---");
      autores.forEach((autor) => console.log(autor));
    } catch (erro) {
      tratarErro(erro);
    }
  }

}