import { ScrollView, HStack, Box, Text } from "@gluestack-ui/themed";
import { AcaoSocialStats } from "../types";

interface AcoesStatsProps {
  stats: AcaoSocialStats;
}

export const AcoesStats = ({ stats }: AcoesStatsProps) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <HStack space="md" pb="$4">
      <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140}>
        <Text fontSize="$2xl" fontWeight="bold" color="$blue600" textAlign="center">
          {stats.total}
        </Text>
        <Text fontSize="$xs" color="$textDark500" textAlign="center">Total</Text>
      </Box>

      <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140}>
        <Text fontSize="$2xl" fontWeight="bold" color="$blue600" textAlign="center">
          {stats.planejadas}
        </Text>
        <Text fontSize="$xs" color="$textDark500" textAlign="center">Planejadas</Text>
      </Box>

      <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140}>
        <Text fontSize="$2xl" fontWeight="bold" color="$orange600" textAlign="center">
          {stats.emAndamento}
        </Text>
        <Text fontSize="$xs" color="$textDark500" textAlign="center">Em Andamento</Text>
      </Box>

      <Box bg="$white" p="$4" borderRadius="$xl" minWidth={140}>
        <Text fontSize="$2xl" fontWeight="bold" color="$green600" textAlign="center">
          {stats.concluidas}
        </Text>
        <Text fontSize="$xs" color="$textDark500" textAlign="center">Concluídas</Text>
      </Box>
    </HStack>
  </ScrollView>
);