import { ScrollView, HStack, Button, ButtonText } from "@gluestack-ui/themed";

const filtros = [
  { label: "Todas", value: "todas" },
  { label: "Criadas", value: "criadas" },
  { label: "Entregues", value: "entregues" },
  { label: "Reservadas", value: "reservadas" },
  { label: "Canceladas", value: "canceladas" }
];

interface CestaFiltrosProps {
  onFiltroChange: (filtro: string) => void;
}

export const CestaFiltros = ({ onFiltroChange }: CestaFiltrosProps) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} mb="$4">
    <HStack space="sm" pb="$2">
      {filtros.map((filtro) => (
        <Button 
          key={filtro.value} 
          size="sm" 
          variant="outline" 
          bg="$white"
          onPress={() => onFiltroChange(filtro.value)}
        >
          <ButtonText>{filtro.label}</ButtonText>
        </Button>
      ))}
    </HStack>
  </ScrollView>
);