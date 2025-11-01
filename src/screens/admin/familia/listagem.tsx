import { Button, FlatList, Text, View, VStack, HStack, Box, Badge, BadgeText } from "@gluestack-ui/themed";
import { ScreenHeader } from "@components/screen-header";
import { useCallback, useState } from "react";
import { FilterList } from "@components/filter-list";
import { HeaderList } from "@components/header-list";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { listarFamiliaService } from "@services/familia.service";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { Loading } from "@components/loading";
import { EmptyStateLottie } from "@components/empty-state-lottie";
import emptyAnimation from "@assets/animations/empty-list.json";
import { ErrorStateLottie } from "@components/error-state-lottie";
import { SearchIcon, MapPinIcon, UsersIcon, PhoneIcon } from "lucide-react-native";

export type Family = {
    id: number;
    nomeRepresentante: string;
    endereco: string;
    telefone?: string;
    qtdPessoasResidencia?: number;
    qtdPessoasEmpregadas?: number;
    comunidade?: string;
    criancasFrequentamEscola?: boolean;
};

export function FamiliaListagem() {
    const navigator = useNavigation<AppNavigatorRoutesProps>();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });

    const handleOpenNewFamily = () => {
        navigator.navigate("familiaCadastrar");
    }

    const [items, setItems] = useState<Family[]>([]);
    
    const fetchItens = async () => {
        setIsLoading(true);
        try {
            const data = await listarFamiliaService();
            setItems(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            setError({ isError: true, message: title });
        } finally {
            setIsLoading(false);
        }
    }; 

    useFocusEffect(
        useCallback(() => {
            fetchItens();
        }, [])
    );

    const FamilyCardEnhanced = ({ item }: { item: Family }) => {
        return (
            <Box
                bg="$backgroundLight0"
                p="$4"
                mb="$3"
                borderRadius="$2xl"
                borderWidth={1}
                borderColor="$borderLight200"
                shadow="sm"
            >
                {/* Header com nome e status */}
                <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                    <VStack flex={1} mr="$2">
                        <Text fontWeight="$bold" size="lg" color="$textDark800" numberOfLines={1}>
                            {item.nomeRepresentante}
                        </Text>
                        <Text size="sm" color="$textDark500" mt="$1">
                            Representante familiar
                        </Text>
                    </VStack>
                </HStack>

                {/* Informações de contato e localização */}
                <VStack gap="$2" mb="$3">
                    <HStack alignItems="center" space="sm">
                        <MapPinIcon size={16} color="#64748b" />
                        <Text size="sm" color="$textDark600" flex={1} numberOfLines={2}>
                            {item.endereco}
                        </Text>
                    </HStack>
                    
                    {item.telefone && (
                        <HStack alignItems="center" space="sm">
                            <PhoneIcon size={16} color="#64748b" />
                            <Text size="sm" color="$textDark600">
                                {item.telefone}
                            </Text>
                        </HStack>
                    )}
                </VStack>

                {/* Estatísticas da família */}
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center" space="sm">
                        <UsersIcon size={14} color="#64748b" />
                        <Text size="xs" color="$textDark500">
                            {item.qtdPessoasResidencia || 0} pessoas
                        </Text>
                    </HStack>
                    
                    <HStack alignItems="center" space="sm">
                        <Text size="xs" color="$textDark500">
                            {item.qtdPessoasEmpregadas || 0} empregadas
                        </Text>
                    </HStack>

                    {item.criancasFrequentamEscola && (
                        <Badge size="sm" bg="$blue100" borderRadius="$md">
                            <BadgeText color="$blue800" size="xs">
                                Estuda
                            </BadgeText>
                        </Badge>
                    )}
                </HStack>
            </Box>
        );
    };

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
                {
                    error.isError 
                    ? (
                        <ErrorStateLottie
                            title={error.message || "Ocorreu um erro"}
                        />
                    )
                    : (
                        <>
                            {isLoading
                                ? (<Loading />) 
                                : (<>
                                    {/* Header com estatísticas */}
                                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4" shadow="sm">
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <VStack>
                                                <Text size="lg" fontWeight="$bold" color="$textDark800">
                                                    {items.length} {items.length === 1 ? 'família' : 'famílias'}
                                                </Text>
                                                <Text size="sm" color="$textDark500">
                                                    cadastradas no sistema
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>

                                    <HeaderList
                                        labelButtonPlus="Nova família"
                                        onSetShowFilter={setIsFilterOpen}
                                        showIconFilter
                                        onPress={handleOpenNewFamily}
                                    />

                                    <FlatList
                                        data={items}
                                        keyExtractor={(item, _index) => (item as Family).id.toString()}
                                        renderItem={({ item }) => (
                                            <FamilyCardEnhanced item={item as Family}/>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                                        ListEmptyComponent={
                                            <EmptyStateLottie
                                                animationSource={emptyAnimation}
                                                title="Nenhuma família cadastrada"
                                                description="Adicione uma nova família para vê-la aqui na lista."
                                            />
                                        }
                                    />

                                    <FilterList
                                        onFilterOpen={isFilterOpen}
                                        onSetIsFilterOpen={setIsFilterOpen}
                                    >
                                        <Text fontWeight="$bold" size="lg" mb="$3">Filtrar Famílias</Text>
                                        
                                        <Button
                                            variant="outline"
                                            borderColor="$primary500"
                                            mb="$3"
                                            onPress={() => console.log("Filtro por cidade")}
                                            justifyContent="flex-start"
                                        >
                                            <HStack space="sm" alignItems="center">
                                                <MapPinIcon size={16} />
                                                <Text>Por localização</Text>
                                            </HStack>
                                        </Button>
                                        
                                        <Button
                                            variant="outline"
                                            borderColor="$primary500"
                                            mb="$3"
                                            onPress={() => console.log("Filtro por nome")}
                                            justifyContent="flex-start"
                                        >
                                            <HStack space="sm" alignItems="center">
                                                <SearchIcon size={16} />
                                                <Text>Por nome</Text>
                                            </HStack>
                                        </Button>

                                        <Button
                                            variant="outline"
                                            borderColor="$primary500"
                                            mb="$3"
                                            onPress={() => console.log("Filtro por status")}
                                            justifyContent="flex-start"
                                        >
                                            <HStack space="sm" alignItems="center">
                                                <UsersIcon size={16} />
                                                <Text>Por situação</Text>
                                            </HStack>
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
                                    </>
                                )
                            }
                        </>
                    )
                }
            </VStack>
        </View>
    );
}