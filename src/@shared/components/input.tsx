import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
    isDisabled?: boolean;
};

export function Input({ isDisabled = false, ...rest }: Props) {
    return (
        <GluestackInput
            bg={"$white"}
            h="$14"
            px="$1"
            borderWidth="$0"
            borderRadius="$md"
            $focus={{
                borderWidth: isDisabled ? 0 : 1,
                borderColor: "$blue300"
            }}
            opacity={isDisabled ? 0.7 : 1}
        >
            <InputField
                fontFamily="$body"
                {...rest}
            />
        </GluestackInput>
    )
}