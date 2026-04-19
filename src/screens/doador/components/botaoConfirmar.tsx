import React from 'react';
import { Text, Box, Pressable } from "@gluestack-ui/themed";
import { Loading } from '@components/loading';

interface BotaoConfirmarProps {
  onPress: () => void;
  submitting: boolean;
}

export const BotaoConfirmar: React.FC<BotaoConfirmarProps> = ({
  onPress,
  submitting
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={submitting} 
    >
      {({ pressed }) => (
        <Box
          bg="$primary500"
          borderRadius="$xl"
          py={submitting ? "$2" : "$4"}
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap="$3"
          style={{
            transform: [{ scale: pressed && true ? 0.95 : 1 }]
          }}
        >
          {
            submitting 
            ? <Loading />
            : (
              <Text 
                fontSize="$lg" 
                fontWeight="$bold" 
                color="$white"
              >
                Confirmar Doação
              </Text>
            )
          }  
        </Box>
      )}
    </Pressable>
  );
};