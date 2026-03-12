import { useCallback, useEffect, useState } from 'react';
import { useAppToast } from "@shared/hooks/useAppToast";
import { cadastrarEstoqueService, listarItemProdutosOptionsService } from "../services";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { IProduto, IProdutoPayload } from "../types";
import { SelectOptions } from "@shared/types";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
  itemProdutoId: createDefaultField(),
  quantidade: createDefaultField(),
  validade: createDefaultField()
});

const initialState = () => ({
    itemProdutoId: undefined,
    quantidade: 0,
    validade: null
});

export const useEstoqueForm = () => {
    const navigation = useNavigation();
    const { showErrorToast, showSuccessToast } = useAppToast();
    
    const [form, setForm] = useState<IProduto>(initialState());
    const [fieldState, setFieldState] = useState(createInitialFieldState());
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [produtosOptions, setProdutosOptions] = useState<SelectOptions[]>([]);

    const requiredFields: (keyof typeof fieldState)[] = [
        "itemProdutoId",
        "quantidade",
        "validade"
    ];

    const resetForm = useCallback(() => {
        setForm(initialState());
        setFieldState(createInitialFieldState());
    }, []);

    const handleCancel = () => {
        resetForm();
        navigation.goBack();
    };

    const handleChange = (field: keyof IProduto, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formValidate = (payload: IProdutoPayload) => {
        let hasError = false;
        const newFieldState = createInitialFieldState();

        requiredFields.forEach(field => {
            const value = payload[field];
            if (field === "quantidade") {       
                if (typeof value === "number" && value <= 0) {
                    newFieldState[field] = {
                        error: true,
                        message: "Quantidade deve ser maior que 0"
                    };
                    hasError = true;
                }
            } else {
                if (!value) {
                    newFieldState[field] = {
                        error: true,
                        message: "Campo obrigatório"
                    };
                    hasError = true;
                }
            }
        });

        setFieldState(newFieldState);

        return !hasError;
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = { 
                ...form, 
                quantidade: Number(form.quantidade),
                itemProdutoId: Number(form.itemProdutoId) 
            };

            if (!formValidate(payload)) return;
            
            await cadastrarEstoqueService(payload);
            resetForm();
            showSuccessToast({ title: "Produto cadastrado com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            showErrorToast({ title: isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER });
        } finally {
            setFormSubmitting(false);
        }
    };

    const loadProdutosOptions = async () => {
        try {
            const data = await listarItemProdutosOptionsService();
            setProdutosOptions(data || []);
        } catch (error) {
            const isAppError = error instanceof AppError;
            showErrorToast({ title: isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS });
        }
    };

    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    useEffect(() => {
        loadProdutosOptions();
    }, []);

    return {
        form,
        fieldState,
        formSubmitting,
        produtosOptions,
        handleChange,
        handleSubmit,
        handleCancel,
        resetForm
    };
};