import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { Users } from "lucide-react-native";
import { AcaoSocialDetalhe } from '../types';

interface AcoesSociaisDetalheProgressoProps {
  acao: AcaoSocialDetalhe;
  formatarNumero: (numero: number) => string;
}

export const AcoesSociaisDetalheProgresso: React.FC<AcoesSociaisDetalheProgressoProps> = ({ 
  acao, 
  formatarNumero 
}) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$6"
    >
      <VStack gap="$3">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
            {acao.item}
          </Text>
          <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
            {formatarNumero(acao.arrecadado)}/{formatarNumero(acao.meta)}
          </Text>
        </HStack>
        
        {/* Barra de Progresso */}
        <Box bg="$trueGray200" borderRadius="$full" height="$3">
          <Box 
            bg="$primary500" 
            borderRadius="$full" 
            height="$3"
            width={`${acao.progresso}%`}
          />
        </Box>
        
        <HStack justifyContent="space-between">
          <Text fontSize="$sm" color="$textDark500">
            {acao.progresso}% da meta alcançada
          </Text>
          <HStack alignItems="center" gap="$1">
            <Users size={14} color="#6B7280" />
            <Text fontSize="$sm" color="$textDark500">
              {acao.doadores} doadores
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};