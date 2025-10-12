import { ScreenHeader } from "@components/screen-header";
import { Text, VStack, HStack, Box, Button, ButtonText, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Toast, ToastTitle, ToastDescription, useToast, Badge, BadgeText } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";
import { listarProdutos, removerEstoqueService } from "@services/estoque.service";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { useCallback, useEffect, useState } from "react";
import { Trash2, MapPin, Calendar, Package, AlertTriangle, Clock, CheckCircle } from "lucide-react-native";
import { Loading } from "@components/loading";

type EstoqueDetalhesRouteProp = RouteProp<AppRoutes, 'estoqueDetalhes'>;

type Product = {
    id: number
    validade: string
    valorMedida: number
    localizacao: string
    unidadeDeMedida: string
}

export const EstoqueDetalhes = () => {
    const route = useRoute<EstoqueDetalhesRouteProp>();
    const { productId, nome } = route.params;
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });

    const [items, setItems] = useState<Product[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    
    const fetchItens = async (id: number) => {
        try {
            console.log("Buscando produtos para ID:", id);
            setIsLoading(true);
            setError({ isError: false, message: "" });
            const data = await listarProdutos(id);
            console.log("Dados recebidos:", data);
            setItems(data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            setError({ isError: true, message: title });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await removerEstoqueService(productToDelete.id);
            
            // Remove o produto da lista local
            setItems(prev => prev.filter(item => item.id !== productToDelete.id));
            
            toast.show({
                placement: "top",
                containerStyle: {
                    marginTop: 40,
                },
                render: ({ id }) => (
                    <Toast nativeID={id} action="success" variant="accent">
                        <ToastDescription>Produto excluído com sucesso!</ToastDescription>
                    </Toast>
                )
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Erro ao excluir produto";
            
            toast.show({
                placement: "top",
                containerStyle: {
                    marginTop: 40,
                },
                render: ({ id }) => (
                    <Toast nativeID={id} action="error" variant="accent">
                        <ToastDescription>{title}</ToastDescription>
                    </Toast>
                )
            });
        } finally {
            setShowDeleteDialog(false);
            setProductToDelete(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getExpiryStatus = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiryDate = new Date(dateString);
        expiryDate.setHours(0, 0, 0, 0);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return "expired";
        if (diffDays <= 7) return "warning";
        if (diffDays <= 30) return "attention";
        return "normal";
    };

    const getExpiryConfig = (dateString: string) => {
        const status = getExpiryStatus(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiryDate = new Date(dateString);
        expiryDate.setHours(0, 0, 0, 0);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (status) {
            case "expired":
                return {
                    icon: AlertTriangle,
                    badgeColor: "$red500",
                    badgeBg: "$red100",
                    badgeText: "$red700",
                    borderColor: "$red300",
                    bgColor: "$red50",
                    textColor: "$red700",
                    label: `VENCIDO • ${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? 's' : ''} atrás`,
                    daysText: `${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? 's' : ''} atrás`
                };
            case "warning":
                return {
                    icon: AlertTriangle,
                    badgeColor: "$orange500",
                    badgeBg: "$orange100",
                    badgeText: "$orange700",
                    borderColor: "$orange300",
                    bgColor: "$orange50",
                    textColor: "$orange700",
                    label: `VENCE EM ${diffDays} DIA${diffDays !== 1 ? 'S' : ''}`,
                    daysText: `${diffDays} dia${diffDays !== 1 ? 's' : ''}`
                };
            case "attention":
                return {
                    icon: Clock,
                    badgeColor: "$blue500",
                    badgeBg: "$blue100",
                    badgeText: "$blue700",
                    borderColor: "$blue300",
                    bgColor: "$blue50",
                    textColor: "$blue700",
                    label: `VENCE EM ${diffDays} DIAS`,
                    daysText: `${diffDays} dias`
                };
            default:
                return {
                    icon: CheckCircle,
                    badgeColor: "$green500",
                    badgeBg: "$green100",
                    badgeText: "$green700",
                    borderColor: "$green300",
                    bgColor: "$backgroundLight100",
                    textColor: "$textDark800",
                    label: "DENTRO DO PRAZO",
                    daysText: `${diffDays} dias`
                };
        }
    };

    // CORREÇÃO: Recarregar dados quando os parâmetros mudarem
    useFocusEffect(
        useCallback(() => {
            console.log("Parâmetros da rota:", { productId, nome });
            fetchItens(productId);
        }, [productId, nome]) // Adicione productId e nome como dependências
    );

    // Também adicione um useEffect para detectar mudanças nos parâmetros
    useEffect(() => {
        console.log("Parâmetros mudaram:", { productId, nome });
        fetchItens(productId);
    }, [productId]);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            flex={1}
        >
            <ScreenHeader title="Produtos" />
            
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$4"
                pt="$6"
                pb="$16"
            >
                
                {
                    error.isError
                    ? (<></>)
                    : (<>
                        {
                            isLoading 
                            ? (<Loading />)
                            : (<>
                                {
                                    items.length > 0 ? (
                                        <>
                                        <Box bg="$blue50" p="$4" borderRadius="$lg" mb="$4" borderLeftWidth="$4" borderLeftColor="$blue500">
                    <Text fontSize="$xl" fontWeight="bold" color="$blue800" mb="$1">
                        {nome}
                    </Text>
                    <Text fontSize="$sm" color="$blue600">
                        {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
                    </Text>
                </Box>
                    <VStack space="md">
                        {items.map((item) => {
                            const expiryConfig = getExpiryConfig(item.validade);
                            const IconComponent = expiryConfig.icon;

                            return (
                                <Box
                                    key={item.id}
                                    bg={expiryConfig.bgColor}
                                    borderRadius="$xl"
                                    p="$4"
                                    borderLeftWidth="$4"
                                    borderLeftColor={expiryConfig.borderColor}
                                    shadow="$1"
                                >
                                    {/* Header do Card com Badge */}
                                    <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                                        <VStack flex={1}>
                                            <HStack alignItems="center" mb="$2">
                                                <Package size={18} color="#374151" />
                                                <Text fontSize="$lg" fontWeight="bold" ml="$2" color={expiryConfig.textColor}>
                                                    {nome}
                                                </Text>
                                            </HStack>
                                            
                                            {/* Badge de Quantidade */}
                                            <Box alignSelf="flex-start" bg="$blue100" px="$3" py="$1" borderRadius="$md">
                                                <Text fontSize="$sm" fontWeight="bold" color="$blue700">
                                                    {item.valorMedida} {item.unidadeDeMedida}
                                                </Text>
                                            </Box>
                                        </VStack>

                                        {/* Badge de Vencimento */}
                                        <Badge 
                                            bg={expiryConfig.badgeBg}
                                            borderWidth="$1"
                                            borderColor={expiryConfig.badgeColor}
                                            borderRadius="$full"
                                            px="$3"
                                            py="$1"
                                        >
                                            <IconComponent size={12} color="blue" />
                                            <BadgeText 
                                                fontSize="$2xs" 
                                                fontWeight="bold" 
                                                color={expiryConfig.badgeText}
                                                ml="$1"
                                            >
                                                {expiryConfig.label}
                                            </BadgeText>
                                        </Badge>
                                    </HStack>

                                    {/* Informações do Produto */}
                                    <HStack space="lg" alignItems="center" mb="$2">
                                        <HStack alignItems="center" flex={1}>
                                            <MapPin size={16} color="#6B7280" />
                                            <Text fontSize="$sm" fontWeight="medium" color="$textDark600" ml="$2">
                                                Local: {item.localizacao}
                                            </Text>
                                        </HStack>
                                        
                                        <HStack alignItems="center" flex={1}>
                                            <Calendar size={16} color="#6B7280" />
                                            <Text 
                                                fontSize="$sm" 
                                                fontWeight="bold" 
                                                color={expiryConfig.textColor}
                                                ml="$2"
                                            >
                                                {formatDate(item.validade)}
                                            </Text>
                                        </HStack>
                                    </HStack>

                                    {/* Botão de Exclusão */}
                                    <Button
                                        onPress={() => handleDelete(item)}
                                        size="sm"
                                        variant="outline"
                                        action="negative"
                                        borderColor="$red300"
                                        mt="$3"
                                        $hover={{
                                            borderColor: "$red400",
                                            bg: "$red50"
                                        }}
                                    >
                                        <Trash2 size={14} color="#DC2626" />
                                        <ButtonText color="$red600" ml="$2" fontSize="$sm">
                                            Excluir
                                        </ButtonText>
                                    </Button>
                                </Box>
                                
                            );
                        })}
                    </VStack>
                    </>
                ) : (
                    <VStack flex={1}>
                    <Box bg="$blue50" p="$4" borderRadius="$lg" mb="$4" borderLeftWidth="$4" borderLeftColor="$blue500">
                    <Text fontSize="$xl" fontWeight="bold" color="$blue800" mb="$1">
                        {nome}
                    </Text>
                    <Text fontSize="$sm" color="$blue600">
                        {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
                    </Text>
                </Box>
                    <Box bg="$backgroundLight100" borderRadius="$xl" p="$8" alignItems="center" mt="$4">
                        <Package size={48} color="#9CA3AF" />
                        <Text fontSize="$lg" color="$textDark400" mt="$4" textAlign="center" fontWeight="medium">
                            {isLoading ? "Carregando..." : "Nenhum item encontrado no estoque"}
                        </Text>
                    </Box>
                    </VStack>
                )
                                }
                            </>)
                        }
                    </>)
                }
            </VStack>

            {/* Alert Dialog para confirmação de exclusão */}
            <AlertDialog isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text fontSize="$lg" fontWeight="bold">
                            Excluir Produto
                        </Text>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text fontSize="$md">
                            Tem certeza que deseja excluir {productToDelete?.valorMedida} {productToDelete?.unidadeDeMedida} de {nome}?
                        </Text>
                        <Text fontSize="$sm" color="$red600" mt="$2" fontWeight="bold">
                            Esta ação não pode ser desfeita.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            variant="outline"
                            action="secondary"
                            mr="$3"
                            onPress={() => setShowDeleteDialog(false)}
                        >
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button
                            action="negative"
                            onPress={confirmDelete}
                        >
                            <ButtonText>Excluir</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ScrollView>
    );
}