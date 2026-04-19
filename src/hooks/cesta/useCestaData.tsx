import { useState, useCallback } from 'react';
import { cancelarCesta, listarCestaService } from "@services/cesta";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { ICesta, ICestaDados } from "@tipagens/cesta";
import { useAppToast } from '@hooks/useAppToast';

export const useCestaData = () => {
  const { showErrorToast, showSuccessToast } = useAppToast();
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

  const [filterStatusCesta, setFilterStatusCesta] = useState("CRIADA");

  const fetchData = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError({ isError: false, message: "" });
    
    try {
      const result = await listarCestaService(page, filterStatusCesta) as any;
      setDados(result);
      setPagination({
        ...pagination,
        currentPage: result.currentPage,
        totalItens: result.totalItens,
        totalPages: result.totalPages, 
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
      setError({ isError: true, message: title });
    } finally {
      setIsLoading(false);
    }
  }, [filterStatusCesta]);

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

  const onHandleFiltroChange = (filtro: string) => {
    setFilterStatusCesta(filtro)
  };

  const onHandleEntregarCesta = (idCesta: number) => {
    console.log(`Entregar cesta: ${idCesta}`)
  }

  const onHandleCancelarCesta = useCallback(async (idCesta: number) => {
    try {
      console.log("cancelar cesta")
      await cancelarCesta(idCesta);
      if (dados.cestas.length > 1) {
        await fetchData(pagination.currentPage);
      } else {
        await fetchData()
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      showErrorToast({
        title: isAppError
          ? error.message
          : "Não foi possível cancelar a cesta"
      });
    }
    
  }, [fetchData, pagination.currentPage]);

  return {
    dados,
    isLoading,
    error,
    modalVisible,
    cestaSelecionada,
    pagination,
    filterStatusCesta,
    refetch,
    abrirDetalhes,
    fecharDetalhes,
    clearError,
    onChangePage,
    onHandleFiltroChange,
    onHandleEntregarCesta,
    onHandleCancelarCesta
  };
};