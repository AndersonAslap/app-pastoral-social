import { Button as GluestackButton, Text, ButtonSpinner } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
    title: string;
    variant?: "solid" | "outline"
    w?: string;
    h?: string;
}

export function ButtonCancel({ title, variant = "solid", w = "$full", h = "$14", ...rest }: Props) {
    return (
        <GluestackButton
            w={w}
            h={h}
            bg={variant === "outline" ? "transparent" : "$red400"}
            borderWidth={variant === "outline" ? "$1" : "$0"}
            borderColor="$red300"
            rounded="$sm"
            $active-bg={variant === "outline" ? "$red100" : "$red300"}
            {...rest}
        >
            <Text color={variant === "outline" ? "$red400" : "$white"} fontFamily="$heading" fontSize="$sm">{title}</Text>
        </GluestackButton>
    )
}