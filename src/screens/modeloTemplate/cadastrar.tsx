import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import CustomSelect from "@components/select";
import CustomSwitch from "@components/swtch";
import { TextArea } from "@components/text-area";
import { ButtonIcon } from "@gluestack-ui/themed";
import { ScrollView, View, VStack, Button, Icon, Text, HStack } from "@gluestack-ui/themed";
import { EditIcon, TrashIcon } from "lucide-react-native";
import { useState } from "react";

const templateTypesOptions = [
    { label: "Cesta Básica", value: "CESTA_BASICA" },
    { label: "Ação Social", value: "ACAO_SOCIAL" }
];

const initialState = {
    qtdGeracaoPossivel: 0,
    template: {
        templateName: "",
        templateDesc: "",
        templateType: null,
        gerarCestas: false
    },
    templateItems: [{ itemProdutoId: "", quantidade: 0 }]
};

const ModeloTemplateCadastrarForm = () => {
    const [form, setForm] = useState(initialState);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        const newItems = [...form.templateItems];
        newItems[index][field] = value;
        setForm(prev => ({
            ...prev,
            templateItems: newItems
        }));
    };

    const handleAddItem = () => {
        setForm(prev => ({
            ...prev,
            templateItems: [...prev.templateItems, { itemProdutoId: "", quantidade: 0 }]
        }));
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...form.templateItems];
        newItems.splice(index, 1);
        setForm(prev => ({
            ...prev,
            templateItems: newItems
        }));
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            flex={1}
        >
            <ScreenHeader title="Cadastrar Modelo de Template" />
            <VStack
                flex={1}
                bg="$backgroundLight50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$8"
                pb="$16"
                gap="$4"
            >
                {/* Seção de Template */}
                <CustomSelect
                    options={templateTypesOptions}
                    placeholder="Selecione o tipo de template"
                    size="md"
                    variant="underlined"
                    selectedValue={form.template.templateType}
                    onValueChange={value => handleChange("template.templateType", value)}
                    width="100%" // Garante que o select ocupe toda a largura
                />

                <Input
                    placeholder="Nome do template"
                    value={form.template.templateName}
                    onChangeText={text => handleChange("template.templateName", text)}
                    width="100%" // Garante que o input ocupe toda a largura
                />

                <TextArea
                    placeholder="Descrição do template"
                    value={form.template.templateDesc}
                    onChangeText={text => handleChange("template.templateDesc", text)}
                    width="100%" // Garante que o text area ocupe toda a largura
                />

                <CustomSwitch
                    label="Deseja gerar as cestas automaticamente?"
                    isChecked={form.template.gerarCestas}
                    onChange={value => handleChange("template.gerarCestas", value)}
                />


                <VStack gap="$4">
                    {form.templateItems.map((item, index) => (
                        <HStack
                            key={index}
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                            padding="$3"
                            bg="$backgroundLight0"
                            borderRadius="$2xl"
                            shadowColor="#000"
                            shadowOffset={{ width: 0, height: 1 }}
                            shadowOpacity={0.1}
                            shadowRadius={3}
                            elevation={2} // sombra no Android
                        >
                            {/* Select Produto */}
                            <View flex={3} mr="$2">
                                <CustomSelect
                                    options={templateTypesOptions}
                                    placeholder="Produto"
                                    size="lg"
                                    variant="outline"
                                    selectedValue={form.template.templateType}
                                    onValueChange={value =>
                                        handleChange("template.templateType", value)
                                    }
                                    borderRadius="$lg"
                                    bg="$backgroundLight50"
                                />
                            </View>

                            {/* Quantidade */}
                            <View flex={1} mr="$2">
                                <Input
                                    size="md"
                                    borderRadius="$lg"
                                    bg="$backgroundLight50"
                                    textAlign="center"
                                    value={String(item.quantidade)}
                                    onChangeText={text =>
                                        handleItemChange(index, "quantidade", Number(text))
                                    }
                                    keyboardType="numeric"
                                />
                            </View>

                            {/* Botão Remover */}
                            <Button
                                borderRadius="$full"
                                size="md"
                                bg="$red100"
                                p="$2"
                                onPress={() => handleRemoveItem(index)}
                            >
                                <ButtonIcon as={TrashIcon} color="$red600" />
                            </Button>
                        </HStack>
                    ))}

                    {/* Botão Adicionar */}
                    <Button
                        onPress={handleAddItem}
                        bg="$primary600"
                        borderRadius="$lg"
                        size="lg"
                        leftIcon={<Icon name="add" color="white" />}
                    >
                        <Text color="white" fontWeight="bold">
                            Adicionar Item
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>
    );
};

export default ModeloTemplateCadastrarForm;
