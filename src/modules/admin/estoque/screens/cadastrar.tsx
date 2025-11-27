import {
    Button, 
    ButtonCancel,
    InfoTip,
    ScreenHeader,
} from "@shared/components";
import { View, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { useEstoqueForm } from "../hooks/useEstoqueForm";
import { ProdutoInfoSection } from "../components/produtoInfoSection";
import { ProdutoValidadeSection } from "../components/produtoValidadeSection";

export function EstoqueCadastrar() {
    const navigation = useNavigation();
    
    const {
        form,
        formSubmitting,
        produtosOptions,
        handleChange,
        handleSubmit,
        resetForm,
        loadProdutosOptions
    } = useEstoqueForm();

    useEffect(() => {
        loadProdutosOptions();
    }, []);

    const handleCancel = () => {
        resetForm();
        navigation.goBack();
    };

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
                    <ProdutoInfoSection
                        produtosOptions={produtosOptions}
                        produtoId={form.itemProdutoId ? form.itemProdutoId.toString() : ""}
                        quantidade={form.quantidade}
                        onProdutoChange={(value) => handleChange("itemProdutoId", value)}
                        onQuantidadeChange={(value) => handleChange("quantidade", value)}
                    />

                    <ProdutoValidadeSection
                        validade={form.validade!}
                        onValidadeChange={(value) => handleChange("validade", value)}
                    />

                    <InfoTip
                        title="Dica importante"
                        description="Certifique-se de que a data de validade está correta para evitar problemas no controle de estoque."
                    />

                    <VStack space="md" mt="$4" pb="$4">
                        <HStack space="md">
                            <ButtonCancel 
                                flex={1} 
                                title="Cancelar" 
                                onPress={handleCancel}
                            />
                            <Button
                                flex={1}
                                title="Cadastrar Produto"
                                onPress={handleSubmit}
                                isLoading={formSubmitting}
                            />
                        </HStack>
                        <View h="$8" />
                    </VStack>
                </VStack>
            </ScrollView>
        </View>
    );
}