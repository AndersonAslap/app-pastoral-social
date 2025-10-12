import { FlatList, View, VStack, HStack, Text, Box, Badge, BadgeText, ScrollView, Button, Pressable } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screen-header";
import { useCallback, useEffect, useState } from "react";
import { HeaderList } from "@components/header-list";
import { FilterList } from "@components/filter-list";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { listarItens } from "@services/estoque.service";
import { AppError } from "@utils/app.error";
import { useAppToast } from "@hooks/useAppToast";
import { MESSAGES_ERROR } from "@utils/constantes";
import { Package, TrendingUp, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react-native";
import { ErrorStateLottie } from "@components/error-state-lottie";
import { Loading } from "@components/loading";

export type Product = {
  id: number;
  nome: string;
  quantidadeEstoque: number;
  categoria?: string;
  unidadeMedida?: string;
};

export function EstoqueListagem() {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: ""
  });

  const handleClickGoRegisterProduct = () => {
    navigator.navigate("estoqueCadastrar");
  }

  const handleClickProduct = (product: Product) => {
    console.log("Clicou no produto:", product);
    navigator.navigate("estoqueDetalhes", { productId: product.id, nome: product.nome });
  }

  const [items, setItems] = useState<Product[]>([]);

  const fetchItens = async () => {
    try {
      setIsLoading(true);
      const data = await listarItens();
      setItems(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
      setError({ isError: true, message: title });
    } finally {
      setIsLoading(false);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { status: "Esgotado", color: "$red500", bgColor: "$red100", icon: AlertTriangle };
    if (quantity < 10) return { status: "Baixo", color: "$orange500", bgColor: "$orange100", icon: AlertTriangle };
    return { status: "Disponível", color: "$green500", bgColor: "$green100", icon: CheckCircle };
  };

  const totalProducts = items.length;
  const outOfStock = items.filter(item => item.quantidadeEstoque === 0).length;
  const lowStock = items.filter(item => item.quantidadeEstoque > 0 && item.quantidadeEstoque < 10).length;

  useFocusEffect(
    useCallback(() => {
      fetchItens();
    }, [])
  );

  const EnhancedProductCard = ({ item }: { item: Product }) => {
    const stockStatus = getStockStatus(item.quantidadeEstoque);
    
    // Solução mais direta - definir cores hexadecimais diretamente
    const getStatusConfig = (quantity: number) => {
        if (quantity === 0) return { 
            status: "Esgotado", 
            color: "$red500", 
            bgColor: "$red100", 
            iconColor: "#ef4444",
            icon: AlertTriangle 
        };
        if (quantity < 10) return { 
            status: "Baixo", 
            color: "$orange500", 
            bgColor: "$orange100", 
            iconColor: "#f97316",
            icon: AlertTriangle 
        };
        return { 
            status: "Disponível", 
            color: "$green500", 
            bgColor: "$green100", 
            iconColor: "#22c55e",
            icon: CheckCircle 
        };
    };

    const statusConfig = getStatusConfig(item.quantidadeEstoque);

    return (
      <Pressable onPress={() => handleClickProduct(item)}>
        {({ pressed }: { pressed: boolean }) => (
          <Box
            bg="$backgroundLight0"
            p="$4"
            mb="$3"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="$borderLight200"
            shadow="sm"
            opacity={pressed ? 0.9 : 1}
            transform={[{ scale: pressed ? 0.99 : 1 }]}
            sx={{
              ":active": {
                bg: "$backgroundLight50",
              }
            }}
          >
            <HStack justifyContent="space-between" alignItems="flex-start" space="md">
              {/* Ícone e Informações Básicas */}
              <HStack space="md" flex={1} alignItems="flex-start">
                <Box
                  w="$12"
                  h="$12"
                  borderRadius="$lg"
                  bg="$blue50"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Package size={20} color="#3b82f6" />
                </Box>
                
                <VStack flex={1} space="xs">
                  <HStack space="sm" alignItems="center">
                    <Text fontWeight="$bold" size="lg" color="$textDark800" flex={1}>
                      {item.nome}
                    </Text>
                    <ChevronRight size={16} color="#64748b" />
                  </HStack>
                  
                  <HStack space="sm" alignItems="center">
                    <Text size="sm" color="$textDark600">
                      Estoque:
                    </Text>
                    <Text 
                      size="sm" 
                      fontWeight="$bold" 
                      color={item.quantidadeEstoque === 0 ? "$red600" : "$textDark800"}
                    >
                      {item.quantidadeEstoque} {item.unidadeMedida || 'un'}
                    </Text>
                  </HStack>

                  {item.categoria && (
                    <Badge size="sm" bg="$gray100" borderRadius="$md">
                      <BadgeText color="$gray700" size="xs">
                        {item.categoria}
                      </BadgeText>
                    </Badge>
                  )}
                </VStack>
              </HStack>

              {/* Status do Estoque */}
              <Badge 
                size="md" 
                variant="solid" 
                bg={statusConfig.bgColor}
                borderColor={statusConfig.color}
                borderWidth={1}
                borderRadius="$full"
              >
                <HStack space="xs" alignItems="center">
                  {/* Agora podemos usar o ícone diretamente com a cor correta */}
                  {statusConfig.status === "Esgotado" && (
                    <AlertTriangle size={16} color={statusConfig.iconColor} />
                  )}
                  {statusConfig.status === "Baixo" && (
                    <AlertTriangle size={16} color={statusConfig.iconColor} />
                  )}
                  {statusConfig.status === "Disponível" && (
                    <CheckCircle size={16} color={statusConfig.iconColor} />
                  )}
                  <BadgeText color={statusConfig.color} fontWeight="$bold" size="xs">
                    {statusConfig.status}
                  </BadgeText>
                </HStack>
              </Badge>
            </HStack>

            {/* Barra de Progresso Visual */}
            {item.quantidadeEstoque > 0 && (
              <Box mt="$3">
                <HStack justifyContent="space-between" mb="$1">
                  <Text size="xs" color="$textDark500">Nível do estoque</Text>
                  <Text size="xs" color="$textDark500">
                    {Math.min(item.quantidadeEstoque, 100)}%
                  </Text>
                </HStack>
                <Box w="100%" h="$2" bg="$borderLight200" borderRadius="$full" overflow="hidden">
                  <Box 
                    h="100%" 
                    bg={item.quantidadeEstoque < 10 ? "$orange500" : "$green500"}
                    width={`${Math.min(item.quantidadeEstoque, 100)}%`}
                    borderRadius="$full"
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Pressable>
    );
  };

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
        { error.isError 
          ? (
              <ErrorStateLottie
                  title={error.message || "Ocorreu um erro"}
              />
          )
          : isLoading 
            ? (<Loading />)
            : (
              <>
                {/* Estatísticas do Estoque */}
                <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4" shadow="sm">
                  <HStack justifyContent="space-between" alignItems="center" mb="$3">
                    <VStack>
                      <Text size="lg" fontWeight="$bold" color="$textDark800">
                        Visão Geral
                      </Text>
                      <Text size="sm" color="$textDark500">
                        Resumo do estoque
                      </Text>
                    </VStack>
                    <Box 
                      w="$10" 
                      h="$10" 
                      borderRadius="$lg" 
                      bg="$primary100" 
                      alignItems="center" 
                      justifyContent="center"
                    >
                      <TrendingUp size={18} color="#3b82f6" />
                    </Box>
                  </HStack>

                  <HStack space="md">
                    <VStack flex={1} alignItems="center" bg="$blue50" p="$3" borderRadius="$lg">
                      <Text size="sm" color="$textDark600">Total</Text>
                      <Text size="xl" fontWeight="$bold" color="$primary600">{totalProducts}</Text>
                      <Text size="xs" color="$textDark500">produtos</Text>
                    </VStack>
                    
                    <VStack flex={1} alignItems="center" bg="$green50" p="$3" borderRadius="$lg">
                      <Text size="sm" color="$textDark600">Disponível</Text>
                      <Text size="xl" fontWeight="$bold" color="$green600">{totalProducts - outOfStock}</Text>
                      <Text size="xs" color="$textDark500">em estoque</Text>
                    </VStack>
                    
                    <VStack flex={1} alignItems="center" bg="$red50" p="$3" borderRadius="$lg">
                      <Text size="sm" color="$textDark600">Esgotado</Text>
                      <Text size="xl" fontWeight="$bold" color="$red600">{outOfStock}</Text>
                      <Text size="xs" color="$textDark500">itens</Text>
                    </VStack>
                  </HStack>
                </Box>

                {/* Header com Botões */}
                <HeaderList
                  labelButtonPlus="Novo produto"
                  onSetShowFilter={setIsFilterOpen}
                  showIconFilter={true}
                  onPress={handleClickGoRegisterProduct}
                />

                {/* Lista de Produtos */}
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <EnhancedProductCard item={item} />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                  ListEmptyComponent={
                    <Box alignItems="center" py="$16">
                      <Package size={48} color="#94a3b8" />
                      <Text color="$textDark500" mt="$2" textAlign="center">
                        Nenhum produto cadastrado
                      </Text>
                      <Text color="$textDark400" size="sm" textAlign="center">
                        Clique em "Novo produto" para adicionar o primeiro item
                      </Text>
                    </Box>
                  }
                />
              </>
            )
          }

        {/* Drawer de Filtros */}
        <FilterList
          onFilterOpen={isFilterOpen}
          onSetIsFilterOpen={setIsFilterOpen}
        >
          <Text fontWeight="$bold" size="lg" mb="$3">Filtrar Produtos</Text>
          
          <Button
            variant="outline"
            borderColor="$primary500"
            mb="$3"
            onPress={() => console.log("Filtro por categoria")}
            justifyContent="flex-start"
          >
            <Text>Por categoria</Text>
          </Button>
          
          <Button
            variant="outline"
            borderColor="$primary500"
            mb="$3"
            onPress={() => console.log("Filtro por status")}
            justifyContent="flex-start"
          >
            <Text>Por status do estoque</Text>
          </Button>

          <HStack space="sm" mt="$5">
            <Button variant="outline" flex={1} onPress={() => setIsFilterOpen(false)}>
              <Text>Limpar</Text>
            </Button>
            <Button flex={1} onPress={() => setIsFilterOpen(false)}>
              <Text>Aplicar</Text>
            </Button>
          </HStack>
        </FilterList>
      </VStack>
    </View>
  );
}