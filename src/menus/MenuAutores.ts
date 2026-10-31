import { AutorController } from "../controllers/AutorController";
import { perguntar } from "../utils/entrada";

export class MenuAutores {
  constructor(private readonly autorController: AutorController) {}

  async exibir(): Promise<void> {
    let voltar = false;

    while (!voltar) {
      console.log("\n--- Autores ---");
      console.log("1 - Cadastrar autor");
      console.log("2 - Listar autores");
      console.log("3 - Consultar autor por id");
      console.log("4 - Atualizar autor");
      console.log("5 - Remover autor");
      console.log("0 - Voltar");

      const opcao = (await perguntar("Escolha uma opção: ")).trim();

      switch (opcao) {
        case "1":
          await this.autorController.cadastrar();
          break;
        case "2":
          await this.autorController.listar();
          break;
        case "3":
          await this.autorController.consultar();
          break;
        case "4":
          await this.autorController.atualizar();
          break;
        case "5":
          await this.autorController.remover();
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