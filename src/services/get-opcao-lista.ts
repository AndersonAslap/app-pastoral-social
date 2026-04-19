import api from "@helper/api";
import { logger } from "@utils/logger";

const getOptions = async (endpoint: string) => {
    try {
        const response = await api.get(endpoint);
        const { data } = response.data;
        if (data && Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        logger.error(`getOptions`, `Error ao buscar opções de ${endpoint}`, error);
        throw error;
    }
}

const getFamiliaOpcaoLista = async () => {
    const endpoint = "/familia/opcao-lista";
    const options = await getOptions(endpoint);
    return options;
}

const getTipoAjudaOpcaoLista = async () => {
    const endpoint = "/ajuda/opcao-lista";
    const options = await getOptions(endpoint);
    return options;
}

const getTemplateOpcaoLista = async () => {
    const endpoint = "/template/opcao-lista";
    const options = await getOptions(endpoint);
    return options;
}

const getItemProdutosOpcaoLista = async () => {
  try {
    const response = await api.get("/estoque/itens/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        value: item.idItemProduto.toString(),
        label: item.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarItemProdutosOptionsService`, `Error ao listar itens de produto`, error);
    throw error;
  }
};

export { getFamiliaOpcaoLista, getTipoAjudaOpcaoLista, getTemplateOpcaoLista, getItemProdutosOpcaoLista};