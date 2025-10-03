import { VStack, Image, Center, View, ScrollView } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";

import BackgroundImg from "@assets/background.png";
import { Button } from "@components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Input } from "@components/input";

export function SignIn() {
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const handleClickGoToHome = () => {
        navigator.navigate("home");
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <LinearGradient
                colors={["#4facfe", "#00f2fe"]}
                style={{ flex: 1 }}
            >
                <VStack flex={1} px="$6" pt="$10" justifyContent="center">
                    {/* Logo */}
                    <Center>
                        <Image
                            w={320}
                            h={320}
                            source={BackgroundImg}
                            alt="Logo"
                            borderRadius={60}
                        />
                    </Center>

                    {/* Inputs */}
                    <View gap="$2">
                        <Input
                            placeholder="Usuário"
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />
                    </View>

                    {/* Botão */}
                    <Button
                        title="Acessar"
                        onPress={handleClickGoToHome}
                        mt="$6"
                        style={{
                            borderRadius: 30,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    />
                </VStack>
            </LinearGradient>
        </ScrollView>
    );
}
