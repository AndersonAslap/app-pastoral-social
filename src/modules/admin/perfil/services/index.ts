import { logger } from "@shared/utils/logger";
import api from "@shared/helper/api";
import { PerfilFormData } from "../types";

const atualizarPerfil = async (payload: PerfilFormData) => {
  try {
    await api.put("/usuario/update", payload);
  } catch (error) {
    logger.error(`atualizarPerfil`, `Error ao atualizar perfil`, error);
    throw error;
  }
};

export { atualizarPerfil };