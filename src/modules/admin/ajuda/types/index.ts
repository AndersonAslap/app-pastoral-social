export type HelpPriority = 'alta' | 'media' | 'baixa';

export type HelpStatus = 'pendente' | 'em andamento' | 'concluído';

export interface Help {
  id: number;
  familyName: string;
  representative: string;
  helpName: string;
  status: HelpStatus;
  date?: string;
  itemsCount?: number;
  priority?: HelpPriority;
  address?: string;
}

export interface HelpStats {
  total: number;
  pending: number;
  inProgress: number;
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