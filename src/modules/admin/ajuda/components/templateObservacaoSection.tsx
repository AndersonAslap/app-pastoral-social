import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { CustomSelect, TextArea } from "@shared/components";

export function TemplateObservacaoSection({ 
    templatesOptions,
    templateId,
    observacao,
    onTemplateChange, 
    onObservacaoChange,
    tipoAjudaOptions,
    tipoAjudaId,
    onTipoAjudaChange
}: any) {

    const tipo_de_ajuda_cesta_basica = "1";

    return (
        <VStack space="md" gap="$4" mb="$6" mt="$2">
            <Text
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$textDark900"
                mb="$1"
            >
                Detalhes da Ajuda
            </Text>

            <CustomSelect
                placeholder="Selecione o tipo de ajuda"
                options={tipoAjudaOptions}
                selectedValue={tipoAjudaId}
                onValueChange={onTipoAjudaChange}
            />
            
            {
                tipoAjudaId === tipo_de_ajuda_cesta_basica && (
                    <CustomSelect
                        placeholder="Selecione um template"
                        options={templatesOptions}
                        selectedValue={templateId}
                        onValueChange={onTemplateChange}
                    />
                )
            }
            
            <TextArea
                placeholder="Descreva detalhes adicionais sobre a ajuda..."
                value={observacao}
                onChangeText={onObservacaoChange}
                numberOfLines={4}
            />
        </VStack>
    );
}