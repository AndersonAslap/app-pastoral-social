import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { StatusItem } from '../types';

interface StatusListProps {
  items: StatusItem[];
}

export const StatusList: React.FC<StatusListProps> = ({ items }) => {
  return (
    <VStack>
      {items.map((item, index) => (
        <HStack key={index} alignItems="center" space="sm" mb="$2">
          <Box width="$3" height="$3" borderRadius="$full" bg={item.color} />
          <Text fontSize="$sm" flex={1}>{item.status}</Text>
          <Text fontSize="$sm" fontWeight="bold" color="$textDark700">{item.quantidade}</Text>
          <Text fontSize="$sm" color="$textDark500">({item.porcentagem}%)</Text>
        </HStack>
      ))}
    </VStack>
  );
};