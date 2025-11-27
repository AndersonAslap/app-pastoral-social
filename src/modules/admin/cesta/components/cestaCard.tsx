import { Box, VStack, HStack, Text, Button, ButtonText, Badge, BadgeText, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { Package, Eye, Edit, Truck } from "lucide-react-native";
import { ICesta } from "../types";
import { getStatusConfig, getProgressValue } from "../helper/cesta.helper";

interface CestaCardProps {
  cesta: ICesta;
  onDetalhes: (cesta: ICesta) => void;
  onEditar?: (cesta: ICesta) => void;
  onEntregar?: (cesta: ICesta) => void;
}

export const CestaCard = ({ cesta, onDetalhes, onEditar, onEntregar }: CestaCardProps) => {
  const statusConfig = getStatusConfig(cesta.status);
  const StatusIcon = statusConfig.icon;
  const progressValue = getProgressValue(cesta.status);

  return (
    <Box
      key={cesta.idCesta}
      bg="$white"
      borderRadius="$2xl"
      p="$4"
      borderLeftWidth="$4"
      borderLeftColor={statusConfig.color + "500"}
    >
      {/* Header */}
      <HStack alignItems="flex-start" mb="$3">
        <VStack flex={1}>
          <HStack alignItems="center" justifyContent="space-between" space="sm" mb="$1">
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
        </VStack>
      </HStack>

      {/* Progress Bar */}
      <Box mb="$3">
        <HStack justifyContent="space-between" mb="$1">
          <Text fontSize="$xs" color="$textDark500">Progresso</Text>
          <Text fontSize="$xs" color="$textDark500" fontWeight="bold">{progressValue}%</Text>
        </HStack>
        <Progress value={progressValue} size="sm" bg="$backgroundLight200">
          <ProgressFilledTrack bg={statusConfig.color + "500"} />
        </Progress>
      </Box>

      {/* Produtos */}
      <Box bg="$backgroundLight50" p="$3" borderRadius="$lg" mb="$3">
        <HStack alignItems="center" mb="$2">
          <Package size={14} color="#6B7280" />
          <Text fontSize="$sm" fontWeight="medium" color="$textDark600" ml="$1">
            {cesta.totalItensCesta} itens
          </Text>
        </HStack>
        
        <HStack flexWrap="wrap">
          {cesta.itens.slice(0, 3)?.map((produto, index) => (
            <Badge key={index} size="sm" variant="outline" mr="$1" mb="$1" bg="$white">
              <BadgeText fontSize="$2xs" color="$textDark600">
                {produto.nomeProduto} {produto.quantidade}
              </BadgeText>
            </Badge>
          ))}
          {cesta.itens.length > 3 && (
            <Badge size="sm" variant="outline" bg="$white">
              <BadgeText fontSize="$2xs" color="$textDark500">
                +{cesta.itens.length - 3}
              </BadgeText>
            </Badge>
          )}
        </HStack>
      </Box>

      {/* Ações */}
      <HStack space="sm">
        <Button 
          flex={1} 
          size="sm" 
          variant="outline" 
          bg="$white"
          onPress={() => onDetalhes(cesta)}
        >
          <Eye size={14} color="#6B7280" />
          <ButtonText color="$textDark600" ml="$1">Detalhes</ButtonText>
        </Button>
        
        {cesta.status !== 'ENTREGUE' && cesta.status !== 'CANCELADA' && onEditar && (
          <Button flex={1} size="sm" variant="outline" bg="$white" onPress={() => onEditar(cesta)}>
            <Edit size={14} color="#6B7280" />
            <ButtonText color="$textDark600" ml="$1">Editar</ButtonText>
          </Button>
        )}
        
        {cesta.status === 'RESERVADA' && onEntregar && (
          <Button flex={1} size="sm" bg="$green600" onPress={() => onEntregar(cesta)}>
            <Truck size={14} color="white" />
            <ButtonText color="white" ml="$1">Entregar</ButtonText>
          </Button>
        )}
      </HStack>
    </Box>
  );
};