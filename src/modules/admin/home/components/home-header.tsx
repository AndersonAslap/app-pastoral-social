import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import { config } from "../../../../../config/gluestack-ui.config";
import { useAuth } from "@shared/hooks/useAuth";

export function HomeHeader() {
    const { user, signOut } = useAuth();
    const { nickName, nome } = user;

    let userName = "";

    if (nome.trim().length > 0) {
        let chunksName = nome?.split(" ") || [];
        if (chunksName.length > 1) {
        userName = chunksName[0] + " " + chunksName[chunksName.length - 1];
        } else {
            userName = nome;
        }
    } else {
        userName = nickName;
    }
    
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
                <Heading color="$gray500">{userName}</Heading>
            </VStack>

            <LogOut
                color={config.tokens.colors.red400}
                size={24}
                onPress={signOut}
            />
        </HStack>
    )
}