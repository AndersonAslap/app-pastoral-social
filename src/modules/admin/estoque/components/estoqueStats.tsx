import React from "react";
import { VStack, HStack, Text, Box } from "@gluestack-ui/themed";
import { TrendingUp } from "lucide-react-native";

interface IEstoqueStatsProps {
    totalProducts: number;
    outOfStock: number;
}

export const EstoqueStats: React.FC<IEstoqueStatsProps> = ({totalProducts, outOfStock}) => {
    return (
        <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4">
            <HStack justifyContent="space-between" alignItems="center" mb="$3">
            <VStack>
                <Text size="lg" fontWeight="$bold" color="$textDark800">
                Visão Geral
                </Text>
                <Text size="sm" color="$textDark500">
                Resumo do estoque
                </Text>
            </VStack>
            <Box 
                w="$10" 
                h="$10" 
                borderRadius="$lg" 
                bg="$primary100" 
                alignItems="center" 
                justifyContent="center"
            >
                <TrendingUp size={18} color="#3b82f6" />
            </Box>
            </HStack>

            <HStack space="md">
                <VStack flex={1} alignItems="center" bg="$blue50" p="$3" borderRadius="$lg">
                    <Text size="sm" color="$textDark600">Total</Text>
                    <Text size="xl" fontWeight="$bold" color="$primary600">{totalProducts}</Text>
                    <Text size="xs" color="$textDark500">produtos</Text>
                </VStack>
                
                <VStack flex={1} alignItems="center" bg="$green50" p="$3" borderRadius="$lg">
                    <Text size="sm" color="$textDark600">Disponível</Text>
                    <Text size="xl" fontWeight="$bold" color="$green600">{totalProducts - outOfStock}</Text>
                    <Text size="xs" color="$textDark500">em estoque</Text>
                </VStack>
                
                <VStack flex={1} alignItems="center" bg="$red50" p="$3" borderRadius="$lg">
                    <Text size="sm" color="$textDark600">Esgotado</Text>
                    <Text size="xl" fontWeight="$bold" color="$red600">{outOfStock}</Text>
                    <Text size="xs" color="$textDark500">itens</Text>
                </VStack>
            </HStack>
        </Box>
    )
}