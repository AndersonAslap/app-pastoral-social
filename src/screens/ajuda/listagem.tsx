import { FilterList } from "@components/filter-list";
import HelpCard from "@screens/help/components/help-card";
import { ScreenHeader } from "@components/screen-header";
import { FlatList, View, VStack, HStack, Text, Box, Badge, BadgeText, ScrollView, Button } from "@gluestack-ui/themed";
import { useState } from "react";
import { HeaderList } from "@components/header-list";
import { Calendar, Users, Package, Filter, TrendingUp } from "lucide-react-native";

type Help = {
    id: number;
    familyName: string;
    helpName: string;
    status: string;
    date?: string;
    itemsCount?: number;
}

const items: Help[] = [
  { id: 1, familyName: "Família Silva", helpName: "Cesta básica", status: "pendente", date: "2024-01-15", itemsCount: 12 },
  { id: 2, familyName: "Família Oliveira", helpName: "Cesta básica", status: "em andamento", date: "2024-01-14", itemsCount: 10 },
  { id: 3, familyName: "Família Santos", helpName: "Cesta básica", status: "concluído", date: "2024-01-13", itemsCount: 15 },
  { id: 4, familyName: "Família Souza", helpName: "Cesta básica", status: "pendente", date: "2024-01-16", itemsCount: 8 },
  { id: 5, familyName: "Família Costa", helpName: "Cesta básica", status: "concluído", date: "2024-01-12", itemsCount: 14 },
  { id: 6, familyName: "Família Pereira", helpName: "Cesta básica", status: "em andamento", date: "2024-01-15", itemsCount: 11 },
  { id: 7, familyName: "Família Lima", helpName: "Cesta básica", status: "pendente", date: "2024-01-17", itemsCount: 9 },
  { id: 8, familyName: "Família Martins", helpName: "Cesta básica", status: "concluído", date: "2024-01-11", itemsCount: 13 },
  { id: 9, familyName: "Família Rocha", helpName: "Cesta básica", status: "em andamento", date: "2024-01-14", itemsCount: 16 },
  { id: 10, familyName: "Família Almeida", helpName: "Cesta básica", status: "pendente", date: "2024-01-16", itemsCount: 7 },
];

export function AjudaListagem() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pendente':
                return { color: '$orange500', bgColor: '$orange100', label: 'Pendente', icon: '⏳' };
            case 'em andamento':
                return { color: '$blue500', bgColor: '$blue100', label: 'Em Andamento', icon: '🔄' };
            case 'concluído':
                return { color: '$green500', bgColor: '$green100', label: 'Concluído', icon: '✅' };
            default:
                return { color: '$gray500', bgColor: '$gray100', label: status, icon: '❓' };
        }
    };

    const stats = {
        total: items.length,
        pending: items.filter(item => item.status === 'pendente').length,
        inProgress: items.filter(item => item.status === 'em andamento').length,
        completed: items.filter(item => item.status === 'concluído').length,
    };

    const EnhancedHelpCard = ({ item }: { item: Help }) => {
        const statusConfig = getStatusConfig(item.status);
        
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
                <HStack justifyContent="space-between" alignItems="flex-start" space="md">
                    {/* Informações Principais */}
                    <VStack flex={1} space="sm">
                        {/* Header com Família e Status */}
                        <HStack justifyContent="space-between" alignItems="flex-start">
                            <VStack flex={1}>
                                <HStack space="sm" alignItems="center">
                                    <Users size={16} color="#64748b" />
                                    <Text fontWeight="$bold" size="lg" color="$textDark800" numberOfLines={1}>
                                        {item.familyName}
                                    </Text>
                                </HStack>
                                <Text size="sm" color="$textDark500" mt="$1">
                                    Solicitação de ajuda
                                </Text>
                            </VStack>
                            
                            <Badge 
                                size="md" 
                                variant="solid" 
                                bg={statusConfig.bgColor}
                                borderColor={statusConfig.color}
                                borderWidth={1}
                                borderRadius="$full"
                            >
                                <HStack space="xs" alignItems="center">
                                    <Text size="xs">{statusConfig.icon}</Text>
                                    <BadgeText color={statusConfig.color} fontWeight="$bold" size="xs">
                                        {statusConfig.label}
                                    </BadgeText>
                                </HStack>
                            </Badge>
                        </HStack>

                        {/* Detalhes da Ajuda */}
                        <VStack space="xs">
                            <HStack space="sm" alignItems="center">
                                <Package size={14} color="#64748b" />
                                <Text size="sm" color="$textDark600" fontWeight="$medium">
                                    {item.helpName}
                                </Text>
                            </HStack>
                            
                            <HStack space="md" alignItems="center">
                                <HStack space="xs" alignItems="center">
                                    <Calendar size={14} color="#64748b" />
                                    <Text size="xs" color="$textDark500">
                                        {item.date || 'Data não informada'}
                                    </Text>
                                </HStack>
                                
                                {item.itemsCount && (
                                    <HStack space="xs" alignItems="center">
                                        <Box w="$1" h="$1" borderRadius="$full" bg="$primary500" />
                                        <Text size="xs" color="$textDark500">
                                            {item.itemsCount} itens
                                        </Text>
                                    </HStack>
                                )}
                            </HStack>
                        </VStack>
                    </VStack>
                </HStack>

                {/* Barra de Progresso Visual para status */}
                {item.status === 'em andamento' && (
                    <Box mt="$3">
                        <HStack justifyContent="space-between" mb="$1">
                            <Text size="xs" color="$textDark500">Progresso</Text>
                            <Text size="xs" color="$blue600" fontWeight="$medium">60%</Text>
                        </HStack>
                        <Box w="100%" h="$2" bg="$borderLight200" borderRadius="$full" overflow="hidden">
                            <Box 
                                h="100%" 
                                bg="$blue500"
                                width="60%"
                                borderRadius="$full"
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Ajudas" />
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$4"
                pt="$8"
            >
                {/* Estatísticas */}
                <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4" shadow="sm">
                    <HStack justifyContent="space-between" alignItems="center" mb="$3">
                        <VStack>
                            <Text size="lg" fontWeight="$bold" color="$textDark800">
                                Visão Geral
                            </Text>
                            <Text size="sm" color="$textDark500">
                                Status das ajudas
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

                    <HStack space="sm">
                        <VStack flex={1} alignItems="center" bg="$blue50" p="$3" borderRadius="$lg">
                            <Text size="sm" color="$textDark600">Total</Text>
                            <Text size="xl" fontWeight="$bold" color="$primary600">{stats.total}</Text>
                            <Text size="xs" color="$textDark500">solicitações</Text>
                        </VStack>
                        
                        <VStack flex={1} alignItems="center" bg="$orange50" p="$3" borderRadius="$lg">
                            <Text size="sm" color="$textDark600">Pendentes</Text>
                            <Text size="xl" fontWeight="$bold" color="$orange600">{stats.pending}</Text>
                            <Text size="xs" color="$textDark500">aguardando</Text>
                        </VStack>
                        
                        <VStack flex={1} alignItems="center" bg="$green50" p="$3" borderRadius="$lg">
                            <Text size="sm" color="$textDark600">Concluídas</Text>
                            <Text size="xl" fontWeight="$bold" color="$green600">{stats.completed}</Text>
                            <Text size="xs" color="$textDark500">finalizadas</Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Header com Botões */}
                <HeaderList
                    labelButtonPlus="Nova ajuda"
                    onSetShowFilter={setIsFilterOpen}
                    showIconFilter={true}
                />

                {/* Lista de Ajudas */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <EnhancedHelpCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
                    ListEmptyComponent={
                        <Box alignItems="center" py="$16">
                            <Package size={48} color="#94a3b8" />
                            <Text color="$textDark500" mt="$2" textAlign="center">
                                Nenhuma ajuda cadastrada
                            </Text>
                            <Text color="$textDark400" size="sm" textAlign="center">
                                Clique em "Nova ajuda" para adicionar a primeira
                            </Text>
                        </Box>
                    }
                />

                {/* Drawer de Filtros */}
                <FilterList
                    onFilterOpen={isFilterOpen}
                    onSetIsFilterOpen={setIsFilterOpen}
                >
                    <Text fontWeight="$bold" size="lg" mb="$3">Filtrar Ajudas</Text>
                    
                    <Button
                        variant="outline"
                        borderColor="$primary500"
                        mb="$3"
                        onPress={() => console.log("Filtro por status")}
                        justifyContent="flex-start"
                    >
                        <HStack space="sm" alignItems="center">
                            <Filter size={16} />
                            <Text>Por status</Text>
                        </HStack>
                    </Button>
                    
                    <Button
                        variant="outline"
                        borderColor="$primary500"
                        mb="$3"
                        onPress={() => console.log("Filtro por família")}
                        justifyContent="flex-start"
                    >
                        <HStack space="sm" alignItems="center">
                            <Users size={16} />
                            <Text>Por família</Text>
                        </HStack>
                    </Button>

                    <Button
                        variant="outline"
                        borderColor="$primary500"
                        mb="$3"
                        onPress={() => console.log("Filtro por data")}
                        justifyContent="flex-start"
                    >
                        <HStack space="sm" alignItems="center">
                            <Calendar size={16} />
                            <Text>Por data</Text>
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
            </VStack>
        </View>
    )
}