import { getDaysDifference, getExpiryStatus } from "@utils/functions";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react-native";

const getExpiryConfig = (dateString: string) => {
    const status = getExpiryStatus(dateString);
    const diffDays = getDaysDifference(dateString);

    const configs = {
        expired: {
            icon: AlertTriangle,
            badgeColor: "$red500",
            badgeBg: "$red100",
            badgeText: "$red700",
            borderColor: "$red300",
            bgColor: "$red50",
            textColor: "$red700",
            label: `VENCIDO • ${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? 's' : ''} atrás`,
            daysText: `${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? 's' : ''} atrás`
        },
        warning: {
            icon: AlertTriangle,
            badgeColor: "$orange500",
            badgeBg: "$orange100",
            badgeText: "$orange700",
            borderColor: "$orange300",
            bgColor: "$orange50",
            textColor: "$orange700",
            label: `VENCE EM ${diffDays} DIA${diffDays !== 1 ? 'S' : ''}`,
            daysText: `${diffDays} dia${diffDays !== 1 ? 's' : ''}`
        },
        attention: {
            icon: Clock,
            badgeColor: "$blue500",
            badgeBg: "$blue100",
            badgeText: "$blue700",
            borderColor: "$blue300",
            bgColor: "$blue50",
            textColor: "$blue700",
            label: `VENCE EM ${diffDays} DIAS`,
            daysText: `${diffDays} dias`
        },
        normal: {
            icon: CheckCircle,
            badgeColor: "$green500",
            badgeBg: "$green100",
            badgeText: "$green700",
            borderColor: "$green300",
            bgColor: "$backgroundLight100",
            textColor: "$textDark800",
            label: "DENTRO DO PRAZO",
            daysText: `${diffDays} dias`
        }
    };

    return configs[status as keyof typeof configs] || configs.normal;
};

export {
    getExpiryConfig
};