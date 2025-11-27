import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { AcaoSocialDetalhe } from '../types';

interface AcoesSociaisDetalheHeaderProps {
  acao: AcaoSocialDetalhe;
}

export const AcoesSociaisDetalheHeader: React.FC<AcoesSociaisDetalheHeaderProps> = ({ acao }) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$6"
    >
      <VStack gap="$5">
        {/* Header com Ícone e Título */}
        <HStack gap="$4" alignItems="center">
          <Box
            bg="$blue100"
            borderRadius="$lg"
            p="$4"
            width="$20"
            height="$20"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="$3xl">{acao.imagem}</Text>
          </Box>
          
          <VStack flex={1} gap="$1">
            <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900">
              {acao.titulo}
            </Text>
            <Text fontSize="$sm" color="$primary600" fontWeight="$medium">
              {acao.categoria}
            </Text>
          </VStack>
        </HStack>

        {/* Descrição */}
        <Text fontSize="$md" color="$textDark600" lineHeight="$xl">
          {acao.descricao}
        </Text>
      </VStack>
    </Box>
  );
};