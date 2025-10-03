import { Center, ScrollView, Text } from "@gluestack-ui/themed";

export function FamiliaMenu() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <Center flex={1}>
                <Text>Family Menu</Text>
            </Center>
        </ScrollView>
    )
}