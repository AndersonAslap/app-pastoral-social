import { Box, Text, VStack } from "@gluestack-ui/themed";
import { Package } from "lucide-react-native";
import { ProductHeader } from "./produtoHeader";

interface ProdutoDetalheEmptyStateProps {
    productName: string;
    itemsCount: number;
}

export const ProdutoDetalheEmptyState = ({ productName, itemsCount }: ProdutoDetalheEmptyStateProps) => (
    <VStack flex={1}>
        <ProductHeader nome={productName} itemsCount={itemsCount} />
        <Box bg="$backgroundLight100" borderRadius="$xl" p="$8" alignItems="center" mt="$4">
            <Package size={48} color="#9CA3AF" />
            <Text fontSize="$lg" color="$textDark400" mt="$4" textAlign="center" fontWeight="medium">
                Nenhum item encontrado no estoque
            </Text>
        </Box>
    </VStack>
);