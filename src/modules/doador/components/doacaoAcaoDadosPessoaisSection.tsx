import React from 'react';
import { Text, VStack, HStack } from "@gluestack-ui/themed";
import { DoacaoFormData } from '../types';
import { Input } from '@shared/components';

interface DoacaoAcaoDadosPessoaisSectionProps {
  formData: DoacaoFormData;
  onInputChange: (field: keyof DoacaoFormData, value: string) => void;
}

export const DoacaoAcaoDadosPessoaisSection: React.FC<DoacaoAcaoDadosPessoaisSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <VStack gap="$3">
      <VStack gap="$1">
        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
          Nome Completo *
        </Text>
        <Input
          //variant="outline"
          size="md"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChangeText={(value) => onInputChange("nome", value)}
        />
      </VStack>

      <HStack gap="$3">
        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            Telefone *
          </Text>
          <Input
            //variant="outline"
            size="md"
            placeholder="(11) 99999-9999"
            value={formData.telefone}
            onChangeText={(value) => onInputChange("telefone", value)}
            keyboardType="phone-pad"
          />
        </VStack>

        <VStack flex={1} gap="$1">
          <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
            E-mail
          </Text>
          <Input
            //variant="outline"
            size="md"
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(value) => onInputChange("email", value)}
            keyboardType="email-address"
          />
        </VStack>
      </HStack>
    </VStack>
  );
};