// components/DeleteConfirmationDialog.tsx
import { 
    AlertDialog, 
    AlertDialogBackdrop, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogBody, 
    AlertDialogFooter, 
    Button, 
    ButtonText, 
    Text 
} from "@gluestack-ui/themed";

interface ConfirmationDialogProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmationDialog = ({
    title = "Excluir Item",
    description = "Tem certeza que deseja excluir este item?",
    isOpen,
    onClose,
    onConfirm
}: ConfirmationDialogProps) => (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
            <AlertDialogHeader>
                <Text fontSize="$lg" fontWeight="bold">
                    {title}
                </Text>
            </AlertDialogHeader>
            <AlertDialogBody>
                <Text fontSize="$md">
                    {description}
                </Text>
                <Text fontSize="$sm" color="$red600" mt="$2" fontWeight="bold">
                    Esta ação não pode ser desfeita.
                </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button
                    variant="outline"
                    action="secondary"
                    mr="$3"
                    onPress={onClose}
                >
                    <ButtonText>Não</ButtonText>
                </Button>
                <Button
                    action="negative"
                    onPress={onConfirm}
                >
                    <ButtonText>Sim</ButtonText>
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);