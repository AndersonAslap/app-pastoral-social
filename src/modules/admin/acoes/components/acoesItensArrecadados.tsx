import { HStack, VStack, Text, Badge, BadgeText } from "@gluestack-ui/themed";
import { Package } from "lucide-react-native";

interface AcoesItensArrecadacaoProps {
  itens: string[];
}

export const AcoesItensArrecadacao = ({ itens }: AcoesItensArrecadacaoProps) => {
  console.log("Itens para arrecadar:", itens);
  if (itens.length === 0) return null;

  return (
    <HStack alignItems="flex-start" space="sm" mb="$3">
      <Package size={14} color="#6B7280" style={{ marginTop: 2 }} />
      <VStack flex={1}>
        <Text fontSize="$sm" color="$textDark500" mb="$1">
          Itens para arrecadar:
        </Text>
        <HStack flexWrap="wrap">
          {itens.slice(0, 3).map((item, index) => (
            <Badge 
              key={index} 
              size="sm" 
              variant="outline" 
              mr="$1" 
              mb="$1" 
              bg="$blue50"
              borderColor="$blue200"
            >
              <BadgeText fontSize="$2xs" color="$blue700">
                {item}
              </BadgeText>
            </Badge>
          ))}
          {itens.length > 3 && (
            <Badge size="sm" variant="outline" bg="$gray50" borderColor="$gray200">
              <BadgeText fontSize="$2xs" color="$gray600">
                +{itens.length - 3}
              </BadgeText>
            </Badge>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
};