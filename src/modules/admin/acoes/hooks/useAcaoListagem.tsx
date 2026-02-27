import { useEffect, useState } from "react";
import { AcaoSocial } from "../types";
import { useAppToast } from "@hooks/useAppToast";
import { listarAcoes } from "../services";

export function useAcaoListagem() {
    const { showErrorToast } = useAppToast();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<AcaoSocial[]>([]);

    useEffect(() => {
        const fetchAcoes = async () => {
            setLoading(true);

            try {
                const output = await listarAcoes();
                setItems(output);
            }  catch (error) {
                showErrorToast({ title: "Erro ao carregar ações." });
            } finally {
                setLoading(false);
            }
        }

        fetchAcoes();
    }, []);

    return  {
        loading,
        items,
    }
}