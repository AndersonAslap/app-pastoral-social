import React from 'react';
import { Text, VStack, Box } from "@gluestack-ui/themed";

interface SeccaoProps {
  titulo: string;
  icone: string;
  children: React.ReactNode;
}

export const Seccao: React.FC<SeccaoProps> = ({
  titulo,
  icone,
  children
}) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$4">
        <Text fontSize="$xl" fontWeight="$bold" color="$textDark900">
          {icone} {titulo}
        </Text>
        {children}
      </VStack>
    </Box>
  );
};