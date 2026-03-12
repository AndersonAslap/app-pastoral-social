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

const listarAjuda = async (page = 1) : Promise<any> => {
  try {
    let parseData: any[] = [];
    const response = await api.get(`/ajuda/listar?page=${page}`);
    const { data } = response.data;
    const { result, paginaAtual, totalItens, totalPaginas } = data;
    if (result?.data && Array.isArray(result.data)) {
      parseData = result.data.map((item: any) => ({
        id: item?.id,
        representante: item?.representante,
        endereco: item?.endereco,
        statusAjuda: item?.statusAjuda,
        tipoAjuda: item?.tipoAjuda,
        dataEntrega: item?.dataEntrega,
        cesta: item?.cesta || [],
      }));
    }
    return {
        stats: {
            total: result.total,
            pendentes: result.pendentes,
            concluidas: result.concluidas
        },
        data: parseData, 
        currentPage: paginaAtual,
        totalItens: totalItens,
        totalPages: totalPaginas  
    };
  } catch (error) {
    logger.error(`listarAjudaService`, `Error ao listar ajudas`, error);
    throw error;
  }
};

export { cadastrarAjuda, listarAjuda };