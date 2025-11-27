import api from "@helper/api";
import { logger } from "@utils/logger";

const consultaGeracaoTemplateService = async (payload: any) => {
  try {
    const response = await api.post("/estoque/consulta-geracao-template", payload);
    const { data } = response.data;
    if (data?.quantidadePossivel) 
        return data?.quantidadePossivel;
    return 0;
  } catch (error) {
    logger.error(`consultaGeracaoTemplateService`, `Error ao consultar geração de template`, error);
    throw error;
  }
};

const GeracaoTemplateService = async (payload: any) => {
  try {
    const response = await api.post("/estoque/geracao-modelo-template", payload);
    const { data } = response.data;
  } catch (error) {
    logger.error(`GeracaoTemplateService`, `Error ao gerar modelo de template`, error);
    throw error;
  }
};

const listarTemplatesService = async () => {
  try {
    const response = await api.get("/template/lista?page=1&pageSize=10");
    const { data } = response.data;
    let parseData: any = [];
    if (data?.result && Array.isArray(data.result)) {
      parseData = data.result.map((item: any) => ({
        idTemplate: item.idTemplate,
        descricao: item.descricao,
        qtdPossivelGeracao: item.qtdPossivelGeracao,
        itensModelo: item.itensModelo,
        items: item?.itens?.map((produto: any) => ({
            nome: produto.nomeProduto,
            quantidade: produto.quantidade
        }))
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarTemplatesService`, `Error ao listar templates`, error);
    throw error;
  }
};

export { consultaGeracaoTemplateService, GeracaoTemplateService, listarTemplatesService };