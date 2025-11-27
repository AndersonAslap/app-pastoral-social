import React from 'react';
import { Text, VStack, HStack, Box, Pressable } from "@gluestack-ui/themed";
import { Clock, MapPin, Heart, Eye, Package } from "lucide-react-native";
import { AcaoSocial, StatusInfo } from '../types';

interface AcoesSociaisCardProps {
  acao: AcaoSocial;
  statusInfo: StatusInfo;
  formatarNumero: (numero: number) => string;
  formatarData: (data: string) => string;
  onVerDetalhes: (id: number) => void;
  onDoarItens: (id: number) => void;
}

export const AcoesSociaisCard: React.FC<AcoesSociaisCardProps> = ({
  acao,
  statusInfo,
  formatarNumero,
  formatarData,
  onVerDetalhes,
  onDoarItens
}) => {
  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$5"
      shadowColor="$trueGray800"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.1}
      shadowRadius={12}
      elevation={8}
      borderWidth={1}
      borderColor="$trueGray100"
    >
      <VStack gap="$4">
        {/* Header da Ação com Status */}
        <HStack gap="$4" alignItems="flex-start">
          <Box
            bg="$blue100"
            borderRadius="$lg"
            p="$3"
            width="$16"
            height="$16"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="$2xl">{acao.imagem}</Text>
          </Box>

          <VStack flex={1} gap="$1">
            <HStack alignItems="center" gap="$2">
              <Text 
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$textDark900"
                flex={1}
              >
                {acao.titulo}
              </Text>
              <Box
                bg="$white"
                px="$2"
                py="$1"
                borderRadius="$full"
                borderWidth={1}
                borderColor={statusInfo.cor}
              >
                <Text 
                  fontSize="$2xs" 
                  fontWeight="$bold" 
                  color={statusInfo.cor}
                >
                  {statusInfo.icone} {statusInfo.label}
                </Text>
              </Box>
            </HStack>
            
            <Text 
              fontSize="$sm" 
              color="$textDark600"
              lineHeight="$md"
            >
              {acao.descricao}
            </Text>
          </VStack>
        </HStack>

        {/* Item e Progresso */}
        <VStack gap="$2">
          <Text fontSize="$md" fontWeight="$bold" color="$textDark900">
            {acao.item}
          </Text>
          
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
              {formatarNumero(acao.arrecadado)}/{formatarNumero(acao.meta)}
            </Text>
            <HStack alignItems="center" gap="$1" bg="$blue50" px="$2" py="$1" borderRadius="$md">
              <Package size={14} color="#3B82F6" />
              <Text fontSize="$sm" fontWeight="$medium" color="$primary600">
                {acao.progresso}%
              </Text>
            </HStack>
          </HStack>
          
          {/* Barra de Progresso */}
          <Box bg="$trueGray200" borderRadius="$full" height="$2">
            <Box 
              bg={acao.status === "concluida" ? "#10B981" : "$primary500"} 
              borderRadius="$full" 
              height="$2"
              width={`${acao.progresso}%`}
            />
          </Box>
        </VStack>

        {/* Estatísticas e Informações */}
        <VStack gap="$2">
          <HStack justifyContent="space-between">
            <Text fontSize="$sm" color="$textDark500">
              {formatarNumero(acao.arrecadado)} itens recebidos
            </Text>
            <Text fontSize="$sm" color="$textDark500">
              {acao.doadores} doadores
            </Text>
          </HStack>
          
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center" gap="$1">
              <Clock size={14} color="#6B7280" />
              <Text fontSize="$sm" color="$textDark500">
                Até {formatarData(acao.prazo)}
              </Text>
            </HStack>
            
            <HStack alignItems="center" gap="$1">
              <MapPin size={14} color="#6B7280" />
              <Text fontSize="$sm" color="$textDark500">
                {acao.localizacao}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {/* Botões de Ação - Apenas para ações ativas */}
        {acao.status === "ativa" && (
          <HStack gap="$3" mt="$2">
            <Pressable
              flex={1}
              onPress={() => onVerDetalhes(acao.id)}
            >
              {({ pressed }) => (
                <Box
                  bg="$trueGray100"
                  borderRadius="$lg"
                  py="$3"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="row"
                  gap="$2"
                  style={{
                    transform: [{ scale: pressed ? 0.95 : 1 }]
                  }}
                  /*transition="all 0.2s"*/
                >
                  <Eye size={18} color="#6B7280" />
                  <Text 
                    fontSize="$sm" 
                    fontWeight="$medium" 
                    color="$textDark600"
                  >
                    Ver Detalhes
                  </Text>
                </Box>
              )}
            </Pressable>

            <Pressable
              flex={1}
              onPress={() => onDoarItens(acao.id)}
            >
              {({ pressed }) => (
                <Box
                  bg="$primary500"
                  borderRadius="$lg"
                  py="$3"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="row"
                  gap="$2"
                  style={{
                    transform: [{ scale: pressed ? 0.95 : 1 }]
                  }}
                  /*transition="all 0.2s"*/
                  shadowColor="$primary600"
                >
                  <Heart size={18} color="#FFFFFF" />
                  <Text 
                    fontSize="$sm" 
                    fontWeight="$bold" 
                    color="$white"
                  >
                    Doar Itens
                  </Text>
                </Box>
              )}
            </Pressable>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};