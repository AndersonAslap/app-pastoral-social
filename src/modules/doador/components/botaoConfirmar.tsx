import React from 'react';
import { Text, Box, Pressable } from "@gluestack-ui/themed";

interface BotaoConfirmarProps {
  onPress: () => void;
  isFormValid: boolean;
}

export const BotaoConfirmar: React.FC<BotaoConfirmarProps> = ({
  onPress,
  isFormValid
}) => {
  return (
    <Pressable
      onPress={onPress}
      opacity={isFormValid ? 1 : 0.5}
      disabled={!isFormValid}
    >
      {({ pressed }) => (
        <Box
          bg={isFormValid ? "$primary500" : "$trueGray400"}
          borderRadius="$xl"
          py="$4"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap="$3"
          style={{
            transform: [{ scale: pressed && isFormValid ? 0.95 : 1 }]
          }}
          /*transition="all 0.2s"*/
        >
          <Text fontSize="$lg">✅</Text>
          <Text 
            fontSize="$lg" 
            fontWeight="$bold" 
            color="$white"
          >
            Confirmar Doação
          </Text>
        </Box>
      )}
    </Pressable>
  );
};