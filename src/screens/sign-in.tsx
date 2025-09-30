import { VStack, Image, Center, View, ScrollView } from "@gluestack-ui/themed";

import BackgroundImg from "@assets/background.png";
import { Button } from "@components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {

    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const handleClickGoToHome = () => {
        navigator.navigate("home");
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1}>
                <Center flex={1}>
                    <Image
                        w="$full"
                        h={200}
                        source={BackgroundImg}
                        defaultSource={BackgroundImg}
                        alt="Imagem background"
                        position="absolute"
                    />
                </Center>

                <View px="$4" pb="$4">
                    <Button title="Acessar" onPress={handleClickGoToHome} />
                </View>
            </VStack>
        </ScrollView>
    )
}