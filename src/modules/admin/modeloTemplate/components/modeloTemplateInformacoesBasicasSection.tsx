import { VStack, Box, Text } from "@gluestack-ui/themed";
import { Input, CustomSelect } from "@shared/components";
import { TemplateForm } from "../types";
import { templateTypesOptions } from "@utils/constantes";

interface ModeloTemplateInformacoesBasicasSectionProps {
  form: TemplateForm;
  onChange: (field: keyof TemplateForm, value: any) => void;
}

export const ModeloTemplateInformacoesBasicasSection = ({ form, onChange }: ModeloTemplateInformacoesBasicasSectionProps) => (
  <VStack gap="$4">
    <Text size="xl" fontWeight="$bold" color="$textDark800">
      Informações Básicas
    </Text>
    
    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" gap="$4">
      <Input
        placeholder="Nome do template"
        value={form.templateDesc}
        onChangeText={text => onChange("templateDesc", text)}          
      />

      <CustomSelect
        options={templateTypesOptions}
        placeholder="Selecione o tipo de template"
        size="md"
        variant="underlined"
        selectedValue={form.templateType}
        onValueChange={value => onChange("templateType", value)}
      />        
    </Box>
  </VStack>
);