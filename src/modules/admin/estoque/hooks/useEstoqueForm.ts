import { useState } from 'react';
import { useAppToast } from "@shared/hooks/useAppToast";
import { cadastrarEstoqueService, listarItemProdutosOptionsService } from "../services";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { IProduto } from "../types";
import { SelectOptions } from "@shared/types";

export const useEstoqueForm = () => {
    const { showErrorToast, showSuccessToast } = useAppToast();
    
    const [form, setForm] = useState<Partial<IProduto>>({
        quantidade: 1,
        validade: null
    });
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [produtosOptions, setProdutosOptions] = useState<SelectOptions[]>([]);

    const handleChange = (field: keyof IProduto, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setFormSubmitting(true);
        try {
            const payload = { 
                ...form, 
                quantidade: Number(form.quantidade) || 1,
                itemProdutoId: Number(form.itemProdutoId) 
            };
            await cadastrarEstoqueService(payload);
            resetForm();
            showSuccessToast({ title: "Produto cadastrado com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
    };

    const validateForm = (): boolean => {
        if (!form.itemProdutoId) {
            showErrorToast({ title: "Selecione um produto" });
            return false;
        }
        if (!form.quantidade || Number(form.quantidade) <= 0) {
            showErrorToast({ title: "Informe uma quantidade válida" });
            return false;
        }
        return true;
    };

    const loadProdutosOptions = async () => {
        try {
            const data = await listarItemProdutosOptionsService();
            setProdutosOptions(data || []);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            showErrorToast({ title });
        }
    };

    const resetForm = () => {
        setForm({
            quantidade: 1,
            itemProdutoId: "",
            validade: null
        });
    };

    return {
        form,
        formSubmitting,
        produtosOptions,
        handleChange,
        handleSubmit,
        resetForm,
        loadProdutosOptions
    };
};