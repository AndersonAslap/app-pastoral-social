import { HStack, Badge, BadgeText, VStack } from "@gluestack-ui/themed";
import { StatusConfig, PriorityConfig } from "../types";

interface AjudaBadgesProps {
  statusConfig: StatusConfig;
  priorityConfig: PriorityConfig;
}

export const AjudaBadges = ({ statusConfig, priorityConfig }: AjudaBadgesProps) => {
  const PriorityIcon = priorityConfig.icon;

  return (
    <VStack alignItems="flex-end" space="xs">
      {/* Badge de Prioridade */}
      <Badge 
        size="sm" 
        variant="solid" 
        bg={priorityConfig.bgColor}
        borderColor={priorityConfig.color}
        borderWidth={1}
        borderRadius="$full"
      >
        <HStack space="xs" alignItems="center">
          <PriorityIcon size={10} color={priorityConfig.color} />
          <BadgeText color={priorityConfig.color} fontWeight="$bold" size="xs">
            {priorityConfig.label}
          </BadgeText>
        </HStack>
      </Badge>
      
      {/* Badge de Status */}
      <Badge 
        size="md" 
        variant="solid" 
        bg={statusConfig.bgColor}
        borderColor={statusConfig.color}
        borderWidth={1}
        borderRadius="$full"
      >
        <BadgeText color={statusConfig.color} fontWeight="$bold" size="xs">
          {statusConfig.label}
        </BadgeText>
      </Badge>
    </VStack>
  );
};