import React from 'react';
import { HStack, Button, Text } from "@gluestack-ui/themed";
import { ButtonCancel } from "@components/index";
import { Can } from '@components/can';

interface ActionButtonsProps {
  formSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  formSubmitting,
  onSubmit,
  onCancel
}) => {
  return (
    <HStack space="md" mt="$4">
      <ButtonCancel flex={1} title="Cancelar" onPress={onCancel}/>
      <Can permission="atualizar_usuario">
        <Button
          flex={1}
          onPress={onSubmit}
          /*isLoading={formSubmitting}*/
          bg="$primary600"
          h="$14"
        >
          <Text color="$white" fontWeight="$semibold">
            {formSubmitting ? "Salvando..." : "Salvar"}
          </Text>
        </Button>
      </Can>
    </HStack>
  );
};