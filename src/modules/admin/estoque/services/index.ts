import api from "@helper/api";
import { logger } from "@utils/logger";

const cadastrarEstoqueService = async (payload: any) => {
  try {
    await api.post("/estoque/cadastrar", payload);
  } catch (error) {
    logger.error(`cadastrarEstoqueService`, `Error ao cadastrar produto`, error);
    throw error;
  }
};

const removerEstoqueService = async (estoqueId: number) => {
  try {
    await api.delete(`/estoque/delete/${estoqueId}`);
  } catch (error) {
    logger.error(`removerEstoqueService`, `Error ao remover produto`, error);
    throw error;
  }
};

const listarItensService = async () => {
  try {
    const response = await api.get("/estoque/itens/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        id: item.idItemProduto,
        nome: item.descricao,
        quantidadeEstoque: item.quantidadeEstoque,
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarItensService`, `Error ao listar itens de produto`, error);
    throw error;
  }
};

const listarUnidadeDeMedidasOptionsService = async () => {
  try {
    const response = await api.get("/und-medidas/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        value: item.idUnidadeDeMedida.toString(),
        label: item.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarUnidadeDeMedidasOptionsService`, `Error ao listar unidades de medida`, error);
    throw error;
  }
};

const listarItemProdutosOptionsService = async () => {
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

const listarProdutosService = async (itemProdutoId: number) => {
  try {
    const response = await api.get(`/estoque/listar/${itemProdutoId}`);
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        id: item.idEstoque,
        validade: item.validade,
        valorMedida: item.valorMedida,
        localizacao: item.localizacao.descricao,
        unidadeDeMedida: item.unidadeDeMedida.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    logger.error(`listarProdutosService`, `Error ao listar produtos`, error);
    throw error;
  }
};

export { 
  listarItensService, 
  listarUnidadeDeMedidasOptionsService, 
  listarItemProdutosOptionsService, 
  cadastrarEstoqueService, 
  listarProdutosService, 
  removerEstoqueService 
};
