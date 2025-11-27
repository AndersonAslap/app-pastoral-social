import { VStack, Text, Button } from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import { useRef, useEffect } from "react";
import errorAnimation from "@shared/assets/animations/error.json";

type ErrorStateLottieProps = {
  title?: string;
};

export function ErrorStateLottie({
  title,
}: ErrorStateLottieProps) {
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
        source={errorAnimation}
        autoPlay
        loop
        style={{ width: 180, height: 180 }}
      />

      <Text
        fontSize="$lg"
        fontWeight="$bold"
        color="$red500"
        textAlign="center"
        mt="$4"
      >
        {title}
      </Text>
    </VStack>
  );
}
