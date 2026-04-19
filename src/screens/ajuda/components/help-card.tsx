import { Box } from "@gluestack-ui/themed";
import { HStack, Text, VStack, Icon, Pressable } from "@gluestack-ui/themed";
import { ChevronRight, HelpingHandIcon } from "lucide-react-native";

type Help = {
    id: number;
    familyName: string;
    helpName: string;
    status: string;
}

type Props = {
  item: Help;
  onPress?: () => void;
};

export default function HelpCard({ item, onPress }: Props) {
    const { familyName, helpName, status } = item;

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
            <Icon as={HelpingHandIcon} size="lg" color="$pink500" />

            <VStack flex={1} gap="$2">
            <VStack>
                <Text fontSize="$sm" color="$coolGray600" numberOfLines={1}>
                    <Text fontFamily="$heading">Família:</Text> {familyName}
                </Text>
                <Text fontSize="$sm" color="$coolGray600" >
                    <Text fontFamily="$heading">Ajuda:</Text> {helpName}
                </Text>
            </VStack>
            <HStack alignItems="center" space="xs" mt="$1">
                <Box
                    w="$2"
                    h="$2"
                    borderRadius="$full"
                    bg={
                    status === "pendente"
                        ? "$amber500"
                        : status === "em andamento"
                        ? "$blue500"
                        : status === "concluído"
                        ? "$green500"
                        : "$coolGray400"
                    }
                />
                <Text fontSize="$sm" color="$coolGray600">
                    {status}
                </Text>
                </HStack>
            </VStack>

            <Icon as={ChevronRight} size="sm" color="$coolGray400" />
        </HStack>
        </Pressable>
    );
}
