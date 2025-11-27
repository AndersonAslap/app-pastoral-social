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

export const AcoesListagem = () => {
  const [acoes] = useState<AcaoSocial[]>(mockAcoesSociais);

  const stats = calculateStats(acoes);

  const handleFiltrar = () => {
    console.log("Abrir filtros");
  };

  const handleNovaAcao = () => {
    console.log("Nova ação social");
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
        {acoes.length > 0 ? (
          <VStack space="md">
            {acoes.map((acao) => (
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