import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  height = 100, 
  color = "$blue500" 
}) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <HStack height={height} alignItems="flex-end" justifyContent="space-between" space="sm">
      {data.map((item, index) => (
        <VStack key={index} alignItems="center" flex={1} space="xs">
          <Box
            bg={color}
            width="80%"
            height={`${(item.value / maxValue) * 80}%`}
            borderRadius="$sm"
          />
          <Text fontSize="$2xs" color="$textDark500" textAlign="center">
            {item.label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};