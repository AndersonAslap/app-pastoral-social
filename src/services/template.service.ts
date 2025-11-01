import api from "./api";

const listarTemplates = async () => {
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
    console.log(`@log >> listarTemplates >> error`, JSON.stringify(error, null, 2));
    throw error;
  }
};

export { listarTemplates };