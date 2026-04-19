import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { MapPin, Clock, Users } from "lucide-react-native";
import { AcaoSocialDetalhe } from '@tipagens/doador';
import { formatDate } from '@utils/functions';

interface InformacoesAcaoProps {
  acao: AcaoSocialDetalhe
}

export const InformacoesAcao: React.FC<InformacoesAcaoProps> = ({ 
  acao
}) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
    >
      <VStack gap="$4">
        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
          📍 Informações
        </Text>
        
        <VStack gap="$3">

          <HStack gap="$3" alignItems="flex-start">
            <Box mt="$1">
              <Clock size={18} color="#3B82F6" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Prazo para Doações
              </Text>
              <Text fontSize="$sm" color="$textDark600">
                Até {formatDate(acao.dataConclusaoAcao)}
              </Text>
            </VStack>
          </HStack>

          <HStack gap="$3" alignItems="flex-start">
            <Box mt="$1">
              <Users size={18} color="#3B82F6" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Responsável
              </Text>
              <Text fontSize="$sm" color="$textDark600">
                {acao.responsavel}
              </Text>
              <Text fontSize="$sm" color="$textDark500">
                {acao.telefone} • {acao.email}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};