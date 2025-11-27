import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { MapPin, Clock, Users } from "lucide-react-native";
import { AcaoSocialDetalhe } from '../types';

interface InformacoesAcaoProps {
  acao: AcaoSocialDetalhe;
  formatarData: (data: string) => string;
}

export const InformacoesAcao: React.FC<InformacoesAcaoProps> = ({ 
  acao, 
  formatarData 
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
              <MapPin size={18} color="#3B82F6" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Local de Entrega
              </Text>
              <Text fontSize="$sm" color="$textDark600" lineHeight="$md">
                {acao.endereco}
              </Text>
              <Text fontSize="$sm" color="$primary600" fontWeight="$medium">
                {acao.localizacao}
              </Text>
            </VStack>
          </HStack>

          <HStack gap="$3" alignItems="flex-start">
            <Box mt="$1">
              <Clock size={18} color="#3B82F6" />
            </Box>
            <VStack flex={1} gap="$1">
              <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                Prazo para Doações
              </Text>
              <Text fontSize="$sm" color="$textDark600">
                Até {formatarData(acao.prazo)}
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