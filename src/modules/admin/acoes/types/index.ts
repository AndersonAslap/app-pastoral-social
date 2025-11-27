export type AcaoSocialStatus = 'planejada' | 'em_andamento' | 'concluida' | 'cancelada';

export interface AcaoSocial {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  local: string;
  itensArrecadacao: string[];
  status: AcaoSocialStatus;
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