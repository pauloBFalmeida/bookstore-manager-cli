import { perguntar } from "../utils/entrada";
import { MenuAutores } from "./MenuAutores";
import { MenuLivros } from "./MenuLivros";
import { MenuClientes } from "./MenuClientes";
import { MenuEmprestimos } from "./MenuEmprestimos";

export class MenuPrincipal {
    constructor(
        private readonly menuAutores: MenuAutores,
        private readonly menuLivros: MenuLivros,
        private readonly menuClientes: MenuClientes,
        private readonly menuEmprestimos: MenuEmprestimos,
    ) {}

  async executar(): Promise<void> {
    let encerrar = false;

    while (!encerrar) {
      console.log("\n--- BookStore Manager CLI ---");
      console.log("1 - Autores");
      console.log("2 - Livros");
      console.log("3 - Clientes");
      console.log("4 - Empréstimos");
      console.log("0 - Encerrar aplicação");

      const opcao = (await perguntar("Escolha uma opção: ")).trim();

      switch (opcao) {
        case "0":
          encerrar = true;
          break;
        case "1":
          await this.menuAutores.exibir();
          break;
        case "2":
          await this.menuLivros.exibir();
          break;
        case "3":
          await this.menuClientes.exibir();
          break;
        case "4":
          await this.menuEmprestimos.exibir();
          break;
        default:
          console.log("\nOpção inválida.");
      }
    }

    console.log("\nAplicação encerrada.");
  }
}