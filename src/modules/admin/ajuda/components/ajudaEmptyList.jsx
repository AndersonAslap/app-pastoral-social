import { Box, Text } from "@gluestack-ui/themed";
import { Package } from "lucide-react-native";

export const AjudaEmptyList = () => (
  <Box alignItems="center" py="$16">
    <Package size={48} color="#94a3b8" />
    <Text color="$textDark500" mt="$2" textAlign="center">
      Nenhuma ajuda cadastrada
    </Text>
    <Text color="$textDark400" size="sm" textAlign="center">
      Clique em "Nova ajuda" para adicionar a primeira
    </Text>
  </Box>
);