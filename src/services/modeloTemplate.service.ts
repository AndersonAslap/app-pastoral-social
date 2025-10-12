import api from "./api";

const consultaGeracaoTemplateService = async (payload: any) => {
  try {
    const response = await api.post("/estoque/consulta-geracao-template", payload);
    const { data } = response.data;

    console.log("Resposta da consulta de geração de template:", data);

    if (data?.quantidadePossivel) {
        return data?.quantidadePossivel;
    } else {
        return 0;
    }
  } catch (error) {
    console.log(`@log >> consultaGeracaoTemplateService >> error`, error);
    throw error;
  }
};

const GeracaoTemplateService = async (payload: any) => {
  try {
    const response = await api.post("/estoque/geracao-modelo-template", payload);
    const { data } = response.data;

    console.log("Resposta da consulta de geração de template:", data);
  } catch (error) {
    console.log(`@log >> GeracaoTemplateService >> error`, error);
    throw error;
  }
};

export { consultaGeracaoTemplateService, GeracaoTemplateService };