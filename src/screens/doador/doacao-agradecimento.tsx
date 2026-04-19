import { Text, VStack, Box, Button, Icon, HStack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "@routes/auth.routes";
import { Heart, ArrowLeft, Gift, Sparkles } from "lucide-react-native";

type DoacaoAgradecimentoRouteProp = RouteProp<AuthRoutes, 'doacaoAgradecimento'>;

export const DoacaoAgradecimento = () => {
    const route = useRoute<DoacaoAgradecimentoRouteProp>();
    const navigation = useNavigation();
    const { nome } = route.params || {};

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="#f5f3ff"
            flex={1}
        >
            <VStack
                flex={1}
                px="$6"
                pt="$24"
                pb="$12"
                space="xl"
            >
                {/* Header com cor fixa */}
                <Box alignItems="center" pt="$4" pb="$2">
                    <Box
                        bg="#8b5cf6"
                        p="$4"
                        borderRadius="$full"
                        style={{
                            shadowColor: "#8b5cf6",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 12,
                        }}
                    >
                        <Gift size={32} color="#ffffff" strokeWidth={1.5} />
                    </Box>
                </Box>

                {/* Título com cor */}
                <VStack space="sm" alignItems="center">
                    <Text
                        fontSize="$3xl"
                        fontWeight="$bold"
                        color="#1f2937"
                        textAlign="center"
                    >
                        Doação Agendada! 🌟
                    </Text>
                    
                    <Text
                        fontSize="$2xl"
                        fontWeight="$semibold"
                        color="#8b5cf6"
                        textAlign="center"
                    >
                        Obrigado, {nome?.split(" ")?.[0] || "doador"} ❤️
                    </Text>
                    
                    <Box px="$4" mt="$2">
                        <Text
                            fontSize="$md"
                            color="#6b7280"
                            textAlign="center"
                            lineHeight="$lg"
                        >
                            Seu gesto de solidariedade fará a diferença na vida de muitas pessoas.
                        </Text>
                    </Box>
                </VStack>

                {/* Botão principal */}
                <Button
                    bg="#8b5cf6"
                    borderRadius="$lg"
                    h="$12"
                    mt="$6"
                    onPress={() => {
                        navigation.navigate("doadorListagemAcoes" as never);
                    }}
                    style={{
                        shadowColor: "#8b5cf6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 4,
                    }}
                >
                    <HStack space="sm" alignItems="center">
                        <ArrowLeft size={18} color="#ffffff" strokeWidth={1.5} />
                        <Text
                            color="#ffffff"
                            fontWeight="$semibold"
                            fontSize="$md"
                        >
                            Voltar para o início
                        </Text>
                    </HStack>
                </Button>

                {/* Mensagem final */}
                <Box
                    bg="#fef2f2"
                    p="$4"
                    borderRadius="$xl"
                    mt="$4"
                >
                    <HStack
                        space="sm"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Heart size={20} color="#ef4444" fill="#ef4444" />
                        <Text
                            fontSize="$sm"
                            color="#7f1d1d"
                            textAlign="center"
                            fontWeight="$medium"
                        >
                            Seu gesto salva vidas! 😊
                        </Text>
                    </HStack>
                </Box>

                {/* Badges decorativos */}
                <HStack space="sm" justifyContent="center" mt="$2">
                    <Box bg="#ede9fe" px="$3" py="$1" borderRadius="$full">
                        <HStack space="xs" alignItems="center">
                            <Sparkles size={12} color="#8b5cf6" />
                            <Text fontSize="$xs" color="#8b5cf6" fontWeight="$medium">Solidariedade</Text>
                        </HStack>
                    </Box>
                    <Box bg="#fce7f3" px="$3" py="$1" borderRadius="$full">
                        <HStack space="xs" alignItems="center">
                            <Sparkles size={12} color="#ec4899" />
                            <Text fontSize="$xs" color="#ec4899" fontWeight="$medium">Esperança</Text>
                        </HStack>
                    </Box>
                    <Box bg="#fef3c7" px="$3" py="$1" borderRadius="$full">
                        <HStack space="xs" alignItems="center">
                            <Sparkles size={12} color="#f59e0b" />
                            <Text fontSize="$xs" color="#92400e" fontWeight="$medium">Amor</Text>
                        </HStack>
                    </Box>
                </HStack>
            </VStack>
        </ScrollView>
    );
};