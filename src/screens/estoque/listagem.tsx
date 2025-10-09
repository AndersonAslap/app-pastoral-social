import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screen-header";
import { useEffect, useState } from "react";
import { HeaderList } from "@components/header-list";
import { FilterList } from "@components/filter-list";
import ProductCard from "@screens/estoque/components/item-produto-card";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { listarItens } from "@services/estoque.service";
import { AppError } from "@utils/app.error";
import { useAppToast } from "@hooks/useAppToast";
import { MESSAGES_ERROR } from "@utils/constantes";

export type Product = {
  id: number;
  nome: string;
  quantidadeEstoque: number;
};

export function EstoqueListagem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();
  const { showErrorToast, showSuccessToast } = useAppToast();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleClickGoRegisterProduct = () => {
    navigator.navigate("productRegister");
  }

  const [items, setItems] = useState<Product[]>([]);

  const fetchItens = async () => {
      try {
        const data = await listarItens();
        return data;
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
        showErrorToast({ title });
      }
    };

  useEffect(() => {
    const loadDataSelects = async () => {
        const promises = [fetchItens()];
        const [itensProduto] = await Promise.all(promises);
        console.log(`@log >> itensProduto`, itensProduto);
        setItems(itensProduto);
    };
    loadDataSelects();
  }, []);

  return (
    <View flex={1} bg="$blue100">
      <ScreenHeader title="Produtos" />
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
          labelButtonPlus="Novo produto"
          onSetShowFilter={setIsFilterOpen}
          showIconFilter={false}
          onPress={handleClickGoRegisterProduct}
        />

        {/* Lista de Famílias */}
        <FlatList
          data={items}
          keyExtractor={(item, _index) => (item as Product).id.toString()}
          renderItem={({ item }) => <ProductCard item={item as Product} />}
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
  );
}
