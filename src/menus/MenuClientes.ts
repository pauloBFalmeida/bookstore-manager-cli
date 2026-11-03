import { ClienteController } from "../controllers/ClienteController";
import { perguntar } from "../utils/entrada";

export class MenuClientes {
  constructor(private readonly clienteController: ClienteController) {}

  async exibir(): Promise<void> {
    let voltar = false;

    while (!voltar) {
      console.log("\n-=- Clientes -=-");
      console.log("1 - Cadastrar cliente");
      console.log("2 - Listar clientes");
      console.log("3 - Consultar cliente por id");
      console.log("4 - Atualizar cliente");
      console.log("5 - Remover cliente");
      console.log("0 - Voltar");

      const opcao = (await perguntar("Escolha uma opção: ")).trim();

      switch (opcao) {
        case "1":
          await this.clienteController.cadastrar();
          break;
        case "2":
          await this.clienteController.listar();
          break;
        case "3":
          await this.clienteController.consultar();
          break;
        case "4":
          await this.clienteController.atualizar();
          break;
        case "5":
          await this.clienteController.remover();
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