import React from 'react';
import { Text, VStack, Box } from "@gluestack-ui/themed";

export const Insights: React.FC = () => {
  const insights = [
    "Aumento de 24% nas distribuições no último mês",
    "Região Centro concentra 36% das entregas",
    "Arroz é o produto mais distribuído (890 unidades)",
    "Taxa de entrega: 77% das cestas foram entregues"
  ];

  return (
    <Box bg="$blue50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$blue500">
      <Text fontSize="$lg" fontWeight="bold" color="$blue800" mb="$2">
        📊 Insights do Período
      </Text>
      <VStack space="sm">
        {insights.map((insight, index) => (
          <Text key={index} fontSize="$sm" color="$blue700">
            • {insight}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};