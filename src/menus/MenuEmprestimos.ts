import { EmprestimoController } from "../controllers/EmprestimoController";
import { perguntar } from "../utils/entrada";

export class MenuEmprestimos {
  constructor(private readonly emprestimoController: EmprestimoController) {}

  async exibir(): Promise<void> {
    let voltar = false;

    while (!voltar) {
      console.log("\n-=- Empréstimos -=-");
      console.log("1 - Realizar empréstimo");
      console.log("2 - Registrar devolução");
      console.log("3 - Listar empréstimos");
      console.log("0 - Voltar");

      const opcao = (await perguntar("Escolha uma opção: ")).trim();

      switch (opcao) {
        case "1":
          await this.emprestimoController.realizar();
          break;
        case "2":
          await this.emprestimoController.devolver();
          break;
        case "3":
          await this.emprestimoController.listar();
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