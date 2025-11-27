import { VStack, HStack, Text, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { Plus, Filter } from "lucide-react-native";

interface AcoesHeaderProps {
  totalAcoes: number;
  onFiltrar: () => void;
  onNovaAcao: () => void;
}

export const AcoesHeader = ({ totalAcoes, onFiltrar, onNovaAcao }: AcoesHeaderProps) => (
  <VStack space="md" mb="$4">
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack flex={1}>
        <Text fontSize="$2xl" fontWeight="bold" color="$textDark800">
          Ações Cadastradas
        </Text>
        <Text fontSize="$sm" color="$textDark500">
          {totalAcoes} ações sociais registradas
        </Text>
      </VStack>
    </HStack>
    
    {/* Botões de Ação */}
    <HStack space="sm">
      <Button 
        size="sm" 
        variant="outline" 
        bg="$white"
        borderColor="$borderLight300"
        flex={1}
        onPress={onFiltrar}
      >
        <ButtonIcon as={Filter} size="sm" mr="$1" />
        <ButtonText fontSize="$sm">Filtrar</ButtonText>
      </Button>
      <Button 
        size="sm" 
        bg="$green600"
        flex={1}
        onPress={onNovaAcao}
      >
        <ButtonIcon as={Plus} size="sm" mr="$1" />
        <ButtonText fontSize="$sm" color="$white">Nova Ação</ButtonText>
      </Button>
    </HStack>
  </VStack>
);