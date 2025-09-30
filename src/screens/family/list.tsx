import { Button, FlatList, Text, View, VStack } from "@gluestack-ui/themed";
import FamilyCard from "@screens/family/components/family-card";
import { ScreenHeader } from "@components/screen-header";
import { useState } from "react";
import { FilterList } from "@components/filter-list";
import { HeaderList } from "@components/header-list";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Family = {
    id: number;
    name: string;
    address: string;
};

const items: Family[] = [
    { id: 1, name: "João Silva", address: "Rua das Flores, 123 - São Paulo" },
    { id: 2, name: "Maria Oliveira", address: "Av. Brasil, 456 - Rio de Janeiro" },
    { id: 3, name: "Carlos Souza", address: "Rua A, 78 - Belo Horizonte" },
    { id: 4, name: "Ana Lima", address: "Av. Central, 90 - Salvador" },
    { id: 5, name: "Pedro Santos", address: "Rua da Paz, 321 - Curitiba" },
    { id: 6, name: "Luciana Rocha", address: "Rua Verde, 50 - Porto Alegre" },
];

export function FamilyList() {
    const navigator = useNavigation<AppNavigatorRoutesProps>();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleOpenNewFamily = () => {
        navigator.navigate("familyRegister");
    }

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Famílias" />
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
                    labelButtonPlus="Nova família"
                    onSetShowFilter={setIsFilterOpen}
                    showIconFilter
                    onPress={handleOpenNewFamily}
                />

                {/* Lista de Famílias */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FamilyCard name={item.name} address={item.address} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />

                {/* Drawer de Filtros */}
                <FilterList
                    onFilterOpen={isFilterOpen}
                    onSetIsFilterOpen={setIsFilterOpen}
                >
                    <Button
                        variant="outline"
                        borderColor="$primary500"
                        mb="$3"
                        onPress={() => console.log("Filtro por cidade")}
                    >
                        <Text>Filtrar por cidade</Text>
                    </Button>
                    <Button
                        variant="outline"
                        borderColor="$primary500"
                        mb="$3"
                        onPress={() => console.log("Filtro por nome")}
                    >
                        <Text>Filtrar por nome</Text>
                    </Button>

                    <Button mt="$5" onPress={() => setIsFilterOpen(false)}>
                        <Text>Aplicar Filtros</Text>
                    </Button>
                </FilterList>
            </VStack>
        </View>
    );
}
