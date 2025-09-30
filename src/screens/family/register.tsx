import { Button } from "@components/button";
import { ButtonCancel } from "@components/button-cancel";
import { Input } from "@components/input";
import { ScreenHeader } from "@components/screen-header";
import CustomSelect from "@components/select";
import CustomSwitch from "@components/swtch";
import { TextArea } from "@components/text-area";
import { HStack } from "@gluestack-ui/themed";
import { VStack, ScrollView } from "@gluestack-ui/themed";
import { useState } from "react";
import { Alert } from "react-native";

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

const dificuldadeOptions = [
    { label: "Financeira", value: "1" },
    { label: "Saúde", value: "2" },
    { label: "Educação", value: "3" }
];

export function FamilyRegister() {
    const [form, setForm] = useState(initialState);

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        Alert.alert("Dados do formulário", JSON.stringify(form, null, 2));
    };

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
                    onValueChange={value => handleChange("idComunidade", value)}
                />

                <CustomSelect
                    options={dificuldadeOptions}
                    placeholder="Selecione a dificuldade"
                    size="md"
                    variant="underlined"
                    selectedValue={form.idDificuldade}
                    onValueChange={value => handleChange("idDificuldade", value)}
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
                    <Button w="$1/2" title="Salvar" onPress={handleSubmit} />
                </HStack>
            </VStack>
        </ScrollView>
    );
}
