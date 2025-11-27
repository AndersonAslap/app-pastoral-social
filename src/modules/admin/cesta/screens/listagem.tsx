import { ErrorStateLottie, Loading, ScreenHeader } from "@shared/components";
import { ScrollView, View, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

// Hooks
import { useCestaData } from "../hooks/useCestaData";
import { CestaStats } from "../components/cestaStats";
import { CestaFiltros } from "../components/cestaFiltros";
import { CestaList } from "../components/cestaList";
import { CestaDetalhesModal } from "../components/cestaDetalheModal";

export const CestaListagem = () => {
  const {
    dados,
    isLoading,
    error,
    modalVisible,
    cestaSelecionada,
    refetch,
    abrirDetalhes,
    fecharDetalhes
  } = useCestaData();

  const handleFiltroChange = (filtro: string) => {
    // Implementar lógica de filtro aqui
    console.log("Filtro selecionado:", filtro);
  };

  const handleEditarCesta = (cesta: any) => {
    // Implementar navegação para edição
    console.log("Editar cesta:", cesta);
  };

  const handleEntregarCesta = (cesta: any) => {
    // Implementar lógica de entrega
    console.log("Entregar cesta:", cesta);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (error.isError) {
    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Famílias" />
            <VStack flex={1} bg="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
                <ErrorStateLottie title={error.message || "Ocorreu um erro"} />
            </VStack>
        </View>
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bg="$blue100"
        flex={1}
      >
        <ScreenHeader title="Cestas Básicas" />
        
        <VStack
          flex={1}
          bg="$backgroundLight50"
          borderTopLeftRadius="$3xl"
          borderTopRightRadius="$3xl"
          px="$4"
          pt="$6"
          pb="$16"
        >
          {
            isLoading
            ? <Loading />
            : (
              <>
                <CestaStats
                  totalCestas={dados.totalCestas} 
                  cestasEntregues={dados.cestasEntregues} 
                />

                <CestaFiltros onFiltroChange={handleFiltroChange} />

                <CestaList
                  cestas={dados.cestas || []}
                  onDetalhes={abrirDetalhes}
                  onEditar={handleEditarCesta}
                  onEntregar={handleEntregarCesta}
                />
              </>
            )
          }
        </VStack>
      </ScrollView>

      <CestaDetalhesModal
        isOpen={modalVisible}
        cesta={cestaSelecionada}
        onClose={fecharDetalhes}
        onEditar={() => cestaSelecionada && handleEditarCesta(cestaSelecionada)}
        onEntregar={() => cestaSelecionada && handleEntregarCesta(cestaSelecionada)}
      />
    </>
  );
};