import React from 'react';
import { Text, VStack, Box } from "@gluestack-ui/themed";

export const DoacaoAcaoHeaderInfo: React.FC = () => {
  return (
    <Box
      bg="$primary500"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$3" alignItems="center">
        <Text fontSize="$2xl">❤️</Text>
        <Text fontSize="$lg" fontWeight="$bold" color="$white" textAlign="center">
          Obrigado por sua generosidade!
        </Text>
        <Text fontSize="$sm" color="$blue100" textAlign="center">
          Preencha os dados abaixo para realizar sua doação
        </Text>
      </VStack>
    </Box>
  );
};