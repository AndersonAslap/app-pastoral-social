import { VStack, Text, Image, Button } from "@gluestack-ui/themed";
import { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  imageSource?: any;
  buttonLabel?: string;
  onPressButton?: () => void;
  children?: ReactNode;
};

export function EmptyState({
  title = "Nada por aqui ainda",
  description = "Nenhum item encontrado. Tente adicionar um novo registro.",
  imageSource,
  buttonLabel,
  onPressButton,
  children,
}: EmptyStateProps) {
  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      px="$5"
      py="$10"
      space="md"
    >
      {imageSource && (
        <Image
          source={imageSource}
          alt="Empty state"
          width={150}
          height={150}
          resizeMode="contain"
        />
      )}

      <Text fontSize="$lg" fontWeight="$bold" color="$textDark900" textAlign="center">
        {title}
      </Text>

      <Text fontSize="$sm" color="$textDark500" textAlign="center" mt="$1">
        {description}
      </Text>

      {buttonLabel && onPressButton && (
        <Button mt="$5" onPress={onPressButton}>
          <Text color="$white">{buttonLabel}</Text>
        </Button>
      )}

      {/* Permite conteúdo customizado */}
      {children}
    </VStack>
  );
}
