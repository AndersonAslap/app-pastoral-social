import { FilterList } from "@components/filter-list";
import { ScreenHeader } from "@components/screen-header";
import { FlatList } from "@gluestack-ui/themed";
import { View, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { HeaderList } from "@components/header-list";
import ModeloCestaCard from "./components/modelo-cesta-card";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type ModeloCesta = {
    id: number;
    name: string;
}

const items: ModeloCesta[] = [
    { id: 1, name: "Cesta Básica Mensal" },
    { id: 2, name: "Cesta Emergencial" },
    { id: 3, name: "Cesta Família com Crianças" },
    { id: 4, name: "Cesta para Idosos" },
];

const ModeloTemplateListagem: React.FC = () => {
    const navigator = useNavigation<AppNavigatorRoutesProps>();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleRedirectToModeloTemplateCadastrar = () => {
        navigator.navigate("modeloTemplateCadastrar");
    }

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Modelos de Cesta" />
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
                    labelButtonPlus="Novo modelo"
                    onSetShowFilter={setIsFilterOpen}
                    showIconFilter
                    onPress={handleRedirectToModeloTemplateCadastrar}
                />

                {/* Lista de Famílias */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ModeloCestaCard item={item} />
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

export default ModeloTemplateListagem;