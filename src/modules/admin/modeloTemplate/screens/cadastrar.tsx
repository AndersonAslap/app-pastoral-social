import { ScreenHeader } from "@shared/components";
import { ScrollView, View, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useModeloTemplateForm } from "../hooks/useModeloTemplateForm";
import { ModeloTemplateInformacoesBasicasSection } from "../components/modeloTemplateInformacoesBasicasSection";
import { ModeloTemplateConfiguracaoSection } from "../components/modeloTemplateConfiguracaoSection";
import { ModeloTemplateProdutosSection } from "../components/modeloTemplateProdutoSection";
import { ModeloTemplateStatusEAcoesSection } from "../components/modeloTemplateStatusEAcoesSection";

const ModeloTemplateCadastrarForm = () => {
  const {
    form,
    formSubmitting,
    calculatingGenerations,
    qtdGeracaoPossivelShow,
    produtos,
    produtosOptions,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    getProdutoInfo,
    getEstoqueStatus,
    getQuantidadeEstoque,
    handleCalculateGenerations,
    handleSubmit,
    resetForm,
    fetchProdutos
  } = useModeloTemplateForm();

  useFocusEffect(
    useCallback(() => {
      fetchProdutos();
    }, [fetchProdutos])
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Cadastrar Modelo de Cesta" backTo="modeloTemplateListagem"/>
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$6"
        pt="$8"
        pb="$16"
        gap="$6"
      >
        <ModeloTemplateInformacoesBasicasSection 
          form={form}
          onChange={handleChange}
        />

        <ModeloTemplateConfiguracaoSection
          form={form}
          onChange={handleChange}
        />

        <ModeloTemplateProdutosSection
          form={form}
          produtosOptions={produtosOptions}
          produtos={produtos}
          onItemChange={handleItemChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          getProdutoInfo={getProdutoInfo}
          getEstoqueStatus={getEstoqueStatus}
          getQuantidadeEstoque={getQuantidadeEstoque}
        />

        <ModeloTemplateStatusEAcoesSection
          form={form}
          formSubmitting={formSubmitting}
          calculatingGenerations={calculatingGenerations}
          qtdGeracaoPossivelShow={qtdGeracaoPossivelShow}
          onCalculateGenerations={handleCalculateGenerations}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </VStack>
    </ScrollView>
  );
};

export default ModeloTemplateCadastrarForm;