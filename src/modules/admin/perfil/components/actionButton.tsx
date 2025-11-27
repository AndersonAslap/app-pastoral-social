import React from 'react';
import { HStack, Button, Text } from "@gluestack-ui/themed";
import { ButtonCancel } from "@shared/components";

interface ActionButtonsProps {
  formSubmitting: boolean;
  onSubmit: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  formSubmitting,
  onSubmit
}) => {
  return (
    <HStack space="md" mt="$4">
      <ButtonCancel flex={1} title="Cancelar" />
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
    </HStack>
  );
};