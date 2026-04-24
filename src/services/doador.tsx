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

export { cadastrarDoacao };
    