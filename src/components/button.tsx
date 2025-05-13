import { Button as GluestackButton, Text, ButtonSpinner } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
    title: string;
    variant?: "solid" | "outline"
    isLoading?: boolean;
}

export function Button({title, variant = "solid", isLoading = false, ...rest} : Props) {
    return (
        <GluestackButton 
            w="$full"
            h="$14"
            bg={variant === "outline" ? "transparent" : "$blue400"}
            borderWidth={variant === "outline" ? "$1" : "$0"}
            borderColor="$blue300"
            rounded="$sm"
            $active-bg={variant === "outline" ? "$blue100" : "$blue300"}
            disabled={isLoading}
            {...rest}
        >
            {isLoading === false ? <Text color={variant === "outline" ? "$blue400" : "$white"} fontFamily="$heading" fontSize="$sm">{title}</Text> : <ButtonSpinner color="$white" />}
        </GluestackButton>
    )
}