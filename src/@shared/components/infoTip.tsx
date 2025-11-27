import { Box, VStack, HStack, Text } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";

interface InfoTipProps {
    title: string;
    description: string;
}

export const InfoTip = ({ title, description }: InfoTipProps) => (
    <Box 
        bg="$blue50" 
        p="$4" 
        borderRadius="$xl" 
        borderLeftWidth={4}
        borderLeftColor="$blue500"
    >
        <HStack space="sm" alignItems="flex-start">
            <Box 
                w="$5" 
                h="$5" 
                borderRadius="$full" 
                bg="$blue500" 
                alignItems="center" 
                justifyContent="center"
                mt="$0.5"
            >
                <Plus size={12} color="white" />
            </Box>
            <VStack flex={1}>
                <Text size="sm" fontWeight="$medium" color="$blue800">
                    {title}
                </Text>
                <Text size="xs" color="$blue700">
                    {description}
                </Text>
            </VStack>
        </HStack>
    </Box>
);