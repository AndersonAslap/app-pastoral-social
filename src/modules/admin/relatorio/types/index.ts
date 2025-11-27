export interface ChartDataItem {
  label: string;
  value: number;
}

export interface StatusItem {
  status: string;
  quantidade: number;
  porcentagem: number;
  color: string;
}

export interface ProductItem {
  produto: string;
  quantidade: number;
  color: string;
}

export interface RegionItem {
  regiao: string;
  quantidade: number;
  color: string;
}

export interface TrendItem {
  mes: string;
  cestas: number;
  crescimento: number;
}

export interface Estatisticas {
  totalCestas: number;
  cestasEntregues: number;
  cestasPendentes: number;
  cestasCanceladas: number;
  valorTotal: number;
  familiasAtendidas: number;
  produtoMaisDistribuido: string;
  cidadeMaisAtendida: string;
}

export interface DistribuicaoMensal {
  mes: string;
  cestas: number;
}