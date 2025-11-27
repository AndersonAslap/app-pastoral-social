import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, HStack, VStack, Box, Text, Button, ButtonText, Badge, BadgeText, Progress, ProgressFilledTrack, ScrollView, Icon } from "@gluestack-ui/themed";
import { Package, Edit, Truck, X } from "lucide-react-native";
import { ICesta } from "../types";
import { getStatusConfig, getProgressValue } from "../helper/cesta.helper";

interface CestaDetalhesModalProps {
  isOpen: boolean;
  cesta: ICesta | null;
  onClose: () => void;
  onEditar?: () => void;
  onEntregar?: () => void;
}

export const CestaDetalhesModal = ({ 
  isOpen, 
  cesta, 
  onClose, 
  onEditar, 
  onEntregar 
}: CestaDetalhesModalProps) => {
  if (!cesta) return null;

  const statusConfig = getStatusConfig(cesta.status);
  const StatusIcon = statusConfig.icon;
  const progressValue = getProgressValue(cesta.status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalBackdrop />
      <ModalContent borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl" marginTop="auto" marginBottom={0}>
        <ModalHeader backgroundColor="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
          <HStack alignItems="center" justifyContent="space-between" width="100%">
            <Text fontSize="$xl" fontWeight="bold" color="$textDark800">
              Detalhes da Cesta
            </Text>
            <Button size="sm" variant="link" onPress={onClose}>
              <Icon as={X} size="lg" color="$textDark600" />
            </Button>
          </HStack>
        </ModalHeader>
        
        <ModalBody px="$4" py="$6">
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="lg">
              {/* Identificador e Status */}
              <VStack>
                <HStack justifyContent="space-between" alignItems="center" mb="$2">
                  <Text fontSize="$lg" fontWeight="bold" color="$textDark800">
                    {cesta.identificadorCesta}
                  </Text>
                  <Badge 
                    size="sm" 
                    bg={statusConfig.bg}
                    borderWidth="$1"
                    borderColor={statusConfig.color + "300"}
                  >
                    <StatusIcon size={12} color={statusConfig.iconColor} />
                    <BadgeText color={statusConfig.text} ml="$1" fontSize="$2xs" fontWeight="bold">
                      {statusConfig.label}
                    </BadgeText>
                  </Badge>
                </HStack>
                
                {cesta.descricao && (
                  <Text fontSize="$sm" color="$textDark600">
                    {cesta.descricao}
                  </Text>
                )}
              </VStack>

              {/* Progresso */}
              <Box>
                <HStack justifyContent="space-between" mb="$2">
                  <Text fontSize="$md" fontWeight="medium" color="$textDark700">Progresso</Text>
                  <Text fontSize="$md" color="$textDark700" fontWeight="bold">
                    {progressValue}%
                  </Text>
                </HStack>
                <Progress value={progressValue} size="md" bg="$backgroundLight200">
                  <ProgressFilledTrack bg={statusConfig.color + "500"} />
                </Progress>
              </Box>

              {/* Itens da Cesta */}
              <VStack>
                <HStack alignItems="center" mb="$3">
                  <Package size={16} color="#6B7280" />
                  <Text fontSize="$md" fontWeight="medium" color="$textDark700" ml="$2">
                    Itens da Cesta ({cesta.totalItensCesta})
                  </Text>
                </HStack>

                <VStack space="sm">
                  {cesta.itens.map((produto) => (
                    <HStack 
                      key={produto.itemProdutoId} 
                      justifyContent="space-between" 
                      alignItems="center"
                      bg="$backgroundLight50"
                      p="$3"
                      borderRadius="$lg"
                    >
                      <VStack flex={1}>
                        <Text fontSize="$sm" fontWeight="medium" color="$textDark800">
                          {produto.nomeProduto}
                        </Text>
                      </VStack>
                      <HStack alignItems="center" space="sm">
                        <Text fontSize="$sm" fontWeight="bold" color="$textDark700">
                          {produto.quantidade}x
                        </Text>
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>

              {/* Informações Adicionais */}
              <VStack space="sm" bg="$backgroundLight50" p="$3" borderRadius="$lg">
                <Text fontSize="$md" fontWeight="medium" color="$textDark700" mb="$2">
                  Informações
                </Text>
                <HStack justifyContent="space-between">
                  <Text fontSize="$sm" color="$textDark600">Total de Itens:</Text>
                  <Text fontSize="$sm" fontWeight="medium" color="$textDark800">
                    {cesta.totalItensCesta}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="$sm" color="$textDark600">Status:</Text>
                  <Text fontSize="$sm" fontWeight="medium" color={statusConfig.text}>
                    {statusConfig.label}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>
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
            
            {cesta.status !== 'ENTREGUE' && cesta.status !== 'CANCELADA' && onEditar && (
              <Button flex={1} size="sm" variant="outline" bg="$white" onPress={onEditar}>
                <Edit size={14} color="#6B7280" />
                <ButtonText color="$textDark600" ml="$1">Editar</ButtonText>
              </Button>
            )}
            
            {cesta.status === 'RESERVADA' && onEntregar && (
              <Button flex={1} size="sm" bg="$green600" onPress={onEntregar}>
                <Truck size={14} color="white" />
                <ButtonText color="white" ml="$1">Entregar</ButtonText>
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};