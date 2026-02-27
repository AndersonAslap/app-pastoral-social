import { logger } from "@shared/utils/logger";
import { ICriarFamiliaPayload } from "../../../../@shared/types/payload";
import { IResponseListarFamilias } from "../../../../@shared/types/responses";
import api from "@shared/helper/api";

const createFamiliaService = async (payload: ICriarFamiliaPayload) => {
  try {
    await api.post("/familia/cadastrar", payload);
  } catch (error) {
    logger.error(`createFamiliaService`, `Error ao criar família`, error);
    throw error;
  }
};

const listarFamiliaService = async () : Promise<IResponseListarFamilias[]> => {
  try {
    let parseData: IResponseListarFamilias[] = [];
    const response = await api.get("/familia/listar");
    const { data } = response.data;
    if (data && Array.isArray(data?.familias)) {
      parseData = data.familias.map((item: any) => ({
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
    return parseData;
  } catch (error) {
    console.log(error);
    logger.error(`listarFamiliaService`, `Error ao listar famílias`, error);
    throw error;
  }
};

export { createFamiliaService, listarFamiliaService };
