export type HelpPriority = 'alta' | 'media' | 'baixa';

export type HelpStatus = 'pendente' | 'em andamento' | 'concluído';

export interface Help {
  id: number;
  representante: string;
  statusAjuda: string;
  tipoAjuda: string;
  endereco?: string;
  dataEntrega?: string | null;
  cesta: {
    identificadorCesta: string;
    descricao: string;
    items: {
      nomeProduto: string;
      quantidade: number;
      detalhe: string;
    }[]
  }
}

export interface HelpStats {
  total: number;
  pending: number;
  completed: number;
}

export interface StatusConfig {
  color: string;
  bgColor: string;
  label: string;
}

export interface PriorityConfig {
  color: string;
  bgColor: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface AjudaFormData {
  idFamilia: string | undefined;
  idTipoAjuda: string | undefined;
  observacao: string;
  idTemplate: string | undefined;
}