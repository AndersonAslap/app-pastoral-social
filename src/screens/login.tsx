import { VStack, Image, Center, View, ScrollView } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";

import BackgroundImg from "@assets/background.png";
import { Button } from "@components/button";
import { Input } from "@components/input";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { useAppToast } from "@hooks/useAppToast";

export function Login() {
    const { signIn } = useAuth();
    const { showErrorToast } = useAppToast();

    const [nickName, setNickName] = useState('');
    const [senha, setSenha] = useState('');

    const [formSubmitting, setFormSubmitting] = useState(false);

    const handleClickSignIn = async () => {
        if (nickName.trim() === '' || senha.trim() === '') {
            showErrorToast({ title: MESSAGES_ERROR.FILL_ALL_FIELDS });
            return;
        }

        setFormSubmitting(true);
        try {
            await signIn(nickName, senha);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_SIGNIN;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
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
                    <Center>
                        <Image
                            w={320}
                            h={320}
                            source={BackgroundImg}
                            alt="Logo"
                            borderRadius={60}
                        />
                    </Center>

                    <View gap="$2">
                        <Input
                            placeholder="Usuário"
                            value={nickName}
                            onChangeText={setNickName}
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </View>

                    <Button
                        title="Acessar"
                        onPress={handleClickSignIn}
                        mt="$6"
                        style={{
                            borderRadius: 30,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                        isLoading={formSubmitting}
                    />
                </VStack>
            </LinearGradient>
        </ScrollView>
    );
}
