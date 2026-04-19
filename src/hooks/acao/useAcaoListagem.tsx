import { useCallback, useState } from "react";
import { AcaoSocial } from "@tipagens/acao";
import { useAppToast } from "@hooks/useAppToast";
import { listarAcoes } from "@services/acoes";

export function useAcaoListagem() {
    const { showErrorToast } = useAppToast();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<AcaoSocial[]>([]);
    const [pagination, setPagination] = useState({
      currentPage: 0,
      totalItens: 0,
      totalPages: 0,
      itemsPerPage: 10
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [acaoSelecionada, setAcaoSelecionada] = useState<AcaoSocial | null>(null);

    const handleAbrirDetalhes = useCallback((item: AcaoSocial) => {
        setAcaoSelecionada(item);
        setModalVisible(true);
    }, []);

    const handleFecharDetalhes = useCallback(() => {
        setModalVisible(false);
        setAcaoSelecionada(null);
    }, []);

    const fetchAcoes = async (page = 1) => {
        setLoading(true);

        try {
            const output = await listarAcoes(page);
            setItems(output.data);
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

    return  {
        loading,
        items,
        modalVisible,
        acaoSelecionada,
        pagination,
        onChangePage,
        fetchAcoes,
        handleAbrirDetalhes,
        handleFecharDetalhes,
    }
}