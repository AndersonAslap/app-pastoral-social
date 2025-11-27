import { Box, Text, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";

interface AcoesEmptyListProps {
  onNovaAcao: () => void;
}

export const AcoesEmptyList = ({ onNovaAcao }: AcoesEmptyListProps) => (
  <Box bg="$white" p="$8" borderRadius="$2xl" alignItems="center">
    <Text fontSize="$lg" color="$textDark400" textAlign="center" mb="$4">
      Nenhuma ação social cadastrada
    </Text>
    <Button bg="$green600" onPress={onNovaAcao}>
      <ButtonIcon as={Plus} size="sm" mr="$1" />
      <ButtonText color="$white">Criar Primeira Ação</ButtonText>
    </Button>
  </Box>
);