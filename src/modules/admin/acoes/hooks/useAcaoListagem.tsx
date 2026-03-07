import { useState } from "react";
import { AcaoSocial } from "../types";
import { useAppToast } from "@hooks/useAppToast";
import { listarAcoes } from "../services";

export function useAcaoListagem() {
    const { showErrorToast } = useAppToast();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<AcaoSocial[]>([]);

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
        fetchAcoes
    }
}