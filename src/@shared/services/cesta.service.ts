import api from "@helper/api";
import { logger } from "@utils/logger";

const gerarCestaService = async (payload: any) => {
  try {
    await api.post("/cestas/gerar", payload);
  } catch (error) {
    logger.error(`gerarCestaService`, `Error ao gerar cesta`, error);
    throw error;
  }
};

const listarCestaService = async (page = 1) => {
  try {
    const response = await api.get(`/cestas/listar?page=${page}`);
    const { data } = response.data;
    let result = {
      paginaAtual: null,
          totalItens: null,
          totalPaginas: null,
      totalCestas: null,
      cestasEntregues: null,
      cestas: []
    };
    
    if (data && data.result) {
      result.paginaAtual = data.result.paginaAtual;
      result.totalItens = data.result.totalItens;
      result.totalPaginas = data.result.totalPaginas;
      result.totalCestas = data.result.totalCestas;
      result.cestasEntregues = data.result.cestasEntregues;

      if (data && Array.isArray(data?.result?.cestas)) {
        result.cestas = data.result.cestas.map((item: any) => ({
          idCesta: item.idCesta,
          identificadorCesta: item.identificadorCesta,
          descricao: item.descricao,
          status: item.status,
          totalItensCesta: item.totalItensCesta,
          progresso: item.progresso,
          itens: item.itens.map((it: any) => ({
            itemProdutoId: it.itemProdutoId,
            nomeProduto: it.nomeProduto,
            quantidade: it.quantidade,
            unidadeMedida: it.unidadeMedida,
            valor: it.valor
          }))
        }));
      }
    }
    
    return result;
  } catch (error) {
    logger.error(`listarCestaService`, `Error ao listar cestas`, error);
    throw error;
  }
};

export { gerarCestaService, listarCestaService };