import { Box, VStack, HStack, Text } from "@gluestack-ui/themed";
import { Users, MapPin, Package } from "lucide-react-native";
import { Help } from "../types";
import { AjudaBadges } from "./ajudaBadges";
import { AjudaActions } from "./ajudaActions";
import { getStatusConfig } from "../helper/ajuda.helper";

interface AjudaCardProps {
  item: Help;
  onDetalhes: (item: Help) => void;
  onCancelar?: (item: Help) => void;
  onAprovar?: (item: Help) => void;
  onRealizada?: (item: Help) => void;
  onReabrir?: (item: Help) => void;
}

export const AjudaCard = ({ 
  item, 
  onDetalhes, 
  onCancelar, 
  onAprovar, 
  onRealizada, 
  onReabrir 
}: AjudaCardProps) => {
  const statusConfig = getStatusConfig(item.statusAjuda);

  return (
    <Box
      bg="$backgroundLight0"
      p="$4"
      mb="$3"
      borderRadius="$2xl"
      borderWidth={1}
      borderColor="$borderLight200"
    >
      <VStack space="sm">
        {/* Header com Representante e Status */}
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1}>
            <HStack space="sm" alignItems="center">
              <Users size={16} color="#64748b" />
              <Text fontWeight="$bold" size="lg" color="$textDark800">
                {item.representante}
              </Text>
            </HStack>
          </VStack>
          
          <AjudaBadges 
            statusConfig={statusConfig}
          />
        </HStack>

        {/* Endereço da Família */}
        {item.endereco && (
          <HStack space="sm" alignItems="flex-start">
            <MapPin size={14} color="#64748b" />
            <Text size="sm" color="$textDark600" flex={1}>
              {item.endereco}
            </Text>
          </HStack>
        )}

        {/* Detalhes da Ajuda */}
        <VStack space="xs" mt="$2">
          <HStack space="sm" alignItems="center">
            <Package size={14} color="#64748b" />
            <Text size="sm" color="$textDark600" fontWeight="$medium">
              {item.tipoAjuda}
            </Text>
          </HStack>
        </VStack>

        {/* Botões de Ação */}
        <AjudaActions
          item={item}
          onDetalhes={onDetalhes}
          onCancelar={onCancelar}
          onAprovar={onAprovar}
          onRealizada={onRealizada}
          onReabrir={onReabrir}
        />
      </VStack>
    </Box>
  );
};