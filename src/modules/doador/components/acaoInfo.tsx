import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { AcaoInfo as AcaoInfoType } from '../types';

interface AcaoInfoProps {
  acao: AcaoInfoType;
}

export const AcaoInfo: React.FC<AcaoInfoProps> = ({ acao }) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$3">
        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
          📦 Ação: {acao.titulo}
        </Text>
        
        <HStack gap="$3" alignItems="flex-start">
          <Text fontSize="$lg">📍</Text>
          <VStack flex={1}>
            <Text fontSize="$sm" color="$textDark600">
              {acao.endereco}
            </Text>
            <Text fontSize="$sm" color="$textDark500">
              Entregar para: {acao.responsavel}
            </Text>
            <Text fontSize="$sm" color="$textDark500">
              Tel: {acao.telefone}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};