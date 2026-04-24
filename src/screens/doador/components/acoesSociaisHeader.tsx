import React from 'react';
import { Text, VStack, Box, HStack, Button } from "@gluestack-ui/themed";
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const AcoesSociaisHeader: React.FC = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Box bg="$white" px="$6" pt="$12" pb="$4">
      <VStack gap="$2">
        <HStack 
          alignItems="center" 
          justifyContent="space-between" 
          width="100%"
      >
          {/* Botão Voltar */}
          <Button
              variant="link"
              onPress={handleGoBack}
              p="$2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
              <ChevronLeft size={24} color="#1e3a8a" />
          </Button>

          {/* Título Centralizado */}
          <Text fontSize="$3xl" fontWeight="$bold" color="$textDark900">
            Ações Sociais
          </Text>

          {/* Espaço vazio para balancear o layout */}
          <Button 
              variant="link"
              p="$2"
              opacity={0}
              disabled
          >
              <ChevronLeft size={24} color="transparent" />
          </Button>
      </HStack>
        <Text fontSize="$md" color="$textDark600">
          Doe cestas básicas e jantas para quem mais precisa
        </Text>
      </VStack>
    </Box>
  );
};