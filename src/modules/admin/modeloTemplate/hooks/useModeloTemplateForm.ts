import { useState, useCallback } from 'react';
import { useAppToast } from "@shared/hooks/useAppToast";
import { consultaGeracaoTemplateService, GeracaoTemplateService } from "../services";
import { listarItensService } from "../../estoque/services";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { EstoqueStatus, Product, TemplateForm, TemplateItem } from '../types';
import { useFetchData } from '@hooks/useFetchData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@shared/routes/app.routes';

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
  templateDesc: createDefaultField(),
  templateType: createDefaultField(),
});

const initialState = () => ({
  qtdGeracaoPossivel: 0,
  templateDesc: "",
  templateType: undefined,
  gerarCestas: false,
  templateItens: [{ itemProdutoId: "", quantidade: 0 }]
});

export const useModeloTemplateForm = () => {
  const { showErrorToast, showSuccessToast } = useAppToast();

  const [form, setForm] = useState<TemplateForm>(initialState());
  const [fieldState, setFieldState] = useState(createInitialFieldState());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [calculatingGenerations, setCalculatingGenerations] = useState(false);
  const [qtdGeracaoPossivelShow, setQtdGeracaoPossivelShow] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // Hook genérico para fetch de produtos
  const { 
    data: produtos, 
    refetch: fetchProdutos 
  } = useFetchData({
    fetchFunction: listarItensService,
    initialData: []
  });

  const produtosOptions = produtos.map((item: Product) => ({ 
    label: item.nome, 
    value: item.id.toString() 
  }));

  const requiredFields: (keyof typeof fieldState)[] = [
    "templateDesc",
    "templateType"
  ];

  const resetForm = useCallback(() => {
    setForm(initialState());
    setQtdGeracaoPossivelShow(false);
        setFieldState(createInitialFieldState());
  }, []);


  const handleChange = useCallback((field: keyof TemplateForm, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const formValidate = (payload: TemplateForm) => {
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

  const handleItemChange = useCallback((index: number, field: keyof TemplateItem, value: any) => {
    const newItems = [...form.templateItens];
    newItems[index] = { ...newItems[index], [field]: value };
    
    setForm(prev => ({
      ...prev,
      qtdGeracaoPossivel: 0,
      templateItens: newItems
    }));
    setQtdGeracaoPossivelShow(false);
  }, [form.templateItens]);

  const handleAddItem = useCallback(() => {
    setForm(prev => ({
      ...prev,
      qtdGeracaoPossivel: 0,
      templateItens: [...prev.templateItens, { itemProdutoId: "", quantidade: 0 }]
    }));
    setQtdGeracaoPossivelShow(false);
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    const newItems = [...form.templateItens];
    newItems.splice(index, 1);
    setForm(prev => ({
      ...prev,
      qtdGeracaoPossivel: 0,
      templateItens: newItems
    }));
    setQtdGeracaoPossivelShow(false);
  }, []);

  const getQuantidadeEstoque = useCallback((itemProdutoId: string): number => {
    if (!itemProdutoId) return 0;
    const produto = produtos.find((p: Product) => p.id.toString() === itemProdutoId);
    return produto ? (produto as Product)?.quantidadeEstoque : 0;
  }, [produtos]);

  const getProdutoInfo = useCallback((itemProdutoId: string): Product | undefined => {
    if (!itemProdutoId) return undefined;
    return produtos.find((p: Product) => p.id.toString() === itemProdutoId);
  }, [produtos]);

  const getEstoqueStatus = useCallback((itemProdutoId: string, quantidade: number): EstoqueStatus => {
    const estoque = getQuantidadeEstoque(itemProdutoId);
    if (estoque === 0) return { status: "sem-estoque", color: "$red" };
    if (quantidade > estoque) return { status: "insuficiente", color: "$orange" };
    if (quantidade === estoque) return { status: "exato", color: "$blue" };
    return { status: "suficiente", color: "$green" };
  }, [getQuantidadeEstoque]);

  const handleCalculateGenerations = useCallback(async () => {
    setQtdGeracaoPossivelShow(false);
    setCalculatingGenerations(true);
    try {
      const payload = { templateItens: [...form.templateItens] };
      const quantidadePossivel = await consultaGeracaoTemplateService(payload);
      setForm(prev => ({ ...prev, qtdGeracaoPossivel: quantidadePossivel }));
      setQtdGeracaoPossivelShow(true);
    } catch (error) {
      showErrorToast({ title: "Erro ao calcular gerações" });
    } finally {
      setCalculatingGenerations(false);
    }
  }, [form.templateItens, showErrorToast]);

  const handleSubmit = useCallback(async () => {
    setFormSubmitting(true);
    try {
      const payload = { 
        ...form, 
        template: {
          templateDesc: form.templateDesc,
          templateType: form.templateType,
        } 
      };
      if (!formValidate(payload)) return;
      await GeracaoTemplateService(payload);
      setForm(initialState);
      showSuccessToast({ title: "Modelo cadastrado com sucesso!" });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
      showErrorToast({ title });
    } finally {
      setFormSubmitting(false);
    }
  }, [form, showSuccessToast, showErrorToast]);

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [])
  );

  return {
    form,
    formSubmitting,
    calculatingGenerations,
    qtdGeracaoPossivelShow,
    produtos,
    produtosOptions,
    fieldState,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    getQuantidadeEstoque,
    getProdutoInfo,
    getEstoqueStatus,
    handleCalculateGenerations,
    handleSubmit,
    resetForm,
    fetchProdutos
  };
};