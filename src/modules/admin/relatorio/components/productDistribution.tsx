import React from 'react';
import { Text, VStack, HStack, Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
import { ProductItem } from '../types';

interface ProductDistributionProps {
  products: ProductItem[];
}

export const ProductDistribution: React.FC<ProductDistributionProps> = ({ products }) => {
  const maxQuantity = Math.max(...products.map(p => p.quantidade));
  
  return (
    <VStack space="sm">
      {products.map((item, index) => (
        <VStack key={index} space="xs">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$sm" color="$textDark700">{item.produto}</Text>
            <Text fontSize="$sm" fontWeight="bold" color="$textDark800">
              {item.quantidade} unidades
            </Text>
          </HStack>
          <Progress 
            value={(item.quantidade / maxQuantity) * 100} 
            size="sm" 
            bg="$backgroundLight200"
          >
            <ProgressFilledTrack bg={item.color} />
          </Progress>
        </VStack>
      ))}
    </VStack>
  );
};