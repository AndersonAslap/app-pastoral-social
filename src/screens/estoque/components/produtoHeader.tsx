import { Box, Text } from "@gluestack-ui/themed";

interface ProductHeaderProps {
    nome: string;
    itemsCount: number;
}

export const ProductHeader = ({ nome, itemsCount }: ProductHeaderProps) => (
    <Box bg="$blue50" p="$4" borderRadius="$lg" mb="$4" borderLeftWidth="$4" borderLeftColor="$blue500">
        <Text fontSize="$xl" fontWeight="bold" color="$blue800" mb="$1">
            {nome}
        </Text>
        <Text fontSize="$sm" color="$blue600">
            {itemsCount} {itemsCount === 1 ? 'item encontrado' : 'itens encontrados'}
        </Text>
    </Box>
);