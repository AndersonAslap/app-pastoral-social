import { Box, HStack, Text } from "@gluestack-ui/themed";

interface AjudaProgressBarProps {
  progress: number;
  label?: string;
}

export const AjudaProgressBar = ({ progress, label = "Progresso" }: AjudaProgressBarProps) => (
  <Box mt="$3">
    <HStack justifyContent="space-between" mb="$1">
      <Text size="xs" color="$textDark500">{label}</Text>
      <Text size="xs" color="$blue600" fontWeight="$medium">{progress}%</Text>
    </HStack>
    <Box w="100%" h="$2" bg="$borderLight200" borderRadius="$full" overflow="hidden">
      <Box 
        h="100%" 
        bg="$blue500"
        width={`${progress}%`}
        borderRadius="$full"
      />
    </Box>
  </Box>
);