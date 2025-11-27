export interface AcaoSocial {
  id: number;
  titulo: string;
  descricao: string;
  item: string;
  meta: number;
  arrecadado: number;
  doadores: number;
  prazo: string;
  localizacao: string;
  imagem: string;
  progresso: number;
  status: "ativa" | "concluida";
  itensIncluem: string[];
}

export interface AcaoSocialDetalhe extends AcaoSocial {
  endereco: string;
  categoria: string;
  responsavel: string;
  telefone: string;
  email: string;
  itensIncluem: string[];
  beneficiarios: string;
  impacto: string;
}

export interface FiltroStatus {
  id: "ativas" | "concluida" | "todas";
  nome: string;
  icone: string;
}

export interface StatusInfo {
  label: string;
  cor: string;
  icone: string;
}

export interface DoacaoFormData {
  nome: string;
  telefone: string;
  email: string;
  tipoDoacao: string;
  itensDoados: string;
  quantidade: string;
  condicaoItens: string;
  dataEntrega: string;
  horarioEntrega: string;
  localEntrega: string;
  observacoes: string;
}

export interface AcaoInfo {
  id: number;
  titulo: string;
  item: string;
  localizacao: string;
  endereco: string;
  responsavel: string;
  telefone: string;
}

export interface CustomSelectProps {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  show: boolean;
  setShow: (show: boolean) => void;
}