import { HStack, Button, Text } from "@gluestack-ui/themed";
import { Eye, X, Check, CheckCircle } from "lucide-react-native";
import { Help } from "../types";

interface AjudaActionsProps {
  item: Help;
  onDetalhes: (item: Help) => void;
  onCancelar?: (item: Help) => void;
  onAprovar?: (item: Help) => void;
  onRealizada?: (item: Help) => void;
  onReabrir?: (item: Help) => void;
}

export const AjudaActions = ({ 
  item, 
  onDetalhes, 
  onCancelar, 
  onAprovar, 
  onRealizada, 
  onReabrir 
}: AjudaActionsProps) => (
  <HStack space="sm" mt="$3" justifyContent="flex-end">
    {/* Botão Detalhes - Sempre visível */}
    <Button 
      size="sm" 
      variant="outline" 
      borderColor="$primary500"
      onPress={() => onDetalhes(item)}
    >
      <HStack space="xs" alignItems="center">
        <Eye size={14} color="#3b82f6" />
        <Text size="xs" color="$primary500">
          Detalhes
        </Text>
      </HStack>
    </Button>

    {/* Botões Condicionais por Status */}
    {item.status === 'pendente' && (
      <>
        <Button 
          size="sm" 
          variant="solid" 
          bg="$red500"
          onPress={() => onCancelar?.(item)}
        >
          <HStack space="xs" alignItems="center">
            <X size={14} color="white" />
            <Text size="xs" color="white">
              Cancelar
            </Text>
          </HStack>
        </Button>
        
        <Button 
          size="sm" 
          variant="solid" 
          bg="$green500"
          onPress={() => onAprovar?.(item)}
        >
          <HStack space="xs" alignItems="center">
            <Check size={14} color="white" />
            <Text size="xs" color="white">
              Aprovar
            </Text>
          </HStack>
        </Button>
      </>
    )}

    {item.status === 'em andamento' && (
      <Button 
        size="sm" 
        variant="solid" 
        bg="$emerald500"
        onPress={() => onRealizada?.(item)}
      >
        <HStack space="xs" alignItems="center">
          <CheckCircle size={14} color="white" />
          <Text size="xs" color="white">
            Realizada
          </Text>
        </HStack>
      </Button>
    )}

    {item.status === 'concluído' && (
      <Button 
        size="sm" 
        variant="outline" 
        borderColor="$green500"
        onPress={() => onReabrir?.(item)}
      >
        <HStack space="xs" alignItems="center">
          <CheckCircle size={14} color="#10b981" />
          <Text size="xs" color="$green500">
            Concluída
          </Text>
        </HStack>
      </Button>
    )}
  </HStack>
);