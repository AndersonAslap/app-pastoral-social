import React from 'react';
import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";
import { User, Mail } from "lucide-react-native";
import { Input } from "@shared/components";
import { PerfilFormProps } from '../types';

interface PersonalInfoSectionProps extends Pick<PerfilFormProps, 'form' | 'onFormChange'> {
  nickName: string;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form,
  onFormChange,
  nickName
}) => {
  return (
    <VStack gap="$4">
      <Text size="lg" fontWeight="$bold" color="$textDark800">
        Informações Pessoais
      </Text>
      
      <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl">
        <VStack gap="$4">
          {/* Campo Nome */}
          <VStack gap="$2">
            <HStack space="sm" alignItems="center">
              <User size={16} color="#3b82f6" />
              <Text size="sm" fontWeight="$medium" color="$textDark700">
                Nome Completo
              </Text>
            </HStack>
            <Input
              placeholder="Digite seu nome completo"
              value={form.nome}
              onChangeText={(text: string) => onFormChange("nome", text)}
              size="md"
            />
          </VStack>

          {/* Campo Nickname */}
          <VStack gap="$2">
            <HStack space="sm" alignItems="center">
              <Mail size={16} color="#3b82f6" />
              <Text size="sm" fontWeight="$medium" color="$textDark700">
                Nome de Usuário
              </Text>
            </HStack>
            <Text 
              size="sm" 
              fontWeight="$medium" 
              color="$textDark600" 
              mb="$2"
              px="$6"
              py="$3"
              bg="$backgroundLight100"
              borderRadius="$md"
            >
              {nickName}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};