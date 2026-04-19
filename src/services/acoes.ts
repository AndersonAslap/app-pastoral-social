import api from "@helper/api";
import { getImage } from "@utils/functions";
import { logger } from "@utils/logger";

const cadastrarAcao = async (payload: any) => {
    try {
      await api.post("/acao/cadastrar", payload);
    } catch (error) {
      logger.error(`cadastrarAcaoService`, `Error ao cadastrar ação social`, error);
      throw error;
    }
}

const listarAcoes = async (page: number) : Promise<any> => {
  try {
    let parseData: any[] = [];
    const response = await api.get(`/acao/listar?page=${page}`);
    const { data } = response.data;
    const { result, paginaAtual, totalItens, totalPaginas } = data;
    if (result && Array.isArray(result)) {
      parseData = result.map((acao: any) => ({...acao, id: acao.acaoId}));
    }
    return {
      data: parseData, 
      currentPage: paginaAtual,
      totalItens: totalItens,
      totalPages: totalPaginas  
    };
  } catch (error) {
    logger.error(`listarAcaoService`, `Error ao listar ações`, error);
    throw error;
  }
};

const listarAcoesPorId = async (id: number) : Promise<any> => {
  try {
    let parseData: any = {};
    const response = await api.get(`/acao/${id}`);
    const { data } = response.data;

    if (data) {
      parseData = { 
        ...data, 
        id: data.acaoId,
        itensGerados: data.itensGerados ? data.itensGerados : "0/100",
        percentualRecebido: data.percentualRecebido ? data.percentualRecebido : "0",
        itensRecebidos: data.itensRecebidos ? data.itensRecebidos : 0,
        qtdDoadores: data.qtdDoadores ? data.qtdDoadores : 0,

        imagem: getImage(data.tipoAcao),
        responsavel: "Pastoral Social - Paróquia São Francisco",
        telefone: "(11) 9999-9999",
        email: "contato@pastoralsocial.org",

        beneficiarios: "Famílias em situação de vulnerabilidade social cadastradas no programa",
        impacto: "185 famílias beneficiadas mensalmente",

        itens: data.itens ? data.itens.map((item: any) => `${item.nomeProduto} (${item.unidadeMedida}) - (${item.nivelNecessidadeDoacao === "CRITICAL" ? "CRÍTICO" : item.nivelNecessidadeDoacao === "HIGH" ? "ALTO" : "MODERADO"})`) : [],
        products: data?.itens?.map((item: any) => ({ ...item, value: item.idItemProduto.toString(), label: `${item.nomeProduto} (${item.unidadeMedida})` })) || []
      };
    }
 
    return parseData;
  } catch (error) {
    logger.error(`listarAcaoService`, `Error ao listar ações`, error);
    throw error;
  }
};

export { cadastrarAcao, listarAcoes, listarAcoesPorId };
    