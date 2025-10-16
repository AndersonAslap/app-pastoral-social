import { Button } from "@components/button";
import { ButtonCancel } from "@components/button-cancel";
import { DateInput } from "@components/date-input";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import CustomSelect from "@components/select";
import { Box, View, VStack, HStack, Text, ScrollView } from "@gluestack-ui/themed";
import { useAppToast } from "@hooks/useAppToast";
import { cadastrarEstoqueService, listarItemProdutosOptions, listarUnidadeDeMedidasOptions } from "@services/estoque.service";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { useEffect, useState } from "react";
import { Package, Scale, Calendar, Plus } from "lucide-react-native";

export type SelectOptions = {
  value: string;
  label: string;
};

const initialState = {
    validade: "",
    itemProdutoId: "",
    idLocalizacao: "",
    idUnidadeMedida: "",
    valorMedida: 1,
};

export function EstoqueCadastrar() {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState(initialState);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [produtosOptions, setProdutosOptions] = useState<SelectOptions[]>([]);
    const [unidadeMedidaOptions, setUnidadeMedidaOptions] = useState<SelectOptions[]>([]);

    const handleChange = (field: string, value: any) => {
        console.log(field, value);
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = { ...form, idLocalizacao: 1 };
            console.log(JSON.stringify(payload, null, 2));
            await cadastrarEstoqueService(payload);
            setForm(initialState);
            showSuccessToast({ title: "Produto cadastrado com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
    };

    const fetchItensProduto = async () => {
        try {
            const data = await listarItemProdutosOptions();
            return data;
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            showErrorToast({ title });
        }
    };

    const fetchUnidadeMedidas = async () => {
        try {
            const data = await listarUnidadeDeMedidasOptions();
            return data;
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            showErrorToast({ title });
        }
    };

    useEffect(() => {
        const loadDataSelects = async () => {
            const promises = [fetchItensProduto(), fetchUnidadeMedidas()];
            const [itensProdutos, unidadeMedidas] = await Promise.all(promises);

            setProdutosOptions(itensProdutos || []); 
            setUnidadeMedidaOptions(unidadeMedidas || []);
        };
        loadDataSelects();
    }, []);

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Cadastrar Produtos" backTo="estoqueListagem"/>
            
            <ScrollView 
                flex={1}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <VStack
                    flex={1}
                    bg="$backgroundLight50"
                    borderTopLeftRadius="$3xl"
                    borderTopRightRadius="$3xl"
                    px="$6"
                    pt="$8"
                    pb="$8"
                    gap="$6"
                    minHeight="100%"
                >
                    {/* Seção: Informações do Produto */}
                    <VStack gap="$4">
                        <Text size="xl" fontWeight="$bold" color="$textDark800">
                            Informações do Produto
                        </Text>
                        
                        <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl" shadow="sm">
                            <VStack gap="$4">
                                {/* Seleção do Produto */}
                                <VStack gap="$2">
                                    <HStack space="sm" alignItems="center">
                                        <Package size={18} color="#3b82f6" />
                                        <Text size="md" fontWeight="$medium" color="$textDark700">
                                            Produto
                                        </Text>
                                    </HStack>
                                    <CustomSelect
                                        options={produtosOptions}
                                        placeholder="Selecione o produto"
                                        size="md"
                                        selectedValue={form.itemProdutoId}
                                        onValueChange={(value: string) => handleChange("itemProdutoId", value)}
                                    />
                                </VStack>

                                {/* Quantidade e Unidade de Medida */}
                                <VStack gap="$2">
                                    <HStack space="sm" alignItems="center">
                                        <Scale size={18} color="#3b82f6" />
                                        <Text size="md" fontWeight="$medium" color="$textDark700">
                                            Quantidade e Medida
                                        </Text>
                                    </HStack>
                                    <HStack space="md" alignItems="flex-end">
                                        <VStack flex={1} space="xs">
                                            <Input
                                                size="md"
                                                borderRadius="$lg"
                                                bg="$backgroundLight50"
                                                textAlign="center"
                                                value={String(form.valorMedida)}
                                                onChangeText={text =>
                                                    handleChange("valorMedida", Number(text))
                                                }
                                                keyboardType="numeric"
                                                placeholder="0"
                                            />
                                        </VStack>
                                        
                                        <VStack flex={2} space="xs">
                                            <CustomSelect
                                                options={unidadeMedidaOptions}
                                                placeholder="Medida"
                                                size="md"
                                                selectedValue={form.idUnidadeMedida}
                                                onValueChange={value =>
                                                    handleChange("idUnidadeMedida", value)
                                                }
                                                borderRadius="$lg"
                                                bg="$backgroundLight50"
                                            />
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Seção: Validade */}
                    <VStack gap="$4">
                        <Text size="xl" fontWeight="$bold" color="$textDark800">
                            Informações de Validade
                        </Text>
                        
                        <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl" shadow="sm">
                            <VStack gap="$2">
                                <HStack space="sm" alignItems="center">
                                    <Calendar size={18} color="#3b82f6" />
                                    <Text size="md" fontWeight="$medium" color="$textDark700">
                                        Data de Validade
                                    </Text>
                                </HStack>
                                <DateInput
                                    label=""
                                    value={form.validade}
                                    onChange={(value) => handleChange("validade", value)}
                                    placeholder="Selecione uma data"
                                />
                                <Text size="xs" color="$textDark500" mt="$1">
                                    Selecione a data de validade do produto
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Informações Adicionais */}
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
                                <Plus size={12} color="white" />
                            </Box>
                            <VStack flex={1}>
                                <Text size="sm" fontWeight="$medium" color="$blue800">
                                    Dica importante
                                </Text>
                                <Text size="xs" color="$blue700">
                                    Certifique-se de que a data de validade está correta para evitar problemas no controle de estoque.
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Botões de Ação - Agora sempre visíveis */}
                    <VStack space="md" mt="$4" pb="$4">
                        <HStack space="md">
                            <ButtonCancel flex={1} title="Cancelar" />
                            <Button
                                flex={1}
                                title="Cadastrar Produto"
                                onPress={handleSubmit}
                                isLoading={formSubmitting}
                                leftIcon={<Plus size={16} color="white" />}
                            />
                        </HStack>
                        
                        {/* Espaço extra para garantir que os botões não fiquem colados na parte inferior */}
                        <Box h="$8" />
                    </VStack>
                </VStack>
            </ScrollView>
        </View>
    );
}