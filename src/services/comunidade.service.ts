import api from "./api";

const listarComunidadeService = async () => {
  try {
    const response = await api.get("/comunidade/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        value: item.idComunidade.toString(),
        label: item.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    console.log(`@log >> listarComunidadeService >> error`, error);
    throw error;
  }
};

export { listarComunidadeService };
