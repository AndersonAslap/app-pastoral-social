import { Heading, HStack, Text, VStack, Pressable } from "@gluestack-ui/themed";
import { BarcodeIcon, TrashIcon } from "lucide-react-native";
import { config } from "../../../../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";
import { Product } from "../listagem";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  const { id, nome, quantidadeEstoque } = item;

  return (
    <Pressable
      bg="$backgroundLight100"
      p="$4"
      borderRadius="$2xl"
      mb="$3"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.05}
      shadowRadius={3}
      android_ripple={{ color: "#E0E0E0" }}
    >
      <HStack alignItems="center" space="lg">
        <BarcodeIcon size={24} color={config.tokens.colors.gray300} />

        <VStack flex={1}>
          <Heading fontSize="$md" color="$blue700" fontWeight="$bold">
            {nome}
          </Heading>
          <Text fontSize="$sm" color="$gray500" mt="$1">
            Quantidade em estoque: {quantidadeEstoque}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}
