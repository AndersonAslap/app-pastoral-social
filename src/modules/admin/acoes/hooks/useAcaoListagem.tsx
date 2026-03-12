import { useCallback, useState } from "react";
import { AcaoSocial } from "../types";
import { useAppToast } from "@hooks/useAppToast";
import { listarAcoes } from "../services";

export function useAcaoListagem() {
    const { showErrorToast } = useAppToast();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<AcaoSocial[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [acaoSelecionada, setAcaoSelecionada] = useState<AcaoSocial | null>(null);

    const handleAbrirDetalhes = useCallback((item: AcaoSocial) => {
        setAcaoSelecionada(item);
        setModalVisible(true);
        console.log(`Detalhes da ação ${item.id}`);
    }, []);

    const handleFecharDetalhes = useCallback(() => {
        setModalVisible(false);
        setAcaoSelecionada(null);
        console.log(`Fechar Detalhes da ação`);
    }, []);

    const fetchAcoes = async () => {
        setLoading(true);

        try {
            const output = await listarAcoes();
            console.log(output)
            setItems(output);
        }  catch (error) {
            showErrorToast({ title: "Erro ao carregar ações." });
        } finally {
            setLoading(false);
        }
    }

    return  {
        loading,
        items,
        modalVisible,
        acaoSelecionada,
        fetchAcoes,
        handleAbrirDetalhes,
        handleFecharDetalhes,
    }
}