import { logger } from "@utils/logger";
import api from "@helper/api";
import { PerfilFormData } from "@tipagens/perfil";

const atualizarPerfil = async (payload: PerfilFormData) => {
  try {
    await api.put("/usuario/update", payload);
  } catch (error) {
    logger.error(`atualizarPerfil`, `Error ao atualizar perfil`, error);
    throw error;
  }
};

export { atualizarPerfil };