import { HStack, Button, Text } from "@gluestack-ui/themed";
import { Eye, X, Check, CheckCircle } from "lucide-react-native";
import { Help } from "@tipagens/ajuda";
import { useState } from "react";
import { ConfirmationDialog } from "@components/confirmation-dialog";
import { Can } from "@components/can";

interface AjudaActionsProps {
  item: Help;
  onAbrirDetalhes: (item: Help) => void;
  onCancelar: (idAjuda: number) => void;
  onAprovar: (idAjuda: number) => void;
  onRealizada: (idAjuda: number) => void;
}

export const AjudaActions = ({ 
  item, 
  onAbrirDetalhes, 
  onCancelar, 
  onAprovar, 
  onRealizada
}: AjudaActionsProps) => {

  const [dialogConfirmCancelarAjuda, setDialogConfirmCancelarAjuda] = useState(false);
  const [dialogConfirmAprovarAjuda, setDialogConfirmAprovarAjuda] = useState(false);
  const [dialogConfirmEntregarAjuda, setDialogConfirmEntregarAjuda] = useState(false);

  const handleCancelarAjuda = () => {
    setDialogConfirmCancelarAjuda(false);

    setTimeout(() => {
      onCancelar(item.id);
    }, 0);
  }

  const handleAprovarAjuda = () => {
    setDialogConfirmAprovarAjuda(false);

    setTimeout(() => {
      onAprovar(item.id);
    }, 0);
  }

  const handleEntregarAjuda = () => {
    setDialogConfirmEntregarAjuda(false);

    setTimeout(() => {
      onRealizada(item.id);
    }, 0);
  }

  return (
      <HStack space="sm" mt="$3" justifyContent="flex-end">
      {/* Botão Detalhes - Sempre visível */}
      <Button 
        size="sm" 
        variant="outline" 
        borderColor="$primary500"
        onPress={() => onAbrirDetalhes(item)}
        mr="auto"
      >
        <HStack space="xs" alignItems="center">
          <Eye size={14} color="#3b82f6" />
        </HStack>
      </Button>

      {/* Botões Condicionais por Status */}
      {item.statusAjuda === 'AGUARDANDO_APROVACAO' && (
        <>
          <Can permission="cancelar_ajuda">
            <Button 
              size="sm" 
              variant="solid" 
              bg="$red500"
              onPress={() => setDialogConfirmCancelarAjuda(true)}
            >
              <HStack space="xs" alignItems="center">
                <X size={14} color="white" />
                <Text size="xs" color="white">
                  Cancelar
                </Text>
              </HStack>
            </Button>
          </Can>
          
          <Can permission="aprovar_ajuda">
            <Button 
              size="sm" 
              variant="solid" 
              bg="$green500"
              onPress={() => setDialogConfirmAprovarAjuda(true)}
            >
              <HStack space="xs" alignItems="center">
                <Check size={14} color="white" />
                <Text size="xs" color="white">
                  Aprovar
                </Text>
              </HStack>
            </Button>
          </Can>
        </>
      )}

      {item.statusAjuda === 'APROVADA' && (
        <Can permission="entregar_ajuda">
          <Button 
            size="sm" 
            variant="solid" 
            bg="$emerald500"
            onPress={() => setDialogConfirmEntregarAjuda(true)}
          >
            <HStack space="xs" alignItems="center">
              <CheckCircle size={14} color="white" />
              <Text size="xs" color="white">
                Entregar
              </Text>
            </HStack>
          </Button>
        </Can>
      )}

      <ConfirmationDialog
        title="Cancelar Item"
        description="Tem certeza que deseja cancelar este item?"
        isOpen={dialogConfirmCancelarAjuda}
        onClose={() => setDialogConfirmCancelarAjuda(false)}
        onConfirm={handleCancelarAjuda}
      />

      <ConfirmationDialog
        title="Aprovar Item"
        description="Tem certeza que deseja aprovar este item?"
        isOpen={dialogConfirmAprovarAjuda}
        onClose={() => setDialogConfirmAprovarAjuda(false)}
        onConfirm={handleAprovarAjuda}
      />

      <ConfirmationDialog
        title="Entregar Item"
        description="Tem certeza que deseja entregar este item?"
        isOpen={dialogConfirmEntregarAjuda}
        onClose={() => setDialogConfirmEntregarAjuda(false)}
        onConfirm={handleEntregarAjuda}
      />
    </HStack>
  )
}