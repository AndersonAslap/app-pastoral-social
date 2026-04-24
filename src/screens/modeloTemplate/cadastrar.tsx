import { ScreenHeader } from "@components/index";
import { ScrollView, View, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useModeloTemplateForm } from "@hooks/modeloTemplate/useModeloTemplateForm";
import { ModeloTemplateInformacoesBasicasSection } from "./components/modeloTemplateInformacoesBasicasSection";
import { ModeloTemplateConfiguracaoSection } from "./components/modeloTemplateConfiguracaoSection";
import { ModeloTemplateProdutosSection } from "./components/modeloTemplateProdutoSection";
import { ModeloTemplateStatusEAcoesSection } from "./components/modeloTemplateStatusEAcoesSection";
import { Seccao } from "@screens/doador/components/seccao";
import { ItensSection } from "@components/itens-section";
import { CustomSection } from "@components/custom-section";

const ModeloTemplateCadastrarForm = () => {
  const {
    form,
    formSubmitting,
    calculatingGenerations,
    qtdGeracaoPossivelShow,
    produtos,
    produtosOptions,
    fieldState,
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
    fetchProdutos,

    produtosSelecionados,
    handleProdutoToggle,
    handleProdutoChangeQuantidade
  } = useModeloTemplateForm();

  useFocusEffect(
    useCallback(() => {
      resetForm();
      fetchProdutos();
    }, [])
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
          fieldState={fieldState}
        />

        <ModeloTemplateConfiguracaoSection
          form={form}
          onChange={handleChange}
        />

        {
          /*
            Modelo antigo, onde os itens eram gerenciados em uma seção à parte. Mantido aqui para referência de código, caso seja necessário reutilizar alguma lógica ou componente específico.
            
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
          
          */
        }

        

        <CustomSection titulo="Itens da cesta">
          <ItensSection
            produtos={produtosOptions}
            produtosSelecionados={produtosSelecionados}
            onProdutoToggle={handleProdutoToggle}
            onQuantidadeChange={handleProdutoChangeQuantidade}
            bg="$blue50"
            isVisibleSubTitle={false}
          />
        </CustomSection>

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