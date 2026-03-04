import { FlatList, View, VStack} from "@gluestack-ui/themed";
import {
    ScreenHeader,
    HeaderList,
    EmptyStateLottie,
    ErrorStateLottie
} from "@shared/components";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { FamilyCardEnhancede } from "../components/familia-card-enhanced";
import { IResponseListarFamilias } from "../../../../@shared/types/responses";
import { FamilyFilter } from "../components/familia-filter";
import { FamiliaStats } from "../components/familia-stats";
import { useFamiliaData } from "../hooks/useFamilyData";
import { useEmptyStateConfig } from "@shared/hooks/useEmptyStateConfig";
import { FamiliaListagemSkeleton } from "../components/familia-listagem-skeleton";
import { usePagination } from "@hooks/usePagination";
import { Pagination } from "@shared/components/pagination";

export function FamiliaListagem() {
    const navigator = useNavigation<AppNavigatorRoutesProps>();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { data, isLoading, error, fetchData } = useFamiliaData();
    
    // Hook de paginação
    const {
        currentPage,
        itemsPerPage,
        totalPages,
        totalItems,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange
    } = usePagination({
        data: data || [],
        initialItemsPerPage: 10
    });
    
    const handleOpenNewFamily = () => navigator.navigate("familiaCadastrar");

    const EMPTY_STATE_CONFIG = useEmptyStateConfig('família');

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (error.isError) {
        return (
            <View flex={1} bg="$blue100">
                <ScreenHeader title="Famílias" />
                <VStack flex={1} bg="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
                    <ErrorStateLottie title={error.message || "Ocorreu um erro"} />
                </VStack>
            </View>
        );
    }

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Famílias" />
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$4"
                pt="$8" 
            >
                {isLoading ? (
                    <FamiliaListagemSkeleton />
                ) : (
                    <>
                        <FamiliaStats count={totalItems} />

                        <HeaderList
                            labelButtonPlus="Nova família"
                            onSetShowFilter={setIsFilterOpen}
                            showIconFilter={false}
                            onPress={handleOpenNewFamily}
                        />

                        <FlatList
                            data={paginatedData}
                            keyExtractor={(item) => (item as IResponseListarFamilias).id.toString()}
                            renderItem={({ item }) => (
                                <FamilyCardEnhancede familia={item as IResponseListarFamilias}/>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                            ListEmptyComponent={
                                <EmptyStateLottie
                                    animationSource={EMPTY_STATE_CONFIG.animation}
                                    title={EMPTY_STATE_CONFIG.title}
                                    description={EMPTY_STATE_CONFIG.description}
                                />
                            }
                            ListFooterComponent={
                                totalItems > 0 ? (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                        onItemsPerPageChange={handleItemsPerPageChange}
                                        showItemsPerPage={true}
                                        showFirstLastButtons={true}
                                        showTotalItems={true}
                                    />
                                ) : null
                            }
                        />

                        <FamilyFilter 
                            isFilterOpen={isFilterOpen}
                            setIsFilterOpen={setIsFilterOpen}
                        />
                    </>
                )}
            </VStack>
        </View>
    );
}


