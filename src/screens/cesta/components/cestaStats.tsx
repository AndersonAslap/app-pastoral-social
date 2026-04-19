import { HStack, Box, Text, VStack } from "@gluestack-ui/themed";

interface CestaStatsProps {
  totalCestas: number;
  cestasEntregues: number;
}

export const CestaStats = ({ totalCestas, cestasEntregues }: CestaStatsProps) => (
  <HStack space="md" mb="$6">
    <Box flex={1} bg="$blue50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$blue500">
      <Text fontSize="$2xl" fontWeight="bold" color="$blue800">{totalCestas}</Text>
      <Text fontSize="$sm" color="$blue600">Total de Cestas</Text>
    </Box>
    <Box flex={1} bg="$green50" p="$4" borderRadius="$xl" borderLeftWidth="$4" borderLeftColor="$green500">
      <Text fontSize="$2xl" fontWeight="bold" color="$green800">
        {cestasEntregues}
      </Text>
      <Text fontSize="$sm" color="$green600">Entregues</Text>
    </Box>
  </HStack>
);