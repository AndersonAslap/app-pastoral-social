import { Box, HStack, View, Text, Button, ButtonIcon, Badge, BadgeText } from "@gluestack-ui/themed";
import { Input, CustomSelect } from "@shared/components";
import { TrashIcon, PackageIcon } from "lucide-react-native";
import { TemplateItem, Product, EstoqueStatus } from "../types";

interface ModeloTemplateProdutoItemSectionProps {
  item: TemplateItem;
  index: number;
  produtosOptions: { label: string; value: string }[];
  produtoInfo?: Product;
  estoqueStatus: EstoqueStatus;
  quantidadeEstoque: number;
  onItemChange: (index: number, field: keyof TemplateItem, value: any) => void;
  onRemove: (index: number) => void;
}

export const ModeloTemplateProdutoItemSection = ({
  item,
  index,
  produtosOptions,
  produtoInfo,
  estoqueStatus,
  quantidadeEstoque,
  onItemChange,
  onRemove
}: ModeloTemplateProdutoItemSectionProps) => (
  <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
    {/* Linha 1: Select Produto e Botão Remover */}
    <HStack alignItems="flex-start" space="md" mb="$3">
      {/* Select Produto */}
      <View flex={1}>
        <CustomSelect
          options={produtosOptions}
          placeholder="Produto"
          size="lg"
          variant="outline"
          selectedValue={item.itemProdutoId}
          onValueChange={value => onItemChange(index, "itemProdutoId", value)}
        />
      </View>

      {/* Botão Remover */}
      <Button
        borderRadius="$lg"
        size="md"
        bg="$red100"
        p="$3"
        onPress={() => onRemove(index)}
      >
        <ButtonIcon as={TrashIcon} color="$red600" size="md" />
      </Button>
    </HStack>

    {/* Linha 2: Badge de Estoque e Campo Quantidade */}
    <HStack alignItems="center" space="md">
      {/* Badge de Estoque */}
      <View flex={1}>
        {item.itemProdutoId && (
          <HStack alignItems="center" space="sm">
            <PackageIcon size={14} color="#6B7280" />
            <Badge 
              size="sm" 
              variant="solid" 
              borderRadius="$full"
              bg={estoqueStatus.color + "100"}
              borderWidth="$1"
              borderColor={estoqueStatus.color + "300"}
              px="$3"
              py="$1"
            >
              <BadgeText 
                fontSize="$2xs" 
                fontWeight="bold" 
                color={estoqueStatus.color + "700"}
              >
                Estoque: {quantidadeEstoque}
              </BadgeText>
            </Badge>
            
            {/* Aviso de estoque insuficiente */}
            {item.quantidade > 0 && quantidadeEstoque > 0 && item.quantidade > quantidadeEstoque && (
              <Text fontSize="$2xs" color="$orange600" fontWeight="bold">
                ({item.quantidade - quantidadeEstoque} a mais)
              </Text>
            )}
          </HStack>
        )}
      </View>

      {/* Campo Quantidade */}
      <View width="$20">
        <Input
          size="lg"
          textAlign="center"
          value={String(item.quantidade)}
          onChangeText={text => onItemChange(index, "quantidade", Number(text))}
          keyboardType="numeric"
          placeholder="0"
        />
      </View>
    </HStack>

    {/* Linha 3: Status do Estoque */}
    {item.itemProdutoId && item.quantidade > 0 && (
      <HStack justifyContent="center" mt="$2">
        {estoqueStatus.status === "sem-estoque" && (
          <Text fontSize="$xs" color="$red600" fontWeight="bold">
            SEM ESTOQUE
          </Text>
        )}
        {estoqueStatus.status === "insuficiente" && (
          <Text fontSize="$xs" color="$orange600" fontWeight="bold">
            ESTOQUE INSUFICIENTE
          </Text>
        )}
        {estoqueStatus.status === "exato" && (
          <Text fontSize="$xs" color="$blue600" fontWeight="bold">
            ESTOQUE EXATO
          </Text>
        )}
        {estoqueStatus.status === "suficiente" && (
          <Text fontSize="$xs" color="$green600" fontWeight="bold">
            ESTOQUE SUFICIENTE
          </Text>
        )}
      </HStack>
    )}
  </Box>
);