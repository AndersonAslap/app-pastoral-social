import React from 'react';
import { Text, Box, Pressable } from "@gluestack-ui/themed";
import { Heart } from "lucide-react-native";

interface BotaoDoacaoProps {
  onPress: () => void;
}

export const BotaoDoacao: React.FC<BotaoDoacaoProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} mt="$4">
      {({ pressed }) => (
        <Box
          bg="$primary500"
          borderRadius="$xl"
          py="$4"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap="$3"
          style={{
            transform: [{ scale: pressed ? 0.95 : 1 }]
          }}
          /*transition="all 0.2s"*/
        >
          <Heart size={24} color="#FFFFFF" />
          <Text 
            fontSize="$lg" 
            fontWeight="$bold" 
            color="$white"
          >
            Realizar Doação
          </Text>
        </Box>
      )}
    </Pressable>
  );
};