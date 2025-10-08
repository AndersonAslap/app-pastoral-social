import { Button } from "@components/button";
import { ButtonCancel } from "@components/button-cancel";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import CustomSelect from "@components/select";
import CustomSwitch from "@components/swtch";
import { TextArea } from "@components/text-area";
import { HStack } from "@gluestack-ui/themed";
import { VStack, ScrollView } from "@gluestack-ui/themed";
import { useAppToast } from "@hooks/useAppToast";
import { listarDificuldadeService } from "@services/dificuldade.service";
import { createFamiliaService } from "@services/familia.service";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { useEffect, useState } from "react";


const initialState = {
    nomeRepresentante: "",
    idade: "",
    idComunidade: "",
    idDificuldade: "",
    cpfRg: "",
    telefone: "",
    endereco: "",
    qtdPessoasResidencia: "",
    qtdPessoasEmpregadas: "",
    criancasFrequentamEscola: false,
    membroComProblemaSaude: false,
    jaRecebeuAjuda: false,
    desejaParticiparCursos: false,
    observacao: "",
    outros: ""
};

const comunidadeOptions = [
    { label: "São gonçalo", value: "1" },
    { label: "Outra comunidade", value: "2" }
];

export function FamiliaCadastrarForm() {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState(initialState);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [dificuldadeOptions, setDificuldadeOptions] = useState<{ label: string, value: string }[]>([]);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = { ...form };
            await createFamiliaService(payload);
            setForm(initialState);
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
            return;
        }
    };

    useEffect(() => {
        const loadDataSelects = async () => {
            const promises = [fetchDificuldades()];
            const [dificuldades] = await Promise.all(promises);

            setDificuldadeOptions(dificuldades);
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
            <ScreenHeader title="Famílias" />
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
                <Input
                    placeholder="Nome do Representante"
                    value={form.nomeRepresentante}
                    onChangeText={text => handleChange("nomeRepresentante", text)}
                />

                <Input
                    placeholder="Idade"
                    keyboardType="numeric"
                    value={form.idade}
                    onChangeText={text => handleChange("idade", text)}
                />

                <CustomSelect
                    options={comunidadeOptions}
                    placeholder="Selecione a comunidade"
                    size="md"
                    variant="underlined"
                    selectedValue={form.idComunidade}
                    onValueChange={(value: string) => handleChange("idComunidade", value)}
                />

                <CustomSelect
                    options={dificuldadeOptions}
                    placeholder="Selecione a dificuldade"
                    size="md"
                    variant="underlined"
                    selectedValue={form.idDificuldade}
                    onValueChange={(value: string) => handleChange("idDificuldade", value)}
                />

                <Input
                    placeholder="CPF/RG"
                    value={form.cpfRg}
                    onChangeText={text => handleChange("cpfRg", text)}
                />

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

                <Input
                    placeholder="Quantidade de pessoas na residência"
                    keyboardType="numeric"
                    value={form.qtdPessoasResidencia}
                    onChangeText={text => handleChange("qtdPessoasResidencia", text)}
                />

                <Input
                    placeholder="Quantidade de pessoas empregadas"
                    keyboardType="numeric"
                    value={form.qtdPessoasEmpregadas}
                    onChangeText={text => handleChange("qtdPessoasEmpregadas", text)}
                />

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

                <TextArea
                    placeholder="Observações..."
                    value={form.observacao}
                    onChangeText={text => handleChange("observacao", text)}
                />

                <TextArea
                    placeholder="Outros..."
                    value={form.outros}
                    onChangeText={text => handleChange("outros", text)}
                />

                <HStack flex={1} gap="$1">
                    <ButtonCancel w="$1/2" title="Cancelar" />
                    <Button
                        w="$1/2"
                        title="Salvar"
                        onPress={handleSubmit}
                        isLoading={formSubmitting}
                    />
                </HStack>
            </VStack>
        </ScrollView>
    );
}
