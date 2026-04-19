import { Button, Text, VStack } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";

type Props = {
    label: string;
    icon: ReactNode;
} & ComponentProps<typeof Button>;

export function ButtonMenu({label, icon, ...rest} : Props) {
    return (
        <Button w="$33" h="$40" bg="$blue100" rounded="$3xl" {...rest}>
            <VStack alignItems="center" gap="$4">
                {icon}
                <Text color="$gray300" fontFamily="$heading"> {label}</Text>
            </VStack>
        </Button>
    )
}