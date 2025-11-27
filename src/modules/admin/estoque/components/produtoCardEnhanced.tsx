import { VStack, HStack, Text, Box, Badge, BadgeText, Pressable } from "@gluestack-ui/themed";
import { Package, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react-native";
import { IEstoqueItem } from "../types";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";

interface ProdutoCardEnhancedProps {
    item: IEstoqueItem;
}

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

export const ProdutoCardEnhanced: React.FC<ProdutoCardEnhancedProps> = ({ item }) => {
    const navigator = useNavigation<AppNavigatorRoutesProps>();

    const handleClickProduct = (product: IEstoqueItem) => 
        navigator.navigate("estoqueDetalhes", { productId: product.id, nome: product.nome });
    
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
            opacity={pressed ? 0.9 : 1}
            transform={[{ scale: pressed ? 0.99 : 1 }]}
            sx={{
              ":active": {
                bg: "$backgroundLight50",
              }
            }}
          >
            <HStack justifyContent="space-between" alignItems="flex-start" space="md">
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
                      {item.quantidadeEstoque}
                    </Text>
                  </HStack>
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