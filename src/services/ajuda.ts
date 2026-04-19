import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarAjuda = async (payload: any) => {
  try {
    await api.post("/ajuda/associar-familia", [payload]);
  } catch (error) {
    logger.error(`cadastrarAjudaService`, `Error ao cadastrar ajuda`, error);
    throw error;
  }
};

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
        observacao: item?.observacao,
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

const cancelarAjuda = async (idAjuda: number) => {
  try {
    await api.post("/ajuda/cancelar", {idAjuda});
  } catch (error) {
    logger.error(`cancelarAjudaService`, `Error ao cancelar ajuda`, error);
    throw error;
  }
}

const aprovarAjuda = async (idAjuda: number) => {
  try {
    await api.post("/ajuda/aprovar", {idAjuda});
  } catch (error) {
    logger.error(`aprovarAjudaService`, `Error ao aprovar ajuda`, error);
    throw error;
  }
}

const entregarAjuda = async (idAjuda: number) => {
  try {
    await api.post("/ajuda/entregar", {idAjuda});
  } catch (error) {
    logger.error(`entregarAjudaService`, `Error ao entregar ajuda`, error);
    throw error;
  }
}

export { cadastrarAjuda, listarAjuda, cancelarAjuda, aprovarAjuda, entregarAjuda };