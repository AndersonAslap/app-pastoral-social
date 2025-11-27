import React from 'react';
import { ScrollView, HStack, Pressable, Box, Text } from "@gluestack-ui/themed";
import { FiltroStatus as FiltroStatusType } from '../types';

interface FiltroStatusProps {
  filtroAtivo: string;
  filtros: FiltroStatusType[];
  onFiltroChange: (filtroId: FiltroStatusType["id"]) => void;
}

export const FiltroStatus: React.FC<FiltroStatusProps> = ({
  filtroAtivo,
  filtros,
  onFiltroChange
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      py="$4"
    >
      <HStack gap="$3">
        {filtros.map((filtro) => (
          <Pressable
            key={filtro.id}
            onPress={() => onFiltroChange(filtro.id)}
          >
            <Box
              bg={filtroAtivo === filtro.id ? "$primary500" : "$trueGray100"}
              borderRadius="$full"
              px="$4"
              py="$2"
              flexDirection="row"
              alignItems="center"
              gap="$2"
            >
              <Text fontSize="$sm">{filtro.icone}</Text>
              <Text 
                fontSize="$sm" 
                fontWeight="$medium"
                color={filtroAtivo === filtro.id ? "$white" : "$textDark600"}
              >
                {filtro.nome}
              </Text>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
};