import React, { useEffect, useRef } from "react";
import { VStack, HStack, Box } from "@gluestack-ui/themed";
import { Animated } from "react-native";

interface SkeletonSimpleProps {
    quantidade?: number;
}

export const FamilyCardSkeleton: React.FC<SkeletonSimpleProps> = ({ quantidade = 3 }) => {
    // Animações por categoria
    const largeElements = useRef(new Animated.Value(0.3)).current;
    const mediumElements = useRef(new Animated.Value(0.3)).current;
    const smallElements = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        // Elementos grandes (títulos)
        Animated.loop(
            Animated.sequence([
                Animated.timing(largeElements, {
                    toValue: 0.8,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(largeElements, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Elementos médios (textos)
        Animated.loop(
            Animated.sequence([
                Animated.timing(mediumElements, {
                    toValue: 0.7,
                    duration: 900,
                    delay: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(mediumElements, {
                    toValue: 0.3,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Elementos pequenos (ícones)
        Animated.loop(
            Animated.sequence([
                Animated.timing(smallElements, {
                    toValue: 0.6,
                    duration: 800,
                    delay: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(smallElements, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const renderSkeletonCard = (index: number) => (
        <Box
            key={`skeleton-${index}`}
            bg="$backgroundLight0"
            p="$4"
            mb="$3"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="$borderLight200"
        >
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
                <VStack flex={1} mr="$2">
                    <Animated.View style={{ opacity: largeElements }}>
                        <Box h="$5" w="70%" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                    
                    <Animated.View style={{ opacity: mediumElements, marginTop: 8 }}>
                        <Box h="$3" w="40%" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                </VStack>
                
                <Animated.View style={{ opacity: smallElements }}>
                    <Box h="$6" w="$6" bg="$backgroundLight300" borderRadius="$lg" />
                </Animated.View>
            </HStack>

            {/* Informações */}
            <VStack gap="$2" mb="$3">
                {/* Endereço */}
                <HStack alignItems="center" space="sm">
                    <Animated.View style={{ opacity: smallElements }}>
                        <Box h="$4" w="$4" bg="$backgroundLight300" borderRadius="$sm" />
                    </Animated.View>
                    <Animated.View style={{ opacity: mediumElements, flex: 1 }}>
                        <Box h="$3" w="80%" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                </HStack>

                {/* Comunidade */}
                <HStack alignItems="center" space="sm">
                    <Animated.View style={{ opacity: smallElements }}>
                        <Box h="$4" w="$4" bg="$backgroundLight300" borderRadius="$sm" />
                    </Animated.View>
                    <Animated.View style={{ opacity: mediumElements, flex: 1 }}>
                        <Box h="$3" w="60%" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                </HStack>

                {/* Telefone */}
                <HStack alignItems="center" space="sm">
                    <Animated.View style={{ opacity: smallElements }}>
                        <Box h="$4" w="$4" bg="$backgroundLight300" borderRadius="$sm" />
                    </Animated.View>
                    <Animated.View style={{ opacity: mediumElements, flex: 1 }}>
                        <Box h="$3" w="45%" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                </HStack>
            </VStack>

            {/* Footer */}
            <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" space="sm">
                    <Animated.View style={{ opacity: smallElements }}>
                        <Box h="$3" w="$3" bg="$backgroundLight300" borderRadius="$sm" />
                    </Animated.View>
                    <Animated.View style={{ opacity: smallElements }}>
                        <Box h="$3" w="50px" bg="$backgroundLight300" borderRadius="$md" />
                    </Animated.View>
                </HStack>
                
                <Animated.View style={{ opacity: mediumElements }}>
                    <Box h="$3" w="60px" bg="$backgroundLight300" borderRadius="$md" />
                </Animated.View>
                
                <Animated.View style={{ opacity: largeElements }}>
                    <Box h="$4" w="45px" bg="$backgroundLight300" borderRadius="$md" />
                </Animated.View>
            </HStack>
        </Box>
    );

    return (
        <VStack space="md">
            {Array.from({ length: quantidade }).map((_, index) => renderSkeletonCard(index))}
        </VStack>
    );
};