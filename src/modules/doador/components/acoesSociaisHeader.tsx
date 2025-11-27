import React from 'react';
import { Text, VStack, Box } from "@gluestack-ui/themed";

export const AcoesSociaisHeader: React.FC = () => {
  return (
    <Box bg="$white" px="$6" pt="$12" pb="$4">
      <VStack gap="$2">
        <Text fontSize="$3xl" fontWeight="$bold" color="$textDark900">
          Ações Sociais
        </Text>
        <Text fontSize="$md" color="$textDark600">
          Doe cestas básicas e jantas para quem mais precisa
        </Text>
      </VStack>
    </Box>
  );
};