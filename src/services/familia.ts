import { logger } from "@utils/logger";
import { ICriarFamiliaPayload } from "@tipagens/payload";
import { IResponseListarFamilias } from "@tipagens/responses";
import api from "@helper/api";

const createFamiliaService = async (payload: ICriarFamiliaPayload) => {
  try {
    await api.post("/familia/cadastrar", payload);
  } catch (error) {
    logger.error(`createFamiliaService`, `Error ao criar família`, error);
    throw error;
  }
};

const listarFamiliaService = async (page = 1) : Promise<any> => {
  try {
    let parseData: IResponseListarFamilias[] = [];
    const response = await api.get(`/familia/listar?page=${page}`);
    const { data } = response.data;
    if (data && Array.isArray(data?.result)) {
      parseData = data.result.map((item: any) => ({
        id: item?.id || Math.random(),
        nomeRepresentante: item?.representanteFamiliar,
        endereco: item?.endereco || "",
        telefone: item?.telefone || "",
        qtdPessoasResidencia: item?.qtdPessoas || 0,
        qtdPessoasEmpregadas: item?.qtdPessoasEmpregadas || 0,
        comunidade: item?.comunidade?.descricao || "",
        criancasFrequentamEscola: item?.criancasFrequentamEscola || false,
      }));
    }
    return {
      currentPage: data.paginaAtual,
      totalItens: data.totalItens,
      totalPages: data.totalPaginas,
      data: parseData
    };
  } catch (error) {
    logger.error(`listarFamiliaService`, `Error ao listar famílias`, error);
    throw error;
  }
};

export { createFamiliaService, listarFamiliaService };
