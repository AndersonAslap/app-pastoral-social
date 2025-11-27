import React from 'react';
import { VStack, Box, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useAcoesSociais } from '../hooks/useAcoesSociais';
import { AcoesSociaisHeader } from '../components/acoesSociaisHeader';
import { FiltroStatus } from '../components/filtroStatus';
import { AcoesSociaisCard } from '../components/acoesSociaisCard';
import { AcoesSociaisEmptyState } from '../components/acoesSociaisEmptyState';
import { AuthNavigatorRoutesProps } from '@shared/routes/auth.routes';

export const DoadorListagemAcoes: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    filtroStatus,
    setFiltroStatus,
    acoesFiltradas,
    filtros,
    formatarNumero,
    formatarData,
    getStatusInfo
  } = useAcoesSociais();

  // Função para navegar para os detalhes da ação
  const handleVerDetalhes = (acaoId: number) => {
    navigation.navigate("doadorDetalheAcao", { id: acaoId });
  };

  // Função para navegar para realizar doação
  const handleDoarItens = (acaoId: number) => {
    navigation.navigate("doacaoAcao", { id: acaoId });
  };

  const handleVerTodas = () => {
    setFiltroStatus("todas");
  };

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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bg="$blue50"
        flex={1}
      >
        <VStack px="$6" pt="$6" pb="$8" gap="$5">
          {acoesFiltradas.length > 0 ? (
            acoesFiltradas.map((acao) => (
              <AcoesSociaisCard
                key={acao.id}
                acao={acao}
                statusInfo={getStatusInfo(acao.status)}
                formatarNumero={formatarNumero}
                formatarData={formatarData}
                onVerDetalhes={handleVerDetalhes}
                onDoarItens={handleDoarItens}
              />
            ))
          ) : (
            <AcoesSociaisEmptyState
              filtroStatus={filtroStatus}
              onVerTodas={handleVerTodas}
            />
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};