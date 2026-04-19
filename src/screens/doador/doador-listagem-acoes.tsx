import React, { useCallback } from 'react';
import { VStack, Box, FlatList, View } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAcoesSociais } from '@hooks/doador/useAcoesSociais';
import { AcoesSociaisHeader } from './components/acoesSociaisHeader';
import { FiltroStatus } from './components/filtroStatus';
import { AcoesSociaisCard } from './components/acoesSociaisCard';
import { AcoesSociaisEmptyState } from './components/acoesSociaisEmptyState';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AcaoSocial } from '@tipagens/doador';
import { Pagination } from '@components/pagination';
import { Loading } from '@components/loading';

export const DoadorListagemAcoes: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    loading,
    filtroStatus,
    setFiltroStatus,
    filtros,
    getStatusInfo,
    acoes,
    fetchAcoes,
    pagination,
    onChangePage
  } = useAcoesSociais();

  // Função para navegar para os detalhes da ação
  const handleVerDetalhes = (acao: any) => {
    navigation.navigate("doadorDetalheAcao", { id: acao.id });
  };

  // Função para navegar para realizar doação
  const handleDoarItens = (acaoId: number) => {
    navigation.navigate("doacaoAcao", { id: acaoId });
  };

  const handleVerTodas = () => {
    setFiltroStatus("todas");
  };

  useFocusEffect(
    useCallback(() => {
      fetchAcoes();
    }, [])
  );

  return (
    <VStack flex={1} bg="$white">
      {/* Header Fixo */}
      <AcoesSociaisHeader />
      
      {/* Filtro de Status */}
      <Box bg="$white" px="$6" pb="$4">
        <FiltroStatus
          filtroAtivo={filtroStatus}
          filtros={filtros}
          onFiltroChange={setFiltroStatus}
        />
      </Box>

      {/* Lista de Ações com Scroll Apenas Aqui */}
      <View flex={1} bg="$blue50">
        {loading
          ? <Loading />
          : (
            <FlatList
              data={acoes}
              keyExtractor={(item) => (item as AcaoSocial)?.id.toString()}
              renderItem={({ item }) => (
                <AcoesSociaisCard
                  key={item.id}
                  acao={item}
                  statusInfo={getStatusInfo(item.status)}
                  onVerDetalhes={handleVerDetalhes}
                  onDoarItens={handleDoarItens}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap:24, padding: 16, paddingBottom: 80 }}
              ListEmptyComponent={
                <AcoesSociaisEmptyState
                  filtroStatus={filtroStatus}
                  onVerTodas={handleVerTodas}
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
          )}
      </View>
    </VStack>
  );
};