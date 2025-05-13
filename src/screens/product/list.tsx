import { FlatList, View, VStack } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screen-header";
import { useState } from "react";
import { HeaderList } from "@components/header-list";
import { FilterList } from "@components/filter-list";
import ProductCard from "@screens/product/components/product-card";

type Product = {
  id: number;
  productName: string;
  localization: string;
  dueDate: Date;
};

const items: Product[] = [
  {
    id: 1,
    productName: "Feijão",
    localization: "Despensa A1",
    dueDate: new Date("2025-03-15"),
  },
  {
    id: 2,
    productName: "Arroz",
    localization: "Prateleira B2",
    dueDate: new Date("2025-05-18"),
  },
  {
    id: 3,
    productName: "Macarrão",
    localization: "Cozinha Central",
    dueDate: new Date("2025-06-20"),
  },
  {
    id: 4,
    productName: "Cuscuz",
    localization: "Armazém 3",
    dueDate: new Date("2025-05-14"),
  },
  {
    id: 5,
    productName: "Farinha de mandioca",
    localization: "Estoque Norte",
    dueDate: new Date("2025-05-22"),
  },
  {
    id: 6,
    productName: "Açúcar",
    localization: "Prateleira C1",
    dueDate: new Date("2025-05-25"),
  },
  {
    id: 7,
    productName: "Sal",
    localization: "Despensa A3",
    dueDate: new Date("2025-05-29"),
  },
  {
    id: 8,
    productName: "Café",
    localization: "Cozinha 2",
    dueDate: new Date("2025-05-27"),
  },
  {
    id: 9,
    productName: "Leite em pó",
    localization: "Estante D4",
    dueDate: new Date("2025-05-30"),
  },
  {
    id: 10,
    productName: "Milho para canjica",
    localization: "Armazém Sul",
    dueDate: new Date("2025-05-19"),
  },
];


export function ProductList() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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
                    showIconFilter
                />

                {/* Lista de Famílias */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard item={item} />
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
    );
}
