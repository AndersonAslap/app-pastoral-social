import { Box, VStack, HStack, Text } from "@gluestack-ui/themed";
import { Package, Scale } from "lucide-react-native";
import { Input, CustomSelect } from "@components/index";
import { SelectOptions } from "@tipagens/index";

interface ProdutoInfoSectionProps {
    produtosOptions: SelectOptions[];
    produtoId?: string;
    codProduto?: string;
    onProdutoChange: (value: string) => void;
    onCodProdutoChange: (value: string) => void;
    fieldState: any;
}

export const ProdutoInfoSection = ({
    produtosOptions,
    produtoId,
    codProduto,
    fieldState,
    onProdutoChange,
    onCodProdutoChange
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
                        error={fieldState.itemProdutoId.error}
                        errorMessage={fieldState.itemProdutoId.message}
                    />
                </VStack>

                <VStack gap="$2">
                    <HStack space="sm" alignItems="center">
                        <Scale size={18} color="#3b82f6" />
                        <Text size="md" fontWeight="$medium" color="$textDark700">
                            Códido do produto
                        </Text>
                    </HStack>
                    <Input
                        size="md"
                        borderRadius="$lg"
                        bg="$backgroundLight50"
                        textAlign="center"
                        value={codProduto}
                        onChangeText={(text) => onCodProdutoChange(text)}
                        error={fieldState.codProduto.error}
                        helperText={fieldState.codProduto.message}
                    />
                </VStack>
            </VStack>
        </Box>
    </VStack>
);