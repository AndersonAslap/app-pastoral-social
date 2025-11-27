import { useState } from "react";
import { AcaoSocial, FiltroStatus, StatusInfo } from "../types";

export const useAcoesSociais = () => {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus["id"]>("ativas");

  // Mock data - Ações sociais focadas em cestas básicas e jantas
  const acoesSociais: AcaoSocial[] = [
    {
      id: 1,
      titulo: "Cestas Básicas Mensais",
      descricao: "Ajude famílias em situação de vulnerabilidade com alimentos essenciais para o mês",
      item: "Cestas Básicas",
      meta: 300,
      arrecadado: 185,
      doadores: 67,
      prazo: "2024-12-31",
      localizacao: "São Paulo, SP",
      imagem: "🛒",
      progresso: 62,
      status: "ativa",
      itensIncluem: ["Arroz", "Feijão", "Óleo", "Açúcar", "Café", "Macarrão", "Farinha"]
    },
    {
      id: 2,
      titulo: "Jantas Solidárias",
      descricao: "Forneça refeições quentes e nutritivas para pessoas em situação de rua",
      item: "Refeições",
      meta: 500,
      arrecadado: 320,
      doadores: 45,
      prazo: "2024-11-30",
      localizacao: "Rio de Janeiro, RJ",
      imagem: "🍽️",
      progresso: 64,
      status: "ativa",
      itensIncluem: ["Refeições completas", "Sopas", "Lanches", "Bebidas"]
    },
    {
      id: 3,
      titulo: "Cestas Natalinas",
      descricao: "Leve alegria e alimento para famílias carentes neste Natal com cestas especiais",
      item: "Cestas Natalinas",
      meta: 200,
      arrecadado: 120,
      doadores: 89,
      prazo: "2024-12-20",
      localizacao: "Belo Horizonte, MG",
      imagem: "🎄",
      progresso: 60,
      status: "ativa",
      itensIncluem: ["Itens da cesta básica", "Panetone", "Chocolate", "Biscoitos"]
    },
    {
      id: 4,
      titulo: "Jantas Comunitárias",
      descricao: "Apoie nossas jantas comunitárias que alimentam centenas de pessoas semanalmente",
      item: "Refeições",
      meta: 1000,
      arrecadado: 750,
      doadores: 112,
      prazo: "2024-10-31",
      localizacao: "Porto Alegre, RS",
      imagem: "👨‍👩‍👧‍👦",
      progresso: 75,
      status: "concluida",
      itensIncluem: ["Almoços", "Jantares", "Café da manhã"]
    },
    {
      id: 5,
      titulo: "Campanha do Agasalho 2024",
      descricao: "Arrecadação de agasalhos para o inverno concluída com sucesso",
      item: "Casacos",
      meta: 800,
      arrecadado: 800,
      doadores: 200,
      prazo: "2024-08-30",
      localizacao: "Curitiba, PR",
      imagem: "🧥",
      progresso: 100,
      status: "concluida",
      itensIncluem: ["Casacos", "Blusas", "Cobertores"]
    }
  ];

  const filtros: FiltroStatus[] = [
    { id: "ativas", nome: "Ações Ativas", icone: "🟢" },
    { id: "concluida", nome: "Concluídas", icone: "✅" },
    { id: "todas", nome: "Todas", icone: "📋" }
  ];

  const acoesFiltradas = acoesSociais.filter(acao => {
    if (filtroStatus === "todas") return true;
    return acao.status === filtroStatus;
  });

  const formatarNumero = (numero: number): string => {
    return numero.toLocaleString('pt-BR');
  };

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusInfo = (status: AcaoSocial["status"]): StatusInfo => {
    switch (status) {
      case "ativa":
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
      case "concluida":
        return { label: "Concluída", cor: "#6B7280", icone: "✅" };
      default:
        return { label: "Ativa", cor: "#10B981", icone: "🟢" };
    }
  };

  return {
    filtroStatus,
    setFiltroStatus,
    acoesFiltradas,
    filtros,
    formatarNumero,
    formatarData,
    getStatusInfo
  };
};