import { useState } from "react";
import { 
  Estatisticas, 
  DistribuicaoMensal, 
  StatusItem, 
  ProductItem, 
  RegionItem, 
  TrendItem 
} from '../types';

export const useRelatorioData = () => {
  const [periodo, setPeriodo] = useState<string>('mes');

  const estatisticas: Estatisticas = {
    totalCestas: 245,
    cestasEntregues: 189,
    cestasPendentes: 32,
    cestasCanceladas: 24,
    valorTotal: 45890.50,
    familiasAtendidas: 156,
    produtoMaisDistribuido: "Arroz",
    cidadeMaisAtendida: "Centro"
  };

  const distribuicaoMensal: DistribuicaoMensal[] = [
    { mes: "Jan", cestas: 45 },
    { mes: "Fev", cestas: 52 },
    { mes: "Mar", cestas: 38 },
    { mes: "Abr", cestas: 67 },
    { mes: "Mai", cestas: 58 },
    { mes: "Jun", cestas: 72 }
  ];

  const statusCestas: StatusItem[] = [
    { status: "Entregues", quantidade: 189, porcentagem: 77, color: "$green500" },
    { status: "Pendentes", quantidade: 32, porcentagem: 13, color: "$orange500" },
    { status: "Preparando", quantidade: 18, porcentagem: 7, color: "$blue500" },
    { status: "Canceladas", quantidade: 6, porcentagem: 3, color: "$red500" }
  ];

  const produtosMaisDistribuidos: ProductItem[] = [
    { produto: "Arroz", quantidade: 890, color: "$blue400" },
    { produto: "Feijão", quantidade: 756, color: "$green400" },
    { produto: "Açúcar", quantidade: 623, color: "$yellow400" },
    { produto: "Óleo", quantidade: 587, color: "$orange400" },
    { produto: "Macarrão", quantidade: 534, color: "$purple400" }
  ];

  const regioesAtendidas: RegionItem[] = [
    { regiao: "Centro", quantidade: 89, color: "$blue500" },
    { regiao: "Zona Norte", quantidade: 67, color: "$green500" },
    { regiao: "Zona Sul", quantidade: 45, color: "$orange500" },
    { regiao: "Zona Leste", quantidade: 32, color: "$purple500" },
    { regiao: "Zona Oeste", quantidade: 12, color: "$red500" }
  ];

  const tendenciaMensal: TrendItem[] = [
    { mes: "Jan", cestas: 45, crescimento: 0 },
    { mes: "Fev", cestas: 52, crescimento: 15 },
    { mes: "Mar", cestas: 38, crescimento: -27 },
    { mes: "Abr", cestas: 67, crescimento: 76 },
    { mes: "Mai", cestas: 58, crescimento: -13 },
    { mes: "Jun", cestas: 72, crescimento: 24 }
  ];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return {
    periodo,
    setPeriodo,
    estatisticas,
    distribuicaoMensal,
    statusCestas,
    produtosMaisDistribuidos,
    regioesAtendidas,
    tendenciaMensal,
    formatCurrency
  };
};