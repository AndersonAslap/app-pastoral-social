import { StatusConfig } from "../types";

export const getStatusConfig = (status: string): StatusConfig => {
  const config: Record<string, StatusConfig> = {
    planejada: { color: "$blue", bg: "$blue100", text: "$blue700", label: "Planejada" },
    em_andamento: { color: "$orange", bg: "$orange100", text: "$orange700", label: "Em Andamento" },
    concluida: { color: "$green", bg: "$green100", text: "$green700", label: "Concluída" },
    cancelada: { color: "$red", bg: "$red100", text: "$red700", label: "Cancelada" }
  };
  return config[status] || config.planejada;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const calculateStats = (acoes: any[]): any => {
  return {
    total: acoes.length,
    planejadas: acoes.filter(a => a.status === 'planejada').length,
    emAndamento: acoes.filter(a => a.status === 'em_andamento').length,
    concluidas: acoes.filter(a => a.status === 'concluida').length
  };
};