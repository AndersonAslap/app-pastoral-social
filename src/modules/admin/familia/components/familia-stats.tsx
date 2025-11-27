import { Text, VStack, HStack, Box } from "@gluestack-ui/themed";

interface FamiliaStatsProps {
    count: number;
}

export const FamiliaStats = ({ count }: FamiliaStatsProps) => (
    <Box bg="$backgroundLight0" p="$4" borderRadius="$2xl" mb="$4">
        <HStack justifyContent="space-between" alignItems="center">
            <VStack>
                <Text size="lg" fontWeight="$bold" color="$textDark800">
                    {count} {count === 1 ? 'família' : 'famílias'}
                </Text>
                <Text size="sm" color="$textDark500">
                    cadastradas no sistema
                </Text>
            </VStack>
        </HStack>
    </Box>
);