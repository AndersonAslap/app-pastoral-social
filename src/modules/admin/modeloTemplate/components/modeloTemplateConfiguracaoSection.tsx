import { VStack, Box, Text } from "@gluestack-ui/themed";
import { CustomSwitch } from "@shared/components";
import { TemplateForm } from "../types";

interface ModeloTemplateConfiguracaoSectionProps {
  form: TemplateForm;
  onChange: (field: keyof TemplateForm, value: any) => void;
}

export const ModeloTemplateConfiguracaoSection = ({ form, onChange }: ModeloTemplateConfiguracaoSectionProps) => (
  <VStack gap="$4">
    <Text size="xl" fontWeight="$bold" color="$textDark800">
      Configuração
    </Text>
    
    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl">
      <CustomSwitch
        label="Gerar as cestas automaticamente?"
        isChecked={form.gerarCestas}
        onChange={value => onChange("gerarCestas", value)}
      />
    </Box>
  </VStack>
);