import { useState } from "react";
import { DoacaoFormData } from '@tipagens/doador';
import { Masks } from "@utils/masks";
import { useAppToast } from "@hooks/useAppToast";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useNavigation } from "@react-navigation/native";
import { cadastrarDoacao } from "@services/doador";

const tiposDoacao = [
  "Cesta Básica Completa",
  "Alimentos Não Perecíveis",
  "Produtos de Higiene",
  "Roupas e Agasalhos",
  "Produtos de Limpeza",
  "Outros"
];

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
  tipoDoacao: createDefaultField(),
  dataEntrega: createDefaultField(),
  nome: createDefaultField(),
  telefone: createDefaultField()
});

const initialState = () => ({
  idAcao: null,
  tipoDoacao: "",
  dataEntrega: "",
  nome: "",
  telefone: "",
  itensProduto: []
});

export const useDoacaoAcao = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { phone, unmask } = Masks;
  const { showErrorToast, showSuccessToast } = useAppToast();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<DoacaoFormData>(initialState());
  const [fieldState, setFieldState] = useState(createInitialFieldState());

  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<{itemProdutoId: number, quantidade: number}[]>([]);

    const requiredFields: (keyof typeof fieldState)[] = [
      "nome",
      "telefone",
      "dataEntrega"
    ];
  
  const handleInputChange = (field: string, value: any) => {
    if (field === "telefone") value = phone(value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  
  const formValidate = (payload: DoacaoFormData) => {
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
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
      };

      if (!formValidate(payload)){
        showErrorToast({title: "Por favor, preencha todos os campos obrigatórios."});
        return;
      };

      if (payload.itensProduto.length === 0) {
        showErrorToast({title: "Por favor, selecione pelo menos um item para doação."});
        return;
      }

      const payloadToSubmit = {
        idAcao: payload.idAcao,
        tipoDoacao: "PRODUTO",
        dataEntrega: payload.dataEntrega.toString().split("T")[0],
        doador: {
          nomeDoador: payload.nome,
          telefone: unmask(payload.telefone)
        },
        itensProduto: payload.itensProduto.map((item: any) => ({
          idItemProduto: parseInt(item.itemProdutoId),
          quantidade: item.quantidade
        })),
      };

      await cadastrarDoacao(payloadToSubmit);

      navigation.navigate("doacaoAgradecimento", { nome: formData.nome });
    } catch (error) {
      setSubmitting(false);
      console.error("Erro ao processar doação:", error);
      showErrorToast({title: "Ocorreu um erro ao processar sua doação. Por favor, tente novamente."});
      return;
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
  
      
      setFormData(prevForm => ({
          ...prevForm,
          itensProduto: produtosSelecionados.map(item => ({ itemProdutoId: item.itemProdutoId, quantidade: item.quantidade }))
      }));
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
  
        
        setFormData(prevForm => ({
            ...prevForm,
            itensProduto: produtosSelecionados.map(item => ({ itemProdutoId: item.itemProdutoId, quantidade: item.quantidade }))
        }));
    }
  

  return {
    formData,
    fieldState,
    produtos,
    produtosSelecionados,
    submitting,
    setProdutos,
    handleInputChange,
    handleSubmit,
    setFormData,
    handleProdutoToggle,
    handleProdutoChangeQuantidade
  };
};