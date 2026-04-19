import { useCallback, useState } from "react";
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
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus["id"]>("ativas");


  const filtros: FiltroStatus[] = [
    { id: "ativas", nome: "Ações Ativas", icone: "🟢" },
    { id: "concluida", nome: "Concluídas", icone: "✅" }
  ];

  const getImage = (tipo: string) => {
    switch (tipo) {
      case "Cestas Básicas":
        return "🛒";
      case "Refeições":
        return "🍽️";
      case "roupas":
        return "🧥";
      default:
        return "👨‍👩‍👧‍👦";
    }
  }

  const getStatusInfo = (status: AcaoSocial["status"]): StatusInfo => {
    switch (status) {
      case "ativa":
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
      case "concluida":
        return { label: "Concluída", cor: "#6B7280", icone: "✅" };
      default:
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
    }
  };

  const fetchAcoes = async (page = 1) => {
      setLoading(true);
      try {
          const output = await listarAcoes(page);
          setAcoes(output.data);
          setPagination({
              ...pagination,
              currentPage: output.currentPage,
              totalItens: output.totalItens,
              totalPages: output.totalPages
          });
      }  catch (error) {
          showErrorToast({ title: "Erro ao carregar ações." });
      } finally {
          setLoading(false);
      }
  }

  const onChangePage = useCallback(async (page: number) => {
    await fetchAcoes(page);
  }, []);

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