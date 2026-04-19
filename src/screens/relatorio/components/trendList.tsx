import React from 'react';
import { Text, VStack, HStack } from "@gluestack-ui/themed";
import { TrendItem } from '../types';

interface TrendListProps {
  items: TrendItem[];
}

export const TrendList: React.FC<TrendListProps> = ({ items }) => {
  return (
    <VStack>
      {items.map((item, index) => {
        const crescimentoColor = item.crescimento > 0 
          ? "$green500" 
          : item.crescimento < 0 
            ? "$red500" 
            : "$gray500";
            
        return (
          <HStack key={index} alignItems="center" space="sm" mb="$2">
            <Text fontSize="$sm" flex={1} color="$textDark700">{item.mes}</Text>
            <Text fontSize="$sm" fontWeight="bold" color="$textDark800">{item.cestas}</Text>
            <Text fontSize="$xs" color={crescimentoColor}>
              {item.crescimento > 0 ? '+' : ''}{item.crescimento}%
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};