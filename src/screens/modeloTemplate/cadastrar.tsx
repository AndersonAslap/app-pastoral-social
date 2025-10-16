import { ButtonCancel } from "@components/button-cancel";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import CustomSelect from "@components/select";
import CustomSwitch from "@components/swtch";
import { TextArea } from "@components/text-area";
import { ButtonIcon, Badge, BadgeText, ButtonSpinner } from "@gluestack-ui/themed";
import { ScrollView, View, VStack, Button, Icon, Text, HStack, Box } from "@gluestack-ui/themed";
import { useAppToast } from "@hooks/useAppToast";
import { useFocusEffect } from "@react-navigation/native";
import { listarItemProdutosOptions, listarItens } from "@services/estoque.service";
import { consultaGeracaoTemplateService, GeracaoTemplateService } from "@services/modeloTemplate.service";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { EditIcon, TrashIcon, PlusIcon, CalculatorIcon, PackageIcon } from "lucide-react-native";
import { useCallback, useState } from "react";

const templateTypesOptions = [
    { label: "Ação Social", value: "ACAO_SOCIAL" },
    { label: "Almoço", value: "ALMOCO" },
    { label: "Cesta Básica", value: "CESTA_BASICA" },
    { label: "Janta", value: "JANTA" },
];

const initialState = {
    qtdGeracaoPossivel: 0,
    templateDesc: "",
    templateType: null,
    gerarCestas: false,
    templateItens: [{ itemProdutoId: "", quantidade: 0 }]
};

export type SelectOptions = {
  value: string;
  label: string;
};

export type Product = {
    id: number;
    nome: string;
    quantidadeEstoque: number;
    unidadeMedida?: string;
};

const ModeloTemplateCadastrarForm = () => {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState(initialState);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [calculatingGenerations, setCalculatingGenerations] = useState(false);
    const [qtdGeracaoPossivelShow, setQtdGeracaoPossivelShow] = useState(false);

    const [produtos, setProdutos] = useState<Product[]>([]);
    const [produtosOptions, setProdutosOptions] = useState<SelectOptions[]>([]);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...form.templateItens];
        newItems[index][field] = value;
        setForm(prev => ({
            ...prev,
            qtdGeracaoPossivel: 0,
            templateItens: newItems
        }));
        setQtdGeracaoPossivelShow(false);
    };

    const handleAddItem = () => {
        setForm(prev => ({
            ...prev,
            qtdGeracaoPossivel: 0,
            templateItens: [...prev.templateItens, { itemProdutoId: "", quantidade: 0 }]
        }));
        setQtdGeracaoPossivelShow(false);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...form.templateItens];
        newItems.splice(index, 1);
        setForm(prev => ({
            ...prev,
            qtdGeracaoPossivel: 0,
            templateItens: newItems
        }));
        setQtdGeracaoPossivelShow(false);
    };

    const getQuantidadeEstoque = (itemProdutoId: string) => {
        if (!itemProdutoId) return 0;
        const produto = produtos.find(p => p.id.toString() === itemProdutoId);
        return produto?.quantidadeEstoque || 0;
    };

    const getProdutoInfo = (itemProdutoId: string) => {
        if (!itemProdutoId) return null;
        return produtos.find(p => p.id.toString() === itemProdutoId);
    };

    const getEstoqueStatus = (itemProdutoId: string, quantidade: number) => {
        const estoque = getQuantidadeEstoque(itemProdutoId);
        if (estoque === 0) return { status: "sem-estoque", color: "$red" };
        if (quantidade > estoque) return { status: "insuficiente", color: "$orange" };
        if (quantidade === estoque) return { status: "exato", color: "$blue" };
        return { status: "suficiente", color: "$green" };
    };

    const handleCalculateGenerations = async () => {
        setQtdGeracaoPossivelShow(false);
        setCalculatingGenerations(true);
        try {
            const payload = { templateItens: [...form.templateItens] };
            const quantidadePossivel = await consultaGeracaoTemplateService(payload);
            setForm(prev => ({ ...prev, qtdGeracaoPossivel: quantidadePossivel }));
            setQtdGeracaoPossivelShow(true);
        } catch (error) {
            showErrorToast({ title: "Erro ao calcular gerações" });
        } finally {
            setCalculatingGenerations(false);
        }
    };

    const fetchItensProduto = async () => {
        try {
            const data = await listarItens();
            setProdutos(data || []);
            setProdutosOptions(data?.map((item: Product) => ({ 
                label: item.nome, 
                value: item.id.toString() 
            })) || []);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_ITENS;
            showErrorToast({ title });
        }
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = { ...form, template: {
                templateDesc: form.templateDesc,
                templateType: form.templateType,
            } };
            console.log("Payload para cadastro de modelo de template:", JSON.stringify(payload, null, 2));
            await GeracaoTemplateService(payload);
            setForm(initialState);
            showSuccessToast({ title: "Modelo cadastrado com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchItensProduto();
        }, [])
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            flex={1}
        >
            <ScreenHeader title="Cadastrar Modelo de Template" backTo="modeloTemplateListagem"/>
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$8"
                pb="$16"
                gap="$6"
            >
                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Informações Básicas
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" shadow="sm" gap="$4">
                        <Input
                            placeholder="Nome do template"
                            value={form.templateDesc}
                            onChangeText={text => handleChange("templateDesc", text)}          
                        />

                        <CustomSelect
                            options={templateTypesOptions}
                            placeholder="Selecione o tipo de template"
                            size="md"
                            variant="underlined"
                            selectedValue={form.templateType}
                            onValueChange={value => handleChange("templateType", value)}
                        />        
                    </Box>
                </VStack>

                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Configuração
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" shadow="sm">
                        <CustomSwitch
                            label="Gerar as cestas automaticamente?"
                            isChecked={form.gerarCestas}
                            onChange={value => handleChange("gerarCestas", value)}
                        />
                    </Box>
                </VStack>

                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Produtos
                    </Text>

                    <VStack gap="$3">
                        {form.templateItens.map((item, index) => {
                            const produtoInfo = getProdutoInfo(item.itemProdutoId);
                            const estoqueStatus = getEstoqueStatus(item.itemProdutoId, item.quantidade);
                            const quantidadeEstoque = getQuantidadeEstoque(item.itemProdutoId);

                            return (
                                <Box
                                    key={index}
                                    bg="$backgroundLight0"
                                    p="$4"
                                    borderRadius="$2xl"
                                    shadow="sm"
                                >
                                    {/* Linha 1: Select Produto e Botão Remover */}
                                    <HStack alignItems="flex-start" space="md" mb="$3">
                                        {/* Select Produto */}
                                        <View flex={1}>
                                            <CustomSelect
                                                options={produtosOptions}
                                                placeholder="Produto"
                                                size="lg"
                                                variant="outline"
                                                selectedValue={form.templateItens[index].itemProdutoId}
                                                onValueChange={value =>
                                                    handleItemChange(index, "itemProdutoId", value)
                                                }
                                            />
                                        </View>

                                        {/* Botão Remover */}
                                        <Button
                                            borderRadius="$lg"
                                            size="md"
                                            bg="$red100"
                                            p="$3"
                                            onPress={() => handleRemoveItem(index)}
                                        >
                                            <ButtonIcon as={TrashIcon} color="$red600" size="md" />
                                        </Button>
                                    </HStack>

                                    {/* Linha 2: Badge de Estoque e Campo Quantidade */}
                                    <HStack alignItems="center" space="md">
                                        {/* Badge de Estoque */}
                                        <View flex={1}>
                                            {item.itemProdutoId && (
                                                <HStack alignItems="center" space="sm">
                                                    <PackageIcon size={14} color="#6B7280" />
                                                    <Badge 
                                                        size="sm" 
                                                        variant="solid" 
                                                        borderRadius="$full"
                                                        bg={estoqueStatus.color + "100"}
                                                        borderWidth="$1"
                                                        borderColor={estoqueStatus.color + "300"}
                                                        px="$3"
                                                        py="$1"
                                                    >
                                                        <BadgeText 
                                                            fontSize="$2xs" 
                                                            fontWeight="bold" 
                                                            color={estoqueStatus.color + "700"}
                                                        >
                                                            Estoque: {quantidadeEstoque}
                                                        </BadgeText>
                                                    </Badge>
                                                    
                                                    {/* Aviso de estoque insuficiente */}
                                                    {item.quantidade > 0 && quantidadeEstoque > 0 && item.quantidade > quantidadeEstoque && (
                                                        <Text fontSize="$2xs" color="$orange600" fontWeight="bold">
                                                            ({item.quantidade - quantidadeEstoque} a mais)
                                                        </Text>
                                                    )}
                                                </HStack>
                                            )}
                                        </View>

                                        {/* Campo Quantidade */}
                                        <View width="$20">
                                            <Input
                                                size="lg"
                                                textAlign="center"
                                                value={String(item.quantidade)}
                                                onChangeText={text =>
                                                    handleItemChange(index, "quantidade", Number(text))
                                                }
                                                keyboardType="numeric"
                                                placeholder="0"
                                            />
                                        </View>
                                    </HStack>

                                    {/* Linha 3: Status do Estoque */}
                                    {item.itemProdutoId && item.quantidade > 0 && (
                                        <HStack justifyContent="center" mt="$2">
                                            {estoqueStatus.status === "sem-estoque" && (
                                                <Text fontSize="$xs" color="$red600" fontWeight="bold">
                                                    SEM ESTOQUE
                                                </Text>
                                            )}
                                            {estoqueStatus.status === "insuficiente" && (
                                                <Text fontSize="$xs" color="$orange600" fontWeight="bold">
                                                    ESTOQUE INSUFICIENTE
                                                </Text>
                                            )}
                                            {estoqueStatus.status === "exato" && (
                                                <Text fontSize="$xs" color="$blue600" fontWeight="bold">
                                                    ESTOQUE EXATO
                                                </Text>
                                            )}
                                            {estoqueStatus.status === "suficiente" && (
                                                <Text fontSize="$xs" color="$green600" fontWeight="bold">
                                                    ESTOQUE SUFICIENTE
                                                </Text>
                                            )}
                                        </HStack>
                                    )}
                                </Box>
                            );
                        })}
                    </VStack>

                    {/* Botão Adicionar Item */}
                    <Button
                        onPress={handleAddItem}
                        bg="$primary500"
                        borderRadius="$lg"
                        size="lg"
                        leftIcon={<ButtonIcon as={PlusIcon} color="white" />}
                    >
                        <Text color="white" fontWeight="$bold">
                            Adicionar Item
                        </Text>
                    </Button>
                </VStack>

                {/* Seção: Status e Ações */}
                <VStack gap="$4">
                    {/* Status das Gerações */}
                    {qtdGeracaoPossivelShow && form.qtdGeracaoPossivel >= 0 && (
                        <Box 
                            bg={form.qtdGeracaoPossivel === 0 ? "$red100" : "$green100"} 
                            p="$4" 
                            borderRadius="$2xl" 
                            borderLeftWidth="$4"
                            borderLeftColor={form.qtdGeracaoPossivel === 0 ? "$red600" : "$green600"}
                        >
                            <HStack alignItems="center" space="sm">
                                <Icon as={CalculatorIcon} color={form.qtdGeracaoPossivel === 0 ? "$red600" : "$green600"} size="md" />
                                <Text color={form.qtdGeracaoPossivel === 0 ? "$red800" : "$green800"} fontWeight="$medium">
                                    É possível gerar {form.qtdGeracaoPossivel} cestas com os produtos atuais
                                </Text>
                            </HStack>
                        </Box>
                    )}

                    {/* Botão Verificar Gerações */}
                    <Button
                        onPress={handleCalculateGenerations}
                        bg="$yellow500"
                        borderRadius="$lg"
                        size="lg"
                        disabled={calculatingGenerations}
                    > 
                    {
                        calculatingGenerations ? (
                            <ButtonSpinner color="$white" />
                        ) : (
                            <Text color="white" fontWeight="$bold" size="sm">
                                Verificar Quantidade de Gerações Possíveis
                            </Text>
                        )
                    }    
                    </Button>

                    {/* Botões de Ação */}
                    <HStack space="md" mt="$4">
                        <ButtonCancel flex={1} title="Cancelar" h="$12" />
                        <Button
                            flex={1}
                            h="$12"
                            onPress={handleSubmit}
                            isLoading={formSubmitting}
                            bg="$green600"
                        >
                            <Text color="$white" fontWeight="$bold">Salvar</Text>
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default ModeloTemplateCadastrarForm;