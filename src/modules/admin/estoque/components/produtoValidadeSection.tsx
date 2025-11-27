import { Box, VStack, HStack, Text } from "@gluestack-ui/themed";
import { Calendar } from "lucide-react-native";
import { DateInput } from "@shared/components";

interface ValidadeSectionProps {
    validade: Date | null;
    onValidadeChange: (value: Date | null) => void;
}

export const ProdutoValidadeSection = ({ validade, onValidadeChange }: ValidadeSectionProps) => (
    <VStack gap="$4">
        <Text size="xl" fontWeight="$bold" color="$textDark800">
            Informações de Validade
        </Text>
        
        <Box bg="$backgroundLight0" p="$5" borderRadius="$2xl">
            <VStack gap="$2">
                <HStack space="sm" alignItems="center">
                    <Calendar size={18} color="#3b82f6" />
                    <Text size="md" fontWeight="$medium" color="$textDark700">
                        Data de Validade
                    </Text>
                </HStack>
                <DateInput
                    label=""
                    value={validade}
                    onChange={onValidadeChange}
                    placeholder="Selecione uma data"
                />
                <Text size="xs" color="$textDark500" mt="$1">
                    Selecione a data de validade do produto
                </Text>
            </VStack>
        </Box>
    </VStack>
);