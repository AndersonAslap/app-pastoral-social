import {
    Button, 
    ButtonCancel,
    InfoTip,
    Loading,
    ScreenHeader,
} from "@shared/components";
import { View, VStack, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useAjudaHandles } from "../hooks/useAjudaHandles";
import { FamiliaInfoSection } from "../components/familiaInfoSection";
import { TemplateObservacaoSection } from "../components/templateObservacaoSection";

export function AjudaCadastrar() {
    const navigation = useNavigation();
    
    const {
        form,
        formSubmitting,
        familiasOptions,
        tiposAjudaOptions,
        templatesOptions,
        handleChange,
        handleSubmit,
        resetForm,
        loading
    } = useAjudaHandles();

    const handleCancel = () => {
        resetForm();
        navigation.goBack();
    };

    return (
        <View flex={1} bg="$blue100">
            <ScreenHeader title="Cadastrar Ajuda Familiar" backTo="ajudaListagem"/>
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
                    {
                        loading
                        ? <Loading />
                        : (
                            <>
                                <FamiliaInfoSection
                                    familiasOptions={familiasOptions}
                                    familiaId={form.idFamilia}
                                    onFamiliaChange={(value: any) => handleChange("idFamilia", value)}
                                />

                                <TemplateObservacaoSection
                                    templatesOptions={templatesOptions}
                                    templateId={form.idTemplate}
                                    observacao={form.observacao}
                                    onTemplateChange={(value: any) => handleChange("idTemplate", value)}
                                    onObservacaoChange={(value: any) => handleChange("observacao", value)}
                                    tipoAjudaOptions={tiposAjudaOptions}
                                    tipoAjudaId={form.idTipoAjuda}
                                    onTipoAjudaChange={(value: any) => handleChange("idTipoAjuda", value)}
                                />

                                <InfoTip
                                    title="Dica importante"
                                    description="Preencha todas as informações com atenção para garantir o registro correto da ajuda familiar."
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
                                            isDisabled={!form.idFamilia || !form.idTipoAjuda || !form.idTemplate}
                                        />
                                    </HStack>
                                    <View h="$8" />
                                </VStack>
                            </>
                        )
                    }
                </VStack>
            </ScrollView>
        </View>
    );
}