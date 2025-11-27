import { Text, Box } from "@gluestack-ui/themed";
import { Package } from "lucide-react-native";

export const ProdutoCardEmptyState: React.FC = () => {
    return (
        <Box alignItems="center" py="$16">
            <Package size={48} color="#94a3b8" />
            <Text color="$textDark500" mt="$2" textAlign="center">
                Nenhum produto cadastrado
            </Text>
            <Text color="$textDark400" size="sm" textAlign="center">
                Clique em "Novo produto" para adicionar o primeiro item
            </Text>
        </Box>
    )
};
