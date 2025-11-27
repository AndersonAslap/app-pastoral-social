import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { Lock } from "lucide-react-native";

export const SecurityTip: React.FC = () => {
  return (
    <Box 
      bg="$blue50" 
      p="$4" 
      borderRadius="$xl" 
      borderLeftWidth={4}
      borderLeftColor="$blue500"
    >
      <HStack space="sm" alignItems="flex-start">
        <Box 
          w="$5" 
          h="$5" 
          borderRadius="$full" 
          bg="$blue500" 
          alignItems="center" 
          justifyContent="center"
          mt="$0.5"
        >
          <Lock size={12} color="white" />
        </Box>
        <VStack flex={1}>
          <Text size="sm" fontWeight="$medium" color="$blue800">
            Dica de Segurança
          </Text>
          <Text size="xs" color="$blue700">
            Deixe os campos de senha em branco se não deseja alterar sua senha atual.
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};