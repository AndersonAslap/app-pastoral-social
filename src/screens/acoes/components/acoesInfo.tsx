import { VStack, HStack, Text, Box } from "@gluestack-ui/themed";
import { Calendar } from "lucide-react-native";
import { formatDate } from "@helper/acoes.helper";

interface AcaoInfoProps {
  data: string;
  inicioAcao: string;
  local: string;
}

export const AcoesInfo = ({ data, inicioAcao, local }: AcaoInfoProps) => (
  <VStack mb="$3">
    <HStack alignItems="center" justifyContent="space-between">
      <Box>
        <Text color="$textDark500">Data de início</Text>
        <HStack alignItems="center" space="xs">
          <Calendar size={14} color="#6B7280" />
          <Text fontSize="$sm" color="$textDark900">
            {formatDate(inicioAcao)}
          </Text>
        </HStack>
      </Box>

      <Box>
        <Text color="$textDark500">Data do evento</Text>
        <HStack alignItems="center" space="xs">
          <Calendar size={14} color="#6B7280" />
          <Text fontSize="$sm" color="$textDark900">
            {formatDate(data)}
          </Text>
        </HStack>
      </Box>
    </HStack>
  </VStack>
);