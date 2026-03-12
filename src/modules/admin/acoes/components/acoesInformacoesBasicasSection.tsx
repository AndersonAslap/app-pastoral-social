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
    onTipoAcaoChange,
    fieldState
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
                error={fieldState.titulo.error}
                helperText={fieldState.titulo.message}
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
                    error={fieldState.dataEvento.error}
                    errorMessage={fieldState.dataEvento.message}
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
                    error={fieldState.tipoAcao.error}
                    errorMessage={fieldState.tipoAcao.message}
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