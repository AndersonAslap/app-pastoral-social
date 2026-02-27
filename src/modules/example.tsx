
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { ScreenHeader } from "@shared/components";

export const Example = () => {
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