import { Can } from "@components/can";
import { VStack, HStack, Text, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import { Plus, Filter } from "lucide-react-native";

interface AcoesHeaderProps {
  onNovaAcao: () => void;
}

export const AcoesHeader = ({ onNovaAcao }: AcoesHeaderProps) => (
  <VStack space="md" mb="$4">
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack flex={1}>
        <Text fontSize="$2xl" fontWeight="bold" color="$textDark800">
          Ações Cadastradas
        </Text>
      </VStack>
    </HStack>
    
    {/* Botões de Ação */}
    <Can permission="cadastrar_acao">
      <HStack space="sm">
        <Button 
          size="sm" 
          bg="$green600"
          gap={8}
          onPress={onNovaAcao}
        >
          <ButtonIcon as={Plus} size="sm" mr="$1" />
          <ButtonText fontSize="$sm" color="$white">Nova Ação</ButtonText>
        </Button>
      </HStack>
    </Can>
  </VStack>
);