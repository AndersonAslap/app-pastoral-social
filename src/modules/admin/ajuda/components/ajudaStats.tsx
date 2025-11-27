import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { TrendingUp } from "lucide-react-native";
import { HelpStats } from "../types";

interface AjudaStatsProps {
  stats: HelpStats;
}

export const AjudaStats = ({ stats }: AjudaStatsProps) => (
  <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4">
    <HStack justifyContent="space-between" alignItems="center" mb="$3">
      <VStack>
        <Text size="lg" fontWeight="$bold" color="$textDark800">
          Visão Geral
        </Text>
        <Text size="sm" color="$textDark500">
          Status das ajudas
        </Text>
      </VStack>
      <Box 
        w="$10" 
        h="$10" 
        borderRadius="$lg" 
        bg="$primary100" 
        alignItems="center" 
        justifyContent="center"
      >
        <TrendingUp size={18} color="#3b82f6" />
      </Box>
    </HStack>

    <HStack space="sm">
      <VStack flex={1} alignItems="center" bg="$blue50" p="$3" borderRadius="$lg">
        <Text size="sm" color="$textDark600">Total</Text>
        <Text size="xl" fontWeight="$bold" color="$primary600">{stats.total}</Text>
        <Text size="xs" color="$textDark500">solicitações</Text>
      </VStack>
      
      <VStack flex={1} alignItems="center" bg="$orange50" p="$3" borderRadius="$lg">
        <Text size="sm" color="$textDark600">Pendentes</Text>
        <Text size="xl" fontWeight="$bold" color="$orange600">{stats.pending}</Text>
        <Text size="xs" color="$textDark500">aguardando</Text>
      </VStack>
      
      <VStack flex={1} alignItems="center" bg="$green50" p="$3" borderRadius="$lg">
        <Text size="sm" color="$textDark600">Concluídas</Text>
        <Text size="xl" fontWeight="$bold" color="$green600">{stats.completed}</Text>
        <Text size="xs" color="$textDark500">finalizadas</Text>
      </VStack>
    </HStack>
  </Box>
);