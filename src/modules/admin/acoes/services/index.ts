import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarAcao = async (payload: any) => {
    try {
        await api.post("/acao/cadastrar", payload);
    } catch (error) {
        logger.error(`cadastrarAcaoService`, `Error ao cadastrar ação social`, error);
        throw error;
    }
}

const listarAcoes = async () : Promise<any> => {
  try {
    let parseData: any[] = [];
    const response = await api.get("/acao/listar");
    const { data } = response.data;
    if (data && Array.isArray(data)) {
      parseData = data;
    }
    return parseData;
  } catch (error) {
    logger.error(`listarAcaoService`, `Error ao listar ações`, error);
    throw error;
  }
};

export { cadastrarAcao, listarAcoes };