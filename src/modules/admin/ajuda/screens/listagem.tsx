// AjudaListagem.tsx - COMPONENTE PRINCIPAL REFATORADO
import { FilterList, ScreenHeader, HeaderList } from "@shared/components";
import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { calculateStats } from "../helper/ajuda.helper";
import { Help } from "../types";
import { AjudaStats } from "../components/ajudaStats";
import { AjudaCard } from "../components/ajudaCard";
import { AjudaEmptyList } from "../components/ajudaEmptyList";
import { AjudaFiltros } from "../components/ajudaFiltros";
import { mockAjudas } from "../data";

export function AjudaListagem() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [items] = useState<Help[]>(mockAjudas);

  const stats = calculateStats(items);

  const handleDetalhes = (item: Help) => {
    console.log(`Detalhes da ajuda ${item.id}`);
  };

  const handleCancelar = (item: Help) => {
    console.log(`Cancelar ajuda ${item.id}`);
  };

  const handleAprovar = (item: Help) => {
    console.log(`Aprovar ajuda ${item.id}`);
  };

  const handleRealizada = (item: Help) => {
    console.log(`Marcar como realizada ${item.id}`);
  };

  const handleReabrir = (item: Help) => {
    console.log(`Reabrir ajuda ${item.id}`);
  };

  const handleFiltroStatus = () => {
    console.log("Filtro por status");
  };

  const handleFiltroFamilia = () => {
    console.log("Filtro por família");
  };

  const handleFiltroData = () => {
    console.log("Filtro por data");
  };

  const handleLimparFiltros = () => {
    setIsFilterOpen(false);
  };

  const handleAplicarFiltros = () => {
    setIsFilterOpen(false);
  };

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
        <AjudaStats stats={stats} />

        <HeaderList
          labelButtonPlus="Nova ajuda"
          onSetShowFilter={setIsFilterOpen}
          showIconFilter={true}
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
          ListEmptyComponent={<AjudaEmptyList />}
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
      </VStack>
    </View>
  );
}