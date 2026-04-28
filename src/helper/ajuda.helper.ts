import { StatusConfig, PriorityConfig } from "@tipagens/ajuda";

export const getStatusConfig = (status: string): StatusConfig => {
  const configs: Record<string, StatusConfig> = {
    'AGUARDANDO_APROVACAO': { color: '$orange500', bgColor: '$orange100', label: 'Pendente' },
    'APROVADA': { color: '$blue500', bgColor: '$blue100', label: 'Em Andamento' },
    'ENTREGUE': { color: '$green500', bgColor: '$green100', label: 'Concluído' }
  };
  return configs[status] || { color: '$gray500', bgColor: '$gray100', label: status };
};