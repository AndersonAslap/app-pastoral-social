import React from 'react';
import { Text, VStack, HStack } from "@gluestack-ui/themed";
import { DoacaoFormData } from '@tipagens/doador';
import { DateInput, Input } from '@components/index';

interface AgendamentoEntregaProps {
  formData: DoacaoFormData;
  onInputChange: (field: keyof DoacaoFormData, value: string) => void;
  fieldState: any;
}

export const AgendamentoEntrega: React.FC<AgendamentoEntregaProps> = ({
  formData,
  fieldState,
  onInputChange,
}) => {
  return (
    <VStack gap="$3">
      <HStack gap="$3">
        <VStack flex={1} gap="$1">

          <DateInput
              value={formData.dataEntrega}
              onChange={(value: any) => onInputChange("dataEntrega", value)}
              placeholder="Selecione uma data"
              error={fieldState.dataEntrega.error}
              errorMessage={fieldState.dataEntrega.message}
          />
        </VStack>
      </HStack>
    </VStack>
  );
};