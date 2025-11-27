import React from 'react';
import { Text, VStack, HStack, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { Filter, Download } from "lucide-react-native";

export const FilterHeader: React.FC = () => {
  return (
    <VStack space="md" mb="$4">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1}>
          <Text fontSize="$2xl" fontWeight="bold" color="$textDark800">
            Visão Geral
          </Text>
          <Text fontSize="$sm" color="$textDark500">
            Período: Últimos 6 meses
          </Text>
        </VStack>
      </HStack>
      
      <HStack justifyContent="flex-end" space="sm">
        <Button 
          size="sm" 
          variant="outline" 
          bg="$white"
          borderColor="$borderLight300"
          minWidth="$20"
        >
          <ButtonIcon as={Filter} size="sm" mr="$1" />
          <ButtonText fontSize="$sm">Filtrar</ButtonText>
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          bg="$white"
          borderColor="$borderLight300"
          minWidth="$20"
        >
          <ButtonIcon as={Download} size="sm" mr="$1" />
          <ButtonText fontSize="$sm">Exportar</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};