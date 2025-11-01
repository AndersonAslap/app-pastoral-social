import api from "./api";

const gerarCestaService = async (payload: any) => {
  try {
    const response = await api.post("/cestas/gerar", payload);
    console.log(`@log >> ${JSON.stringify(response, null, 2)}`);
  } catch (error) {
    console.log(`@log >> gerarCestaService >> error`, JSON.stringify(error, null, 2));
    throw error;
  }
};

export { gerarCestaService };