import api from "./api";

const createFamiliaService = async (payload: any) => {
  try {
    await api.post("/familia/cadastrar", payload);
  } catch (error) {
    throw error;
  }
};

const listarFamiliaService = async () => {
  try {
    let parseData: any = [];
    const response = await api.get("/familia/listar");
    console.log(response);
    const { data } = response.data;
    if (data && Array.isArray(data)) {
      parseData = data.map((item: any) => ({
        id: item.id,
        nomeRepresentante: item.nomeRepresentante,
        endereco: item.endereco,
      }));
    }
    return parseData;
  } catch (error) {
    throw error;
  }
};

export { createFamiliaService, listarFamiliaService };
