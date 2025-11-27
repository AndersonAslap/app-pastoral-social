// utils/ajudaConfig.ts
import { AlertTriangle, Flag } from "lucide-react-native";
import { StatusConfig, PriorityConfig } from "../types";

export const getStatusConfig = (status: string): StatusConfig => {
  const configs: Record<string, StatusConfig> = {
    'pendente': { color: '$orange500', bgColor: '$orange100', label: 'Pendente' },
    'em andamento': { color: '$blue500', bgColor: '$blue100', label: 'Em Andamento' },
    'concluído': { color: '$green500', bgColor: '$green100', label: 'Concluído' }
  };
  return configs[status] || { color: '$gray500', bgColor: '$gray100', label: status };
};

export const getPriorityConfig = (priority: string): PriorityConfig => {
  const configs: Record<string, PriorityConfig> = {
    'alta': { 
      color: '$red500', 
      bgColor: '$red100', 
      label: 'Alta', 
      icon: AlertTriangle 
    },
    'media': { 
      color: '$yellow500', 
      bgColor: '$yellow100', 
      label: 'Média', 
      icon: Flag 
    },
    'baixa': { 
      color: '$green500', 
      bgColor: '$green100', 
      label: 'Baixa', 
      icon: Flag 
    }
  };
  return configs[priority] || { 
    color: '$gray500', 
    bgColor: '$gray100', 
    label: 'Sem', 
    icon: Flag 
  };
};

export const calculateStats = (items: any[]): any => {
  return {
    total: items.length,
    pending: items.filter(item => item.status === 'pendente').length,
    inProgress: items.filter(item => item.status === 'em andamento').length,
    completed: items.filter(item => item.status === 'concluído').length,
  };
};