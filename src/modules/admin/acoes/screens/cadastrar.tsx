import {
    Button, 
    ButtonCancel,
    InfoTip,
    ScreenHeader,
} from "@shared/components";
import { View, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";
import { useAcaoSocialForm } from "../hooks/useAcaoForm";
import { AcoesInformacoesBasicasSection } from "../components/acoesInformacoesBasicasSection";
import { AcoesItensAcaoSection } from "../components/acoesItensSection";


export function AcoesCadastrar() {
    
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    
    const {
        form,
        formSubmitting,
        produtos,
        produtosSelecionados,
        handleChange,
        handleProdutoToggle,
        handleProdutoChangeQuantidade,
        handleSubmit,
        resetForm
    } = useAcaoSocialForm();

    const handleCancel = () => {
        resetForm();
        return navigation.navigate("acoesListagem");
    };

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Cadastrar Ação Social" backTo="acoesListagem"/>
            
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
                    <AcoesInformacoesBasicasSection
                        titulo={form.titulo}
                        descricao={form.descricao}
                        data={form.dataEvento}
                        tipoAcao={form.tipoAcao}
                        qtdAcaoSocial={form.qtdAcaoSocial}
                        onTituloChange={(value: any) => handleChange("titulo", value)}
                        onDescricaoChange={(value: any) => handleChange("descricao", value)}
                        onDataChange={(value: any) => handleChange("dataEvento", value)}
                        onTipoAcaoChange={(value: any) => handleChange("tipoAcao", value)}
                        onQtdAcaoSocialChange={(value: any) => handleChange("qtdAcaoSocial", value)}
                    />

                    <AcoesItensAcaoSection
                        produtos={produtos}
                        produtosSelecionados={produtosSelecionados}
                        onProdutoToggle={handleProdutoToggle}
                        onQuantidadeChange={handleProdutoChangeQuantidade}
                    />

                    <InfoTip
                        title="Organização da ação social"
                        description="Selecione todos os itens que serão distribuídos. Você pode ajustar as quantidades posteriormente no controle de estoque."
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
                                title="Cadastrar"
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