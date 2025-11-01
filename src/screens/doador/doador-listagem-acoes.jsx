import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Clock, MapPin, Heart, Eye, Package, CheckCircle } from "lucide-react-native";

export const DoadorListagemAcoes = () => {
    const navigation = useNavigation();
    const [filtroStatus, setFiltroStatus] = useState("ativas");

    // Mock data - Ações sociais focadas em cestas básicas e jantas
    const acoesSociais = [
        {
            id: 1,
            titulo: "Cestas Básicas Mensais",
            descricao: "Ajude famílias em situação de vulnerabilidade com alimentos essenciais para o mês",
            item: "Cestas Básicas",
            meta: 300,
            arrecadado: 185,
            doadores: 67,
            prazo: "2024-12-31",
            localizacao: "São Paulo, SP",
            imagem: "🛒",
            progresso: 62,
            status: "ativa",
            itensIncluem: ["Arroz", "Feijão", "Óleo", "Açúcar", "Café", "Macarrão", "Farinha"]
        },
        {
            id: 2,
            titulo: "Jantas Solidárias",
            descricao: "Forneça refeições quentes e nutritivas para pessoas em situação de rua",
            item: "Refeições",
            meta: 500,
            arrecadado: 320,
            doadores: 45,
            prazo: "2024-11-30",
            localizacao: "Rio de Janeiro, RJ",
            imagem: "🍽️",
            progresso: 64,
            status: "ativa",
            itensIncluem: ["Refeições completas", "Sopas", "Lanches", "Bebidas"]
        },
        {
            id: 3,
            titulo: "Cestas Natalinas",
            descricao: "Leve alegria e alimento para famílias carentes neste Natal com cestas especiais",
            item: "Cestas Natalinas",
            meta: 200,
            arrecadado: 120,
            doadores: 89,
            prazo: "2024-12-20",
            localizacao: "Belo Horizonte, MG",
            imagem: "🎄",
            progresso: 60,
            status: "ativa",
            itensIncluem: ["Itens da cesta básica", "Panetone", "Chocolate", "Biscoitos"]
        },
        {
            id: 4,
            titulo: "Jantas Comunitárias",
            descricao: "Apoie nossas jantas comunitárias que alimentam centenas de pessoas semanalmente",
            item: "Refeições",
            meta: 1000,
            arrecadado: 750,
            doadores: 112,
            prazo: "2024-10-31",
            localizacao: "Porto Alegre, RS",
            imagem: "👨‍👩‍👧‍👦",
            progresso: 75,
            status: "concluida",
            itensIncluem: ["Almoços", "Jantares", "Café da manhã"]
        },
        {
            id: 5,
            titulo: "Campanha do Agasalho 2024",
            descricao: "Arrecadação de agasalhos para o inverno concluída com sucesso",
            item: "Casacos",
            meta: 800,
            arrecadado: 800,
            doadores: 200,
            prazo: "2024-08-30",
            localizacao: "Curitiba, PR",
            imagem: "🧥",
            progresso: 100,
            status: "concluida",
            itensIncluem: ["Casacos", "Blusas", "Cobertores"]
        }
    ];

    const acoesFiltradas = acoesSociais.filter(acao => {
        if (filtroStatus === "todas") return true;
        if (filtroStatus === "ativas") return acao.status === "ativa";
        if (filtroStatus === "concluida") return acao.status === "concluida";
        return true;
    });

    const formatarNumero = (numero) => {
        return numero.toLocaleString('pt-BR');
    };

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "ativa":
                return { label: "Ativa", cor: "#10B981", icone: "🟢" };
            case "concluida":
                return { label: "Concluída", cor: "#6B7280", icone: "✅" };
            default:
                return { label: "Ativa", cor: "#10B981", icone: "🟢" };
        }
    };

    // Função para navegar para os detalhes da ação
    const handleVerDetalhes = (acaoId) => {
        navigation.navigate("doadorDetalheAcao", { id: acaoId });
    };

    // Função para navegar para realizar doação
    const handleDoarItens = (acaoId) => {
        navigation.navigate("realizarDoacao", { id: acaoId });
    };

    const EmptyState = () => (
        <Box 
            bg="$white" 
            borderRadius="$2xl" 
            p="$8" 
            alignItems="center" 
            justifyContent="center"
            shadow="sm"
            mx="$6"
            mt="$6"
        >
            <VStack gap="$4" alignItems="center">
                <Box
                    bg="$blue100"
                    borderRadius="$full"
                    p="$6"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text fontSize="$4xl">📭</Text>
                </Box>
                
                <VStack gap="$2" alignItems="center">
                    <Text fontSize="$xl" fontWeight="$bold" color="$textDark900" textAlign="center">
                        Nenhuma ação encontrada
                    </Text>
                    <Text fontSize="$md" color="$textDark600" textAlign="center" lineHeight="$lg">
                        {filtroStatus === "concluida" 
                            ? "Não há ações concluídas no momento." 
                            : "Não há ações ativas no momento. Volte em breve!"}
                    </Text>
                </VStack>

                {(filtroStatus === "concluida" || filtroStatus === "ativas") && (
                    <Pressable onPress={() => setFiltroStatus("todas")}>
                        <Box
                            bg="$primary500"
                            borderRadius="$lg"
                            px="$6"
                            py="$3"
                        >
                            <Text fontSize="$md" fontWeight="$bold" color="$white">
                                Ver todas as ações
                            </Text>
                        </Box>
                    </Pressable>
                )}
            </VStack>
        </Box>
    );

    return (
        <VStack flex={1} bg="$white">
            {/* Header Fixo */}
            <Box bg="$white" px="$6" pt="$12" pb="$4" shadow="sm">
                <VStack gap="$2">
                    <Text fontSize="$3xl" fontWeight="$bold" color="$textDark900">
                        Ações Sociais
                    </Text>
                    <Text fontSize="$md" color="$textDark600">
                        Doe cestas básicas e jantas para quem mais precisa
                    </Text>
                </VStack>

                {/* Filtro de Status */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    py="$4"
                >
                    <HStack gap="$3">
                        {[
                            { id: "ativas", nome: "Ações Ativas", icone: "🟢" },
                            { id: "concluida", nome: "Concluídas", icone: "✅" },
                            { id: "todas", nome: "Todas", icone: "📋" }
                        ].map((filtro) => (
                            <Pressable
                                key={filtro.id}
                                onPress={() => setFiltroStatus(filtro.id)}
                            >
                                <Box
                                    bg={filtroStatus === filtro.id ? "$primary500" : "$trueGray100"}
                                    borderRadius="$full"
                                    px="$4"
                                    py="$2"
                                    flexDirection="row"
                                    alignItems="center"
                                    gap="$2"
                                >
                                    <Text fontSize="$sm">{filtro.icone}</Text>
                                    <Text 
                                        fontSize="$sm" 
                                        fontWeight="$medium"
                                        color={filtroStatus === filtro.id ? "$white" : "$textDark600"}
                                    >
                                        {filtro.nome}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>
                </ScrollView>
            </Box>

            {/* Lista de Ações com Scroll Apenas Aqui */}
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                bg="$blue50"
                flex={1}
            >
                <VStack px="$6" pt="$6" pb="$8" gap="$5">
                    {acoesFiltradas.length > 0 ? (
                        acoesFiltradas.map((acao) => {
                            const statusInfo = getStatusInfo(acao.status);
                            
                            return (
                                <Box
                                    key={acao.id}
                                    bg="$white"
                                    borderRadius="$2xl"
                                    p="$5"
                                    shadow="lg"
                                    shadowColor="$trueGray800"
                                    shadowOffset={{ width: 0, height: 4 }}
                                    shadowOpacity={0.1}
                                    shadowRadius={12}
                                    elevation={8}
                                    borderWidth={1}
                                    borderColor="$trueGray100"
                                >
                                    <VStack gap="$4">
                                        {/* Header da Ação com Status */}
                                        <HStack gap="$4" alignItems="flex-start">
                                            <Box
                                                bg="$blue100"
                                                borderRadius="$lg"
                                                p="$3"
                                                width="$16"
                                                height="$16"
                                                alignItems="center"
                                                justifyContent="center"
                                                shadow="sm"
                                            >
                                                <Text fontSize="$2xl">{acao.imagem}</Text>
                                            </Box>

                                            <VStack flex={1} gap="$1">
                                                <HStack alignItems="center" gap="$2">
                                                    <Text 
                                                        fontSize="$lg" 
                                                        fontWeight="$bold" 
                                                        color="$textDark900"
                                                        flex={1}
                                                    >
                                                        {acao.titulo}
                                                    </Text>
                                                    <Box
                                                        bg="$white"
                                                        px="$2"
                                                        py="$1"
                                                        borderRadius="$full"
                                                        borderWidth={1}
                                                        borderColor={statusInfo.cor}
                                                    >
                                                        <Text 
                                                            fontSize="$2xs" 
                                                            fontWeight="$bold" 
                                                            color={statusInfo.cor}
                                                        >
                                                            {statusInfo.icone} {statusInfo.label}
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                                
                                                <Text 
                                                    fontSize="$sm" 
                                                    color="$textDark600"
                                                    lineHeight="$md"
                                                >
                                                    {acao.descricao}
                                                </Text>
                                            </VStack>
                                        </HStack>

                                        {/* Item e Progresso */}
                                        <VStack gap="$2">
                                            <Text fontSize="$md" fontWeight="$bold" color="$textDark900">
                                                {acao.item}
                                            </Text>
                                            
                                            <HStack justifyContent="space-between" alignItems="center">
                                                <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
                                                    {formatarNumero(acao.arrecadado)}/{formatarNumero(acao.meta)}
                                                </Text>
                                                <HStack alignItems="center" gap="$1" bg="$blue50" px="$2" py="$1" borderRadius="$md">
                                                    <Package size={14} color="#3B82F6" />
                                                    <Text fontSize="$sm" fontWeight="$medium" color="$primary600">
                                                        {acao.progresso}%
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                            
                                            {/* Barra de Progresso */}
                                            <Box bg="$trueGray200" borderRadius="$full" height="$2">
                                                <Box 
                                                    bg={acao.status === "concluida" ? "#10B981" : "$primary500"} 
                                                    borderRadius="$full" 
                                                    height="$2"
                                                    width={`${acao.progresso}%`}
                                                />
                                            </Box>
                                        </VStack>

                                        {/* Estatísticas e Informações */}
                                        <VStack gap="$2">
                                            <HStack justifyContent="space-between">
                                                <Text fontSize="$sm" color="$textDark500">
                                                    {formatarNumero(acao.arrecadado)} itens recebidos
                                                </Text>
                                                <Text fontSize="$sm" color="$textDark500">
                                                    {acao.doadores} doadores
                                                </Text>
                                            </HStack>
                                            
                                            <HStack justifyContent="space-between" alignItems="center">
                                                <HStack alignItems="center" gap="$1">
                                                    <Clock size={14} color="#6B7280" />
                                                    <Text fontSize="$sm" color="$textDark500">
                                                        Até {formatarData(acao.prazo)}
                                                    </Text>
                                                </HStack>
                                                
                                                <HStack alignItems="center" gap="$1">
                                                    <MapPin size={14} color="#6B7280" />
                                                    <Text fontSize="$sm" color="$textDark500">
                                                        {acao.localizacao}
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                        </VStack>

                                        {/* Botões de Ação - Apenas para ações ativas */}
                                        {acao.status === "ativa" && (
                                            <HStack gap="$3" mt="$2">
                                                <Pressable
                                                    flex={1}
                                                    onPress={() => handleVerDetalhes(acao.id)}
                                                >
                                                    {({ pressed }) => (
                                                        <Box
                                                            bg="$trueGray100"
                                                            borderRadius="$lg"
                                                            py="$3"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            flexDirection="row"
                                                            gap="$2"
                                                            style={{
                                                                transform: [{ scale: pressed ? 0.95 : 1 }]
                                                            }}
                                                            transition="all 0.2s"
                                                            shadow="sm"
                                                        >
                                                            <Eye size={18} color="#6B7280" />
                                                            <Text 
                                                                fontSize="$sm" 
                                                                fontWeight="$medium" 
                                                                color="$textDark600"
                                                            >
                                                                Ver Detalhes
                                                            </Text>
                                                        </Box>
                                                    )}
                                                </Pressable>

                                                <Pressable
                                                    flex={1}
                                                    onPress={() => handleDoarItens(acao.id)}
                                                >
                                                    {({ pressed }) => (
                                                        <Box
                                                            bg="$primary500"
                                                            borderRadius="$lg"
                                                            py="$3"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            flexDirection="row"
                                                            gap="$2"
                                                            style={{
                                                                transform: [{ scale: pressed ? 0.95 : 1 }]
                                                            }}
                                                            transition="all 0.2s"
                                                            shadow="md"
                                                            shadowColor="$primary600"
                                                        >
                                                            <Heart size={18} color="#FFFFFF" />
                                                            <Text 
                                                                fontSize="$sm" 
                                                                fontWeight="$bold" 
                                                                color="$white"
                                                            >
                                                                Doar Itens
                                                            </Text>
                                                        </Box>
                                                    )}
                                                </Pressable>
                                            </HStack>
                                        )}
                                    </VStack>
                                </Box>
                            );
                        })
                    ) : (
                        <EmptyState />
                    )}
                </VStack>
            </ScrollView>
        </VStack>
    );
};