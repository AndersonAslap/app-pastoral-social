import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { config } from "../../../../config/gluestack-ui.config";
import { useAuth } from "@hooks/useAuth";

export function HomeHeader() {
    const { user, signOut } = useAuth();
    const { nickName } = user;

    return (
        <HStack
            bg="$white"
            pt="$16"
            pb="$5"
            px="$8"
            alignItems="center"
            gap="$4"
        >
            <VStack flex={1}>
                <Text color="$gray500">Olá,</Text>
                <Heading color="$gray500">{nickName}</Heading>
            </VStack>

            <LogOut
                color={config.tokens.colors.red400}
                size={24}
                onPress={signOut}
            />
        </HStack>
    )
}