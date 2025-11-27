import { useRoute, useNavigation } from "@react-navigation/native";
import { AcaoSocialDetalhe } from '../types';
import { AuthNavigatorRoutesProps } from "@shared/routes/auth.routes";

export const useAcaoDetalhe = () => {
  const route = useRoute();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { id } = route.params as { id: number };

  // Mock data - Buscar ação pelo ID (em uma aplicação real, isso viria de uma API)
  const acao: AcaoSocialDetalhe = {
    id: 1,
    titulo: "Cestas Básicas Mensais",
    descricao: "Ajude famílias em situação de vulnerabilidade com alimentos essenciais para o mês todo. Cada cesta básica contém itens fundamentais para a alimentação de uma família de 4 pessoas por até 30 dias.",
    item: "Cestas Básicas",
    meta: 300,
    arrecadado: 185,
    doadores: 67,
    prazo: "2024-12-31",
    localizacao: "São Paulo, SP",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    imagem: "🛒",
    progresso: 62,
    status: "ativa",
    categoria: "Alimentação",
    responsavel: "Pastoral Social - Paróquia São Francisco",
    telefone: "(11) 9999-9999",
    email: "contato@pastoralsocial.org",
    itensIncluem: [
      "Arroz (5kg)",
      "Feijão (2kg)", 
      "Óleo de Soja (900ml)",
      "Açúcar (2kg)",
      "Café (500g)",
      "Macarrão (1kg)",
      "Farinha de Trigo (1kg)",
      "Sal (1kg)",
      "Molho de Tomate (2 unidades)",
      "Sardinha em Lata (2 unidades)",
      "Leite em Pó (1kg)",
      "Bolacha Maria (1 pacote)"
    ],
    beneficiarios: "Famílias em situação de vulnerabilidade social cadastradas no programa",
    impacto: "185 famílias beneficiadas mensalmente"
  };

  const formatarNumero = (numero: number): string => {
    return numero.toLocaleString('pt-BR');
  };

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleDoar = () => {
    navigation.navigate("doacaoAcao", { id: acao.id });
  };

  return {
    acao,
    formatarNumero,
    formatarData,
    handleDoar
  };
};