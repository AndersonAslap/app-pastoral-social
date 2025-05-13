import { Heading, HStack, Text, VStack, Pressable } from "@gluestack-ui/themed";
import { BarcodeIcon, TrashIcon } from "lucide-react-native";
import { config } from "../../../../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";

type Product = {
  id: number;
  productName: string;
  localization: string;
  dueDate: Date;
};

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  const { id, productName, localization, dueDate } = item;

  const handleRemoveProduct = () => {
    console.log(`Removendo produto: ${id}`);
  };

  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  let statusColor = "$green600";
  if (daysDiff <= 0) {
    statusColor = "$red600"; // vencido
  } else if (daysDiff <= 30) {
    statusColor = "$yellow600"; // perto da validade
  }

  const formatToBR = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatToBR(new Date(dueDate));

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
            {productName}
          </Heading>
          <Text fontSize="$sm" color="$coolGray600" mt="$1" numberOfLines={1}>
            {localization}
          </Text>
          <HStack alignItems="center" space="xs" mt="$1">
            <Text fontSize="$sm">
            Validade: 
          </Text>
            <Box
                w="$2"
                h="$2"
                borderRadius="$full"
                bg={statusColor}
            />
                <Text fontSize="$sm"  color={statusColor}>
            {formattedDate}
          </Text>
            </HStack>
          
        </VStack>

        <TrashIcon
          size={24}
          color={config.tokens.colors.red500}
          onPress={handleRemoveProduct}
        />
      </HStack>
    </Pressable>
  );
}
