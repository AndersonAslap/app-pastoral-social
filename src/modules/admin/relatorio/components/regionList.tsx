import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { RegionItem } from '../types';

interface RegionListProps {
  regions: RegionItem[];
}

export const RegionList: React.FC<RegionListProps> = ({ regions }) => {
  return (
    <VStack>
      {regions.map((item, index) => (
        <HStack key={index} alignItems="center" space="sm" mb="$2">
          <Box width="$3" height="$3" borderRadius="$full" bg={item.color} />
          <Text fontSize="$sm" flex={1}>{item.regiao}</Text>
          <Text fontSize="$sm" fontWeight="bold" color="$textDark700">{item.quantidade}</Text>
        </HStack>
      ))}
    </VStack>
  );
};