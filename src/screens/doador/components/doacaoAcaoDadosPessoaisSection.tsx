import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { DoacaoFormData } from '@tipagens/doador';
import { Input } from '@components/index';

interface DoacaoAcaoDadosPessoaisSectionProps {
  formData: DoacaoFormData;
  fieldState: any;
  onInputChange: (field: string, value: string) => void;
}

export const DoacaoAcaoDadosPessoaisSection: React.FC<DoacaoAcaoDadosPessoaisSectionProps> = ({
  formData,
  fieldState,
  onInputChange
}) => {
  return (
    <VStack gap="$4">
      <Box>
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Nome Completo *
        </Text>
        <Input
          size="md"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChangeText={(value) => onInputChange("nome", value)}
          error={fieldState.nome.error}
          helperText={fieldState.nome.message}
        />
      </Box>

      <Box>
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Telefone WhatsApp *
        </Text>

        <Input
          size="md"
          placeholder="(11) 99999-9999"
          value={formData.telefone}
          onChangeText={(value) => onInputChange("telefone", value)}
          keyboardType="phone-pad"
          error={fieldState.telefone.error}
          helperText={fieldState.telefone.message}
        />
      </Box>
    </VStack>
  );
};