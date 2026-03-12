import { HStack, Text, Box } from "@gluestack-ui/themed";
import { Tag, Heart } from "lucide-react-native";

export const VersionBadge = () => {
    const appVersion = process.env.EXPO_PUBLIC_APP_VERSION;

    return (
        <Box zIndex={10}>
            <HStack 
                space="xs" 
                alignItems="center" 
                bg="$pink50"
                px="$3"
                py="$1.5"
                borderRadius="$full"
                borderWidth={1}
                borderColor="$pink200"
                alignSelf="flex-start"
            >
                <Box mr="$1">
                    <Heart size={12} color="#EC4899" />
                </Box>
                
                <Text fontSize="$xs" fontWeight="$medium" color="$pink700">
                    v{appVersion}
                </Text>
            </HStack>
        </Box>
    );
};