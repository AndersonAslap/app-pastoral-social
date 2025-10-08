import api from "./api";

const listarDificuldadeService = async () => {
  try {
    const response = await api.get("/dificuldade/listar");
    const { data } = response.data;
    let parseData: any = [];
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        value: item.idDificuldade.toString(),
        label: item.descricao,
      }));
    }
    return parseData;
  } catch (error) {
    console.log(`@log >> listarDificuldadeService >> error`, error);
    throw error;
  }
};

export { listarDificuldadeService };
