import React, { useEffect, useRef } from "react";
import { VStack, HStack, Box } from "@gluestack-ui/themed";
import { Animated } from "react-native";
import { FamilyCardSkeleton } from "./familia-card-enhanced-skeleton";

export const FamiliaListagemSkeleton = () => {
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

    return (
        <>
            <Box 
                bg="$backgroundLight0" 
                p="$4" 
                mb="$4"
                borderRadius="$2xl" 
            >
                <HStack 
                    justifyContent="space-between" 
                >
                    <VStack flex={1}>
                        <Animated.View style={{ opacity: largeElements }}>
                            <Box h="$5" w="40%" bg="$backgroundLight300" borderRadius="$md" />
                        </Animated.View>
                        
                        <Animated.View style={{ opacity: mediumElements, marginTop: 8 }}>
                            <Box h="$3" w="60%" bg="$backgroundLight300" borderRadius="$md" />
                        </Animated.View>
                    </VStack>
                </HStack>
            </Box>

            <Animated.View style={{ opacity: smallElements, alignSelf: 'flex-start' }}>
                <Box
                    bg="$backgroundLight300"
                    p="$3"
                    mb="$4"
                    borderRadius="$lg"
                    alignItems="center"
                    h="$8" 
                    w="$32"
                />
            </Animated.View>

            <FamilyCardSkeleton />
        </>
    );
};