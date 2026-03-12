/*import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, HStack, VStack, Box, Text, Button, ButtonText, Badge, BadgeText, Progress, ProgressFilledTrack, ScrollView, Icon } from "@gluestack-ui/themed";
import React from "react";
import { X } from "lucide-react-native";
import { AcaoSocial } from "../types";

interface AcaoDetalheModalProps {
  isOpen: boolean;
  acao: AcaoSocial | null;
  onClose: () => void;
}

export const AcaoDetalheModal: React.FC<AcaoDetalheModalProps> = ({
    isOpen,
    acao,
    onClose
}) => {

    if (!acao) return null;

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalBackdrop />
        <ModalContent borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl" marginTop="auto" marginBottom={0}>
          <ModalHeader backgroundColor="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
            <HStack alignItems="center" justifyContent="space-between" width="100%">
              <Text fontSize="$xl" fontWeight="bold" color="$textDark800">
                Detalhes da Ação
              </Text>
              <Button size="sm" variant="link" onPress={onClose}>
                <Icon as={X} size="lg" color="$textDark600" />
              </Button>
            </HStack>
          </ModalHeader>
          
          <ModalBody px="$4" py="$6">
            <Text>Detalhes da ação</Text>
          </ModalBody>
  
          <ModalFooter backgroundColor="$backgroundLight50" borderBottomLeftRadius="$3xl" borderBottomRightRadius="$3xl">
            <HStack space="sm" width="100%">
              <Button 
                flex={1} 
                size="sm" 
                variant="outline" 
                bg="$white"
                onPress={onClose}
              >
                <ButtonText color="$textDark600">Fechar</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}*/

import React from "react";
import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    VStack,
    HStack,
    Box,
    Badge,
    BadgeText,
    Button,
    ButtonText,
    Progress,
    ProgressFilledTrack,
    Icon,
    ScrollView
} from "@gluestack-ui/themed";
import { X, Calendar, Target, Users, Package, Heart, Gift } from "lucide-react-native";

interface AcaoDetalheModalProps {
    isOpen: boolean;
    acao: any; // Substitua pelo tipo correto
    onClose: () => void;
}

// Função auxiliar para formatar data
const formatDate = (dateString: string) => {
    if (!dateString) return "Não definida";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Função para calcular percentual
const calcularPercentual = (recebido: number, total: number) => {
    if (total === 0) return 0;
    return Math.min(Math.round((recebido / total) * 100), 100);
};

// Configurações baseadas no tipo de ação
const getTipoAcaoConfig = (tipo: string) => {
    const configs: Record<string, { color: string; bg: string; icon: any }> = {
        "Refeições": { color: "$orange500", bg: "$orange50", icon: Heart },
        "Cestas Básicas": { color: "$green500", bg: "$green50", icon: Package },
        "Roupas": { color: "$blue500", bg: "$blue50", icon: Gift },
        "Educação": { color: "$purple500", bg: "$purple50", icon: Target },
    };
    return configs[tipo] || { color: "$primary500", bg: "$primary50", icon: Heart };
};

export const AcaoDetalheModal: React.FC<AcaoDetalheModalProps> = ({
    isOpen,
    acao,
    onClose
}) => {
    if (!acao) return null;

    const tipoConfig = getTipoAcaoConfig(acao.tipoAcao);
    const TipoIcon = tipoConfig.icon;
    
    const [recebido, total] = acao.itensGerados?.split('/').map(Number) || [0, 0];
    const percentual = calcularPercentual(recebido, total);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalBackdrop />
            <ModalContent 
                borderTopLeftRadius="$3xl" 
                borderTopRightRadius="$3xl" 
                marginTop="auto" 
                marginBottom={0}
                maxHeight="90%"
            >
                <ModalHeader 
                    backgroundColor="$backgroundLight50" 
                    borderTopLeftRadius="$3xl" 
                    borderTopRightRadius="$3xl"
                >
                    <HStack alignItems="center" justifyContent="space-between" width="100%">
                        <Text fontSize="$xl" fontWeight="$bold" color="$textDark800">
                            Detalhes da Ação Social
                        </Text>
                        <Button size="sm" variant="link" onPress={onClose}>
                            <Icon as={X} size="lg" color="$textDark600" />
                        </Button>
                    </HStack>
                </ModalHeader>
                
                <ModalBody px="$4" py="$6">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <VStack space="lg">
                            {/* Título e Tipo */}
                            <VStack>
                                <HStack justifyContent="space-between" alignItems="center" mb="$2">
                                    <Text fontSize="$2xl" fontWeight="$bold" color="$textDark800" flex={1} mr="$2">
                                        {acao.titulo}
                                    </Text>
                                    <Badge 
                                        size="sm" 
                                        bg={tipoConfig.bg}
                                        borderWidth="$1"
                                        borderColor={tipoConfig.color}
                                    >
                                        <TipoIcon size={12} color={tipoConfig.color} />
                                        <BadgeText color={tipoConfig.color} ml="$1" fontSize="$2xs" fontWeight="$bold">
                                            {acao.tipoAcao}
                                        </BadgeText>
                                    </Badge>
                                </HStack>
                                
                                {acao.descricao && (
                                    <Text fontSize="$sm" color="$textDark600" mt="$1">
                                        {acao.descricao}
                                    </Text>
                                )}
                            </VStack>

                            {/* Cards de Estatísticas */}
                            <HStack space="sm">
                                {/* Meta Total */}
                                <Box 
                                    flex={1} 
                                    bg="$backgroundLight50" 
                                    p="$3" 
                                    borderRadius="$lg"
                                    borderWidth={1}
                                    borderColor="$borderLight200"
                                >
                                    <HStack space="sm" alignItems="center" mb="$1">
                                        <Target size={16} color="#6B7280" />
                                        <Text fontSize="$xs" color="$textDark600">Meta</Text>
                                    </HStack>
                                    <Text fontSize="$lg" fontWeight="$bold" color="$textDark800">
                                        {acao.totalAcaoSocial}
                                    </Text>
                                    <Text fontSize="$xs" color="$textDark500">pessoas</Text>
                                </Box>

                                {/* Data de Conclusão */}
                                <Box 
                                    flex={1} 
                                    bg="$backgroundLight50" 
                                    p="$3" 
                                    borderRadius="$lg"
                                    borderWidth={1}
                                    borderColor="$borderLight200"
                                >
                                    <HStack space="sm" alignItems="center" mb="$1">
                                        <Calendar size={16} color="#6B7280" />
                                        <Text fontSize="$xs" color="$textDark600">Conclusão</Text>
                                    </HStack>
                                    <Text fontSize="$sm" fontWeight="$bold" color="$textDark800">
                                        {formatDate(acao.dataConclusaoAcao)}
                                    </Text>
                                </Box>
                            </HStack>

                            {/* Progresso */}
                            <Box>
                                <HStack justifyContent="space-between" mb="$2">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark700">
                                        Progresso da Ação
                                    </Text>
                                    <Text fontSize="$md" color="$textDark700" fontWeight="$bold">
                                        {percentual}%
                                    </Text>
                                </HStack>
                                <Progress value={percentual} size="md" bg="$backgroundLight200">
                                    <ProgressFilledTrack bg={tipoConfig.color} />
                                </Progress>
                                <HStack justifyContent="space-between" mt="$2">
                                    <Text fontSize="$xs" color="$textDark500">
                                        {acao.itensRecebidos} itens recebidos
                                    </Text>
                                    <Text fontSize="$xs" color="$textDark500">
                                        {acao.qtdDoadores} doadores
                                    </Text>
                                </HStack>
                            </Box>

                            {/* Itens Arrecadados */}
                            {acao.itens && acao.itens.length > 0 && (
                                <VStack>
                                    <HStack alignItems="center" mb="$3">
                                        <Package size={16} color="#6B7280" />
                                        <Text fontSize="$md" fontWeight="$medium" color="$textDark700" ml="$2">
                                            Itens Arrecadados ({acao.itens.length})
                                        </Text>
                                    </HStack>

                                    <VStack space="sm">
                                        {acao.itens.map((item: string, index: number) => (
                                            <HStack 
                                                key={index} 
                                                alignItems="center"
                                                bg="$backgroundLight50"
                                                p="$3"
                                                borderRadius="$lg"
                                                borderWidth={1}
                                                borderColor="$borderLight200"
                                            >
                                                <Box 
                                                    w="$2" 
                                                    h="$2" 
                    bg={tipoConfig.color} 
                                                    borderRadius="$full" 
                                                    mr="$3"
                                                />
                                                <Text fontSize="$sm" color="$textDark800" flex={1}>
                                                    {item}
                                                </Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </VStack>
                            )}

                            {/* Informações Adicionais */}
                            <VStack 
                                space="sm" 
                                bg="$backgroundLight50" 
                                p="$4" 
                                borderRadius="$lg"
                                borderWidth={1}
                                borderColor="$borderLight200"
                            >
                                <Text fontSize="$md" fontWeight="$medium" color="$textDark700" mb="$2">
                                    Resumo da Ação
                                </Text>
                                
                                <HStack justifyContent="space-between">
                                    <Text fontSize="$sm" color="$textDark600">Total de pessoas:</Text>
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                                        {acao.totalAcaoSocial}
                                    </Text>
                                </HStack>
                                
                                <HStack justifyContent="space-between">
                                    <Text fontSize="$sm" color="$textDark600">Itens arrecadados:</Text>
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                                        {acao.itensRecebidos}
                                    </Text>
                                </HStack>
                                
                                <HStack justifyContent="space-between">
                                    <Text fontSize="$sm" color="$textDark600">Doadores:</Text>
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark800">
                                        {acao.qtdDoadores}
                                    </Text>
                                </HStack>
                                
                                <HStack justifyContent="space-between">
                                    <Text fontSize="$sm" color="$textDark600">Progresso:</Text>
                                    <Badge 
                                        size="sm" 
                                        bg={tipoConfig.bg}
                                    >
                                        <BadgeText color={tipoConfig.color} fontSize="$2xs">
                                            {acao.itensGerados}
                                        </BadgeText>
                                    </Badge>
                                </HStack>
                            </VStack>
                        </VStack>
                    </ScrollView>
                </ModalBody>

                <ModalFooter 
                    backgroundColor="$backgroundLight50" 
                    borderBottomLeftRadius="$3xl" 
                    borderBottomRightRadius="$3xl"
                >
                    <HStack space="sm" width="100%">
                        <Button 
                            flex={1} 
                            size="md" 
                            variant="outline" 
                            bg="$white"
                            onPress={onClose}
                            borderWidth={1}
                            borderColor="$borderLight300"
                        >
                            <ButtonText color="$textDark600">Fechar</ButtonText>
                        </Button>
                        
                        {/* Botões condicionais baseados no status da ação - descomente quando tiver a lógica */}
                        {/* {acao.status === 'EM_ANDAMENTO' && (
                            <Button flex={1} size="md" bg={tipoConfig.color} onPress={onRegistrarEntrega}>
                                <ButtonText color="$white">Registrar Progresso</ButtonText>
                            </Button>
                        )} */}
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};