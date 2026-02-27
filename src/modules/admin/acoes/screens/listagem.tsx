import { ScreenHeader } from "@shared/components";
import { ScrollView, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { AcaoSocial } from "../types";
import { mockAcoesSociais } from "../data";
import { calculateStats } from "../helper/acoes.helper";
import { AcoesHeader } from "../components/acoesHeader";
import { AcoesStats } from "../components/acoesStats";
import { AcoesCard } from "../components/acoesCard";
import { AcoesEmptyList } from "../components/acoesEmptyList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useAcaoListagem } from "../hooks/useAcaoListagem";

export const AcoesListagem = () => {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { loading, items } = useAcaoListagem();

  const handleOpenAcoesCadastrar = () => navigator.navigate("acoesCadastrar");

  const stats = calculateStats(items);

  const handleFiltrar = () => {
    console.log("Abrir filtros");
  };

  const handleNovaAcao = () => {
    handleOpenAcoesCadastrar();
  };

  const handleDetalhes = (acao: AcaoSocial) => {
    console.log("Detalhes da ação:", acao);
  };

  const handleEditar = (acao: AcaoSocial) => {
    console.log("Editar ação:", acao);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
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
        pb="$16"
        space="md"
      >
        <AcoesHeader
          totalAcoes={stats.total}
          onFiltrar={handleFiltrar}
          onNovaAcao={handleNovaAcao}
        />

        <AcoesStats stats={stats} />

        {/* Lista de Ações */}
        {items.length > 0 ? (
          <VStack space="md">
            {items.map((acao) => (
              <AcoesCard
                key={acao.id}
                acao={acao}
                onDetalhes={handleDetalhes}
                onEditar={handleEditar}
              />
            ))}
          </VStack>
        ) : (
          <AcoesEmptyList onNovaAcao={handleNovaAcao} />
        )}
      </VStack>
    </ScrollView>
  );
};