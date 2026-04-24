import { useAppToast } from "@hooks/useAppToast";
import { useCallback, useState } from "react";
import { Help, HelpStats } from "@tipagens/ajuda";
import {
  aprovarAjuda,
  cancelarAjuda,
  entregarAjuda,
  listarAjuda
} from "@services/ajuda";
import { AppError } from "@utils/app.error";

export function useAjudaListagem() {
  const { showErrorToast } = useAppToast();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Help[]>([]);
  const [stats, setStats] = useState<HelpStats>({
    total: 0,
    pending: 0,
    completed: 0
  });

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalItens: 0,
    totalPages: 0,
    itemsPerPage: 10
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ajudaSelecionada, setAjudaSelecionada] = useState<Help | null>(null);

  // ✅ FETCH MEMOIZADO
  const fetchAjudas = useCallback(async (page = 1) => {
    setLoading(true);

    try {
      const output = await listarAjuda(page);

      setItems(output.data);

      setStats({
        total: output.stats?.total || 0,
        pending: output.stats?.pendentes || 0,
        completed: output.stats?.concluidas || 0
      });

      setPagination(prev => ({
        ...prev,
        currentPage: output.currentPage,
        totalItens: output.totalItens,
        totalPages: output.totalPages
      }));
    } catch (error) {
      showErrorToast({ title: "Erro ao carregar ajudas." });
    } finally {
      setLoading(false);
    }
  }, [showErrorToast]);

  // PAGINAÇÃO
  const onChangePage = useCallback(async (page: number) => {
    await fetchAjudas(page);
  }, [fetchAjudas]);

  // MODAL
  const handleAbrirDetalhes = useCallback((item: Help) => {
    setAjudaSelecionada(item);
    setModalVisible(true);
  }, []);

  const handleFecharDetalhes = useCallback(() => {
    setModalVisible(false);
    setAjudaSelecionada(null);
  }, []);

  // RELOAD CONTROLADO
  const reloadData = useCallback(async () => {
    await fetchAjudas(pagination.currentPage || 1);
  }, [fetchAjudas, pagination.currentPage]);

  // ✅ CANCELAR (UPDATE OTIMISTA)
  const handleCancelar = useCallback(async (idAjuda: number) => {
    try {
      await cancelarAjuda(idAjuda);

      // remove localmente (evita conflito com animação)
      setItems(prev => prev.filter(item => item.id !== idAjuda));

      // opcional: atualizar stats localmente
      setStats(prev => ({
        ...prev,
        total: prev.total - 1
      }));

    } catch (error) {
      const isAppError = error instanceof AppError;

      showErrorToast({
        title: isAppError
          ? error.message
          : "Não foi possível cancelar a ajuda"
      });
    }
  }, [showErrorToast]);

  // APROVAR
  const handleAprovar = useCallback(async (idAjuda: number) => {
    try {
      await aprovarAjuda(idAjuda);
    } catch (error) {
      const isAppError = error instanceof AppError;

      showErrorToast({
        title: isAppError
          ? error.message
          : "Não foi possível aprovar a ajuda"
      });
    }
  }, [showErrorToast]);

  // ENTREGAR
  const handleRealizada = useCallback(async (idAjuda: number) => {
    try {
      await entregarAjuda(idAjuda);

      setItems(prev =>
        prev.map(item =>
          item.id === idAjuda
            ? { ...item, status: "CONCLUIDO" }
            : item
        )
      );

    } catch (error) {
      const isAppError = error instanceof AppError;

      showErrorToast({
        title: isAppError
          ? error.message
          : "Não foi possível entregar a ajuda"
      });
    }
  }, [showErrorToast]);

  // FILTROS
  const handleLimparFiltros = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  const handleAplicarFiltros = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  return {
    loading,
    items,
    stats,
    pagination,
    isFilterOpen,
    modalVisible,
    ajudaSelecionada,

    fetchAjudas,
    reloadData,
    onChangePage,

    setIsFilterOpen,
    handleAbrirDetalhes,
    handleFecharDetalhes,

    handleCancelar,
    handleAprovar,
    handleRealizada,

    handleLimparFiltros,
    handleAplicarFiltros
  };
}