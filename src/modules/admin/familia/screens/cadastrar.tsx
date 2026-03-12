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
    Text, 
    KeyboardAvoidingView
} from "@gluestack-ui/themed";
import { Platform } from "react-native";
import { useFamilyForm } from "../hooks/useFamilyForm";

export function FamiliaCadastrarForm() {

    const {
        form,
        formSubmitting,
        dificuldadeOptions,
        comunidadeOptions,
        fieldState,
        handleCancel,
        handleChange,
        handleSubmit,
    } = useFamilyForm();
    
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
                                error={fieldState.nomeRepresentante.error}
                                helperText={fieldState.nomeRepresentante.message}
                            />

                            <HStack space="md">
                                <Box flex={1}>
                                    <Input
                                        placeholder="Idade"
                                        keyboardType="numeric"
                                        value={form.idade}
                                        onChangeText={text => handleChange("idade", text)}
                                        error={fieldState.idade.error}
                                        helperText={fieldState.idade.message}
                                    />
                                </Box>
                                <Box flex={2}>
                                    <Input
                                        placeholder="CPF/RG"
                                        value={form.cpfRg}
                                        onChangeText={text => handleChange("cpfRg", text)}
                                        keyboardType="numeric"
                                        error={fieldState.cpfRg.error}
                                        helperText={fieldState.cpfRg.message}
                                    />
                                </Box>
                            </HStack>

                            <Input
                                placeholder="Telefone"
                                value={form.telefone}
                                onChangeText={text => handleChange("telefone", text)}
                                keyboardType="numeric"
                                error={fieldState.telefone.error}
                                helperText={fieldState.telefone.message}
                            />

                            <Input
                                placeholder="Endereço"
                                value={form.endereco}
                                onChangeText={text => handleChange("endereco", text)}
                                error={fieldState.endereco.error}
                                helperText={fieldState.endereco.message}
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
                                    error={fieldState.qtdPessoasResidencia.error}
                                    helperText={fieldState.qtdPessoasResidencia.message}
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
                                    error={fieldState.qtdPessoasEmpregadas.error}
                                    helperText={fieldState.qtdPessoasEmpregadas.message}
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
                    <ButtonCancel flex={1} title="Cancelar" onPress={handleCancel}/>
                    <Button
                        flex={1}
                        title="Salvar Família"
                        onPress={handleSubmit}
                        isLoading={formSubmitting}
                    />
                </HStack>
            </VStack>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}