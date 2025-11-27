import { FlatList, View, VStack } from "@gluestack-ui/themed";
import {HeaderList, ErrorStateLottie, Loading, ScreenHeader} from "@shared/components";
import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useEstoqueData } from "../hooks/useEstoqueData";
import { EstoqueStats } from "../components/estoqueStats";
import { ProdutoCardEnhanced } from "../components/produtoCardEnhanced";
import { IEstoqueItem } from "../types";
import { ProdutoCardEmptyState } from "../components/produtoCardEmptyState";

export function EstoqueListagem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const { data, isLoading, error, fetchData } = useEstoqueData();

  const handleClickGoRegisterProduct = () => navigator.navigate("estoqueCadastrar");

  const totalProducts = data.length;
  const outOfStock = data.filter(item => item.quantidadeEstoque === 0).length;

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
      <ScreenHeader title="Estoque" />
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$4"
        pt="$8"
      >
          { isLoading 
            ? (<Loading />)
            : (
              <>
                <EstoqueStats
                  totalProducts={totalProducts}
                  outOfStock={outOfStock}
                />

                <HeaderList
                  labelButtonPlus="Novo produto"
                  onPress={handleClickGoRegisterProduct}
                />

                <FlatList
                  data={data}
                  keyExtractor={(item) => (item as IEstoqueItem).id.toString()}
                  renderItem={({ item }) => <ProdutoCardEnhanced item={item as IEstoqueItem} />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                  ListEmptyComponent={
                    <ProdutoCardEmptyState />
                  }
                />
              </>
            )
          }
      </VStack>
    </View>
  );
}