import React from 'react';
import { Box, VStack, Text } from "@gluestack-ui/themed";

interface AcoesSociaisEmptyStateProps {
  filtroStatus: string;
  onVerTodas: () => void;
}

export const AcoesSociaisEmptyState: React.FC<AcoesSociaisEmptyStateProps> = ({
  filtroStatus,
  onVerTodas
}) => {
  return (
    <Box 
      bg="$white" 
      borderRadius="$2xl" 
      p="$8" 
      alignItems="center" 
      justifyContent="center"
      mx="$6"
      mt="$6"
    >
      <VStack gap="$4" alignItems="center">
        <Box
          bg="$blue100"
          borderRadius="$full"
          p="$6"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$4xl">📭</Text>
        </Box>
        
        <VStack gap="$2" alignItems="center">
          <Text fontSize="$xl" fontWeight="$bold" color="$textDark900" textAlign="center">
            Nenhuma ação encontrada
          </Text>
          <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$lg">
            {filtroStatus === "concluida" 
              ? "Não há ações concluídas no momento." 
              : "Não há ações ativas no momento. Volte em breve!"}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};