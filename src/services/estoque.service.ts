import api from "./api";

const cadastrarEstoqueService = async (payload: any) => {
  try {
    await api.post("/estoque/cadastrar", payload);
  } catch (error) {
    console.log(`@log >> cadastrarEstoqueService >> error`, error);
    throw error;
  }
};

const removerEstoqueService = async (estoqueId: number) => {
  try {
    await api.delete(`/estoque/delete/${estoqueId}`);
  } catch (error) {
    console.log(`@log >> removerEstoqueService >> error`, error);
    throw error;
  }
};

const EstoqueService = async (payload: any) => {
  try {
    await api.post("/estoque/cadastrar", payload);
  } catch (error) {
    console.log(`@log >> cadastrarEstoqueService >> error`, error);
    throw error;
  }
};

const listarItens = async () => {
  try {
    const response = await api.get("/itens/listar");
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
    console.log(`@log >> listarItens >> error`, error);
    throw error;
  }
};

const listarUnidadeDeMedidasOptions = async () => {
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
    console.log(`@log >> listarUnidadeDeMedidas >> error`, error);
    throw error;
  }
};

const listarItemProdutosOptions = async () => {
  try {
    const response = await api.get("/itens/listar");
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
    console.log(`@log >> listarItemProdutosOptions >> error`, error);
    throw error;
  }
};

const listarProdutos = async (itemProdutoId: number) => {
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
    console.log(`@log >> listarProdutos >> error`, error);
    throw error;
  }
};

export { listarItens, listarUnidadeDeMedidasOptions, listarItemProdutosOptions, cadastrarEstoqueService, listarProdutos, removerEstoqueService };
