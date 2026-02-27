import { useAppToast } from "@hooks/useAppToast";
import { useEffect, useState } from "react";
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
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleDetalhes = (item: Help) => {
        console.log(`Detalhes da ajuda ${item.id}`);
      };
    
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

    useEffect(() => {
        const fetchAjudas = async () => {
            setLoading(true);
            try {
                const output = await listarAjuda();
                setItems(output.data);
                setStats({
                    total: output.stats?.total || 0,
                    pending: output.stats?.pendentes || 0,
                    completed: output.stats?.concluidas || 0,
                });
            } catch (error) {
                showErrorToast({ title: "Erro ao carregar ajudas." });
            } finally {
                setLoading(false);
            }
        };

        fetchAjudas();
    }, []);


    return {
        loading,
        items,
        stats,
        isFilterOpen,
        setIsFilterOpen,
        handleDetalhes,
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