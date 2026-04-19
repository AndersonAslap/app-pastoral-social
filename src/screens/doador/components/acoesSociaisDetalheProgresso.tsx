import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { Users } from "lucide-react-native";
import { AcaoSocialDetalhe } from '@tipagens/doador';
import { formatarNumero } from '@utils/functions';

interface AcoesSociaisDetalheProgressoProps {
  acao: AcaoSocialDetalhe;
}

export const AcoesSociaisDetalheProgresso: React.FC<AcoesSociaisDetalheProgressoProps> = ({ 
  acao
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
            {acao.tipoAcao}
          </Text>
          <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
            {acao.itensGerados}
          </Text>
        </HStack>
        
        {/* Barra de Progresso */}
        <Box bg="$trueGray200" borderRadius="$full" height="$3">
          <Box 
            bg="$primary500" 
            borderRadius="$full" 
            height="$3"
            width={`${parseInt(acao.percentualRecebido)}%`}
          />
        </Box>
        
        <HStack justifyContent="space-between">
          <Text fontSize="$sm" color="$textDark500">
            {acao.percentualRecebido}% da meta alcançada
          </Text>
          <HStack alignItems="center" gap="$1">
            <Users size={14} color="#6B7280" />
            <Text fontSize="$sm" color="$textDark500">
              {acao.qtdDoadores} doadores
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};