import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { AcaoSocialDetalhe } from '../types';

interface AcoesSociaisDetalheItensCestaProps {
  acao: AcaoSocialDetalhe;
}

export const AcoesSociaisDetalheItensCesta: React.FC<AcoesSociaisDetalheItensCestaProps> = ({ acao }) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$4">
        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
          🛒 Itens da Cesta Básica
        </Text>
        
        <VStack gap="$2">
          {acao.itensIncluem.map((item, index) => (
            <HStack key={index} gap="$3" alignItems="center">
              <Box
                w="$2"
                h="$2"
                borderRadius="$full"
                bg="$primary500"
              />
              <Text fontSize="$sm" color="$textDark600" flex={1}>
                {item}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};