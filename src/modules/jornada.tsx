import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const Jornada = () => {
    const [selectedJourney, setSelectedJourney] = useState(null);
    const navigation = useNavigation();

    const journeyOptions = [
        {
            id: "doador",
            title: "Como Doador",
            description: "Faça a diferença contribuindo com doações e recursos para transformar vidas",
            icon: "❤️",
            color: "#DC2626",
            benefits: [
                "Participe das ações sociais",
                "Acompanhe o impacto das suas doações"
            ],
            screen: "doadorListagemAcoes" // Tela de destino
        },
        {
            id: "agente", 
            title: "Como Agente",
            description: "Atue diretamente nas ações da pastoral social como voluntário",
            icon: "👥",
            color: "#2563EB",
            benefits: [
                "Faça parte da rede de transformação",
                "Organize e participe das ações sociais"
            ],
            screen: "signIn" // Tela de destino
        }
    ];

    const handleContinue = () => {
        if (selectedJourney) {
            const selectedOption = journeyOptions.find(option => option.id === selectedJourney);
            if (selectedOption) {
                // Navega para a tela correspondente
                navigation.navigate(selectedOption.screen);
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$white"
            flex={1}
        >
            <VStack
                flex={1}
                bg="$blue50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$12"
                pb="$8"
                gap="$8"
                alignItems="center"
            >
                {/* Header Section - Centralizado */}
                <VStack gap="$3" alignItems="center" width="100%">
                    <Text 
                        fontSize="$2xl" 
                        fontWeight="$bold" 
                        color="$textDark900"
                        textAlign="center"
                    >
                        Como você gostaria de participar?
                    </Text>
                    <Text 
                        fontSize="$md" 
                        color="$textDark600"
                        textAlign="center"
                        lineHeight="$lg"
                        maxWidth="$80"
                    >
                        Escolha uma das opções abaixo para começar sua jornada de transformação
                    </Text>
                </VStack>

                {/* Journey Cards - Centralizados */}
                <VStack gap="$5" width="100%" alignItems="center">
                    {journeyOptions.map((journey) => (
                        <Pressable
                            key={journey.id}
                            onPress={() => setSelectedJourney(journey.id)}
                            width="100%"
                            maxWidth="$96"
                        >
                            {({ pressed }) => (
                                <Box
                                    bg="$white"
                                    borderRadius="$xl"
                                    p="$5"
                                    borderWidth={selectedJourney === journey.id ? "$2" : "$1"}
                                    borderColor={selectedJourney === journey.id ? journey.color : "$trueGray200"}
                                    shadow="sm"
                                    width="100%"
                                    style={{
                                        transform: [{ scale: pressed ? 0.99 : 1 }]
                                    }}
                                    transition="all 0.2s"
                                >
                                    <HStack gap="$4" alignItems="flex-start">
                                        {/* Icon - Centralizado verticalmente */}
                                        <Box
                                            bg={selectedJourney === journey.id ? journey.color : "$trueGray300"}
                                            borderRadius="$lg"
                                            p="$3"
                                            width="$12"
                                            height="$12"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Text fontSize="$xl" color="$white">
                                                {journey.icon}
                                            </Text>
                                        </Box>

                                        {/* Content - Centralizado */}
                                        <VStack flex={1} gap="$2" justifyContent="center">
                                            <Text 
                                                fontSize="$lg" 
                                                fontWeight="$bold" 
                                                color="$textDark900"
                                            >
                                                {journey.title}
                                            </Text>
                                            
                                            <Text 
                                                fontSize="$sm" 
                                                color="$textDark600"
                                                lineHeight="$md"
                                            >
                                                {journey.description}
                                            </Text>

                                            {/* Benefits List - Centralizada */}
                                            <VStack gap="$1" mt="$1">
                                                {journey.benefits.map((benefit, index) => (
                                                    <HStack key={index} gap="$2" alignItems="center">
                                                        <Box
                                                            w="$1.5"
                                                            h="$1.5"
                                                            borderRadius="$full"
                                                            bg={journey.color}
                                                        />
                                                        <Text 
                                                            fontSize="$xs" 
                                                            color="$textDark500"
                                                            lineHeight="$xs"
                                                        >
                                                            {benefit}
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </VStack>
                                        </VStack>

                                        {/* Selection Indicator - Centralizado */}
                                        <Box
                                            w="$5"
                                            h="$5"
                                            borderRadius="$full"
                                            borderWidth="$2"
                                            borderColor={selectedJourney === journey.id ? journey.color : "$trueGray400"}
                                            bg={selectedJourney === journey.id ? journey.color : "transparent"}
                                            alignItems="center"
                                            justifyContent="center"
                                            mt="$1"
                                        >
                                            {selectedJourney === journey.id && (
                                                <Box
                                                    w="$2"
                                                    h="$2"
                                                    borderRadius="$full"
                                                    bg="$white"
                                                />
                                            )}
                                        </Box>
                                    </HStack>
                                </Box>
                            )}
                        </Pressable>
                    ))}
                </VStack>

                {/* Action Button - Centralizado */}
                <Pressable
                    onPress={handleContinue}
                    opacity={selectedJourney ? 1 : 0.5}
                    disabled={!selectedJourney}
                    width="100%"
                    maxWidth="$96"
                >
                    {({ pressed }) => (
                        <Box
                            bg={selectedJourney ? "$primary500" : "$trueGray300"}
                            borderRadius="$lg"
                            py="$4"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                            style={{
                                transform: [{ scale: pressed && selectedJourney ? 0.98 : 1 }]
                            }}
                            transition="all 0.2s"
                        >
                            <Text 
                                fontSize="$lg" 
                                fontWeight="$bold" 
                                color={selectedJourney ? "$white" : "$trueGray500"}
                            >
                                Continuar
                            </Text>
                        </Box>
                    )}
                </Pressable>
            </VStack>
        </ScrollView>
    );
};