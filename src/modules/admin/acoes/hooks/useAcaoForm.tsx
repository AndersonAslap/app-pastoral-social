import { useEffect, useState } from "react";
import { AcaoSocialFormData } from "../types";
import { getItemProdutosOpcaoLista } from "@services/get-opcao-lista.service";
import { cadastrarAcao } from "../services";

export function useAcaoSocialForm() {
    const [form, setForm] = useState<AcaoSocialFormData>({
        titulo: "",
        descricao: "",
        dataEvento: "",
        tipoAcao: "",
        qtdAcaoSocial: 0,
        itens: []
    });
    
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState<{itemProdutoId: number, quantidade: number}[]>([]);

    const handleChange = (field: keyof AcaoSocialFormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleProdutoToggle = (produtoId: number) => {
        setProdutosSelecionados(prev => {
            const itemIndex = prev.findIndex(item => item.itemProdutoId === produtoId);
            if (itemIndex !== -1) {
                return prev.filter((_, index) => index !== itemIndex);
            } else {
                return [...prev, { itemProdutoId: produtoId, quantidade: 1 }];
            }
        });

        setForm(prevForm => ({
            ...prevForm,
            itens: produtosSelecionados.map(item => ({ itemProdutoId: item.itemProdutoId, quantidade: item.quantidade }))
        }));
        
        return produtosSelecionados;
    }

    const handleProdutoChangeQuantidade = (produtoId: number, quantidade: number) => {
        setProdutosSelecionados(prev => {
            const itemIndex = prev.findIndex(item => item.itemProdutoId === produtoId);
            if (itemIndex !== -1) {
                return prev.map((item, index) => 
                    index === itemIndex ? { ...item, quantidade } : item
                );
            } else {
                return [...prev, { itemProdutoId: produtoId, quantidade }];
            }
        });

        setForm(prevForm => ({
            ...prevForm,
            itens: produtosSelecionados.map(item => ({ itemProdutoId: item.itemProdutoId, quantidade: item.quantidade }))
        }));
        
        return produtosSelecionados;
    }

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            // Aqui você implementa a lógica de submit
            const payload = {
                titulo: form.titulo,
                descricao: form.descricao,
                dataEvento: "2026-03-28",
                tipoAcao: form.tipoAcao,
                qtdAcaoSocial: parseInt(form.qtdAcaoSocial.toString()),
                itens: produtosSelecionados
            };
            console.log("Payload para cadastro:", JSON.stringify(payload, null, 2));
            await cadastrarAcao(payload);
            resetForm();
            console.log("Submitting ação social:", JSON.stringify(payload, null, 2));
        } catch (error) {
            console.error(error);
        } finally {
            setFormSubmitting(false);
        }
    };

    const fetchProdutos = async () => {
        const produtosResponse = await getItemProdutosOpcaoLista();
        setProdutos(produtosResponse);
    }

    useEffect(() => {
        fetchProdutos();
    }, []);

    const resetForm = () => {
        setForm({
            titulo: "",
            descricao: "",
            dataEvento: "",
            tipoAcao: "",
            qtdAcaoSocial: 0,
            itens: []
        });
        setProdutosSelecionados([]);
    };

    return {
        form,
        formSubmitting,
        produtos,
        produtosSelecionados,
        handleChange,
        handleProdutoToggle,
        handleProdutoChangeQuantidade,
        handleSubmit,
        resetForm
    };
}