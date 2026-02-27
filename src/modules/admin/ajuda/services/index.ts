import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarAjuda = async (payload: any) => {
    try {
        await api.post("/ajuda/associar-familia", [payload]);
    } catch (error) {
        logger.error(`cadastrarAjudaService`, `Error ao cadastrar ajuda`, error);
        throw error;
    }
}

const listarAjuda = async () : Promise<any> => {
  try {
    let parseData: any[] = [];
    const response = await api.get("/ajuda/listar");
    const { data: output } = response.data;
    const { data, total, pendentes, concluidas } = output;
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        id: item?.id,
        representante: item?.representante,
        endereco: item?.endereco,
        statusAjuda: item?.statusAjuda,
        tipoAjuda: item?.tipoAjuda,
        dataEntrega: item?.dataEntrega
      }));
    }
    return {
        stats: {
            total,
            pendentes,
            concluidas
        },
        data: parseData
    };
  } catch (error) {
    logger.error(`listarAjudaService`, `Error ao listar ajudas`, error);
    throw error;
  }
};

export { cadastrarAjuda, listarAjuda };