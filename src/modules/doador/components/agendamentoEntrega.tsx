import React from 'react';
import { Text, VStack, HStack } from "@gluestack-ui/themed";
import { DoacaoFormData } from '../types';
import { CustomSelect, Input } from '@shared/components';

interface AgendamentoEntregaProps {
  formData: DoacaoFormData;
  horariosDisponiveis: string[];
  showHorario: boolean;
  onInputChange: (field: keyof DoacaoFormData, value: string) => void;
  onSelect: (field: keyof DoacaoFormData, value: string, setShow: (show: boolean) => void) => void;
  setShowHorario: (show: boolean) => void;
}

export const AgendamentoEntrega: React.FC<AgendamentoEntregaProps> = ({
  formData,
  horariosDisponiveis,
  showHorario,
  onInputChange,
  onSelect,
  setShowHorario
}) => {
  return (
    <VStack gap="$3">
      <HStack gap="$3">
        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            Data de Entrega *
          </Text>
          <Input
            //variant="outline"
            size="md"
            placeholder="DD/MM/AAAA"
            value={formData.dataEntrega}
            onChangeText={(value) => onInputChange("dataEntrega", value)}
          />
        </VStack>

        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            Horário *
          </Text>
          <CustomSelect
            value={formData.horarioEntrega}
            options={horariosDisponiveis}
            onSelect={(value) => onSelect("horarioEntrega", value, setShowHorario)}
            placeholder="Selecione o horário"
            show={showHorario}
            setShow={setShowHorario}
          />
        </VStack>
      </HStack>

      <VStack gap="$1">
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Local de Entrega
        </Text>
        <Input
          //variant="outline"
          size="md"
          placeholder="Onde devemos buscar a doação?"
          value={formData.localEntrega}
          onChangeText={(value) => onInputChange("localEntrega", value)}
        />
      </VStack>
    </VStack>
  );
};