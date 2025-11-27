 import { ScreenHeader, Loading } from "@shared/components";
import { VStack, ScrollView } from "@gluestack-ui/themed";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@shared/routes/app.routes";
import { useCallback, useEffect } from "react";
import { useEstoqueDetalhes } from "../hooks/useEstoqueDetalhe";
import { ProductHeader } from "../components/produtoHeader";
import { ProductoCardItemDetalhe } from "../components/ProdutoCardItemDetalhe";
import { ProdutoDetalheEmptyState } from "../components/ProdutoDetalheEmptyState";
import { ProdutoDeleteConfirmationDialog } from "../components/produtoDeleteDialogConfirmation";

type EstoqueDetalhesRouteProp = RouteProp<AppRoutes, 'estoqueDetalhes'>;

export const EstoqueDetalhes = () => {
    const route = useRoute<EstoqueDetalhesRouteProp>();
    const { productId, nome } = route.params;

    const {
        items,
        isLoading,
        error,
        showDeleteDialog,
        productToDelete,
        handleDelete,
        confirmDelete,
        setShowDeleteDialog,
        refetchProducts
    } = useEstoqueDetalhes(productId, nome);

    useFocusEffect(
        useCallback(() => {
            refetchProducts();
        }, [refetchProducts])
    );

    useEffect(() => {
        refetchProducts();
    }, [productId, refetchProducts]);

    if (error.isError) {
        return (
            <ScrollView flex={1} bg="$blue100">
                <ScreenHeader title="Produtos" />
                <VStack flex={1} bg="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl" p="$4">
                    {/* Tratamento de erro */}
                </VStack>
            </ScrollView>
        );
    }

    return (
        <ScrollView flex={1} bg="$blue100" contentContainerStyle={{ flexGrow: 1 }}>
            <ScreenHeader title="Produtos" />
            
            <VStack flex={1} bg="$backgroundLight50" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl" px="$4" pt="$6" pb="$16">
                {isLoading ? (
                    <Loading />
                ) : items.length > 0 ? (
                    <>
                        <ProductHeader nome={nome} itemsCount={items.length} />
                        <VStack space="md">
                            {items.map((item) => (
                                <ProductoCardItemDetalhe
                                    key={item.id}
                                    product={item}
                                    productName={nome}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </VStack>
                    </>
                ) : (
                    <ProdutoDetalheEmptyState 
                        productName={nome}
                        itemsCount={items.length}
                    />
                )}
            </VStack>

            <ProdutoDeleteConfirmationDialog
                isOpen={showDeleteDialog}
                productToDelete={productToDelete}
                productName={nome}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={confirmDelete}
            />
        </ScrollView>
    );
};