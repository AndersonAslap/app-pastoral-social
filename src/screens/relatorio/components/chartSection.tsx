import React from 'react';
import { Text, HStack, Box } from "@gluestack-ui/themed";
import { LucideIcon } from 'lucide-react-native';

interface ChartSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  minWidth?: number;
}

export const ChartSection: React.FC<ChartSectionProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  minWidth = 300 
}) => {
  return (
    <Box bg="$white" p="$4" borderRadius="$xl" flex={1} minWidth={minWidth} mb="$4">
      <HStack alignItems="center" space="sm" mb="$4">
        <Icon size={18} color="#6B7280" />
        <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
          {title}
        </Text>
      </HStack>
      {children}
    </Box>
  );
};