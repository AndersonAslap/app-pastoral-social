// utils/cestaStatus.ts
import { Clock, Package, CheckCircle, AlertTriangle } from "lucide-react-native";
import { StatusConfig } from "../types";

export const getStatusConfig = (status: string): StatusConfig => {
  const config: Record<string, StatusConfig> = {
    CRIADA: { 
      color: "$orange", 
      bg: "$orange100", 
      text: "$orange700", 
      iconColor: "orange", 
      icon: Clock, 
      label: "Criada" 
    },
    RESERVADA: { 
      color: "$blue", 
      bg: "$blue100", 
      text: "$blue700", 
      iconColor: "blue", 
      icon: Package, 
      label: "Reservada" 
    },
    ENTREGUE: { 
      color: "$green", 
      bg: "$green100", 
      text: "$green700", 
      iconColor: "green", 
      icon: CheckCircle, 
      label: "Entregue" 
    },
    CANCELADA: { 
      color: "$red", 
      bg: "$red100", 
      text: "$red700", 
      iconColor: "red", 
      icon: AlertTriangle, 
      label: "Cancelada" 
    }
  };
  return config[status] || config.CRIADA;
};

export const getProgressValue = (status: string): number => {
  const progress = {
    CRIADA: 25,
    RESERVADA: 75,
    ENTREGUE: 100,
    CANCELADA: 0
  };
  return progress[status as keyof typeof progress] || 0;
};