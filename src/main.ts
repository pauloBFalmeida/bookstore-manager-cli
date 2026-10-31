import { AutorController } from "./controllers/AutorController";
import { LivroController } from "./controllers/LivroController";
import { MenuAutores } from "./menus/MenuAutores";
import { MenuLivros } from "./menus/MenuLivros";
import { MenuPrincipal } from "./menus/MenuPrincipal";
import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { AutorService } from "./services/AutorService";
import { LivroService } from "./services/LivroService";
import { encerrarEntrada } from "./utils/entrada";

async function iniciar(): Promise<void> {
  // Repositorios
  const autorRepository = new AutorRepository();
  const livroRepository = new LivroRepository();
  // Servicos
  const autorService = new AutorService(autorRepository, livroRepository);
  const livroService = new LivroService(livroRepository, autorService);
  // Controladores
  const autorController = new AutorController(autorService);
  const livroController = new LivroController(livroService, autorService);
  // Menus
  const menuAutores = new MenuAutores(autorController);
  const menuLivros = new MenuLivros(livroController);
  const menuPrincipal = new MenuPrincipal(menuAutores, menuLivros);

  // Executar o menu principal
  try {
    await menuPrincipal.executar();
  } finally {
    encerrarEntrada();
  }
}

iniciar();