import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarDoacao = async (payload: any) => {
  try {
    await api.post("/doacao/cadastrar", payload);
  } catch (error) {
    logger.error(`cadastrarDoacaoService`, `Error ao cadastrar doação`, error);
    throw error;
  }
}

const cadastrarDoador = async (payload: any) => {
  try {
    await api.post("/doador/seja-doador", payload);
  } catch (error) {
    logger.error(`cadastrarDoadorService`, `Error ao cadastrar doador`, error);
    throw error;
  }
}

export { cadastrarDoacao, cadastrarDoador };
    