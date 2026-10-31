import { AutorController } from "./controllers/AutorController";
import { MenuAutores } from "./menus/MenuAutores";
import { MenuPrincipal } from "./menus/MenuPrincipal";
import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { encerrarEntrada } from "./utils/entrada";

async function iniciar(): Promise<void> {
  const autorRepository = new AutorRepository();
  const autorService = new AutorService(autorRepository);
  const autorController = new AutorController(autorService);
  const menuAutores = new MenuAutores(autorController);
  const menuPrincipal = new MenuPrincipal(menuAutores);

  try {
    await menuPrincipal.executar();
  } finally {
    encerrarEntrada();
  }
}

iniciar();