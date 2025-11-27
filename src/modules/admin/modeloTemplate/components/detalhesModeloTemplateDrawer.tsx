import { VStack, Box, Text, Button, ButtonText, HStack, Badge, BadgeText } from "@gluestack-ui/themed";
import { FilterList } from "@shared/components";
import { ModeloTemplateCesta } from "../types";

interface DetalhesModeloTemplateDrawerProps {
  isOpen: boolean;
  modelo: ModeloTemplateCesta | null;
  onClose: () => void;
}

export const DetalhesModeloTemplateDrawer = ({ 
  isOpen, 
  modelo, 
  onClose 
}: DetalhesModeloTemplateDrawerProps) => {
  if (!modelo) return null;

  const statusBgColor = modelo.qtdPossivelGeracao > 0 ? "$green50" : "$red50";
  const statusBorderColor = modelo.qtdPossivelGeracao > 0 ? "$green500" : "$red500";
  const statusTextColor = modelo.qtdPossivelGeracao > 0 ? "$green700" : "$red700";
  const statusMessage = modelo.qtdPossivelGeracao > 0 
    ? `É possível gerar ${modelo.qtdPossivelGeracao} cestas com o estoque atual`
    : "Não é possível gerar cestas - estoque insuficiente";

  return (
    <FilterList
      onFilterOpen={isOpen}
      onSetIsFilterOpen={onClose}
      title="Detalhes do Modelo"
    >
      <VStack space="md">
        <Box bg="$blue50" p="$4" borderRadius="$lg" borderLeftWidth="$4" borderLeftColor="$blue500">
          <Text fontSize="$xl" fontWeight="bold" color="$blue800" mb="$2">
            {modelo.descricao}
          </Text>
          <Text fontSize="$sm" color="$blue600">
            {modelo.items.length} itens • {modelo.qtdPossivelGeracao} cestas possíveis
          </Text>
        </Box>

        <Box bg="$white" p="$4" borderRadius="$lg">
          <Text fontSize="$lg" fontWeight="bold" color="$textDark800" mb="$3">
            Itens da Cesta
          </Text>
          <VStack space="sm">
            {modelo.items.map((item, index) => (
              <HStack 
                key={index} 
                justifyContent="space-between" 
                alignItems="center" 
                bg="$backgroundLight50" 
                p="$3" 
                borderRadius="$md"
              >
                <Text fontSize="$sm" color="$textDark700" fontWeight="medium">
                  {item.nome}
                </Text>
                <Badge size="sm" bg="$blue100">
                  <BadgeText color="$blue700" fontSize="$2xs" fontWeight="bold">
                    {item.quantidade}
                  </BadgeText>
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box bg={statusBgColor} p="$4" borderRadius="$lg" borderLeftWidth="$4" borderLeftColor={statusBorderColor}>
          <Text fontSize="$md" fontWeight="bold" color={statusTextColor} mb="$1">
            Status de Geração
          </Text>
          <Text fontSize="$sm" color={statusTextColor}>
            {statusMessage}
          </Text>
        </Box>

        <Button onPress={onClose} bg="$blue600" mt="$2">
          <ButtonText color="$white">Fechar</ButtonText>
        </Button>
      </VStack>
    </FilterList>
  );
};