import { Text } from "@gluestack-ui/themed";
import { Button, HStack } from "@gluestack-ui/themed";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react-native";
import { config } from "../../../config/gluestack-ui.config";

type Props = {
    labelButtonPlus: string;
    showIconFilter?: boolean;
    onSetShowFilter?: (show: boolean) => void;
    onPress?: () => void;
}

export function HeaderList({ labelButtonPlus, showIconFilter = false, onSetShowFilter = () => {}, onPress }: Props) {
    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            mb="$4"
        >
            <Button
                size="md"
                borderRadius="$lg"
                bg="$green600"
                onPress={onPress}
                alignItems="center"
                justifyContent="center"
                gap={8}
            >
                <Text fontFamily="$heading" color="white">{labelButtonPlus}</Text>
                <PlusIcon size={16} color="white" />
            </Button>

            {
                showIconFilter && (
                    <SlidersHorizontalIcon
                        size={24}
                        color={config.tokens.colors.blue700}
                        onPress={() => onSetShowFilter(true)}
                    />
                )
            }
        </HStack>
    )
}