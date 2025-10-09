import api from "./api";

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

export { listarItens };
