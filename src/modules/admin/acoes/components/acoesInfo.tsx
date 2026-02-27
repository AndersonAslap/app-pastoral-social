import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { Calendar, MapPin } from "lucide-react-native";
import { formatDate } from "../helper/acoes.helper";

interface AcaoInfoProps {
  data: string;
  local: string;
}

export const AcoesInfo = ({ data, local }: AcaoInfoProps) => (
  <VStack space="sm" mb="$3">
    <HStack alignItems="center" space="sm">
      <Calendar size={14} color="#6B7280" />
      <Text fontSize="$sm" color="$textDark500">
        {formatDate(data)}
      </Text>
    </HStack>
  </VStack>
);