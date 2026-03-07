import { HStack, Button, Text } from "@gluestack-ui/themed";

const filtros = [
  { label: "Reservadas", value: "reservadas" },
  { label: "Canceladas", value: "canceladas" }
];

interface CestaFiltrosProps {
  onFiltroChange: (filtro: string) => void;
  filtroAtivo?: string;
}

export const CestaFiltros = ({ onFiltroChange, filtroAtivo = "todas" }: CestaFiltrosProps) => (
  <HStack space="sm" flexWrap="wrap" mb="$2">
    {filtros.map((filtro) => (
      <Button 
        key={filtro.value} 
        size="sm" 
        variant={filtroAtivo === filtro.value ? "solid" : "outline"}
        bg={filtroAtivo === filtro.value ? "$primary500" : "$white"}
        mb="$2"
        onPress={() => onFiltroChange(filtro.value)}
        flex={1}
      >
        <Text color={filtroAtivo === filtro.value ? "$white" : "$textDark800"}>
          {filtro.label}
        </Text>
      </Button>
    ))}
  </HStack>
);