import { FilterList, ScreenHeader, HeaderList, ErrorStateLottie, Loading } from "@shared/components";
import { View, VStack } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useModeloTemplateCesta } from "../hooks/useModeloTemplate";
import { ModeloTemplateList } from "../components/modeloTemplateList";
import { DetalhesModeloTemplateDrawer } from "../components/detalhesModeloTemplateDrawer";

const ModeloTemplateListagem: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Hook especializado para gestão de modelos de cesta
  const {
    items,
    isLoading,
    error,
    isDetalhesOpen,
    modeloSelecionado,
    isGerandoCesta,
    refetch,
    abrirDetalhes,
    fecharDetalhes,
    gerarCestas
  } = useModeloTemplateCesta();

  const handleRedirectToModeloTemplateCadastrar = () => {
    navigation.navigate("modeloTemplateCadastrar");
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (error.isError) {
      return (
          <View flex={1} bg="$blue100">
              <ScreenHeader title="Modelo de Cestas" />
              <VStack flex={1} bg="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
                  <ErrorStateLottie title={error.message || "Ocorreu um erro"} />
              </VStack>
          </View>
      );
  }

  return (
    <View flex={1} bg="$blue100">
      <ScreenHeader title="Modelos de Cesta" />
      <VStack
        flex={1}
        bg="$backgroundLight0"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$8"
      >
        {/* Header com Botões */}
        <HeaderList
          labelButtonPlus="Novo modelo"
          onSetShowFilter={setIsFilterOpen}
          showIconFilter
          onPress={handleRedirectToModeloTemplateCadastrar}
        />

        {/* Lista de Modelos de Cesta */}
        {
          isLoading 
          ? <Loading />
          : <ModeloTemplateList
              items={items}
              isGerandoCesta={isGerandoCesta}
              onDetalhes={abrirDetalhes}
              onGerarCestas={gerarCestas}
            />
        }

        {/* Drawer de Filtros */}
        <FilterList
          onFilterOpen={isFilterOpen}
          onSetIsFilterOpen={setIsFilterOpen}
        >
          <View />
        </FilterList>

        {/* Drawer de Detalhes */}
        <DetalhesModeloTemplateDrawer 
          isOpen={isDetalhesOpen}
          modelo={modeloSelecionado}
          onClose={fecharDetalhes}
        />
      </VStack>
    </View>
  );
};

export default ModeloTemplateListagem;