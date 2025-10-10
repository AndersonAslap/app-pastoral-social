import { Button, FlatList, Text, View, VStack } from "@gluestack-ui/themed";
import FamilyCard from "@screens/familia/components/family-card";
import { ScreenHeader } from "@components/screen-header";
import { useEffect, useState } from "react";
import { FilterList } from "@components/filter-list";
import { HeaderList } from "@components/header-list";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { listarFamiliaService } from "@services/familia.service";
import { useAppToast } from "@hooks/useAppToast";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";

export type Family = {
    id: number;
    nomeRepresentante: string;
    endereco: string;
};

export function FamiliaListagem() {
    const { showErrorToast, showSuccessToast } = useAppToast();
    const navigator = useNavigation<AppNavigatorRoutesProps>();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleOpenNewFamily = () => {
        navigator.navigate("familiaCadastrar");
    }

    const [items, setItems] = useState<Family[]>([]);
    
    const fetchItens = async () => {
        try {
            const data = await listarFamiliaService();
            console.log(data);
            return data;
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            showErrorToast({ title });
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const promises = [fetchItens()];
            const [familias] = await Promise.all(promises);
            setItems(familias);
        };

        loadData();
    }, []);

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
                    keyExtractor={(item, _index) => (item as Family).id.toString()}
                    renderItem={({ item }) => (
                        <FamilyCard item={item as Family}/>
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
