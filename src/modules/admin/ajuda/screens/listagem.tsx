import { FilterList, ScreenHeader, HeaderList, Loading, EmptyStateLottie } from "@shared/components";
import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { AjudaStats } from "../components/ajudaStats";
import { AjudaCard } from "../components/ajudaCard";
import { AjudaEmptyList } from "../components/ajudaEmptyList";
import { AjudaFiltros } from "../components/ajudaFiltros";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useAjudaListagem } from "../hooks/useAjudaListagem";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";
import { useCallback} from "react";

export function AjudaListagem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { 
    loading, 
    items, 
    stats, 
    isFilterOpen,
    setIsFilterOpen, 
    handleDetalhes, 
    handleCancelar, 
    handleAprovar, 
    handleRealizada, 
    handleReabrir, 
    handleFiltroStatus, 
    handleFiltroFamilia, 
    handleFiltroData, 
    handleLimparFiltros, 
    handleAplicarFiltros,
    fetchAjudas
  } = useAjudaListagem();

  const handleOpenAjudaCadastrar = () => navigator.navigate("ajudaCadastrar");

  const EMPTY_STATE_CONFIG = useEmptyStateConfig('ajuda');

  useFocusEffect(
      useCallback(() => {
          fetchAjudas();
      }, [])
  );

  return (
    <View flex={1} bg="$blue100">
      <ScreenHeader title="Ajudas" />
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$8"
      >
        {
          loading 
          ? <Loading />
          : (
            <>
              <AjudaStats stats={stats} />

              <HeaderList
                labelButtonPlus="Nova ajuda"
                onSetShowFilter={setIsFilterOpen}
                showIconFilter={false}
                onPress={handleOpenAjudaCadastrar}
              />

              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <AjudaCard
                    item={item}
                    onDetalhes={handleDetalhes}
                    onCancelar={handleCancelar}
                    onAprovar={handleAprovar}
                    onRealizada={handleRealizada}
                    onReabrir={handleReabrir}
                  />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                ListEmptyComponent={
                  <EmptyStateLottie
                    animationSource={EMPTY_STATE_CONFIG.animation}
                    title={EMPTY_STATE_CONFIG.title}
                    description={EMPTY_STATE_CONFIG.description}
                    py="$0"
                  />
                }
              />

              <FilterList
                onFilterOpen={isFilterOpen}
                onSetIsFilterOpen={setIsFilterOpen}
              >
                <AjudaFiltros
                  onFiltroStatus={handleFiltroStatus}
                  onFiltroFamilia={handleFiltroFamilia}
                  onFiltroData={handleFiltroData}
                  onLimpar={handleLimparFiltros}
                  onAplicar={handleAplicarFiltros}
                />
              </FilterList>
            </>
          )
        }
      </VStack>
    </View>
  );
}