export type AcaoSocialStatus = 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';

export interface AcaoSocial {
  id: number;
  titulo: string;
  descricao: string;
  tipoAcao: string;
  totalAcaoSocial: number;
  dataConclusaoAcao: string;
  percentualRecebido: string;
  itensRecebidos: number;
  qtdDoadores: number;
  itensGerados: number;
  itens: string[];
}

export interface AcaoSocialStats {
  total: number;
  planejadas: number;
  emAndamento: number;
  concluidas: number;
}

export interface StatusConfig {
  color: string;
  bg: string;
  text: string;
  label: string;
}

export interface AcaoSocialFormData {
  titulo: string;
  descricao: string;
  dataEvento: string;
  tipoAcao: string;
  qtdAcaoSocial: number;
  itens: Array<{ itemProdutoId: number, quantidade: number }>;
}