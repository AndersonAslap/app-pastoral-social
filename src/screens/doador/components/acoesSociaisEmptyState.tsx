import React from 'react';
import { Box, VStack, Text } from "@gluestack-ui/themed";

interface AcoesSociaisEmptyStateProps {
  filtroStatus: string;
}

export const AcoesSociaisEmptyState: React.FC<AcoesSociaisEmptyStateProps> = ({
  filtroStatus
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

          {
            filtroStatus === "EM_ANDAMENTO" && (
              <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$lg">
                Não há ações ativas no momento.
              </Text>
            )
          }

          {
            filtroStatus === "PLANEJADA" && (
              <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$lg">
                Não há ações planejadas no momento.
              </Text>
            )
          }

          {
            filtroStatus === "CONCLUIDA" && (
              <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$lg">
                Não há ações concluídas no momento.
              </Text>
            )
          }
        </VStack>
      </VStack>
    </Box>
  );
};