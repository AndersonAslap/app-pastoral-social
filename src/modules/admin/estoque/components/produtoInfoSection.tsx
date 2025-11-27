import { Box, VStack, HStack, Text } from "@gluestack-ui/themed";
import { Package, Scale } from "lucide-react-native";
import { CustomSelect } from "@shared/components";
import { Input } from "@shared/components";
import { SelectOptions } from "@shared/types";

interface ProdutoInfoSectionProps {
    produtosOptions: SelectOptions[];
    produtoId?: string;
    quantidade?: number;
    onProdutoChange: (value: string) => void;
    onQuantidadeChange: (value: number) => void;
}

export const ProdutoInfoSection = ({
    produtosOptions,
    produtoId,
    quantidade,
    onProdutoChange,
    onQuantidadeChange
}: ProdutoInfoSectionProps) => (
    <VStack gap="$4">
        <Text size="xl" fontWeight="$bold" color="$textDark800">
            Informações do Produto
        </Text>
        
        <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl">
            <VStack gap="$4">
                <VStack gap="$2">
                    <HStack space="sm" alignItems="center">
                        <Package size={18} color="#3b82f6" />
                        <Text size="md" fontWeight="$medium" color="$textDark700">
                            Produto
                        </Text>
                    </HStack>
                    <CustomSelect
                        options={produtosOptions}
                        placeholder="Selecione o produto"
                        size="md"
                        selectedValue={produtoId?.toString()}
                        onValueChange={onProdutoChange}
                    />
                </VStack>

                <VStack gap="$2">
                    <HStack space="sm" alignItems="center">
                        <Scale size={18} color="#3b82f6" />
                        <Text size="md" fontWeight="$medium" color="$textDark700">
                            Quantidade
                        </Text>
                    </HStack>
                    <Input
                        size="md"
                        borderRadius="$lg"
                        bg="$backgroundLight50"
                        textAlign="center"
                        value={String(quantidade || 1)}
                        onChangeText={(text) => onQuantidadeChange(Number(text))}
                        keyboardType="numeric"
                        placeholder="0"
                    />
                </VStack>
            </VStack>
        </Box>
    </VStack>
);