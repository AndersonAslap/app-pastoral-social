import {
    Button, 
    ButtonCancel,
    InfoTip,
    Loading,
    ScreenHeader,
    TextArea,
} from "@components/index";
import { View, VStack, HStack, ScrollView, Text, KeyboardAvoidingView } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAjudaHandles } from "@hooks/ajuda/useAjudaHandles";
import { FamiliaInfoSection } from "./components/familiaInfoSection";
import { TemplateObservacaoSection } from "./components/templateObservacaoSection";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Platform } from "react-native";
import { useCallback } from "react";

export function AjudaCadastrar() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    
    const {
        form,
        fieldState,
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
        navigation.navigate("ajudaListagem");
    };

    useFocusEffect(
        useCallback(() => {
        resetForm();
        }, [])
    );

    return (
        <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
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
                                <TemplateObservacaoSection
                                    fieldState={fieldState}
                                    templatesOptions={templatesOptions}
                                    templateId={form.idTemplate}
                                    observacao={form.observacao}
                                    onTemplateChange={(value: any) => handleChange("idTemplate", value)}
                                    onObservacaoChange={(value: any) => handleChange("observacao", value)}
                                    tipoAjudaOptions={tiposAjudaOptions}
                                    tipoAjudaId={form.idTipoAjuda}
                                    onTipoAjudaChange={(value: any) => handleChange("idTipoAjuda", value)}
                                />

                                {
                                    form.idTipoAjuda && familiasOptions && (
                                        <>
                                            <FamiliaInfoSection
                                                familiasOptions={familiasOptions}
                                                familiaId={form.idFamilia}
                                                onFamiliaChange={(value: any) => handleChange("idFamilia", value)}
                                                fieldState={fieldState}
                                            />

                                            <VStack space="md" gap="$4" mb="$6" mt="$2">       
                                                <TextArea
                                                    placeholder="Descreva detalhes adicionais sobre a ajuda..."
                                                    value={form.observacao}
                                                    onChangeText={(value: any) => handleChange("observacao", value)}
                                                    numberOfLines={4}
                                                />
                                            </VStack>

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
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </VStack>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}