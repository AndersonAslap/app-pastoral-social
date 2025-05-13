import { Center, ScrollView, Text } from "@gluestack-ui/themed";

export function FamilyRegister() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <Center flex={1}>
                <Text>Family Register</Text>
            </Center> 
        </ScrollView>
    )
}