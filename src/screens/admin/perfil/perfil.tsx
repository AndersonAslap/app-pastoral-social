import { ButtonCancel } from "@components/button-cancel";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import { ScrollView, View, VStack, Button, Text, HStack, Box, InputField } from "@gluestack-ui/themed";
import { useAppToast } from "@hooks/useAppToast";
import { useState } from "react";
import { User, UserCircle, Lock, Eye, EyeOff, Mail } from "lucide-react-native";
import { useAuth } from "@hooks/useAuth";

const initialState = {
    nome: "",
    senha: "",
    confirmarSenha: "",
};

export const Perfil: React.FC = () => {
    const { user } = useAuth();
    
    const { showErrorToast, showSuccessToast } = useAppToast();

    const { nickName, nome } = user;

    const [form, setForm] = useState({...initialState, nome: nome || "" });
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        // Lógica de submit aqui
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            flex={1}
        >
            
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$16"
                pb="$8"
                gap="$6"
            >
                {/* Header do Perfil */}
                <Box alignItems="center" mb="$4">
                    <Box
                        w="$24"
                        h="$24"
                        borderRadius="$full"
                        bg="$primary100"
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={4}
                        borderColor="$primary200"
                        mb="$4"
                    >
                        <UserCircle size={48} color="#3b82f6" />
                    </Box>
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Meu Perfil
                    </Text>
                    <Text size="sm" color="$textDark500" textAlign="center">
                        Gerencie suas informações pessoais
                    </Text>
                </Box>

                {/* Seção: Informações Pessoais */}
                <VStack gap="$4">
                    <Text size="lg" fontWeight="$bold" color="$textDark800">
                        Informações Pessoais
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl" shadow="sm">
                        <VStack gap="$4">
                            {/* Campo Nome */}
                            <VStack gap="$2">
                                <HStack space="sm" alignItems="center">
                                    <User size={16} color="#3b82f6" />
                                    <Text size="sm" fontWeight="$medium" color="$textDark700">
                                        Nome Completo
                                    </Text>
                                </HStack>
                                <Input
                                    placeholder="Digite seu nome completo"
                                    value={form.nome}
                                    onChangeText={text => handleChange("nome", text)}
                                    size="md"
                                />
                            </VStack>

                            {/* Campo Nickname */}
                            <VStack gap="$2">
                                <HStack space="sm" alignItems="center">
                                    <Mail size={16} color="#3b82f6" />
                                    <Text size="sm" fontWeight="$medium" color="$textDark700">
                                        Nome de Usuário
                                    </Text>
                                </HStack>
                                <Text 
                                    size="sm" 
                                    fontWeight="$medium" 
                                    color="$textDark600" 
                                    mb="$2"
                                    px="$6"
                                    py="$3"
                                    bg="$backgroundLight100"
                                    borderRadius="$md"
                                >
                                    {nickName}
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>
                </VStack>

                {/* Seção: Segurança */}
                <VStack gap="$4">
                    <Text size="lg" fontWeight="$bold" color="$textDark800">
                        Segurança
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl" shadow="sm">
                        <VStack gap="$4">
                            {/* Campo Senha */}
                            <VStack gap="$2">
                                <HStack space="sm" alignItems="center">
                                    <Lock size={16} color="#3b82f6" />
                                    <Text size="sm" fontWeight="$medium" color="$textDark700">
                                        Nova Senha
                                    </Text>
                                </HStack>
                                <Box position="relative">
                                    <Input
                                        placeholder="Digite sua nova senha"
                                        value={form.senha}
                                        onChangeText={text => handleChange("senha", text)}
                                        secureTextEntry={!showPassword}
                                        size="md"
                                        pr="$12"
                                    />
                                    <Button
                                        position="absolute"
                                        right="$2"
                                        top="$2"
                                        variant="link"
                                        onPress={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} color="#64748b" />
                                        ) : (
                                            <Eye size={18} color="#64748b" />
                                        )}
                                    </Button>
                                </Box>
                                <Text size="xs" color="$textDark500">
                                    Mínimo de 8 caracteres
                                </Text>
                            </VStack>

                            {/* Campo Confirmar Senha */}
                            <VStack gap="$2">
                                <Text size="sm" fontWeight="$medium" color="$textDark700">
                                    Confirmar Nova Senha
                                </Text>
                                <Box position="relative">
                                    <Input
                                        placeholder="Confirme sua nova senha"
                                        value={form.confirmarSenha}
                                        onChangeText={text => handleChange("confirmarSenha", text)}
                                        secureTextEntry={!showConfirmPassword}
                                        size="md"
                                        pr="$12"
                                    />
                                    <Button
                                        position="absolute"
                                        right="$2"
                                        top="$2"
                                        variant="link"
                                        onPress={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} color="#64748b" />
                                        ) : (
                                            <Eye size={18} color="#64748b" />
                                        )}
                                    </Button>
                                </Box>
                            </VStack>
                        </VStack>
                    </Box>
                </VStack>

                {/* Dica Informativa */}
                <Box 
                    bg="$blue50" 
                    p="$4" 
                    borderRadius="$xl" 
                    borderLeftWidth={4}
                    borderLeftColor="$blue500"
                >
                    <HStack space="sm" alignItems="flex-start">
                        <Box 
                            w="$5" 
                            h="$5" 
                            borderRadius="$full" 
                            bg="$blue500" 
                            alignItems="center" 
                            justifyContent="center"
                            mt="$0.5"
                        >
                            <Lock size={12} color="white" />
                        </Box>
                        <VStack flex={1}>
                            <Text size="sm" fontWeight="$medium" color="$blue800">
                                Dica de Segurança
                            </Text>
                            <Text size="xs" color="$blue700">
                                Deixe os campos de senha em branco se não deseja alterar sua senha atual.
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Botões de Ação */}
                <HStack space="md" mt="$4">
                    <ButtonCancel flex={1} title="Cancelar" />
                    <Button
                        flex={1}
                        onPress={handleSubmit}
                        isLoading={formSubmitting}
                        bg="$primary600"
                        h="$14"
                    >
                        <Text color="$white" fontWeight="$semibold">
                            {formSubmitting ? "Salvando..." : "Salvar"}
                        </Text>
                    </Button>
                </HStack>

                {/* Espaço extra para scroll */}
                <Box h="$8" />
            </VStack>
        </ScrollView>
    );
};