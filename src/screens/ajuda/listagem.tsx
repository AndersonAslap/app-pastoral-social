import { FilterList, ScreenHeader, HeaderList, Loading, EmptyStateLottie } from "@components/index";
import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { AjudaStats } from "./components/ajudaStats";
import { AjudaCard } from "./components/ajudaCard";
import { AjudaFiltros } from "./components/ajudaFiltros";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAjudaListagem } from "@hooks/ajuda/useAjudaListagem";
import { useEmptyStateConfig } from "../../hooks/useEmptyStateConfig";
import { useCallback} from "react";
import { AjudaDetalheModal } from "./components/ajudaDetalheModal";
import { Pagination } from "@components/pagination";
import { paginationArgs } from "@utils/constantes";

export function AjudaListagem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { 
    loading, 
    items, 
    stats, 
    isFilterOpen,
    modalVisible,
    ajudaSelecionada,
    pagination,
    setIsFilterOpen, 
    handleAbrirDetalhes,
    handleFecharDetalhes,
    handleCancelar, 
    handleAprovar, 
    handleRealizada, 
    handleLimparFiltros, 
    handleAplicarFiltros,
    fetchAjudas,
    onChangePage
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
                showIconFilter={true}
                onPress={handleOpenAjudaCadastrar}
              />

              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <AjudaCard
                    item={item}
                    onAbrirDetalhes={handleAbrirDetalhes}
                    onCancelar={handleCancelar}
                    onAprovar={handleAprovar}
                    onRealizada={handleRealizada}
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
                ListFooterComponent={
                  pagination.totalItens > paginationArgs.ITEMS_PER_PAGE ? (
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      totalItems={pagination.totalItens}
                      itemsPerPage={pagination.itemsPerPage}
                      onPageChange={onChangePage}
                      onItemsPerPageChange={() => {}}
                      showItemsPerPage={false}
                      showFirstLastButtons={true}
                      showTotalItems={true}
                    />
                  ) : null
              }
              />

              <AjudaFiltros
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />

              <AjudaDetalheModal
                isOpen={modalVisible}
                ajuda={ajudaSelecionada}
                onClose={handleFecharDetalhes}
              />
            </>
          )
        }
      </VStack>
    </View>
  );
}