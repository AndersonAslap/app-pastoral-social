import { VStack, Image, Center, View, Text, Box, HStack, Pressable } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react-native";
import BackgroundImg from "@shared/assets/background.png";
import {Button, Input} from "@shared/components";
import { useState } from "react";
import { useAuth } from "@shared/hooks/useAuth";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { useAppToast } from "@shared/hooks/useAppToast";

export function Login() {
    const { signIn } = useAuth();
    const { showErrorToast } = useAppToast();

    const [nickName, setNickName] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View flex={1}>
            <LinearGradient
                colors={["#1e3a8a", "#3b82f6", "#60a5fa"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <VStack flex={1} px="$6" justifyContent="center" space="xl">
                    {/* Header - Mais compacto */}
                    <Center mb="$8">
                        <VStack space="sm" alignItems="center">
                            <Box 
                                bg="rgba(255, 255, 255, 0.1)" 
                                p="$4" 
                                borderRadius="$2xl"
                                borderWidth={1}
                                borderColor="rgba(255, 255, 255, 0.2)"
                            >
                                <Image
                                    w={100}
                                    h={100}
                                    source={BackgroundImg}
                                    alt="Logo Pastoral Social"
                                    borderRadius={20}
                                />
                            </Box>
                            
                            <VStack space="xs" alignItems="center" mt="$2">
                                <Text 
                                    color="$white" 
                                    fontSize="$lg" 
                                    fontWeight="$semibold"
                                    fontFamily="$body"
                                    opacity={0.9}
                                >
                                    PASTORAL SOCIAL
                                </Text>
                                <Text 
                                    color="$blue100" 
                                    fontSize="$sm" 
                                    opacity={0.8}
                                    textAlign="center"
                                >
                                    Sistema de Gestão Social
                                </Text>
                            </VStack>
                        </VStack>
                    </Center>

                    {/* Card do Formulário - Mais compacto */}
                    <Box 
                        bg="$white" 
                        p="$5" 
                        borderRadius="$2xl" 
                        shadow="2xl"
                        mx="$1"
                    >
                        <VStack space="lg">
                            {/* Título do Form */}
                            <VStack space="xs" alignItems="center">
                                <Text 
                                    fontSize="$xl" 
                                    fontWeight="$bold" 
                                    color="$textDark800"
                                >
                                    Acesso ao Sistema
                                </Text>
                                <Text 
                                    fontSize="$sm" 
                                    color="$textDark500"
                                    textAlign="center"
                                >
                                    Entre com suas credenciais
                                </Text>
                            </VStack>

                            {/* Campos do Formulário */}
                            <VStack space="md">
                                {/* Campo Usuário */}
                                <VStack space="xs">
                                    <Text 
                                        fontSize="$sm" 
                                        fontWeight="$medium" 
                                        color="$textDark700"
                                    >
                                        Usuário
                                    </Text>
                                    <Box position="relative" alignItems="center">
                                        <Input
                                            placeholder="Digite seu usuário"
                                            value={nickName}
                                            onChangeText={setNickName}
                                            pl="$10"
                                            size="md"
                                            borderRadius="$lg"
                                            bg="$backgroundLight50"
                                        />
                                        <Box 
                                            position="absolute" 
                                            left="$3" 
                                            top="$4.5"
                                        >
                                            <User size={18} color="#64748b" />
                                        </Box>
                                    </Box>
                                </VStack>

                                {/* Campo Senha */}
                                <VStack space="xs">
                                    <Text 
                                        fontSize="$sm" 
                                        fontWeight="$medium" 
                                        color="$textDark700"
                                    >
                                        Senha
                                    </Text>
                                    <Box position="relative">
                                        <Input
                                            placeholder="Digite sua senha"
                                            secureTextEntry={!showPassword}
                                            value={senha}
                                            onChangeText={setSenha}
                                            pl="$10"
                                            pr="$10"
                                            size="md"
                                            borderRadius="$lg"
                                            bg="$backgroundLight50"
                                        />
                                        <Box 
                                            position="absolute" 
                                            left="$3" 
                                            top="$4.5"
                                        >
                                            <Lock size={18} color="#64748b" />
                                        </Box>
                                        <Pressable
                                            position="absolute" 
                                            right="$3" 
                                            top="$4.5"
                                            onPress={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} color="#64748b" />
                                            ) : (
                                                <Eye size={18} color="#64748b" />
                                            )}
                                        </Pressable>
                                    </Box>
                                </VStack>
                            </VStack>

                            {/* Botão de Acesso */}
                            <Button
                                onPress={handleClickSignIn}
                                size="md"
                                borderRadius="$lg"
                                bg="$primary600"
                                mt="$2"
                                isLoading={formSubmitting}
                                title={formSubmitting ? "Entrando..." : "Acessar Sistema"}
                            />
                                

                            {/* Footer do Card */}
                            <Center mt="$2">
                                <Text 
                                    fontSize="$xs" 
                                    color="$textDark400"
                                    textAlign="center"
                                >
                                    © 2024 Pastoral Social • Versão 1.0
                                </Text>
                            </Center>
                        </VStack>
                    </Box>

                    {/* Informação de Segurança - Mais discreta */}
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
        </View>
    );
}