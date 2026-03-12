import { Text, VStack } from "@gluestack-ui/themed";
import { CustomSelect } from "@shared/components";

export function FamiliaInfoSection({ 
    familiasOptions, 
    familiaId, 
    onFamiliaChange,
    fieldState
}: any) {
    return (
        <VStack space="md" gap="$4">
            <Text
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$textDark900"
                mb="$1"
            >
                Informações da Família
            </Text>
            
            <CustomSelect
                placeholder="Selecione a família"
                options={familiasOptions}
                selectedValue={familiaId}
                onValueChange={onFamiliaChange}
                error={fieldState.idFamilia.error}
                errorMessage={fieldState.idFamilia.message}
            />
        </VStack>
    );
}