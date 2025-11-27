import { VStack, HStack, Button, Text } from "@gluestack-ui/themed";
import { Filter, Users, Calendar } from "lucide-react-native";

interface AjudaFiltrosProps {
  onFiltroStatus: () => void;
  onFiltroFamilia: () => void;
  onFiltroData: () => void;
  onLimpar: () => void;
  onAplicar: () => void;
}

export const AjudaFiltros = ({
  onFiltroStatus,
  onFiltroFamilia,
  onFiltroData,
  onLimpar,
  onAplicar
}: AjudaFiltrosProps) => (
  <VStack>
    <Text fontWeight="$bold" size="lg" mb="$3">Filtrar Ajudas</Text>
    
    <Button
      variant="outline"
      borderColor="$primary500"
      mb="$3"
      onPress={onFiltroStatus}
      justifyContent="flex-start"
    >
      <HStack space="sm" alignItems="center">
        <Filter size={16} />
        <Text>Por status</Text>
      </HStack>
    </Button>
    
    <Button
      variant="outline"
      borderColor="$primary500"
      mb="$3"
      onPress={onFiltroFamilia}
      justifyContent="flex-start"
    >
      <HStack space="sm" alignItems="center">
        <Users size={16} />
        <Text>Por família</Text>
      </HStack>
    </Button>

    <Button
      variant="outline"
      borderColor="$primary500"
      mb="$3"
      onPress={onFiltroData}
      justifyContent="flex-start"
    >
      <HStack space="sm" alignItems="center">
        <Calendar size={16} />
        <Text>Por data</Text>
      </HStack>
    </Button>

    <HStack space="sm" mt="$5">
      <Button variant="outline" flex={1} onPress={onLimpar}>
        <Text>Limpar</Text>
      </Button>
      <Button flex={1} onPress={onAplicar}>
        <Text>Aplicar</Text>
      </Button>
    </HStack>
  </VStack>
);