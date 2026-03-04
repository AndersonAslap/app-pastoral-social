
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { ScreenHeader } from "@shared/components";

export const Example = () => {
    /*
    const fadeAnim = useRef(new Animated.Value(0.3)).current;
    
        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0.8,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0.3,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
    
            return () => fadeAnim.stopAnimation();
        }, []);
    */

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            flex={1}
        >
            <ScreenHeader title="Exemplo" />
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$8"
                pb="$16"
                gap="$4"
            >
                <Text>Exemplo</Text>
            </VStack>
        </ScrollView>
    );
}