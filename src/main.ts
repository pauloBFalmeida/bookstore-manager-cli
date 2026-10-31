import { AutorController } from "./controllers/AutorController";
import { LivroController } from "./controllers/LivroController";
import { ClienteController } from "./controllers/ClienteController";

import { MenuPrincipal } from "./menus/MenuPrincipal";
import { MenuAutores } from "./menus/MenuAutores";
import { MenuLivros } from "./menus/MenuLivros";
import { MenuClientes } from "./menus/MenuClientes";

import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";

import { AutorService } from "./services/AutorService";
import { LivroService } from "./services/LivroService";
import { ClienteService } from "./services/ClienteService";

import { encerrarEntrada } from "./utils/entrada";

async function iniciar(): Promise<void> {
  // Repositorios
  const autorRepository = new AutorRepository();
  const livroRepository = new LivroRepository();
  const clienteRepository = new ClienteRepository();
  const emprestimoRepository = new EmprestimoRepository();
  // Servicos
  const autorService = new AutorService(autorRepository, livroRepository);
  const livroService = new LivroService(livroRepository, autorService, emprestimoRepository);
  const clienteService = new ClienteService(clienteRepository, emprestimoRepository);
  // Controladores
  const autorController = new AutorController(autorService);
  const livroController = new LivroController(livroService, autorService);
  const clienteController = new ClienteController(clienteService);
  // Menus
  const menuAutores = new MenuAutores(autorController);
  const menuLivros = new MenuLivros(livroController);
  const menuClientes = new MenuClientes(clienteController);
  // - Menu Principal
  const menuPrincipal = new MenuPrincipal(menuAutores, menuLivros, menuClientes);


  // Executar o menu principal
  try {
    await menuPrincipal.executar();
  } finally {
    encerrarEntrada();
  }
}

iniciar();