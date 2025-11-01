import { ScreenHeader } from "@components/screen-header";
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { Input } from "@gluestack-ui/themed";
import { TextArea } from "@gluestack-ui/themed";
import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

export const DoacaoAcao = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;

    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        tipoDoacao: "",
        itensDoados: "",
        quantidade: "",
        condicaoItens: "novo",
        dataEntrega: "",
        horarioEntrega: "",
        localEntrega: "",
        observacoes: ""
    });

    const [showTipoDoacao, setShowTipoDoacao] = useState(false);
    const [showHorario, setShowHorario] = useState(false);
    const [showCondicao, setShowCondicao] = useState(false);

    // Dados da ação
    const acao = {
        id: id,
        titulo: "Cestas Básicas Mensais",
        item: "Cestas Básicas",
        localizacao: "São Paulo, SP",
        endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
        responsavel: "Pastoral Social - Paróquia São Francisco",
        telefone: "(11) 9999-9999"
    };

    const tiposDoacao = [
        "Cesta Básica Completa",
        "Alimentos Não Perecíveis",
        "Produtos de Higiene",
        "Roupas e Agasalhos",
        "Produtos de Limpeza",
        "Outros"
    ];

    const horariosDisponiveis = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "14:00 - 16:00", 
        "16:00 - 18:00",
        "18:00 - 20:00"
    ];

    const condicoesItens = [
        "Novo (Lacrado/Etiquetado)",
        "Semi-novo (Pouco uso)",
        "Usado (Bom estado)"
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSelect = (field, value, setShow) => {
        handleInputChange(field, value);
        if (setShow) setShow(false);
    };

    const handleSubmit = () => {
        if (!isFormValid()) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        console.log("Dados da doação:", {
            acaoId: acao.id,
            ...formData
        });
        
        navigation.navigate("confirmacaoDoacao", { 
            acao: acao,
            doacao: formData 
        });
    };

    const isFormValid = () => {
        return (
            formData.nome &&
            formData.telefone &&
            formData.tipoDoacao &&
            formData.itensDoados &&
            formData.quantidade &&
            formData.dataEntrega &&
            formData.horarioEntrega
        );
    };

    const CustomSelect = ({ value, options, onSelect, placeholder, show, setShow }) => (
        <VStack gap="$1">
            <Pressable onPress={() => setShow(!show)}>
                <Box
                    bg="$white"
                    borderWidth={1}
                    borderColor="$trueGray300"
                    borderRadius="$md"
                    px="$3"
                    py="$3"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text color={value ? "$textDark900" : "$trueGray500"}>
                        {value || placeholder}
                    </Text>
                    <Text color="$trueGray500">▼</Text>
                </Box>
            </Pressable>

            {show && (
                <Box
                    bg="$white"
                    borderWidth={1}
                    borderColor="$trueGray300"
                    borderRadius="$md"
                    mt="$1"
                    shadow="sm"
                    maxHeight="$40"
                >
                    <ScrollView>
                        {options.map((option, index) => (
                            <Pressable
                                key={index}
                                onPress={() => onSelect(option)}
                            >
                                <Box
                                    px="$3"
                                    py="$3"
                                    borderBottomWidth={index < options.length - 1 ? 1 : 0}
                                    borderBottomColor="$trueGray200"
                                    bg={value === option ? "$blue50" : "$white"}
                                >
                                    <Text 
                                        color="$textDark700"
                                        fontWeight={value === option ? "$medium" : "$normal"}
                                    >
                                        {option}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </ScrollView>
                </Box>
            )}
        </VStack>
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            bg="$white"
            flex={1}
        >
            <ScreenHeader title="Realizar Doação" />
            
            <VStack
                flex={1}
                bg="$blue50"
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                px="$6"
                pt="$8"
                pb="$8"
                gap="$6"
            >
                {/* Cabeçalho Informativo */}
                <Box
                    bg="$primary500"
                    borderRadius="$2xl"
                    p="$5"
                >
                    <VStack gap="$3" alignItems="center">
                        <Text fontSize="$2xl">❤️</Text>
                        <Text fontSize="$lg" fontWeight="$bold" color="$white" textAlign="center">
                            Obrigado por sua generosidade!
                        </Text>
                        <Text fontSize="$sm" color="$blue100" textAlign="center">
                            Preencha os dados abaixo para realizar sua doação
                        </Text>
                    </VStack>
                </Box>

                {/* Informações da Ação */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$3">
                        <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                            📦 Ação: {acao.titulo}
                        </Text>
                        
                        <HStack gap="$3" alignItems="flex-start">
                            <Text fontSize="$lg">📍</Text>
                            <VStack flex={1}>
                                <Text fontSize="$sm" color="$textDark600">
                                    {acao.endereco}
                                </Text>
                                <Text fontSize="$sm" color="$textDark500">
                                    Entregar para: {acao.responsavel}
                                </Text>
                                <Text fontSize="$sm" color="$textDark500">
                                    Tel: {acao.telefone}
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>

                {/* Seção 1: Dados Pessoais */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$xl" fontWeight="$bold" color="$textDark900">
                            👤 Seus Dados
                        </Text>

                        <VStack gap="$3">
                            <VStack gap="$1">
                                <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                    Nome Completo *
                                </Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    placeholder="Seu nome completo"
                                    value={formData.nome}
                                    onChangeText={(value) => handleInputChange("nome", value)}
                                />
                            </VStack>

                            <HStack gap="$3">
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        Telefone *
                                    </Text>
                                    <Input
                                        variant="outline"
                                        size="md"
                                        placeholder="(11) 99999-9999"
                                        value={formData.telefone}
                                        onChangeText={(value) => handleInputChange("telefone", value)}
                                        keyboardType="phone-pad"
                                    />
                                </VStack>

                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        E-mail
                                    </Text>
                                    <Input
                                        variant="outline"
                                        size="md"
                                        placeholder="seu@email.com"
                                        value={formData.email}
                                        onChangeText={(value) => handleInputChange("email", value)}
                                        keyboardType="email-address"
                                    />
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Seção 2: Detalhes da Doação */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$xl" fontWeight="$bold" color="$textDark900">
                            🎁 Itens para Doação
                        </Text>

                        <VStack gap="$3">
                            <VStack gap="$1">
                                <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                    Tipo de Doação *
                                </Text>
                                <CustomSelect
                                    value={formData.tipoDoacao}
                                    options={tiposDoacao}
                                    onSelect={(value) => handleSelect("tipoDoacao", value, setShowTipoDoacao)}
                                    placeholder="Selecione o tipo de doação"
                                    show={showTipoDoacao}
                                    setShow={setShowTipoDoacao}
                                />
                            </VStack>

                            <VStack gap="$1">
                                <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                    Itens que está doando *
                                </Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    placeholder="Ex: 2 cestas básicas, 5kg de arroz, 3 pacotes de feijão..."
                                    value={formData.itensDoados}
                                    onChangeText={(value) => handleInputChange("itensDoados", value)}
                                />
                            </VStack>

                            <HStack gap="$3">
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        Quantidade *
                                    </Text>
                                    <Input
                                        variant="outline"
                                        size="md"
                                        placeholder="Ex: 2 unidades, 5kg"
                                        value={formData.quantidade}
                                        onChangeText={(value) => handleInputChange("quantidade", value)}
                                    />
                                </VStack>

                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        Condição dos itens
                                    </Text>
                                    <CustomSelect
                                        value={formData.condicaoItens}
                                        options={condicoesItens}
                                        onSelect={(value) => handleSelect("condicaoItens", value, setShowCondicao)}
                                        placeholder="Condição dos itens"
                                        show={showCondicao}
                                        setShow={setShowCondicao}
                                    />
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                {/* Seção 3: Agendamento */}
                <Box
                    bg="$white"
                    borderRadius="$2xl"
                    p="$5"
                    shadow="md"
                >
                    <VStack gap="$4">
                        <Text fontSize="$xl" fontWeight="$bold" color="$textDark900">
                            📅 Agendamento da Entrega
                        </Text>

                        <VStack gap="$3">
                            <HStack gap="$3">
                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        Data de Entrega *
                                    </Text>
                                    <Input
                                        variant="outline"
                                        size="md"
                                        placeholder="DD/MM/AAAA"
                                        value={formData.dataEntrega}
                                        onChangeText={(value) => handleInputChange("dataEntrega", value)}
                                    />
                                </VStack>

                                <VStack flex={1} gap="$1">
                                    <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                        Horário *
                                    </Text>
                                    <CustomSelect
                                        value={formData.horarioEntrega}
                                        options={horariosDisponiveis}
                                        onSelect={(value) => handleSelect("horarioEntrega", value, setShowHorario)}
                                        placeholder="Selecione o horário"
                                        show={showHorario}
                                        setShow={setShowHorario}
                                    />
                                </VStack>
                            </HStack>

                            <VStack gap="$1">
                                <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                                    Local de Entrega
                                </Text>
                                <Input
                                    variant="outline"
                                    size="md"
                                    placeholder="Onde devemos buscar a doação?"
                                    value={formData.localEntrega}
                                    onChangeText={(value) => handleInputChange("localEntrega", value)}
                                />
                            </VStack>
                        </VStack>
                    </VStack>
                </Box>

                

                {/* Botão de Enviar */}
                <Pressable
                    onPress={handleSubmit}
                    opacity={isFormValid() ? 1 : 0.5}
                    disabled={!isFormValid()}
                >
                    {({ pressed }) => (
                        <Box
                            bg={isFormValid() ? "$primary500" : "$trueGray400"}
                            borderRadius="$xl"
                            py="$4"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="row"
                            gap="$3"
                            style={{
                                transform: [{ scale: pressed && isFormValid() ? 0.95 : 1 }]
                            }}
                            transition="all 0.2s"
                            shadow="lg"
                        >
                            <Text fontSize="$lg">✅</Text>
                            <Text 
                                fontSize="$lg" 
                                fontWeight="$bold" 
                                color="$white"
                            >
                                Confirmar Doação
                            </Text>
                        </Box>
                    )}
                </Pressable>

                <Text fontSize="$xs" color="$textDark500" textAlign="center" px="$4">
                    * Campos obrigatórios. Após o envio, entraremos em contato para confirmar os detalhes.
                </Text>
            </VStack>
        </ScrollView>
    );
};