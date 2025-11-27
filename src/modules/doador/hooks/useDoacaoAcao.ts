import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DoacaoFormData, AcaoInfo } from '../types';

export const useDoacaoAcao = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  const [formData, setFormData] = useState<DoacaoFormData>({
    nome: "",
    telefone: "",
    email: "",
    tipoDoacao: "",
    itensDoados: "",
    quantidade: "",
    condicaoItens: "novo",
    dataEntrega: "",
    horarioEntrega: "",
    localEntrega: "",
    observacoes: ""
  });

  const [showTipoDoacao, setShowTipoDoacao] = useState(false);
  const [showHorario, setShowHorario] = useState(false);
  const [showCondicao, setShowCondicao] = useState(false);

  // Dados da ação
  const acao: AcaoInfo = {
    id: id,
    titulo: "Cestas Básicas Mensais",
    item: "Cestas Básicas",
    localizacao: "São Paulo, SP",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    responsavel: "Pastoral Social - Paróquia São Francisco",
    telefone: "(11) 9999-9999"
  };

  const tiposDoacao = [
    "Cesta Básica Completa",
    "Alimentos Não Perecíveis",
    "Produtos de Higiene",
    "Roupas e Agasalhos",
    "Produtos de Limpeza",
    "Outros"
  ];

  const horariosDisponiveis = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "14:00 - 16:00", 
    "16:00 - 18:00",
    "18:00 - 20:00"
  ];

  const condicoesItens = [
    "Novo (Lacrado/Etiquetado)",
    "Semi-novo (Pouco uso)",
    "Usado (Bom estado)"
  ];

  const handleInputChange = (field: keyof DoacaoFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelect = (field: keyof DoacaoFormData, value: string, setShow: (show: boolean) => void) => {
    handleInputChange(field, value);
    setShow(false);
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Dados da doação:", {
      acaoId: acao.id,
      ...formData
    });
    
    /*
    navigation.navigate("confirmacaoDoacao", { 
      acao: acao,
      doacao: formData 
    });
    */
  };

  const isFormValid = (): boolean => {
    return (
      formData.nome.trim() !== "" &&
      formData.telefone.trim() !== "" &&
      formData.tipoDoacao.trim() !== "" &&
      formData.itensDoados.trim() !== "" &&
      formData.quantidade.trim() !== "" &&
      formData.dataEntrega.trim() !== "" &&
      formData.horarioEntrega.trim() !== ""
    );
  };

  return {
    formData,
    acao,
    tiposDoacao,
    horariosDisponiveis,
    condicoesItens,
    showTipoDoacao,
    showHorario,
    showCondicao,
    setShowTipoDoacao,
    setShowHorario,
    setShowCondicao,
    handleInputChange,
    handleSelect,
    handleSubmit,
    isFormValid
  };
};