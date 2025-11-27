import { VStack, Box, HStack, Text, Button, Icon, ButtonSpinner } from "@gluestack-ui/themed";
import { ButtonCancel } from "@shared/components";
import { CalculatorIcon } from "lucide-react-native";
import { TemplateForm } from "../types";

interface ModeloTemplateStatusEAcoesSectionProps {
  form: TemplateForm;
  formSubmitting: boolean;
  calculatingGenerations: boolean;
  qtdGeracaoPossivelShow: boolean;
  onCalculateGenerations: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ModeloTemplateStatusEAcoesSection = ({
  form,
  formSubmitting,
  calculatingGenerations,
  qtdGeracaoPossivelShow,
  onCalculateGenerations,
  onSubmit,
  onCancel
}: ModeloTemplateStatusEAcoesSectionProps) => (
  <VStack gap="$4">
    {/* Status das Gerações */}
    {qtdGeracaoPossivelShow && form.qtdGeracaoPossivel >= 0 && (
      <Box 
        bg={form.qtdGeracaoPossivel === 0 ? "$red100" : "$green100"} 
        p="$4" 
        borderRadius="$2xl" 
        borderLeftWidth="$4"
        borderLeftColor={form.qtdGeracaoPossivel === 0 ? "$red600" : "$green600"}
      >
        <HStack alignItems="center" space="sm">
          <Icon as={CalculatorIcon} color={form.qtdGeracaoPossivel === 0 ? "$red600" : "$green600"} size="md" />
          <Text color={form.qtdGeracaoPossivel === 0 ? "$red800" : "$green800"} fontWeight="$medium">
            É possível gerar {form.qtdGeracaoPossivel} cestas com os produtos atuais
          </Text>
        </HStack>
      </Box>
    )}

    {/* Botão Verificar Gerações */}
    <Button
      onPress={onCalculateGenerations}
      bg="$yellow500"
      borderRadius="$lg"
      size="lg"
      disabled={calculatingGenerations}
    > 
      {calculatingGenerations ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text color="white" fontWeight="$bold" size="sm">
          Verificar Quantidade de Gerações Possíveis
        </Text>
      )}    
    </Button>

    {/* Botões de Ação */}
    <HStack space="md" mt="$4">
      <ButtonCancel flex={1} title="Cancelar" h="$12" onPress={onCancel} />
      <Button
        flex={1}
        h="$12"
        onPress={onSubmit}
        /*isLoading={formSubmitting}*/
        bg="$green600"
      >
        <Text color="$white" fontWeight="$bold">Salvar</Text>
      </Button>
    </HStack>
  </VStack>
);