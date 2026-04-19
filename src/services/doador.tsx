import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarDoacao = async (payload: any) => {
    try {
        console.log("Payload enviado para cadastrar doação:", JSON.stringify(payload, null, 2));
      const response = await api.post("/doacao/cadastrar", payload);
      console.log("Resposta do servidor ao cadastrar doação:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      logger.error(`cadastrarDoacaoService`, `Error ao cadastrar doação`, error);
      throw error;
    }
}

export { cadastrarDoacao };
    