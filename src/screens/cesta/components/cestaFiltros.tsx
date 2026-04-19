import { HStack, Text, Box, Pressable } from "@gluestack-ui/themed";

interface FiltroItem {
  label: string;
  value: string;
}

const filtros: FiltroItem[] = [
  { label: "Criadas", value: "CRIADA" },
  { label: "Reservadas", value: "RESERVADA" },
  { label: "Canceladas", value: "CANCELADA" }
];

interface CestaFiltrosProps {
  onFiltroChange: (filtro: string) => void;
  filtroAtivo?: string;
}

export const CestaFiltros = ({ 
  onFiltroChange, 
  filtroAtivo = "CRIADA" 
}: CestaFiltrosProps) => {
  const coresStatus: Record<string, string> = {
    CRIADA: "$orange500",
    RESERVADA: "$blue500",
    CANCELADA: "$red500"
  };


  return (
    <Box
      bg="$white"
      borderRadius="$3xl"
      p="$1"
      borderWidth={1}
      borderColor="$borderLight100"
    >
      <HStack space="xs">
        {filtros.map((filtro) => {
          const isAtivo = filtroAtivo === filtro.value;
          
          return (
            <Pressable
              key={filtro.value}
              onPress={() => onFiltroChange(filtro.value)}
              flex={1}
            >
              <Box
                py="$3"
                px="$4"
                alignItems="center"
                justifyContent="center"
                borderRadius="$2xl"
                bg={isAtivo ? coresStatus[filtro.value] : "transparent"}
                borderBottomWidth={isAtivo ? 0 : 2}
                borderBottomColor={isAtivo ? "transparent" : "transparent"}
              >
                <Text
                  fontSize="$sm"
                  fontWeight={isAtivo ? "$bold" : "$medium"}
                  color={isAtivo ? "$white" : "$textLight500"}
                >
                  {filtro.label}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
};