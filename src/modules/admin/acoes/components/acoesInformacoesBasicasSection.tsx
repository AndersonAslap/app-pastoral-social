import { Text, View, VStack } from "@gluestack-ui/themed";
import { CustomSelect, DateInput, Input, TextArea } from "@shared/components";

export  function AcoesInformacoesBasicasSection({ 
    titulo, 
    descricao, 
    data,
    qtdAcaoSocial,
    tipoAcao,
    onTituloChange, 
    onDescricaoChange,
    onDataChange,
    onQtdAcaoSocialChange,
    onTipoAcaoChange
}: any) {
    return (
        <VStack space="md" mb="$6" gap="$2">
            <Text
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$textDark900"
                mb="$2"
            >
                Informações Básicas
            </Text>
            
            <Input
                placeholder="Título"
                value={titulo}
                onChangeText={onTituloChange}
            />

            <TextArea
                placeholder="Descreva os detalhes da ação social..."
                value={descricao}
                onChangeText={onDescricaoChange}
                numberOfLines={4}
            />
                
            <View mt="$2">
                <DateInput
                    label="Data do Evento"
                    value={data}
                    onChange={onDataChange}
                    placeholder="Selecione uma data"
                />
            </View>

            <View mb="$4">
                <CustomSelect
                    placeholder="Selecione o tipo da ação social"
                    options={[ 
                        { label: "Janta", value: "JANTA" },
                        { label: "Cesta Básica", value: "CESTA_BASICA" },
                        { label: "Doação de Roupas", value: "DOACAO_ROUPA" }
                    ]}
                    selectedValue={tipoAcao}
                    onValueChange={onTipoAcaoChange}
                />
            </View>

        
            <Input
                placeholder="Meta de pessoas a serem atendidas"
                value={qtdAcaoSocial}
                onChangeText={onQtdAcaoSocialChange}
            />
        </VStack>
    );
}