import { HStack, Box, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { AcaoSocialStats } from "@tipagens/acao";

interface AcoesStatsProps {
  stats: AcaoSocialStats;
  statusFilter: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  onStatPress?: (tipo: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA') => void;
}

export const AcoesStats = ({ stats, statusFilter = 'EM_ANDAMENTO', onStatPress }: AcoesStatsProps) => {
  const getButtonStyle = (tipo: 'PLANEJADA' | 'EM_ANDAMENTO' | 'CONCLUIDA') => {
    const isActive = statusFilter === tipo;

    const activeStyles = {
      PLANEJADA: { bg: isActive ? '$blue50' : '$white', borderColor: isActive ? '$blue400' : 'transparent', borderWidth: isActive ? 2 : 0 },
      EM_ANDAMENTO: { bg: isActive ? '$orange50' : '$white', borderColor: isActive ? '$orange400' : 'transparent', borderWidth: isActive ? 2 : 0 },
      CONCLUIDA: { bg: isActive ? '$green50' : '$white', borderColor: isActive ? '$green400' : 'transparent', borderWidth: isActive ? 2 : 0 },
    };

    return activeStyles[tipo];
  };

  return (
    <HStack space="sm" alignItems="center" justifyContent="space-between">
      <TouchableOpacity 
        style={{ flex: 1 }}
        onPress={() => onStatPress?.('PLANEJADA')}
        activeOpacity={0.7}
      >
        <Box 
          bg={getButtonStyle('PLANEJADA').bg}
          p="$3" 
          borderRadius="$lg" 
          alignItems="center"
          borderWidth={getButtonStyle('PLANEJADA').borderWidth}
          borderColor={getButtonStyle('PLANEJADA').borderColor}
        >
          <Text fontSize="$lg" fontWeight="bold" color="$blue600">
            {stats.planejadas}
          </Text>
          <Text fontSize="$2xs" color="$textDark500">Planejadas</Text>
        </Box>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ flex: 1 }}
        onPress={() => onStatPress?.('EM_ANDAMENTO')}
        activeOpacity={0.7}
      >
        <Box 
          bg={getButtonStyle('EM_ANDAMENTO').bg}
          p="$3" 
          borderRadius="$lg" 
          alignItems="center"
          borderWidth={getButtonStyle('EM_ANDAMENTO').borderWidth}
          borderColor={getButtonStyle('EM_ANDAMENTO').borderColor}
        >
          <Text fontSize="$lg" fontWeight="bold" color="$orange600">
            {stats.emAndamento}
          </Text>
          <Text fontSize="$2xs" color="$textDark500">Andamento</Text>
        </Box>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ flex: 1 }}
        onPress={() => onStatPress?.('CONCLUIDA')}
        activeOpacity={0.7}
      >
        <Box 
          bg={getButtonStyle('CONCLUIDA').bg}
          p="$3" 
          borderRadius="$lg" 
          alignItems="center"
          borderWidth={getButtonStyle('CONCLUIDA').borderWidth}
          borderColor={getButtonStyle('CONCLUIDA').borderColor}
        >
          <Text fontSize="$lg" fontWeight="bold" color="$green600">
            {stats.concluidas}
          </Text>
          <Text fontSize="$2xs" color="$textDark500">Concluídas</Text>
        </Box>
      </TouchableOpacity>
    </HStack>
  );
};