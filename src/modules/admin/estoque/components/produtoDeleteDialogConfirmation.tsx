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

type Product = {
    id: number
    validade: string
    valorMedida: number
    localizacao: string
    unidadeDeMedida: string
}

interface ProdutoDeleteConfirmationDialogProps {
    isOpen: boolean;
    productToDelete: Product | null;
    productName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ProdutoDeleteConfirmationDialog = ({
    isOpen,
    productToDelete,
    productName,
    onClose,
    onConfirm
}: ProdutoDeleteConfirmationDialogProps) => (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
            <AlertDialogHeader>
                <Text fontSize="$lg" fontWeight="bold">
                    Excluir Produto
                </Text>
            </AlertDialogHeader>
            <AlertDialogBody>
                <Text fontSize="$md">
                    Tem certeza que deseja excluir {productToDelete?.valorMedida} {productToDelete?.unidadeDeMedida} de {productName}?
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
                    <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                    action="negative"
                    onPress={onConfirm}
                >
                    <ButtonText>Excluir</ButtonText>
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);