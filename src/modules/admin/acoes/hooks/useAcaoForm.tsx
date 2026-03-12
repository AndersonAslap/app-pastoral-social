import { useCallback, useEffect, useState } from "react";
import { AcaoSocialFormData } from "../types";
import { getItemProdutosOpcaoLista } from "@services/get-opcao-lista.service";
import { cadastrarAcao } from "../services";
import { useFocusEffect } from "@react-navigation/native";

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
    titulo: createDefaultField(),
    dataEvento: createDefaultField(),
    tipoAcao: createDefaultField()
});

const initialState = () => ({
    titulo: "",
    descricao: "",
    dataEvento: "",
    tipoAcao: "",
    qtdAcaoSocial: 0,
    itens: []
});

export function useAcaoSocialForm() {
    const [form, setForm] = useState<AcaoSocialFormData>(initialState());
    const [fieldState, setFieldState] = useState(createInitialFieldState());
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState<{itemProdutoId: number, quantidade: number}[]>([]);

    const requiredFields: (keyof typeof fieldState)[] = [
        "dataEvento",
        "tipoAcao",
        "titulo"
    ];

    const resetForm = useCallback(() => {
        setForm(initialState());
        setProdutosSelecionados([]);
        setFieldState(createInitialFieldState());
    }, []);

    const handleChange = (field: keyof AcaoSocialFormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const formValidate = (payload: AcaoSocialFormData) => {
        let hasError = false;
        const newFieldState = createInitialFieldState();
    
        requiredFields.forEach(field => {
          const value = payload[field];
          if (!value || (typeof value === "string" && !value.trim())) {
            newFieldState[field] = {
              error: true,
              message: "Campo obrigatório"
            };
            hasError = true;
          }
        });
    
        setFieldState(newFieldState);
    
        return !hasError;
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            if (!formValidate(form)) return;

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

    const fetchProdutos = async () => {
        const produtosResponse = await getItemProdutosOpcaoLista();
        setProdutos(produtosResponse);
    }

    useEffect(() => {
        fetchProdutos();
    }, []);

    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    return {
        form,
        fieldState,
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