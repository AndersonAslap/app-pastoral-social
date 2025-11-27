import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { Target, CheckCircle } from "lucide-react-native";
import { AcaoSocialDetalhe } from '../types';

interface ImpactoSocialProps {
  acao: AcaoSocialDetalhe;
}

export const ImpactoSocial: React.FC<ImpactoSocialProps> = ({ acao }) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$4">
        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
          💝 Impacto Social
        </Text>
        
        <VStack gap="$3">
          <HStack gap="$3" alignItems="flex-start">
            <Box mt="$1">
              <Target size={18} color="#10B981" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Beneficiários
              </Text>
              <Text fontSize="$sm" color="$textDark600" lineHeight="$md">
                {acao.beneficiarios}
              </Text>
            </VStack>
          </HStack>

          <HStack gap="$3" alignItems="flex-start">
            <Box mt="$1">
              <CheckCircle size={18} color="#10B981" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Impacto Atual
              </Text>
              <Text fontSize="$sm" color="$textDark600">
                {acao.impacto}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};