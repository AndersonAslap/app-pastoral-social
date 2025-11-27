import { VStack, Text, Button } from "@gluestack-ui/themed";
import { TemplateForm, Product, TemplateItem, EstoqueStatus } from "../types";
import { ModeloTemplateProdutoItemSection } from "./modeloTemplateProdutoItemSection";

interface ModeloTemplateProdutosSectionProps {
  form: TemplateForm;
  produtosOptions: { label: string; value: string }[];
  produtos: Product[];
  onItemChange: (index: number, field: keyof TemplateItem, value: any) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  getProdutoInfo: (itemProdutoId: string) => Product | undefined;
  getEstoqueStatus: (itemProdutoId: string, quantidade: number) => EstoqueStatus;
  getQuantidadeEstoque: (itemProdutoId: string) => number;
}

export const ModeloTemplateProdutosSection = ({
  form,
  produtosOptions,
  produtos,
  onItemChange,
  onAddItem,
  onRemoveItem,
  getProdutoInfo,
  getEstoqueStatus,
  getQuantidadeEstoque
}: ModeloTemplateProdutosSectionProps) => (
  <VStack gap="$4">
    <Text size="xl" fontWeight="$bold" color="$textDark800">
      Produtos
    </Text>

    <VStack gap="$3">
      {form.templateItens.map((item, index) => {
        const produtoInfo = getProdutoInfo(item.itemProdutoId);
        const estoqueStatus = getEstoqueStatus(item.itemProdutoId, item.quantidade);
        const quantidadeEstoque = getQuantidadeEstoque(item.itemProdutoId);

        return (
          <ModeloTemplateProdutoItemSection
            key={index}
            item={item}
            index={index}
            produtosOptions={produtosOptions}
            produtoInfo={produtoInfo}
            estoqueStatus={estoqueStatus}
            quantidadeEstoque={quantidadeEstoque}
            onItemChange={onItemChange}
            onRemove={onRemoveItem}
          />
        );
      })}
    </VStack>

    {/* Botão Adicionar Item */}
    <Button
      onPress={onAddItem}
      bg="$primary500"
      borderRadius="$lg"
      size="lg"
    >
      <Text color="white" fontWeight="$bold">
        Adicionar Item
      </Text>
    </Button>
  </VStack>
);