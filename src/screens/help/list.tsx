import { FilterList } from "@components/filter-list";
import HelpCard from "@screens/help/components/help-card";
import { ScreenHeader } from "@components/screen-header";
import { FlatList } from "@gluestack-ui/themed";
import { View, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { HeaderList } from "@components/header-list";

type Cesta = {
    id: number;
    familyName: string;
    helpName: string;
    status: string;
}

const items: Help[] = [
  { id: 1, familyName: "Família Silva", helpName: "Cesta básica", status: "pendente" },
  { id: 2, familyName: "Família Oliveira", helpName: "Cesta básica", status: "em andamento" },
  { id: 3, familyName: "Família Santos", helpName: "Cesta básica", status: "concluído" },
  { id: 4, familyName: "Família Souza", helpName: "Cesta básica", status: "pendente" },
  { id: 5, familyName: "Família Costa", helpName: "Cesta básica", status: "concluído" },
  { id: 6, familyName: "Família Pereira", helpName: "Cesta básica", status: "em andamento" },
  { id: 7, familyName: "Família Lima", helpName: "Cesta básica", status: "pendente" },
  { id: 8, familyName: "Família Martins", helpName: "Cesta básica", status: "concluído" },
  { id: 9, familyName: "Família Rocha", helpName: "Cesta básica", status: "em andamento" },
  { id: 10, familyName: "Família Almeida", helpName: "Cesta básica", status: "pendente" },
];

export function HelpList() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Ajudas" />
            <VStack
                flex={1}
                bg="$backgroundLight0"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$4"
                pt="$8"
            >
                {/* Header com Botões */}
                <HeaderList
                    labelButtonPlus="Nova ajuda"
                    onSetShowFilter={setIsFilterOpen}
                    showIconFilter
                />

                {/* Lista de Famílias */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <HelpCard item={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />

                {/* Drawer de Filtros */}
                <FilterList
                    onFilterOpen={isFilterOpen}
                    onSetIsFilterOpen={setIsFilterOpen}
                >
                    <View />
                </FilterList>
            </VStack>
        </View>
    )
}