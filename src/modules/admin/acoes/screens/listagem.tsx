import { EmptyStateLottie, ScreenHeader } from "@shared/components";
import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { AcaoSocial } from "../types";
import { calculateStats } from "../helper/acoes.helper";
import { AcoesHeader } from "../components/acoesHeader";
import { AcoesStats } from "../components/acoesStats";
import { AcoesCard } from "../components/acoesCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useAcaoListagem } from "../hooks/useAcaoListagem";
import { useEmptyStateConfig } from "@hooks/useEmptyStateConfig";

export const AcoesListagem = () => {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { loading, items } = useAcaoListagem();

  const handleOpenAcoesCadastrar = () => navigator.navigate("acoesCadastrar");

   const EMPTY_STATE_CONFIG = useEmptyStateConfig('ação');

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
        pb="$16"
        space="md"
      >
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
              key={item.id}
              acao={item}
              onDetalhes={handleDetalhes}
              onEditar={handleEditar}
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
      </VStack>
    </View>
  );
};