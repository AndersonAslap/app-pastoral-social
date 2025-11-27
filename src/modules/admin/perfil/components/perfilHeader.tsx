import React from 'react';
import { Text, Box } from "@gluestack-ui/themed";
import { UserCircle } from "lucide-react-native";

export const ProfileHeader: React.FC = () => {
  return (
    <Box alignItems="center" mb="$4">
      <Box
        w="$24"
        h="$24"
        borderRadius="$full"
        bg="$primary100"
        alignItems="center"
        justifyContent="center"
        borderWidth={4}
        borderColor="$primary200"
        mb="$4"
      >
        <UserCircle size={48} color="#3b82f6" />
      </Box>
      <Text size="xl" fontWeight="$bold" color="$textDark800">
        Meu Perfil
      </Text>
      <Text size="sm" color="$textDark500" textAlign="center">
        Gerencie suas informações pessoais
      </Text>
    </Box>
  );
};