import { VStack, Text, Button } from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";

type EmptyStateLottieProps = {
  title?: string;
  description?: string;
  animationSource: any; // pode ser require(...) ou um JSON remoto
  buttonLabel?: string;
  onPressButton?: () => void;
};

export function EmptyStateLottie({
  title = "Nada encontrado",
  description = "Parece que não há registros disponíveis ainda.",
  animationSource,
  buttonLabel,
  onPressButton,
}: EmptyStateLottieProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      px="$6"
      py="$10"
      space="md"
    >
      <LottieView
        ref={animationRef}
        source={animationSource}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />

      <Text
        fontSize="$lg"
        fontWeight="$bold"
        color="$textDark900"
        textAlign="center"
        mt="$4"
      >
        {title}
      </Text>

      <Text
        fontSize="$sm"
        color="$textDark500"
        textAlign="center"
        mt="$1"
        px="$4"
      >
        {description}
      </Text>

      {buttonLabel && onPressButton && (
        <Button mt="$5" onPress={onPressButton}>
          <Text color="$white">{buttonLabel}</Text>
        </Button>
      )}
    </VStack>
  );
}
