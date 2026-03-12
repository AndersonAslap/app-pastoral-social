import { VStack, Box, Text } from "@gluestack-ui/themed";
import { Input, CustomSelect } from "@shared/components";
import { TemplateForm } from "../types";
import { templateTypesOptions } from "@utils/constantes";

interface ModeloTemplateInformacoesBasicasSectionProps {
  form: TemplateForm;
  fieldState: any;
  onChange: (field: keyof TemplateForm, value: any) => void;
}

export const ModeloTemplateInformacoesBasicasSection = ({ form, fieldState, onChange }: ModeloTemplateInformacoesBasicasSectionProps) => (
  <VStack gap="$4">
    <Text size="xl" fontWeight="$bold" color="$textDark800">
      Informações Básicas
    </Text>
    
    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" gap="$4">
      <Input
        placeholder="Nome do template"
        value={form.templateDesc}
        onChangeText={text => onChange("templateDesc", text)}    
        error={fieldState.templateDesc.error}    
        helperText={fieldState.templateDesc.message}
      />

      <CustomSelect
        options={templateTypesOptions}
        placeholder="Selecione o tipo de template"
        size="md"
        variant="underlined"
        selectedValue={form.templateType}
        onValueChange={value => onChange("templateType", value)}
        error={fieldState.templateDesc.error}   
        errorMessage={fieldState.templateDesc.message}
      />        
    </Box>
  </VStack>
);