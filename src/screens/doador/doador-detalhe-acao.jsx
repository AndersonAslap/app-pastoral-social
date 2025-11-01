import { ScreenHeader } from "@components/screen-header";
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Clock, MapPin, Heart, Users, Package, Target, CheckCircle, Calendar } from "lucide-react-native";

export const DoadorDetalheAcao = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;

    // Mock data - Buscar ação pelo ID (em uma aplicação real, isso viria de uma API)
    const acao = {
        id: 1,
        titulo: "Cestas Básicas Mensais",
        descricao: "Ajude famílias em situação de vulnerabilidade com alimentos essenciais para o mês todo. Cada cesta básica contém itens fundamentais para a alimentação de uma família de 4 pessoas por até 30 dias.",
        item: "Cestas Básicas",
        meta: 300,
        arrecadado: 185,
        doadores: 67,
        prazo: "2024-12-31",
        localizacao: "São Paulo, SP",
        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
        imagem: "🛒",
        progresso: 62,
        status: "ativa",
        categoria: "Alimentação",
        responsavel: "Pastoral Social - Paróquia São Francisco",
        telefone: "(11) 9999-9999",
        email: "contato@pastoralsocial.org",
        itensIncluem: [
            "Arroz (5kg)",
            "Feijão (2kg)", 
            "Óleo de Soja (900ml)",
            "Açúcar (2kg)",
            "Café (500g)",
            "Macarrão (1kg)",
            "Farinha de Trigo (1kg)",
            "Sal (1kg)",
            "Molho de Tomate (2 unidades)",
            "Sardinha em Lata (2 unidades)",
            "Leite em Pó (1kg)",
            "Bolacha Maria (1 pacote)"
        ],
        beneficiarios: "Famílias em situação de vulnerabilidade social cadastradas no programa",
        impacto: "185 famílias beneficiadas mensalmente"
    };

    const formatarNumero = (numero) => {
        return numero.toLocaleString('pt-BR');
    };

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const handleDoar = () => {
        navigation.navigate("doacaoAcao", { id: acao.id });
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$white"
            flex={1}
        >
            <ScreenHeader title="Detalhes da Ação" />
            
            <VStack
                flex={1}
                bg="$blue50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$8"
                pb="$8"
                gap="$6"
            >
                {/* Card Principal da Ação */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$6"
                    shadow="lg"
                >
                    <VStack gap="$5">
                        {/* Header com Ícone e Título */}
                        <HStack gap="$4" alignItems="center">
                            <Box
                                bg="$blue100"
                                borderRadius="$lg"
                                p="$4"
                                width="$20"
                                height="$20"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontSize="$3xl">{acao.imagem}</Text>
                            </Box>
                            
                            <VStack flex={1} gap="$1">
                                <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900">
                                    {acao.titulo}
                                </Text>
                                <Text fontSize="$sm" color="$primary600" fontWeight="$medium">
                                    {acao.categoria}
                                </Text>
                            </VStack>
                        </HStack>

                        {/* Descrição */}
                        <Text fontSize="$md" color="$textDark600" lineHeight="$xl">
                            {acao.descricao}
                        </Text>

                        {/* Progresso */}
                        <VStack gap="$3">
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                                    {acao.item}
                                </Text>
                                <Text fontSize="$lg" fontWeight="$bold" color="$primary600">
                                    {formatarNumero(acao.arrecadado)}/{formatarNumero(acao.meta)}
                                </Text>
                            </HStack>
                            
                            {/* Barra de Progresso */}
                            <Box bg="$trueGray200" borderRadius="$full" height="$3">
                                <Box 
                                    bg="$primary500" 
                                    borderRadius="$full" 
                                    height="$3"
                                    width={`${acao.progresso}%`}
                                />
                            </Box>
                            
                            <HStack justifyContent="space-between">
                                <Text fontSize="$sm" color="$textDark500">
                                    {acao.progresso}% da meta alcançada
                                </Text>
                                <HStack alignItems="center" gap="$1">
                                    <Users size={14} color="#6B7280" />
                                    <Text fontSize="$sm" color="$textDark500">
                                        {acao.doadores} doadores
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Informações de Localização e Prazo */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                            📍 Informações
                        </Text>
                        
                        <VStack gap="$3">
                            <HStack gap="$3" alignItems="flex-start">
                                <Box mt="$1">
                                    <MapPin size={18} color="#3B82F6" />
                                </Box>
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                                        Local de Entrega
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark600" lineHeight="$md">
                                        {acao.endereco}
                                    </Text>
                                    <Text fontSize="$sm" color="$primary600" fontWeight="$medium">
                                        {acao.localizacao}
                                    </Text>
                                </VStack>
                            </HStack>

                            <HStack gap="$3" alignItems="flex-start">
                                <Box mt="$1">
                                    <Clock size={18} color="#3B82F6" />
                                </Box>
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                                        Prazo para Doações
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark600">
                                        Até {formatarData(acao.prazo)}
                                    </Text>
                                </VStack>
                            </HStack>

                            <HStack gap="$3" alignItems="flex-start">
                                <Box mt="$1">
                                    <Users size={18} color="#3B82F6" />
                                </Box>
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                                        Responsável
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark600">
                                        {acao.responsavel}
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark500">
                                        {acao.telefone} • {acao.email}
                                    </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Itens da Cesta Básica */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                            🛒 Itens da Cesta Básica
                        </Text>
                        
                        <VStack gap="$2">
                            {acao.itensIncluem.map((item, index) => (
                                <HStack key={index} gap="$3" alignItems="center">
                                    <Box
                                        w="$2"
                                        h="$2"
                                        borderRadius="$full"
                                        bg="$primary500"
                                    />
                                    <Text fontSize="$sm" color="$textDark600" flex={1}>
                                        {item}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </Box>

                {/* Impacto e Beneficiários */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                            💝 Impacto Social
                        </Text>
                        
                        <VStack gap="$3">
                            <HStack gap="$3" alignItems="flex-start">
                                <Box mt="$1">
                                    <Target size={18} color="#10B981" />
                                </Box>
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                                        Beneficiários
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark600" lineHeight="$md">
                                        {acao.beneficiarios}
                                    </Text>
                                </VStack>
                            </HStack>

                            <HStack gap="$3" alignItems="flex-start">
                                <Box mt="$1">
                                    <CheckCircle size={18} color="#10B981" />
                                </Box>
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$md" fontWeight="$medium" color="$textDark900">
                                        Impacto Atual
                                    </Text>
                                    <Text fontSize="$sm" color="$textDark600">
                                        {acao.impacto}
                                    </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Botão de Doação */}
                <Pressable
                    onPress={handleDoar}
                    mt="$4"
                >
                    {({ pressed }) => (
                        <Box
                            bg="$primary500"
                            borderRadius="$xl"
                            py="$4"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="row"
                            gap="$3"
                            style={{
                                transform: [{ scale: pressed ? 0.95 : 1 }]
                            }}
                            transition="all 0.2s"
                            shadow="lg"
                        >
                            <Heart size={24} color="#FFFFFF" />
                            <Text 
                                fontSize="$lg" 
                                fontWeight="$bold" 
                                color="$white"
                            >
                                Realizar Doação
                            </Text>
                        </Box>
                    )}
                </Pressable>
            </VStack>
        </ScrollView>
    );
};