import api from "./api";

const createFamiliaService = async (payload: any) => {
  try {
    await api.post("/familia/cadastrar", payload);
  } catch (error) {
    throw error;
  }
};

export { createFamiliaService };
