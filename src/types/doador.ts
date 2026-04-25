export interface AcaoSocial {
  id: number;
  titulo: string;
  descricao: string;
  tipoAcao: string;
  totalAcaoSocial: number;
  dataConclusaoAcao: string;
  inicioAcao: string;
  percentualRecebido: string;
  itensRecebidos: number;
  qtdDoadores: number;
  itensGerados: string;
  itens: string[];
  status: string;
  statusAcao?: "EM_ANDAMENTO" | "PLANEJADA" | "CONCLUIDA";
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
  id: "EM_ANDAMENTO" | "PLANEJADA" | "CONCLUIDA" | "TODAS";
  nome: string;
  icone: string;
}

export interface StatusInfo {
  label: string;
  cor: string;
  icone: string;
}

export interface DoacaoFormData {
  idAcao: number | null;
  tipoDoacao: string;
  dataEntrega: string;
  nome: string;
  telefone: string;
  itensProduto: {
    itemProdutoId: number;
    quantidade: number;
  }[]
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