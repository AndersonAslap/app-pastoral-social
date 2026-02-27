import {
    Button,
    ButtonCancel,
    Input,
    ScreenHeader,
    CustomSelect,
    CustomSwitch,
    TextArea
} from "@shared/components";
import { 
    HStack, 
    Box, 
    VStack, 
    ScrollView, 
    Text 
} from "@gluestack-ui/themed";
import { useAppToast } from "@shared/hooks/useAppToast";
import { listarComunidadeService } from "@shared/services/comunidade.service";
import { listarDificuldadeService } from "@shared/services/dificuldade.service";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { useEffect, useState } from "react";
import { ICriarFamiliaPayload } from "../../../../@shared/types/payload";
import { createFamiliaService } from "../services";

export function FamiliaCadastrarForm() {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState({} as ICriarFamiliaPayload);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [dificuldadeOptions, setDificuldadeOptions] = useState<{ label: string, value: string }[]>([]);
    const [comunidadeOptions, setComunidadeOptions] = useState<{ label: string, value: string }[]>([]);

    const handleChange = (field: string, value: any) => {
        if (field === "idDificuldade") {
            setForm(prev => ({
                ...prev,
                dificuldades: [value]
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [field]: value
            }));
        }   
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = { ...form } as ICriarFamiliaPayload;
            console.log("Payload para criação da família:", JSON.stringify(payload, null, 2));
            await createFamiliaService(payload);
            setForm({} as ICriarFamiliaPayload);
            showSuccessToast({ title: "Família cadastrada com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
    };

    const fetchDificuldades = async () => {
        try {
            const data = await listarDificuldadeService();
            return data;
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_DIFFICULDADES;
            showErrorToast({ title });
        }
    };

    const fetchComunidades = async () => {
        try {
            const data = await listarComunidadeService();
            return data;
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.FETCH_COMUNIDADES;
            showErrorToast({ title });
        }
    };

    useEffect(() => {
        const loadDataSelects = async () => {
            const promises = [fetchDificuldades(), fetchComunidades()];
            const [dificuldades, comunidades] = await Promise.all(promises);

            setDificuldadeOptions(dificuldades || []);
            setComunidadeOptions(comunidades || []);
        };
        loadDataSelects();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$blue100"
            pb="$8"
            flex={1}
        >
            <ScreenHeader title="Famílias" backTo="familiaListagem"/>
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
                {/* Seção: Informações do Representante */}
                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Informações do Representante
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
                        <VStack gap="$4">
                            <Input
                                placeholder="Nome do Representante"
                                value={form.nomeRepresentante}
                                onChangeText={text => handleChange("nomeRepresentante", text)}
                            />

                            <HStack space="md">
                                <Box flex={1}>
                                    <Input
                                        placeholder="Idade"
                                        keyboardType="numeric"
                                        value={form.idade}
                                        onChangeText={text => handleChange("idade", text)}
                                    />
                                </Box>
                                <Box flex={2}>
                                    <Input
                                        placeholder="CPF/RG"
                                        value={form.cpfRg}
                                        onChangeText={text => handleChange("cpfRg", text)}
                                    />
                                </Box>
                            </HStack>

                            <Input
                                placeholder="Telefone"
                                value={form.telefone}
                                onChangeText={text => handleChange("telefone", text)}
                            />

                            <Input
                                placeholder="Endereço"
                                value={form.endereco}
                                onChangeText={text => handleChange("endereco", text)}
                            />
                        </VStack>
                    </Box>
                </VStack>

                {/* Seção: Comunidade e Dificuldades */}
                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Localização e Situação
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
                        <VStack gap="$4">
                            <CustomSelect
                                options={comunidadeOptions}
                                placeholder="Selecione a comunidade"
                                size="md"
                                selectedValue={form.idComunidade}
                                onValueChange={(value: string) => handleChange("idComunidade", value)}
                            />

                            <CustomSelect
                                options={dificuldadeOptions}
                                placeholder="Selecione a dificuldade"
                                size="md"
                                selectedValue={form.idDificuldade}
                                onValueChange={(value: string) => handleChange("idDificuldade", value)}
                            />
                        </VStack>
                    </Box>
                </VStack>

                {/* Seção: Composição Familiar */}
                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Composição Familiar
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
                        <HStack space="md" alignItems="flex-end">
                            <Box flex={1}>
                                <Text size="sm" fontWeight="$medium" mb="$2" color="$textDark600">
                                    Pessoas na residência
                                </Text>
                                <Input
                                    placeholder="Quantidade"
                                    keyboardType="numeric"
                                    value={form.qtdPessoasResidencia}
                                    onChangeText={text => handleChange("qtdPessoasResidencia", text)}
                                    textAlign="center"
                                />
                            </Box>
                            
                            <Box flex={1}>
                                <Text size="sm" fontWeight="$medium" mb="$2" color="$textDark600">
                                    Pessoas empregadas
                                </Text>
                                <Input
                                    placeholder="Quantidade"
                                    keyboardType="numeric"
                                    value={form.qtdPessoasEmpregadas}
                                    onChangeText={text => handleChange("qtdPessoasEmpregadas", text)}
                                    textAlign="center"
                                />
                            </Box>
                        </HStack>
                    </Box>
                </VStack>

                {/* Seção: Situação Familiar */}
                <VStack gap="$4">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Situação Familiar
                    </Text>
                    
                    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
                        <VStack gap="$3">
                            <CustomSwitch
                                label="Crianças frequentam escolas?"
                                isChecked={form.criancasFrequentamEscola}
                                onChange={value => handleChange("criancasFrequentamEscola", value)}
                            />

                            <CustomSwitch
                                label="Membros com problemas de saúde?"
                                isChecked={form.membroComProblemaSaude}
                                onChange={value => handleChange("membroComProblemaSaude", value)}
                            />

                            <CustomSwitch
                                label="Já recebeu ajuda?"
                                isChecked={form.jaRecebeuAjuda}
                                onChange={value => handleChange("jaRecebeuAjuda", value)}
                            />

                            <CustomSwitch
                                label="Deseja participar de cursos?"
                                isChecked={form.desejaParticiparCursos}
                                onChange={value => handleChange("desejaParticiparCursos", value)}
                            />
                        </VStack>
                    </Box>
                </VStack>

                {/* Seção: Observações e Outros */}
                <VStack gap="$4" mb="$8">
                    <Text size="xl" fontWeight="$bold" color="$textDark800">
                        Observações
                    </Text>
                    
                    <VStack gap="$4">
                            <TextArea
                                placeholder="Observações sobre a família..."
                                value={form.observacao}
                                onChangeText={text => handleChange("observacao", text)}
                                minHeight="$20"
                            />

                            <TextArea
                                placeholder="Outras informações relevantes..."
                                value={form.outros}
                                onChangeText={text => handleChange("outros", text)}
                                minHeight="$20"
                            />
                        </VStack>
                </VStack>

                {/* Botões de Ação */}
                <HStack space="md" mt="$4">
                    <ButtonCancel flex={1} title="Cancelar" />
                    <Button
                        flex={1}
                        title="Salvar Família"
                        onPress={handleSubmit}
                        isLoading={formSubmitting}
                    />
                </HStack>
            </VStack>
        </ScrollView>
    );
}