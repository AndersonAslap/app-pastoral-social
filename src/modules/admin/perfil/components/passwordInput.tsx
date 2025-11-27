import React from 'react';
import { Text, VStack, HStack, Box, Button } from "@gluestack-ui/themed";
import { Lock, Eye, EyeOff } from "lucide-react-native";
import { Input } from "@shared/components";

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  onToggleVisibility: () => void;
  placeholder: string;
  helperText?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  showPassword,
  onToggleVisibility,
  placeholder,
  helperText
}) => {
  return (
    <VStack gap="$2">
      <HStack space="sm" alignItems="center">
        <Lock size={16} color="#3b82f6" />
        <Text size="sm" fontWeight="$medium" color="$textDark700">
          {label}
        </Text>
      </HStack>
      <Box position="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          size="md"
          pr="$12"
        />
        <Button
          position="absolute"
          right="$2"
          top="$2"
          variant="link"
          onPress={onToggleVisibility}
        >
          {showPassword ? (
            <EyeOff size={18} color="#64748b" />
          ) : (
            <Eye size={18} color="#64748b" />
          )}
        </Button>
      </Box>
      {helperText && (
        <Text size="xs" color="$textDark500">
          {helperText}
        </Text>
      )}
    </VStack>
  );
};