import { Heading, HStack, Text, VStack, Icon, Pressable } from "@gluestack-ui/themed";
import { UsersRoundIcon, ChevronRight } from "lucide-react-native";

type Props = {
  name: string;
  address: string;
  onPress?: () => void;
};

export default function FamilyCard({ name, address, onPress }: Props) {
  return (
    <Pressable
  onPress={onPress}
  bg="$backgroundLight100"
  p="$4"
  borderRadius="$2xl"
  android_ripple={{ color: "#E0E0E0" }}
  mb="$3"
  style={{
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 4,
  }}
>

      <HStack alignItems="center" space="lg">
        <Icon as={UsersRoundIcon} size="lg" color="$pink500" />

        <VStack flex={1}>
          <Heading fontSize="$md" color="$blue700" fontWeight="bold">
            {name}
          </Heading>
          <Text fontSize="$sm" color="$coolGray600" mt="$1" numberOfLines={2}>
            {address}
          </Text>
        </VStack>

        <Icon as={ChevronRight} size="sm" color="$coolGray400" />
      </HStack>
    </Pressable>
  );
}
