import { EmptyStateLottie, Loading, ScreenHeader } from "@components/index";
import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { AcaoSocial } from "@tipagens/acao";
import { calculateStats } from "@helper/acoes.helper";
import { AcoesHeader } from "./components/acoesHeader";
import { AcoesStats } from "./components/acoesStats";
import { AcoesCard } from "./components/acoesCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useAcaoListagem } from "@hooks/acao/useAcaoListagem";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";
import { useCallback } from "react";
import { AcaoDetalheModal } from "./components/acaoDetalheModal";
import { Pagination } from "@components/pagination";

export const AcoesListagem = () => {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { 
    loading, 
    items, 
    fetchAcoes,
    acaoSelecionada,
    modalVisible,
    pagination,
    onChangePage,
    handleAbrirDetalhes,
    handleFecharDetalhes
  } = useAcaoListagem();

  const EMPTY_STATE_CONFIG = useEmptyStateConfig('ação');

  const stats = calculateStats(items);

  const handleFiltrar = () => {
    console.log("Abrir filtros");
  };

  const handleNovaAcao = () => {
    navigator.navigate("acoesCadastrar");
  };

  const handleEditar = (acao: AcaoSocial) => {
    console.log("Editar ação:", acao);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAcoes();
    }, [])
  );

  return (
    <View
      bg="$blue100"
      flex={1}
    >
      <ScreenHeader title="Ações Sociais" />
      
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$6"
        space="md"
      >
        {
          loading
          ? <Loading />
          : (
            <>
              <AcoesHeader
                totalAcoes={stats.total}
                onFiltrar={handleFiltrar}
                onNovaAcao={handleNovaAcao}
              />

              <AcoesStats stats={stats} />

              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <AcoesCard
                    acao={item}
                    onAbrirDetalhes={handleAbrirDetalhes}
                    onEditar={handleEditar}
                  />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16, paddingTop: 8, gap:24}}
                ListEmptyComponent={
                  <EmptyStateLottie
                    animationSource={EMPTY_STATE_CONFIG.animation}
                    title={EMPTY_STATE_CONFIG.title}
                    description={EMPTY_STATE_CONFIG.description}
                    py="$0"
                  />
                }
                ListFooterComponent={
                    pagination.totalItens > 10 ? (
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

              <AcaoDetalheModal
                isOpen={modalVisible}
                acao={acaoSelecionada}
                onClose={handleFecharDetalhes}
              />
            </>
          )
        }
      </VStack>
    </View>
  );
};