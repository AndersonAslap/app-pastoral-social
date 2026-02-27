import React from 'react';
import { Text, VStack, Box } from "@gluestack-ui/themed";
import { PasswordInput } from './passwordInput';
import { PerfilFormProps } from '../types';

export const SecuritySection: React.FC<PerfilFormProps> = ({
  form,
  showPassword,
  showConfirmPassword,
  onFormChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility
}) => {
  return (
    <VStack gap="$4">
      <Text size="lg" fontWeight="$bold" color="$textDark800">
        Segurança
      </Text>
      
      <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl">
        <VStack gap="$4">
          <PasswordInput
            label="Nova Senha"
            value={form.novaSenha}
            onChangeText={(text: string) => onFormChange("novaSenha", text)}
            showPassword={showPassword}
            onToggleVisibility={onTogglePasswordVisibility}
            placeholder="Digite sua nova senha"
            helperText="Mínimo de 8 caracteres"
          />

          <PasswordInput
            label="Confirmar Nova Senha"
            value={form.confirmarSenha}
            onChangeText={(text: string) => onFormChange("confirmarSenha", text)}
            showPassword={showConfirmPassword}
            onToggleVisibility={onToggleConfirmPasswordVisibility}
            placeholder="Confirme sua nova senha"
          />
        </VStack>
      </Box>
    </VStack>
  );
};