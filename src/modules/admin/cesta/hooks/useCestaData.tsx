import { useState, useCallback } from 'react';
import { listarCestaService } from "@services/cesta.service";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { ICesta, ICestaDados } from "../types";

interface UseCestaDataReturn {
  dados: ICestaDados;
  isLoading: boolean;
  error: { isError: boolean; message: string };
  modalVisible: boolean;
  cestaSelecionada: ICesta | null;
  refetch: () => Promise<void>;
  abrirDetalhes: (cesta: ICesta) => void;
  fecharDetalhes: () => void;
  clearError: () => void;
}

export const useCestaData = (): UseCestaDataReturn => {
  const [dados, setDados] = useState<ICestaDados>({ 
    totalCestas: 0, 
    cestasEntregues: 0, 
    cestas: [] 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [cestaSelecionada, setCestaSelecionada] = useState<ICesta | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError({ isError: false, message: "" });
    
    try {
      const result = await listarCestaService() as any;
      setDados(result);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
      setError({ isError: true, message: title });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const clearError = useCallback(() => {
    setError({ isError: false, message: "" });
  }, []);

  const abrirDetalhes = useCallback((cesta: ICesta) => {
    setCestaSelecionada(cesta);
    setModalVisible(true);
  }, []);

  const fecharDetalhes = useCallback(() => {
    setModalVisible(false);
    setCestaSelecionada(null);
  }, []);

  return {
    dados,
    isLoading,
    error,
    modalVisible,
    cestaSelecionada,
    refetch,
    abrirDetalhes,
    fecharDetalhes,
    clearError
  };
};