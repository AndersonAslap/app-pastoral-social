import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { TrendingUp } from "lucide-react-native";
import { HelpStats } from "@tipagens/ajuda";
import { TouchableOpacity } from "react-native";

interface AjudaStatsProps {
  stats: HelpStats;
  activeFilter: 'AGUARDANDO_APROVACAO' | 'APROVADA' | 'ENTREGUE';
  onFilterPress: (filter: 'AGUARDANDO_APROVACAO' | 'APROVADA' | 'ENTREGUE') => void;
}

export const AjudaStats = ({ stats, activeFilter, onFilterPress}: AjudaStatsProps) => (
  <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4">
    <HStack justifyContent="space-between" alignItems="center" mb="$3">
      <VStack>
        <Text size="lg" fontWeight="$bold" color="$textDark800">
          Visão Geral
        </Text>
        <Text size="sm" color="$textDark500">
          Total de ajudas: <Text size="sm" fontFamily="$heading">{stats.total}</Text>
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

    <HStack space="sm" alignItems="center" justifyContent="space-between">
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => onFilterPress('AGUARDANDO_APROVACAO')}
        activeOpacity={0.7}
        disabled={activeFilter === 'AGUARDANDO_APROVACAO'}
      >
        <Box 
          alignItems="center" 
          bg="$blue50" 
          p="$3" 
          borderRadius="$lg"
          borderWidth={activeFilter === 'AGUARDANDO_APROVACAO' ? 2 : 0}
          borderColor="$primary600"
        >
          <Text size="sm" color="$textDark600">Novas</Text>
          <Text size="xl" fontWeight="$bold" color="$primary600">{stats.new}</Text>
          <Text size="xs" color="$textDark500">solicitações</Text>
        </Box>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => onFilterPress('APROVADA')}
        activeOpacity={0.7}
        disabled={activeFilter === 'APROVADA'}
      >
        <Box 
          alignItems="center" 
          bg="$orange50" 
          p="$3" 
          borderRadius="$lg"
          borderWidth={activeFilter === 'APROVADA' ? 2 : 0}
          borderColor="$orange600"
        >
          <Text size="sm" color="$textDark600">Aprovadas</Text>
          <Text size="xl" fontWeight="$bold" color="$orange600">{stats.pending}</Text>
          <Text size="xs" color="$textDark500">aguardando</Text>
        </Box>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => onFilterPress('ENTREGUE')}
        activeOpacity={0.7}
        disabled={activeFilter === 'ENTREGUE'}
      >
        <Box 
          alignItems="center" 
          bg="$green50" 
          p="$3" 
          borderRadius="$lg"
          borderWidth={activeFilter === 'ENTREGUE' ? 2 : 0}
          borderColor="$green600"
        >
          <Text size="sm" color="$textDark600">Entregues</Text>
          <Text size="xl" fontWeight="$bold" color="$green600">{stats.completed}</Text>
          <Text size="xs" color="$textDark500">finalizadas</Text>
        </Box>
      </TouchableOpacity>
    </HStack>
  </Box>
);