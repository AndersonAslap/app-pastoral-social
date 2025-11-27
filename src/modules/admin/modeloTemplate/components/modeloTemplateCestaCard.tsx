import { Box, VStack, HStack, Text, Button, ButtonText, Badge, BadgeText, ButtonIcon } from "@gluestack-ui/themed";
import { Package, Eye } from "lucide-react-native";
import { ModeloTemplateCesta } from "../types";

interface ModeloTemplateCestaCardProps {
  item: ModeloTemplateCesta;
  isGerandoCesta?: boolean;
  onPressDetalhes: () => void;
  onPressGerar: () => void;
}

export const ModeloTemplateCestaCard = ({ 
  item, 
  isGerandoCesta = false,
  onPressDetalhes, 
  onPressGerar 
}: ModeloTemplateCestaCardProps) => {
  const borderColor = item.qtdPossivelGeracao > 0 ? "$green500" : "$red500";
  const badgeBg = item.qtdPossivelGeracao > 0 ? "$green100" : "$red100";
  const badgeBorderColor = item.qtdPossivelGeracao > 0 ? "$green300" : "$red300";
  const badgeTextColor = item.qtdPossivelGeracao > 0 ? "$green700" : "$red700";
  const badgeText = item.qtdPossivelGeracao > 0 
    ? `${item.qtdPossivelGeracao} cestas possíveis` 
    : "Sem estoque";

  return (
    <Box
      bg="$white"
      borderRadius="$2xl"
      p="$4"
      mb="$3"
      borderLeftWidth="$4"
      borderLeftColor={borderColor}
    >
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
        <VStack flex={1} space="xs">
          <HStack alignItems="center" space="sm">
            <Package size={18} color="#3B82F6" />
            <Text fontSize="$lg" fontWeight="bold" color="$textDark800" flex={1}>
              {item.descricao}
            </Text>
          </HStack>
          
          <Text fontSize="$sm" color="$textDark600">
            {item.items.length} itens no modelo
          </Text>
        </VStack>

        {/* Badge de Geração Possível */}
        <Badge 
          size="md" 
          bg={badgeBg}
          borderWidth="$1"
          borderColor={badgeBorderColor}
        >
          <BadgeText color={badgeTextColor} fontSize="$2xs" fontWeight="bold">
            {badgeText}
          </BadgeText>
        </Badge>
      </HStack>

      {/* Botões de Ação */}
      <HStack space="sm">
        <Button 
          size="sm" 
          variant="outline" 
          bg="$white" 
          flex={1}
          borderColor="$blue300"
          onPress={onPressDetalhes}
        >
          <ButtonIcon as={Eye} size="sm" mr="$1" />
          <ButtonText fontSize="$sm" color="$blue600">Detalhes</ButtonText>
        </Button>
        
        {item.qtdPossivelGeracao > 0 && (
          <Button 
            size="sm" 
            bg="$blue600"
            flex={1}
            onPress={onPressGerar}
            /*isLoading={isGerandoCesta}*/
          >
            <ButtonText fontSize="$sm" color="$white">
              {isGerandoCesta ? "Gerando..." : "Gerar Cestas"}
            </ButtonText>
          </Button>
        )}
      </HStack>
    </Box>
  );
};