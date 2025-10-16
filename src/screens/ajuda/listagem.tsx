import { FilterList } from "@components/filter-list";
import HelpCard from "@screens/help/components/help-card";
import { ScreenHeader } from "@components/screen-header";
import { FlatList, View, VStack, HStack, Text, Box, Badge, BadgeText, ScrollView, Button } from "@gluestack-ui/themed";
import { useState } from "react";
import { HeaderList } from "@components/header-list";
import { Calendar, Users, Package, Filter, TrendingUp, Eye, X, Check, CheckCircle, Flag, AlertTriangle, MapPin } from "lucide-react-native";

type Help = {
    id: number;
    familyName: string;
    representative: string;
    helpName: string;
    status: string;
    date?: string;
    itemsCount?: number;
    priority?: 'alta' | 'media' | 'baixa';
    address?: string;
}

const items: Help[] = [
  { id: 1, familyName: "Silva", representative: "Maria Silva", helpName: "Cesta básica", status: "pendente", date: "2024-01-15", itemsCount: 12, priority: 'alta', address: "Rua das Flores, 123 - Centro" },
  { id: 2, familyName: "Oliveira", representative: "João Oliveira", helpName: "Cesta básica", status: "em andamento", date: "2024-01-14", itemsCount: 10, priority: 'media', address: "Av. Principal, 456 - Jardim" },
  { id: 3, familyName: "Santos", representative: "Ana Santos", helpName: "Cesta básica", status: "concluído", date: "2024-01-13", itemsCount: 15, priority: 'baixa', address: "Travessa da Paz, 789 - Vila Nova" },
  { id: 4, familyName: "Souza", representative: "Carlos Souza", helpName: "Cesta básica", status: "pendente", date: "2024-01-16", itemsCount: 8, priority: 'alta', address: "Rua do Comércio, 321 - Centro" },
  { id: 5, familyName: "Costa", representative: "Paula Costa", helpName: "Cesta básica", status: "concluído", date: "2024-01-12", itemsCount: 14, priority: 'media', address: "Alameda das Árvores, 654 - Parque" },
  { id: 6, familyName: "Pereira", representative: "Roberto Pereira", helpName: "Cesta básica", status: "em andamento", date: "2024-01-15", itemsCount: 11, priority: 'baixa', address: "Praça Central, 987 - Centro" },
  { id: 7, familyName: "Lima", representative: "Fernanda Lima", helpName: "Cesta básica", status: "pendente", date: "2024-01-17", itemsCount: 9, priority: 'alta', address: "Rua dos Ipês, 147 - Jardim" },
  { id: 8, familyName: "Martins", representative: "José Martins", helpName: "Cesta básica", status: "concluído", date: "2024-01-11", itemsCount: 13, priority: 'media', address: "Av. das Nações, 258 - Centro" },
  { id: 9, familyName: "Rocha", representative: "Sandra Rocha", helpName: "Cesta básica", status: "em andamento", date: "2024-01-14", itemsCount: 16, priority: 'baixa', address: "Travessa do Sol, 369 - Vila" },
  { id: 10, familyName: "Almeida", representative: "Pedro Almeida", helpName: "Cesta básica", status: "pendente", date: "2024-01-16", itemsCount: 7, priority: 'media', address: "Rua das Palmeiras, 753 - Parque" },
];

export function AjudaListagem() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pendente':
                return { color: '$orange500', bgColor: '$orange100', label: 'Pendente' };
            case 'em andamento':
                return { color: '$blue500', bgColor: '$blue100', label: 'Em Andamento' };
            case 'concluído':
                return { color: '$green500', bgColor: '$green100', label: 'Concluído' };
            default:
                return { color: '$gray500', bgColor: '$gray100', label: status };
        }
    };

    const getPriorityConfig = (priority: string) => {
        switch (priority) {
            case 'alta':
                return { 
                    color: '$red500', 
                    bgColor: '$red100', 
                    label: 'Alta', 
                    icon: AlertTriangle 
                };
            case 'media':
                return { 
                    color: '$yellow500', 
                    bgColor: '$yellow100', 
                    label: 'Média', 
                    icon: Flag 
                };
            case 'baixa':
                return { 
                    color: '$green500', 
                    bgColor: '$green100', 
                    label: 'Baixa', 
                    icon: Flag 
                };
            default:
                return { 
                    color: '$gray500', 
                    bgColor: '$gray100', 
                    label: 'Sem', 
                    icon: Flag 
                };
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
        const priorityConfig = getPriorityConfig(item.priority || 'baixa');
        const PriorityIcon = priorityConfig.icon;
        
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
                <VStack space="sm">
                    {/* Header com Representante e Status */}
                    <HStack justifyContent="space-between" alignItems="flex-start">
                        <VStack flex={1}>
                            <HStack space="sm" alignItems="center">
                                <Users size={16} color="#64748b" />
                                <Text fontWeight="$bold" size="lg" color="$textDark800">
                                    Família {item.familyName}
                                </Text>
                            </HStack>
                            <Text size="sm" color="$textDark500" mt="$1">
                                {item.representative}
                            </Text>
                        </VStack>
                        
                        <VStack alignItems="flex-end" space="xs">
                            {/* Badge de Prioridade */}
                            <Badge 
                                size="sm" 
                                variant="solid" 
                                bg={priorityConfig.bgColor}
                                borderColor={priorityConfig.color}
                                borderWidth={1}
                                borderRadius="$full"
                            >
                                <HStack space="xs" alignItems="center">
                                    <PriorityIcon size={10} color={priorityConfig.color} />
                                    <BadgeText color={priorityConfig.color} fontWeight="$bold" size="xs">
                                        {priorityConfig.label}
                                    </BadgeText>
                                </HStack>
                            </Badge>
                            
                            {/* Badge de Status */}
                            <Badge 
                                size="md" 
                                variant="solid" 
                                bg={statusConfig.bgColor}
                                borderColor={statusConfig.color}
                                borderWidth={1}
                                borderRadius="$full"
                            >
                                <BadgeText color={statusConfig.color} fontWeight="$bold" size="xs">
                                    {statusConfig.label}
                                </BadgeText>
                            </Badge>
                        </VStack>
                    </HStack>

                    {/* Endereço da Família */}
                    {item.address && (
                        <HStack space="sm" alignItems="flex-start">
                            <MapPin size={14} color="#64748b" mt="$0.5" />
                            <Text size="sm" color="$textDark600" flex={1}>
                                {item.address}
                            </Text>
                        </HStack>
                    )}

                    {/* Detalhes da Ajuda */}
                    <VStack space="xs" mt="$2">
                        <HStack space="sm" alignItems="center">
                            <Package size={14} color="#64748b" />
                            <Text size="sm" color="$textDark600" fontWeight="$medium">
                                {item.helpName}
                            </Text>
                        </HStack>

                    </VStack>

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

                    {/* Botões de Ação */}
                    <HStack space="sm" mt="$3" justifyContent="flex-end">
                        {/* Botão Detalhes - Sempre visível */}
                        <Button 
                            size="sm" 
                            variant="outline" 
                            borderColor="$primary500"
                            onPress={() => console.log(`Detalhes da ajuda ${item.id}`)}
                        >
                            <HStack space="xs" alignItems="center">
                                <Eye size={14} color="#3b82f6" />
                                <Text size="xs" color="$primary500">
                                    Detalhes
                                </Text>
                            </HStack>
                        </Button>

                        {/* Botões Condicionais por Status */}
                        {item.status === 'pendente' && (
                            <>
                                <Button 
                                    size="sm" 
                                    variant="solid" 
                                    bg="$red500"
                                    onPress={() => console.log(`Cancelar ajuda ${item.id}`)}
                                >
                                    <HStack space="xs" alignItems="center">
                                        <X size={14} color="white" />
                                        <Text size="xs" color="white">
                                            Cancelar
                                        </Text>
                                    </HStack>
                                </Button>
                                
                                <Button 
                                    size="sm" 
                                    variant="solid" 
                                    bg="$green500"
                                    onPress={() => console.log(`Aprovar ajuda ${item.id}`)}
                                >
                                    <HStack space="xs" alignItems="center">
                                        <Check size={14} color="white" />
                                        <Text size="xs" color="white">
                                            Aprovar
                                        </Text>
                                    </HStack>
                                </Button>
                            </>
                        )}

                        {item.status === 'em andamento' && (
                            <Button 
                                size="sm" 
                                variant="solid" 
                                bg="$emerald500"
                                onPress={() => console.log(`Marcar como realizada ${item.id}`)}
                            >
                                <HStack space="xs" alignItems="center">
                                    <CheckCircle size={14} color="white" />
                                    <Text size="xs" color="white">
                                        Realizada
                                    </Text>
                                </HStack>
                            </Button>
                        )}

                        {item.status === 'concluído' && (
                            <Button 
                                size="sm" 
                                variant="outline" 
                                borderColor="$green500"
                                onPress={() => console.log(`Reabrir ajuda ${item.id}`)}
                            >
                                <HStack space="xs" alignItems="center">
                                    <CheckCircle size={14} color="#10b981" />
                                    <Text size="xs" color="$green500">
                                        Concluída
                                    </Text>
                                </HStack>
                            </Button>
                        )}
                    </HStack>
                </VStack>
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