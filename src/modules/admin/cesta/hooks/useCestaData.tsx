import { useState, useCallback } from 'react';
import { listarCestaService } from "@services/cesta.service";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { ICesta, ICestaDados } from "../types";

export const useCestaData = () => {
  const [dados, setDados] = useState<ICestaDados>({ 
    totalCestas: 0, 
    cestasEntregues: 0, 
    cestas: [] 
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalItens: 0,
    totalPages: 0,
    itemsPerPage: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [cestaSelecionada, setCestaSelecionada] = useState<ICesta | null>(null);

  const fetchData = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError({ isError: false, message: "" });
    
    try {
      const result = await listarCestaService(page) as any;
      setDados(result);
      setPagination({
        ...pagination,
        currentPage: result.currentPage,
        totalItens: result.totalItens,
        totalPages: result.totalPages, 
      });
      console.log({
        ...pagination,
        currentPage: result.currentPage,
        totalItens: result.totalItens,
        totalPages: result.totalPages, 
      })
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

  const onChangePage = useCallback(async (page: number) => {
    await fetchData(page);
  }, []);

  return {
    dados,
    isLoading,
    error,
    modalVisible,
    cestaSelecionada,
    pagination,
    refetch,
    abrirDetalhes,
    fecharDetalhes,
    clearError,
    onChangePage
  };
};