import api from "@helper/api";
import { logger } from "@utils/logger";

const listarComunidadeService = async () => {
  try {
    const response = await api.get("/comunidade/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        value: item.idComunidade.toString(),
        label: item.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarComunidadeService`, `Error ao listar comunidades`, error);
    throw error;
  }
};

export { listarComunidadeService };
