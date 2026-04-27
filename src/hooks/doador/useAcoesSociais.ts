import { useCallback, useEffect, useState, useRef } from "react";
import { AcaoSocial, FiltroStatus, StatusInfo } from "@tipagens/doador";
import { listarAcoes } from "@services/acoes";
import { useAppToast } from "@hooks/useAppToast";

export const useAcoesSociais = () => {
  const { showErrorToast } = useAppToast();
  const [loading, setLoading] = useState(false);
  const [acoes, setAcoes] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalItens: 0,
    totalPages: 0,
    itemsPerPage: 10
  });
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus["id"]>("EM_ANDAMENTO");
  
  // Usar ref para armazenar o valor atual do filtro
  const filtroStatusRef = useRef(filtroStatus);

  const filtros: FiltroStatus[] = [
    { id: "EM_ANDAMENTO", nome: "Ações Ativas", icone: "🟢" },
    { id: "PLANEJADA", nome: "Planejadas", icone: "📅" },
    { id: "CONCLUIDA", nome: "Concluídas", icone: "✅" }
  ];

  const getImage = (tipo: string) => {
    switch (tipo) {
      case "Cestas Básicas":
        return "🛒";
      case "Refeições":
        return "🍽️";
      case "Doação Roupas":
        return "🧥";
      default:
        return "👨‍👩‍👧‍👦";
    }
  }

  const getStatusInfo = (status: AcaoSocial["status"]): StatusInfo => {
    switch (status) {
      case "EM_ANDAMENTO":
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
      case "CONCLUIDA":
        return { label: "Concluída", cor: "#6B7280", icone: "⚫" };
      case "PLANEJADA":
        return { label: "Planejada", cor: "#3B82F6", icone: "🔵" };
      default:
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
    }
  };

  // fetchAcoes SEM dependências externas
  const fetchAcoes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      // Usar o ref para pegar o valor mais atualizado sem criar dependência
      const output = await listarAcoes(page, filtroStatusRef.current);
      setAcoes(output.data);
      setPagination({
        currentPage: output.currentPage,
        totalItens: output.totalItens,
        totalPages: output.totalPages,
        itemsPerPage: 10
      });
    } catch (error) {
      showErrorToast({ title: "Erro ao carregar ações." });
    } finally {
      setLoading(false);
    }
  }, [showErrorToast]); // Só depende de showErrorToast

  const onChangePage = useCallback(async (page: number) => {
    await fetchAcoes(page);
  }, [fetchAcoes]);

  // Atualizar ref quando filtro mudar
  useEffect(() => {
    filtroStatusRef.current = filtroStatus;
    fetchAcoes(1);
  }, [filtroStatus]);

  return {
    loading,
    fetchAcoes,
    acoes,
    pagination,
    onChangePage,
    filtroStatus,
    setFiltroStatus,
    filtros,
    getStatusInfo,
    getImage
  };
};