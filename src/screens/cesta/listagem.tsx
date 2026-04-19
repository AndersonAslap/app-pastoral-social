import { ErrorStateLottie, Loading, ScreenHeader } from "@components/index";
import { ScrollView, View, VStack } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

// Hooks
import { useCestaData } from "@hooks/cesta/useCestaData";
import { CestaStats } from "./components/cestaStats";
import { CestaFiltros } from "./components/cestaFiltros";
import { CestaList } from "./components/cestaList";
import { CestaDetalhesModal } from "./components/cestaDetalheModal";

export const CestaListagem = () => {
  const {
    dados,
    isLoading,
    error,
    modalVisible,
    cestaSelecionada,
    pagination,
    filterStatusCesta,
    refetch,
    abrirDetalhes,
    fecharDetalhes,
    onChangePage,
    onHandleFiltroChange,
    onHandleEntregarCesta,
    onHandleCancelarCesta
  } = useCestaData();

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
    <View flex={1} bg="$blue100">
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

              <CestaFiltros onFiltroChange={onHandleFiltroChange} filtroAtivo={filterStatusCesta} />

              <CestaList
                cestas={dados.cestas || []}
                onDetalhes={abrirDetalhes}
                onCancelar={onHandleCancelarCesta}
                onEntregar={onHandleEntregarCesta}
                pagination={pagination}
                onChangePage={onChangePage}
              />
            </>
          )
        }
      </VStack>

      <CestaDetalhesModal
        isOpen={modalVisible}
        cesta={cestaSelecionada}
        onClose={fecharDetalhes}
        onEditar={() => cestaSelecionada}
        onEntregar={() => cestaSelecionada}
      />
    </View>
  );
};