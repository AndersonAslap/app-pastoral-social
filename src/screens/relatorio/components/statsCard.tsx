import React from 'react';
import { Text, HStack, Box, Badge, BadgeText, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  badgeText?: string;
  progressValue?: number;
  secondaryText?: string;
  minWidth?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  icon: Icon, 
  iconColor, 
  badgeText, 
  progressValue,
  secondaryText,
  minWidth = 180 
}) => {
  const getIconBgColor = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      '#3B82F6': '$blue100',
      '#10B981': '$green100',
      '#F59E0B': '$orange100',
      '#8B5CF6': '$purple100'
    };
    return colorMap[color] || '$blue100';
  };

  return (
    <Box bg="$white" p="$4" borderRadius="$xl" minWidth={minWidth}>
      <HStack alignItems="center" space="sm" mb="$2">
        <Box bg={getIconBgColor(iconColor)} p="$2" borderRadius="$full">
          <Icon size={20} color={iconColor} />
        </Box>
        <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
          {value}
        </Text>
      </HStack>
      <Text fontSize="$sm" color="$textDark500">{label}</Text>
      
      {badgeText && (
        <Badge size="sm" bg="$green100" mt="$1">
          <BadgeText color="$green700" fontSize="$2xs">{badgeText}</BadgeText>
        </Badge>
      )}
      
      {progressValue !== undefined && (
        <Progress value={progressValue} size="sm" bg="$backgroundLight200" mt="$1">
          <ProgressFilledTrack bg="$green500" />
        </Progress>
      )}
      
      {secondaryText && (
        <Text fontSize="$xs" color="$textDark400">{secondaryText}</Text>
      )}
    </Box>
  );
};