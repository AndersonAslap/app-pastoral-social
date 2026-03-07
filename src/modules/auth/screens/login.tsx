import { VStack, Image, Center, View, Text, Box, HStack, Pressable } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react-native";
import BackgroundImg from "@shared/assets/background.png";
import {Button, Input} from "@shared/components";
import { useRef, useState } from "react";
import { useAuth } from "@shared/hooks/useAuth";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { useAppToast } from "@shared/hooks/useAppToast";
import { FormContainer } from "@shared/components/form-container";
import { TextInput } from "react-native";

export function Login() {
    const { signIn } = useAuth();
    const { showErrorToast } = useAppToast();

    const [nickName, setNickName] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);

    // Criar ref para o campo de senha
    const passwordInputRef = useRef<TextInput>(null);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Função para avançar para o próximo campo
    const handleUserSubmit = () => {
        passwordInputRef.current?.focus();
    };

    return (
        <FormContainer>
            <LinearGradient
                colors={["#1e3a8a", "#3b82f6", "#60a5fa"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >


                                <VStack flex={1} px="$8" justifyContent="center" space="2xl">

    {/* Logo */}
    <Center mb="$10">
        <VStack alignItems="center" space="sm">
            <Image
                w={150}
                h={150}
                source={BackgroundImg}
                alt="Logo"
            />

            <Text
                color="$white"
                fontSize="$2xl"
                fontWeight="$bold"
            >
                PASTORAL SOCIAL
            </Text>

            <Text
                color="$blue100"
                fontSize="$sm"
            >
                Sistema de Gestão Social
            </Text>
        </VStack>
    </Center>

    {/* Form */}
    <VStack space="md">

        {/* Usuário */}
        <Box position="relative">
            <Input
                placeholder="Usuário"
                value={nickName}
                onChangeText={setNickName}
                pl="$10"
                borderRadius="$md"
                bg="$white"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={handleUserSubmit}
            />

            <Box position="absolute" left="$3" top="$4">
                <User size={18} color="#64748b" />
            </Box>
        </Box>

        {/* Senha */}
        <Box position="relative">
            <Input
                ref={passwordInputRef}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                value={senha}
                onChangeText={setSenha}
                pl="$10"
                pr="$10"
                borderRadius="$md"
                bg="$white"
                returnKeyType="done"
                onSubmitEditing={handleClickSignIn}
                error={true}
                helperText="senha errada"
            />

            <Box position="absolute" left="$3" top="$4">
                <Lock size={18} color="#64748b" />
            </Box>

            <Pressable
                position="absolute"
                right="$3"
                top="$4"
                onPress={togglePasswordVisibility}
            >
                {showPassword ? (
                    <EyeOff size={18} color="#64748b" />
                ) : (
                    <Eye size={18} color="#64748b" />
                )}
            </Pressable>
        </Box>

        {/* Botão */}
        <Button
            mt="$4"
            size="md"
            borderRadius="$md"
            bg="$primary600"
            isLoading={formSubmitting}
            title="Entrar"
            onPress={handleClickSignIn}
        />

    </VStack>

    {/* Footer */}
<Center mt="$4">
                        <HStack space="sm" alignItems="center" bg="rgba(255, 255, 255, 0.1)" px="$3" py="$2" borderRadius="$full">
                            <Shield size={14} color="#dbeafe" />
                            <Text 
                                color="$blue100" 
                                fontSize="$xs" 
                                opacity={0.8}
                            >
                                Sistema seguro e criptografado
                            </Text>
                        </HStack>
                    </Center>

</VStack>
            </LinearGradient>
        </FormContainer>
    );
}