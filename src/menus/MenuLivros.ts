import { LivroController } from "../controllers/LivroController";
import { perguntar } from "../utils/entrada";

export class MenuLivros {
  constructor(private readonly livroController: LivroController) {}

  async exibir(): Promise<void> {
    let voltar = false;

    while (!voltar) {
      console.log("\n--- Livros ---");
      console.log("1 - Cadastrar livro");
      console.log("2 - Listar livros");
      console.log("3 - Consultar livro por id");
      console.log("4 - Atualizar livro");
      console.log("5 - Remover livro");
      console.log("0 - Voltar");

      const opcao = (await perguntar("Escolha uma opção: ")).trim();

      switch (opcao) {
        case "1":
          await this.livroController.cadastrar();
          break;
        case "2":
          await this.livroController.listar();
          break;
        case "3":
          await this.livroController.consultar();
          break;
        case "4":
          await this.livroController.atualizar();
          break;
        case "5":
          await this.livroController.remover();
          break;
        case "0":
          voltar = true;
          break;
        default:
          console.log("\nOpção inválida.");
      }
    }
  }
}