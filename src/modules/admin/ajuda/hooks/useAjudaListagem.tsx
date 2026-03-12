import { useAppToast } from "@hooks/useAppToast";
import { useCallback, useEffect, useState } from "react";
import { Help, HelpStats } from "../types";
import { listarAjuda } from "../services";

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

    const handleAbrirDetalhes = useCallback((item: Help) => {
      setAjudaSelecionada(item);
      setModalVisible(true);
      console.log(`Detalhes da ajuda ${item.id}`);
    }, []);

    const handleFecharDetalhes = useCallback(() => {
      setModalVisible(false);
      setAjudaSelecionada(null);
      console.log(`Fechar Detalhes da ajuda`);
    }, []);
    
    const handleCancelar = (item: Help) => {
      console.log(`Cancelar ajuda ${item.id}`);
    };
    
    const handleAprovar = (item: Help) => {
      console.log(`Aprovar ajuda ${item.id}`);
    };
  
    const handleRealizada = (item: Help) => {
      console.log(`Marcar como realizada ${item.id}`);
    };
  
    const handleReabrir = (item: Help) => {
      console.log(`Reabrir ajuda ${item.id}`);
    };
  
    const handleFiltroStatus = () => {
      console.log("Filtro por status");
    };
  
    const handleFiltroFamilia = () => {
      console.log("Filtro por família");
    };
  
    const handleFiltroData = () => {
      console.log("Filtro por data");
    };
  
    const handleLimparFiltros = () => {
      setIsFilterOpen(false);
    };
  
    const handleAplicarFiltros = () => {
      setIsFilterOpen(false);
    };

    const fetchAjudas = async (page = 1) => {
      setLoading(true);
      try {
          const output = await listarAjuda();
          setItems(output.data);
          setStats({
              total: output.stats?.total || 0,
              pending: output.stats?.pendentes || 0,
              completed: output.stats?.concluidas || 0,
          });
          setPagination({
            ...pagination,
            currentPage: output.currentPage,
            totalItens: output.totalItens,
            totalPages: output.totalPages
          });
      } catch (error) {
          showErrorToast({ title: "Erro ao carregar ajudas." });
      } finally {
          setLoading(false);
      }
    };

    const onChangePage = useCallback(async (page: number) => {
      await fetchAjudas(page);
    }, []);

    return {
        loading,
        items,
        stats,
        isFilterOpen,
        modalVisible,
        ajudaSelecionada,
        pagination,
        fetchAjudas,
        onChangePage,
        setIsFilterOpen,
        handleAbrirDetalhes,
        handleFecharDetalhes,
        handleCancelar,
        handleAprovar,
        handleRealizada,
        handleReabrir,
        handleFiltroStatus,
        handleFiltroFamilia,
        handleFiltroData,
        handleLimparFiltros,
        handleAplicarFiltros
    };
}