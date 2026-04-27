import { useCallback, useEffect, useRef, useState } from "react";
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
    const [statsAcoes, setStatsAcoes] = useState({
      planejadas: 0,
      emAndamento: 0,
      concluidas: 0
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [acaoSelecionada, setAcaoSelecionada] = useState<AcaoSocial | null>(null);
    const [acaoStatusFilter, setAcaoStatusFilter] = useState<'EM_ANDAMENTO' | 'CONCLUIDA' | 'PLANEJADA'>('EM_ANDAMENTO'); 

    // Usar ref para armazenar o valor atual do filtro
    const filtroStatusRef = useRef(acaoStatusFilter);

    const handleAbrirDetalhes = useCallback((item: AcaoSocial) => {
        setAcaoSelecionada(item);
        setModalVisible(true);
    }, []);

    const handleFecharDetalhes = useCallback(() => {
        setModalVisible(false);
        setAcaoSelecionada(null);
    }, []);

    const fetchAcoes = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            // Usar o ref para pegar o valor mais atualizado sem criar dependência
            const output = await listarAcoes(page, filtroStatusRef.current);
            setItems(output.data);
            setPagination({
                ...pagination,
                currentPage: output.currentPage,
                totalItens: output.totalItens,
                totalPages: output.totalPages,
            });
            setStatsAcoes({
              planejadas: output.statsPlanejadas,
              emAndamento: output.statsEmAndamento,
              concluidas: output.statsConcluidas
            });
        }  catch (error) {
            showErrorToast({ title: "Erro ao carregar ações." });
        } finally {
            setLoading(false);
        }
    }, [showErrorToast])

    const onChangePage = useCallback(async (page: number) => {
      await fetchAcoes(page);
    }, []);


    // Atualizar ref quando filtro mudar
    useEffect(() => {
        filtroStatusRef.current = acaoStatusFilter;
        fetchAcoes(1);
    }, [acaoStatusFilter]);

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
        statsAcoes,
        acaoStatusFilter,
        setAcaoStatusFilter
    }
}