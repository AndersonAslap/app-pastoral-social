import { HStack, Icon, Pressable, Box } from "@gluestack-ui/themed";
import { MessageCircle, Phone, Trash2 } from "lucide-react-native";

interface FamiliaCardActionsProps {
  onWhatsApp?: () => void;
  onCall?: () => void;
  onDelete?: () => void;
}

export const FamiliaCardActions = ({ onWhatsApp, onCall, onDelete }: FamiliaCardActionsProps) => {
  return (
    <HStack space="md" alignItems="center" gap="$1">
      <Pressable onPress={onWhatsApp}>
        {({ pressed }) => (
          <Box p="$2" opacity={pressed ? 0.6 : 1}>
            <Icon as={MessageCircle} size="md" color="$green600" />
          </Box>
        )}
      </Pressable>

      <Pressable onPress={onCall}>
        {({ pressed }) => (
          <Box p="$2" opacity={pressed ? 0.6 : 1}>
            <Icon as={Phone} size="md" color="$blue600" />
          </Box>
        )}
      </Pressable>

      {/*
        <Pressable onPress={onDelete}>
            {({ pressed }) => (
            <Box p="$2" opacity={pressed ? 0.6 : 1}>
                <Icon as={Trash2} size="md" color="$red600" />
            </Box>
            )}
        </Pressable>
      */}
    </HStack>
  );
};