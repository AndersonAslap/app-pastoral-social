import { HStack, Badge, BadgeText, VStack } from "@gluestack-ui/themed";
import { StatusConfig, PriorityConfig } from "../types";

interface AjudaBadgesProps {
  statusConfig: StatusConfig;
}

export const AjudaBadges = ({ statusConfig }: AjudaBadgesProps) => {
  return (
    <VStack alignItems="flex-end" space="xs">
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